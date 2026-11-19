<?php

function fz_markdown($text)
{
    $html = [];
    $paragraph = [];
    $list = [];
    $flush = function () use (&$html, &$paragraph, &$list) {
        if ($paragraph) {
            $html[] = '<p>' . esc_html(implode(' ', $paragraph)) . '</p>';
            $paragraph = [];
        }
        if ($list) {
            $html[] = '<ul>' . implode('', array_map(fn($item) => '<li>' . esc_html($item) . '</li>', $list)) . '</ul>';
            $list = [];
        }
    };
    foreach (preg_split('/\r?\n/', (string) $text) as $raw) {
        $line = trim($raw);
        if ($line === '') {
            $flush();
            continue;
        }
        if (str_starts_with($line, '## ')) {
            $flush();
            $html[] = '<h2>' . esc_html(substr($line, 3)) . '</h2>';
            continue;
        }
        if (str_starts_with($line, '- ')) {
            if ($paragraph) {
                $flush();
            }
            $list[] = substr($line, 2);
            continue;
        }
        if ($list) {
            $flush();
        }
        $paragraph[] = $line;
    }
    $flush();
    return implode("\n", $html);
}

function fz_defaults()
{
    static $data = null;
    if ($data === null) {
        $data = json_decode((string) file_get_contents(FZ_DIR . '/data/defaults.json'), true) ?: [];
        if (isset($data['meet']['body'])) {
            $data['meet']['body'] = fz_markdown($data['meet']['body']);
        }
        foreach ($data['legal'] ?? [] as $slug => $page) {
            $data['legal'][$slug]['body'] = fz_markdown($page['body']);
        }
    }
    return $data;
}

function fz_normalize($fields, $value)
{
    $value = is_array($value) ? $value : [];
    $out = [];
    foreach ($fields as $field) {
        if ($field['type'] === 'tab') {
            continue;
        }
        $raw = $value[$field['name']] ?? null;
        switch ($field['type']) {
            case 'image':
                if (is_numeric($raw) && (int) $raw > 0) {
                    $out[$field['name']] = fz_theme_image_url((int) $raw) ?: (string) wp_get_attachment_image_url((int) $raw, 'full');
                } elseif (is_array($raw)) {
                    $out[$field['name']] = (string) ($raw['url'] ?? '');
                } else {
                    $out[$field['name']] = (string) $raw;
                }
                break;
            case 'toggle':
                $out[$field['name']] = $raw === null ? true : (bool) $raw;
                break;
            case 'number':
                $out[$field['name']] = is_numeric($raw) ? $raw + 0 : null;
                break;
            case 'texts':
                $rows = is_array($raw) ? $raw : [];
                $out[$field['name']] = array_values(array_filter(array_map(fn($row) => trim((string) (is_array($row) ? ($row['text'] ?? '') : $row)), $rows), 'strlen'));
                break;
            case 'group':
                $out[$field['name']] = fz_normalize($field['fields'], $raw);
                break;
            case 'list':
                $rows = is_array($raw) ? $raw : [];
                $out[$field['name']] = array_values(array_map(fn($row) => fz_normalize($field['fields'], $row), $rows));
                break;
            default:
                $out[$field['name']] = (string) $raw;
        }
    }
    return $out;
}

function fz_value_fields($fields)
{
    return array_values(array_filter($fields, fn($field) => $field['type'] !== 'tab'));
}

function fz_is_saved($prefix, $fields, $post_id)
{
    $first = fz_value_fields($fields)[0]['name'] ?? '';
    if ($first === '') {
        return false;
    }
    if ($post_id === 'option') {
        return get_option('_options_' . $prefix . '_' . $first, false) !== false;
    }
    return metadata_exists('post', $post_id, '_' . $prefix . '_' . $first);
}

function fz_read($prefix, $fields, $post_id)
{
    $raw = [];
    foreach (fz_value_fields($fields) as $field) {
        $raw[$field['name']] = get_field($prefix . '_' . $field['name'], $post_id);
    }
    return fz_normalize($fields, $raw);
}

function fz_content($section)
{
    static $cache = [];
    if (isset($cache[$section])) {
        return $cache[$section];
    }
    $fields = fz_schema()[$section]['fields'] ?? [];
    if (function_exists('get_field') && fz_is_saved($section, $fields, 'option')) {
        $content = fz_read($section, $fields, 'option');
    } else {
        $content = fz_defaults()[$section] ?? [];
    }
    return $cache[$section] = $content;
}

function fz_meet_content($post_id)
{
    $fields = fz_meet_schema();
    if (function_exists('get_field') && fz_is_saved('meet', $fields, $post_id)) {
        return fz_read('meet', $fields, $post_id);
    }
    return fz_defaults()['meet'] ?? [];
}

function fz_legal_body($post_id)
{
    $fields = fz_legal_schema();
    if (function_exists('get_field') && fz_is_saved('legal', $fields, $post_id)) {
        return fz_read('legal', $fields, $post_id)['body'];
    }
    $slug = get_post_field('post_name', $post_id);
    return fz_defaults()['legal'][$slug]['body'] ?? '';
}

function fz_theme_image_url($id)
{
    $path = array_search($id, get_option('fz_media_map', []), true);
    if (!is_string($path)) {
        return '';
    }
    $webp = preg_replace('/\.(png|jpe?g)$/i', '.webp', $path);
    return is_readable(FZ_DIR . '/assets' . $webp) ? FZ_URI . '/assets' . $webp : '';
}

function fz_img($value)
{
    $value = (string) $value;
    if (str_starts_with($value, '/images/')) {
        return FZ_URI . '/assets' . $value;
    }
    return $value;
}

function fz_site_hosts()
{
    $hosts = ['foojanzeine.com', 'www.foojanzeine.com'];
    if (wp_get_environment_type() === 'local') {
        $hosts[] = 'localhost';
    }
    $home = wp_parse_url(home_url(), PHP_URL_HOST);
    if ($home) {
        $hosts[] = $home;
    }
    return $hosts;
}

function fz_href($href)
{
    $href = trim((string) $href);
    if ($href === '' || $href === '#') {
        return '#';
    }
    if (str_starts_with($href, '#')) {
        return is_front_page() ? $href : home_url('/') . $href;
    }
    if (str_starts_with($href, '/')) {
        return home_url($href);
    }
    $parts = wp_parse_url($href);
    if (!empty($parts['host']) && in_array(strtolower($parts['host']), fz_site_hosts(), true)) {
        $path = ($parts['path'] ?? '/') . (isset($parts['query']) ? '?' . $parts['query'] : '') . (isset($parts['fragment']) ? '#' . $parts['fragment'] : '');
        return home_url($path);
    }
    return $href;
}

function fz_is_external($href)
{
    $href = trim((string) $href);
    if (!preg_match('#^https?://#i', $href)) {
        return false;
    }
    $host = strtolower((string) wp_parse_url($href, PHP_URL_HOST));
    return !in_array($host, fz_site_hosts(), true);
}

function fz_link($href, $class = '', $extra = '')
{
    $attrs = ' href="' . esc_url(fz_href($href)) . '"';
    if ($class !== '') {
        $attrs .= ' class="' . esc_attr($class) . '"';
    }
    if (fz_is_external($href)) {
        $attrs .= ' target="_blank" rel="noopener noreferrer"';
    }
    return $attrs . ($extra !== '' ? ' ' . $extra : '');
}
