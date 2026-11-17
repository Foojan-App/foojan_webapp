<?php

function fz_icon($name, $class = '')
{
    static $cache = [];
    if (!isset($cache[$name])) {
        $file = FZ_DIR . '/assets/icons/' . sanitize_file_name($name) . '.svg';
        $cache[$name] = is_readable($file) ? trim((string) file_get_contents($file)) : '';
    }
    $svg = $cache[$name];
    if ($svg === '' || $class === '') {
        return $svg;
    }
    return preg_replace('/^<svg\b/', '<svg class="' . esc_attr($class) . '"', $svg, 1);
}

function fz_bold($text, $class = '')
{
    $parts = preg_split('/(\*\*[^*]+\*\*)/', (string) $text, -1, PREG_SPLIT_DELIM_CAPTURE);
    $out = '';
    foreach ($parts as $part) {
        if (strlen($part) > 4 && str_starts_with($part, '**') && str_ends_with($part, '**')) {
            $out .= '<strong' . ($class !== '' ? ' class="' . esc_attr($class) . '"' : '') . '>' . esc_html(substr($part, 2, -2)) . '</strong>';
        } else {
            $out .= esc_html($part);
        }
    }
    return $out;
}

function fz_accent_line($text)
{
    $parts = preg_split('/(\*\*[^*]+\*\*|\*[^*]+\*)/', (string) $text, -1, PREG_SPLIT_DELIM_CAPTURE);
    $out = '';
    foreach ($parts as $part) {
        if (strlen($part) > 4 && str_starts_with($part, '**') && str_ends_with($part, '**')) {
            $out .= '<strong class="font-bold text-ink-blue">' . esc_html(substr($part, 2, -2)) . '</strong>';
        } elseif (strlen($part) > 2 && str_starts_with($part, '*') && str_ends_with($part, '*')) {
            $out .= '<span class="accent text-[#8B6A8D]">' . esc_html(substr($part, 1, -1)) . '</span>';
        } else {
            $out .= esc_html($part);
        }
    }
    return $out;
}

function fz_accent($text)
{
    $lines = preg_split('/\r?\n/', (string) $text);
    $html = [];
    foreach ($lines as $line) {
        $html[] = fz_accent_line($line);
    }
    return implode(' <br class="max-lg:hidden">', $html);
}

function fz_arrow_label($text)
{
    $text = (string) $text;
    if (!preg_match('/^([\s\S]*?)([↗↘→])\s*$/u', $text, $match)) {
        return esc_html($text);
    }
    return '<span>' . esc_html($match[1]) . '<span class="inline-block transition-transform duration-300 group-hover:translate-x-1">' . esc_html($match[2]) . '</span></span>';
}

function fz_part($name, $args = [])
{
    get_template_part('parts/' . $name, null, $args);
}
