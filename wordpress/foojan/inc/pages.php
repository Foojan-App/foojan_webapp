<?php

function fz_pages()
{
    return [
        'therapy' => ['label' => 'Therapy & Coaching', 'slug' => 'empowering-you'],
        'conversations' => ['label' => 'Conversations & Interviews', 'slug' => 'conversations-interviews'],
        'research' => ['label' => 'Research Publications', 'slug' => 'publications-journals'],
    ];
}

function fz_local_link($href, $class = '', $extra = '')
{
    $href = trim((string) $href);
    if (str_starts_with($href, '#') && $href !== '#contact') {
        $attrs = ' href="' . esc_attr($href) . '"';
        if ($class !== '') {
            $attrs .= ' class="' . esc_attr($class) . '"';
        }
        return $attrs . ($extra !== '' ? ' ' . $extra : '');
    }
    return fz_link($href, $class, $extra);
}

function fz_label_arrow($label)
{
    $label = preg_replace('/\s*[↗↘→↓↑]$/u', '', trim((string) $label));
    return [$label, '<span class="grid h-7 w-[16.08px] shrink-0 place-items-center transition-transform duration-300 group-hover:translate-x-1.5">' . fz_icon('arrow-up-right-bold') . '</span>'];
}

function fz_button($label, $href, $class)
{
    [$label, $icon] = fz_label_arrow($label);
    if ($label === '') {
        return '';
    }
    return '<a' . fz_local_link($href, $class) . '><span class="whitespace-nowrap">' . esc_html($label) . '</span>' . $icon . '</a>';
}

function fz_em($text, $class)
{
    $parts = preg_split('/(\*[^*]+\*)/', (string) $text, -1, PREG_SPLIT_DELIM_CAPTURE);
    $out = '';
    foreach ($parts as $part) {
        if (strlen($part) > 2 && str_starts_with($part, '*') && str_ends_with($part, '*')) {
            $out .= '<em class="' . esc_attr($class) . '">' . esc_html(substr($part, 1, -1)) . '</em>';
        } else {
            $out .= esc_html($part);
        }
    }
    return $out;
}

function fz_text_link($label, $href)
{
    [$label, $icon] = fz_label_arrow($label);
    if ($label === '' || trim((string) $href) === '') {
        return '';
    }
    return '<a' . fz_local_link($href, 'group mt-auto inline-flex items-center gap-3 self-start border-b border-[#BD9040] pb-2.5 text-[12px] leading-4 font-bold tracking-[1px] text-navy uppercase') . '><span>' . esc_html($label) . '</span>' . $icon . '</a>';
}
