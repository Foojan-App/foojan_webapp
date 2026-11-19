<?php

const FZ_SEED_VERSION = '5';

function fz_import_image($path)
{
    if (is_numeric($path)) {
        return (int) $path;
    }
    $path = (string) $path;
    $assets = FZ_URI . '/assets';
    if (str_starts_with($path, $assets . '/images/')) {
        $path = substr($path, strlen($assets));
    } elseif (preg_match('#^https?://#i', $path)) {
        return attachment_url_to_postid($path);
    }
    if (!str_starts_with($path, '/images/')) {
        return $path;
    }
    $map = get_option('fz_media_map', []);
    if (!empty($map[$path]) && get_post($map[$path])) {
        return (int) $map[$path];
    }
    $plain = preg_replace('/\.[a-z]+$/i', '', $path);
    foreach ($map as $source => $id) {
        if (preg_replace('/\.[a-z]+$/i', '', $source) === $plain && get_post($id)) {
            return (int) $id;
        }
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

function fz_seed_fields($key, $prefix, $fields, $data, $post_id, $force)
{
    $done = get_option('fz_seed_done', []);
    if (!$force && in_array($key, $done, true)) {
        return false;
    }
    foreach (fz_value_fields($fields) as $field) {
        update_field($prefix . '_' . $field['name'], fz_seed_value($field, $data[$field['name']] ?? null), $post_id);
    }
    $done[] = $key;
    update_option('fz_seed_done', array_values(array_unique($done)), false);
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

function fz_seed_existing_page($slug, $title, $template)
{
    $page = get_page_by_path($slug, OBJECT, 'page');
    if ($page) {
        return $page->ID;
    }
    return fz_seed_page($slug, $title, $template);
}

function fz_seed_keyed($fields, $path, $data)
{
    $out = [];
    foreach (fz_value_fields($fields) as $field) {
        $key_path = $path . '/' . $field['name'];
        $value = $data[$field['name']] ?? null;
        switch ($field['type']) {
            case 'texts':
                $value = array_map(fn($row) => [fz_acf_key($key_path . '/text') => $row['text'] ?? ''], is_array($value) ? $value : []);
                break;
            case 'group':
                $value = fz_seed_keyed($field['fields'], $key_path, is_array($value) ? $value : []);
                break;
            case 'list':
                $value = array_map(fn($row) => fz_seed_keyed($field['fields'], $key_path, $row), is_array($value) ? $value : []);
                break;
        }
        $out[fz_acf_key($key_path)] = $value;
    }
    return $out;
}

function fz_seed_sections($key, $post_id, $rows, $force)
{
    $done = get_option('fz_seed_done', []);
    if (!$force && (in_array($key, $done, true) || metadata_exists('post', $post_id, 'sections'))) {
        return false;
    }
    $sections = fz_sections();
    $out = [];
    foreach ($rows as $row) {
        $layout = $row['acf_fc_layout'] ?? '';
        if (!isset($sections[$layout])) {
            continue;
        }
        $values = [];
        foreach (fz_value_fields($sections[$layout]['fields']) as $field) {
            $values[$field['name']] = fz_seed_value($field, $row[$field['name']] ?? null);
        }
        $out[] = ['acf_fc_layout' => $layout] + fz_seed_keyed($sections[$layout]['fields'], 'sections/' . $layout, $values);
    }
    update_field(fz_sections_field_key(), $out, $post_id);
    $done[] = $key;
    update_option('fz_seed_done', array_values(array_unique($done)), false);
    return true;
}

function fz_seed($force = false)
{
    if (!function_exists('update_field')) {
        return ['error' => 'Secure Custom Fields is not active.'];
    }
    if (function_exists('set_time_limit')) {
        @set_time_limit(300);
    }
    ignore_user_abort(true);
    $defaults = fz_defaults();
    $done = [];
    foreach (fz_schema() as $section => $config) {
        if (fz_seed_fields($section, $section, $config['fields'], $defaults[$section] ?? [], 'option', $force)) {
            $done[] = $section;
        }
    }
    $meet = fz_seed_page('meet-dr-foojan-zeine', 'Meet Dr. Foojan Zeine', 'template-meet.php');
    if ($meet && fz_seed_fields('meet', 'meet', fz_meet_schema(), $defaults['meet'] ?? [], $meet, $force)) {
        $done[] = 'meet';
    }
    foreach ($defaults['legal'] ?? [] as $slug => $page) {
        $id = fz_seed_page($slug, $page['title'], 'template-legal.php');
        if ($id && fz_seed_fields('legal:' . $slug, 'legal', fz_legal_schema(), $page, $id, $force)) {
            $done[] = 'legal:' . $slug;
        }
    }
    $front = (int) get_option('page_on_front');
    if ($front && fz_seed_sections('sections:home', $front, fz_home_rows(), $force)) {
        $done[] = 'sections:home';
    }
    foreach (fz_pages() as $key => $page) {
        $id = fz_seed_existing_page($page['slug'], $page['label'], fz_sections_template());
        if ($id && fz_seed_sections('sections:' . $key, $id, $defaults['sections'][$key] ?? [], $force)) {
            $done[] = 'sections:' . $key;
        }
    }
    update_option('fz_seed_complete', 1, false);
    update_option('fz_seed_version', FZ_SEED_VERSION, false);
    return $done;
}

add_action('after_switch_theme', function () {
    update_option('fz_seed_pending', 1, false);
});

add_action('init', function () {
    if (!function_exists('update_field')) {
        return;
    }
    if (!get_option('fz_seed_pending') && get_option('fz_seed_complete') && get_option('fz_seed_version') === FZ_SEED_VERSION) {
        return;
    }
    if (get_transient('fz_seed_lock')) {
        return;
    }
    set_transient('fz_seed_lock', 1, 5 * MINUTE_IN_SECONDS);
    delete_option('fz_seed_pending');
    fz_seed(false);
    delete_transient('fz_seed_lock');
}, 100);

if (defined('WP_CLI') && WP_CLI) {
    WP_CLI::add_command('fz seed', function ($args, $assoc) {
        $done = fz_seed(!empty($assoc['force']));
        WP_CLI::success('Seeded: ' . (is_array($done) ? implode(', ', $done) : json_encode($done)));
    });
}
