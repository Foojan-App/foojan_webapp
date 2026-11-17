<?php

function fz_import_image($path)
{
    $path = (string) $path;
    if (!str_starts_with($path, '/images/')) {
        return $path;
    }
    $map = get_option('fz_media_map', []);
    if (!empty($map[$path]) && get_post($map[$path])) {
        return (int) $map[$path];
    }
    $file = FZ_DIR . '/assets' . $path;
    if (!is_readable($file)) {
        return 0;
    }
    $upload = wp_upload_bits(basename($file), null, (string) file_get_contents($file));
    if (!empty($upload['error'])) {
        return 0;
    }
    require_once ABSPATH . 'wp-admin/includes/image.php';
    $type = wp_check_filetype($upload['file']);
    $id = wp_insert_attachment([
        'post_mime_type' => $type['type'],
        'post_title' => preg_replace('/\.[^.]+$/', '', basename($file)),
        'post_status' => 'inherit',
    ], $upload['file']);
    if (is_wp_error($id) || !$id) {
        return 0;
    }
    wp_update_attachment_metadata($id, wp_generate_attachment_metadata($id, $upload['file']));
    $map[$path] = $id;
    update_option('fz_media_map', $map, false);
    return (int) $id;
}

function fz_seed_value($field, $value)
{
    switch ($field['type']) {
        case 'image':
            return fz_import_image($value);
        case 'texts':
            return array_map(fn($text) => ['text' => (string) $text], is_array($value) ? $value : []);
        case 'group':
            $out = [];
            foreach (fz_value_fields($field['fields']) as $sub) {
                $out[$sub['name']] = fz_seed_value($sub, $value[$sub['name']] ?? null);
            }
            return $out;
        case 'list':
            $rows = [];
            foreach (is_array($value) ? $value : [] as $row) {
                $out = [];
                foreach (fz_value_fields($field['fields']) as $sub) {
                    $out[$sub['name']] = fz_seed_value($sub, $row[$sub['name']] ?? null);
                }
                $rows[] = $out;
            }
            return $rows;
        case 'toggle':
            return $value === null ? 1 : ($value ? 1 : 0);
        default:
            return $value === null ? '' : $value;
    }
}

function fz_seed_fields($prefix, $fields, $data, $post_id, $force)
{
    if (!$force && fz_is_saved($prefix, $fields, $post_id)) {
        return false;
    }
    foreach (fz_value_fields($fields) as $field) {
        update_field($prefix . '_' . $field['name'], fz_seed_value($field, $data[$field['name']] ?? null), $post_id);
    }
    return true;
}

function fz_seed_page($path, $title, $template)
{
    $page = get_page_by_path($path, OBJECT, 'page');
    if ($page) {
        update_post_meta($page->ID, '_wp_page_template', $template);
        return $page->ID;
    }
    $id = wp_insert_post([
        'post_type' => 'page',
        'post_status' => 'publish',
        'post_title' => $title,
        'post_name' => $path,
        'post_content' => '',
    ]);
    if (is_wp_error($id) || !$id) {
        return 0;
    }
    update_post_meta($id, '_wp_page_template', $template);
    return $id;
}

function fz_seed($force = false)
{
    if (!function_exists('update_field')) {
        return ['error' => 'Secure Custom Fields is not active.'];
    }
    $defaults = fz_defaults();
    $done = [];
    foreach (fz_schema() as $section => $config) {
        if (fz_seed_fields($section, $config['fields'], $defaults[$section] ?? [], 'option', $force)) {
            $done[] = $section;
        }
    }
    $meet = fz_seed_page('meet-dr-foojan-zeine', 'Meet Dr. Foojan Zeine', 'template-meet.php');
    if ($meet && fz_seed_fields('meet', fz_meet_schema(), $defaults['meet'] ?? [], $meet, $force)) {
        $done[] = 'meet';
    }
    foreach ($defaults['legal'] ?? [] as $slug => $page) {
        $id = fz_seed_page($slug, $page['title'], 'template-legal.php');
        if ($id && fz_seed_fields('legal', fz_legal_schema(), $page, $id, $force)) {
            $done[] = 'legal:' . $slug;
        }
    }
    return $done;
}

add_action('after_switch_theme', function () {
    update_option('fz_seed_pending', 1, false);
});

add_action('init', function () {
    if (get_option('fz_seed_pending') && function_exists('update_field')) {
        delete_option('fz_seed_pending');
        fz_seed(false);
    }
}, 100);

if (defined('WP_CLI') && WP_CLI) {
    WP_CLI::add_command('fz seed', function ($args, $assoc) {
        $done = fz_seed(!empty($assoc['force']));
        WP_CLI::success('Seeded: ' . (is_array($done) ? implode(', ', $done) : json_encode($done)));
    });
}
