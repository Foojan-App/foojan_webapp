<?php

function fz_ui($name)
{
    $kicker_type = 'text-[11px] leading-3.5 font-bold tracking-[3px] uppercase';
    $h2_type = 'mt-4.5 font-playfair text-[44px] leading-[1.15] font-normal tracking-[-0.04em]';
    $btn = 'group inline-flex h-16.25 items-center justify-center gap-2.25 border px-6 text-[12px] leading-4 font-bold tracking-[1px] uppercase transition';
    $ui = [
        'container' => 'mx-auto w-full max-w-370 px-5.5 lg:px-[79px]',
        'section' => '@container scroll-mt-[77px] py-16.25 font-dm leading-[normal] text-ink-blue lg:scroll-mt-24 lg:py-27.5',
        'kicker_type' => $kicker_type,
        'kicker' => $kicker_type . ' text-[#815F37]',
        'h2_type' => $h2_type,
        'h2_size' => 'lg:text-[clamp(44px,5.4cqw,77.76px)]',
        'gold' => 'text-[#956C4A]',
        'paragraph' => 'text-[15px] leading-[26px] text-[#494650] lg:text-[17px] lg:leading-[29px]',
        'small' => 'text-[15px] leading-[1.62] text-[#56515C]',
        'btn' => $btn,
        'dark' => $btn . ' border-navy bg-navy text-white hover:bg-[#234b84]',
        'outline' => $btn . ' border-navy text-navy hover:bg-[#f4e9d8]',
        'light' => $btn . ' border-[#E4C38A] bg-[#E4C38A] text-navy hover:brightness-105',
    ];
    return $ui[$name] ?? '';
}

function fz_bg($name)
{
    return [
        'paper' => 'bg-paper',
        'blush' => 'bg-[#EDE6E4]',
        'white' => 'bg-white',
        'lavender' => 'bg-[#F3ECF3]',
    ][$name] ?? 'bg-paper';
}

function fz_lines($text, $class)
{
    return implode('<br>', array_map(fn($line) => fz_em($line, $class), preg_split('/\r?\n/', (string) $text)));
}

function fz_section_attrs($c, $class)
{
    $id = trim((string) ($c['anchor'] ?? ''), "# \t");
    return ($id !== '' ? ' id="' . esc_attr($id) . '"' : '') . ' class="' . esc_attr($class) . '"';
}

function fz_section_heading($c, $center = true)
{
    if (trim($c['kicker'] . $c['heading'] . $c['text']) === '') {
        return '';
    }
    $out = '<div class="reveal ' . ($center ? 'mx-auto max-w-275 text-center' : '') . '">';
    if ($c['kicker'] !== '') {
        $out .= '<p class="' . fz_ui('kicker') . '">' . esc_html($c['kicker']) . '</p>';
    }
    if ($c['heading'] !== '') {
        $out .= '<h2 class="' . fz_ui('h2_type') . ' text-[#19243E] ' . fz_ui('h2_size') . '">' . fz_lines($c['heading'], fz_ui('gold')) . '</h2>';
    }
    if ($c['text'] !== '') {
        $out .= '<p class="mt-4.5 max-w-170 ' . ($center ? 'mx-auto ' : '') . fz_ui('paragraph') . '">' . esc_html($c['text']) . '</p>';
    }
    return $out . '</div>';
}

function fz_section_common()
{
    return [
        fz_f_toggle('visible', 'Show this section', 'Turn off to hide this section without deleting it.'),
    ];
}

function fz_section_place($background = true)
{
    $fields = [fz_f_text('anchor', 'Section ID', 'Optional. Lets buttons link here, e.g. pathways makes #pathways work.')];
    if ($background) {
        $fields[] = fz_f_select('background', 'Background', ['paper' => 'Cream', 'blush' => 'Blush', 'white' => 'White', 'lavender' => 'Lavender']);
    }
    return $fields;
}

function fz_section_head_fields()
{
    return [
        fz_f_text('kicker', 'Small line above the heading'),
        fz_f_area('heading', 'Heading', 'Press Enter for a new line. Wrap words in *single stars* for the gold italic part.'),
        fz_f_area('text', 'Paragraph'),
    ];
}

function fz_sections()
{
    static $sections = null;
    if ($sections !== null) {
        return $sections;
    }
    $arrow = 'The arrow is added automatically.';
    $link = 'Use #section-id for a section on this page, #contact for the Invite form, /page/ or a full https:// link.';
    $button = fn($name, $label) => fz_f_group($name, $label, [fz_f_text('label', 'Button text', $arrow), fz_f_link('href', 'Link', $link)]);
    $home = fz_schema();

    $sections = [
        'hero' => [
            'label' => 'Hero',
            'fields' => [
                fz_f_tab('Text'),
                fz_f_text('kicker', 'Small line above the heading'),
                fz_f_text('heading', 'Heading (first line)'),
                fz_f_text('heading_accent', 'Heading (italic second line)'),
                fz_f_toggle('long_heading', 'Long heading', 'Turn on when the heading is too long for one line.'),
                fz_f_area('paragraph', 'Paragraph'),
                fz_f_tab('Buttons'),
                fz_f_text('primary_button_label', 'Dark button text', $arrow),
                fz_f_link('primary_button_href', 'Dark button link', $link),
                fz_f_text('secondary_button_label', 'Outline button text', $arrow),
                fz_f_link('secondary_button_href', 'Outline button link', $link),
                fz_f_text('stat_number', 'Number under the buttons', 'Optional, e.g. 25+'),
                fz_f_text('stat_label', 'Text next to the number'),
                fz_f_text('stat_note', 'Small line under it'),
                fz_f_tab('Right side'),
                fz_f_select('style', 'Right side shows', ['photo' => 'Photo', 'card' => 'Navy card with title']),
                fz_f_image('image_url', 'Photo'),
                fz_f_text('image_alt', 'Photo description (for screen readers)'),
                fz_f_text('vertical_text', 'Vertical text on the photo'),
                fz_f_text('caption', 'Caption on the photo'),
                fz_f_text('art_kicker', 'Card: small line at the top'),
                fz_f_area('art_heading', 'Card: heading', 'Press Enter for a new line. Wrap words in *single stars* for the gold italic part.'),
                fz_f_area('art_footer', 'Card: bottom text', 'Press Enter for a new line.'),
            ],
        ],
        'ticker' => [
            'label' => 'Scrolling strip',
            'fields' => [fz_f_texts('items', 'Words', 'Word', 'A ✦ is added between the words.')],
        ],
        'cards' => [
            'label' => 'Cards (2 columns)',
            'fields' => array_merge(fz_section_place(), fz_section_head_fields(), [
                fz_f_list('cards', 'Cards', 'Card', [
                    fz_f_text('number', 'Small italic line', 'For example: 01 / Heal & reconnect'),
                    fz_f_text('title', 'Title'),
                    fz_f_area('text', 'Paragraph'),
                    fz_f_texts('points', 'Points', 'Point'),
                    $button('button', 'Button'),
                    fz_f_toggle('soft', 'Tinted card with outline button', 'Off = white card with dark button.'),
                ]),
            ]),
        ],
        'split' => [
            'label' => 'Text with graphic',
            'fields' => array_merge(fz_section_place(), [
                fz_f_text('caption', 'Small line under the graphic'),
                fz_f_text('kicker', 'Small line above the heading'),
                fz_f_area('heading', 'Heading', 'Press Enter for a new line. Wrap words in *single stars* for the gold italic part.'),
                fz_f_texts('paragraphs', 'Paragraphs', 'Paragraph'),
                $button('button', 'Button'),
            ]),
        ],
        'boxes' => [
            'label' => 'Icon boxes',
            'fields' => array_merge(fz_section_place(), fz_section_head_fields(), [
                fz_f_list('boxes', 'Boxes', 'Box', [
                    fz_f_select('icon', 'Icon', ['growth-wave' => 'Waves', 'growth-rings' => 'Two circles', 'growth-target' => 'Target', 'growth-arrow' => 'Arrow up']),
                    fz_f_text('title', 'Title'),
                    fz_f_area('text', 'Text'),
                ]),
            ]),
        ],
        'featured' => [
            'label' => 'Featured cards (3 columns)',
            'fields' => array_merge(fz_section_place(), fz_section_head_fields(), [
                fz_f_text('link_label', 'Link text on every card', $arrow),
                fz_f_list('items', 'Cards', 'Card', [
                    fz_f_text('label', 'Word on the coloured box'),
                    fz_f_text('title', 'Title'),
                    fz_f_text('text', 'Show or host'),
                    fz_f_link('href', 'Link', 'Full https:// link.'),
                ]),
            ]),
        ],
        'library' => [
            'label' => 'Searchable list (interviews)',
            'fields' => array_merge(fz_section_place(), fz_section_head_fields(), [
                fz_f_text('all_label', 'Name of the "all topics" button'),
                fz_f_text('search_label', 'Search box placeholder'),
                fz_f_text('empty_label', 'Message when nothing matches'),
                fz_f_text('count_label', 'Word after the count', 'For example: conversations'),
                fz_f_text('link_label', 'Link text on every card', $arrow),
                fz_f_list('items', 'Items', 'Item', [
                    fz_f_text('topic', 'Topic', 'Items with the same topic share one filter button.'),
                    fz_f_text('title', 'Title'),
                    fz_f_text('text', 'Show or host'),
                    fz_f_link('href', 'Link', 'Full https:// link.'),
                ], 'Numbered automatically in this order.'),
            ]),
        ],
        'papers' => [
            'label' => 'Research papers',
            'fields' => array_merge(fz_section_place(), fz_section_head_fields(), [
                fz_f_list('papers', 'Papers', 'Paper', [
                    fz_f_list('lines', 'Text above the viewer', 'Line', [
                        fz_f_area('text', 'Line'),
                        fz_f_toggle('small', 'Smaller grey text', 'Off = large serif line (title, authors). On = small line (affiliation, notes).'),
                    ]),
                    fz_f_number('book', 'dFlip book ID', 'The ID from dFlip Books. Leave empty to hide the viewer.'),
                ], 'Shown in this order.'),
            ]),
        ],
        'cta' => [
            'label' => 'Navy call to action',
            'fields' => array_merge(fz_section_place(false), [
                fz_f_text('kicker', 'Small line above the heading'),
                fz_f_area('heading', 'Heading', 'Press Enter for a new line. Wrap words in *single stars* for the gold italic part.'),
                fz_f_area('text', 'Paragraph'),
                $button('button', 'Button'),
            ]),
        ],
        'note' => [
            'label' => 'Small note line',
            'fields' => [fz_f_text('left', 'Left text'), fz_f_text('right', 'Right text')],
        ],
    ];
    foreach (fz_home_sections() as $key) {
        $sections['home_' . $key] = ['label' => 'Homepage: ' . $home[$key]['title'], 'fields' => $home[$key]['fields'], 'part' => 'home/' . $key];
    }
    foreach ($sections as $key => $section) {
        $sections[$key]['fields'] = array_merge(fz_section_common(), $section['fields']);
        $sections[$key]['part'] = $section['part'] ?? 'sections/' . $key;
    }
    return $sections;
}

function fz_home_sections()
{
    return ['award', 'about', 'ait', 'speaking', 'publications', 'media', 'quote', 'mira'];
}

function fz_sections_template()
{
    return 'template-sections.php';
}

function fz_sections_field_key()
{
    return fz_acf_key('sections');
}

function fz_home_rows()
{
    $rows = [];
    foreach (['hero', 'award', 'ticker', 'about', 'ait', 'speaking', 'publications', 'media', 'quote', 'mira'] as $key) {
        if ($key === 'hero') {
            $rows[] = array_merge(fz_content('hero'), ['acf_fc_layout' => 'hero', 'visible' => true, 'style' => 'photo', 'long_heading' => false]);
        } elseif ($key === 'ticker') {
            $rows[] = ['acf_fc_layout' => 'ticker', 'visible' => true, 'items' => fz_content('ticker')['items'] ?? []];
        } else {
            $rows[] = array_merge(fz_content($key), ['acf_fc_layout' => 'home_' . $key, 'visible' => true]);
        }
    }
    return $rows;
}

function fz_default_rows($post_id)
{
    if ((int) $post_id === (int) get_option('page_on_front')) {
        return fz_home_rows();
    }
    $slug = get_post_field('post_name', $post_id);
    foreach (fz_pages() as $key => $page) {
        if ($page['slug'] === $slug) {
            return fz_defaults()['sections'][$key] ?? [];
        }
    }
    return [];
}

function fz_section_rows($post_id)
{
    $sections = fz_sections();
    if (function_exists('get_field') && metadata_exists('post', $post_id, 'sections')) {
        $raw = get_field(fz_sections_field_key(), $post_id) ?: [];
    } else {
        $raw = fz_default_rows($post_id);
    }
    $rows = [];
    foreach ((array) $raw as $row) {
        $layout = $row['acf_fc_layout'] ?? '';
        if (!isset($sections[$layout])) {
            continue;
        }
        $content = fz_normalize($sections[$layout]['fields'], $row);
        if (!$content['visible']) {
            continue;
        }
        $rows[] = ['layout' => $layout, 'content' => $content];
    }
    return $rows;
}

function fz_render_sections($post_id)
{
    foreach (fz_section_rows($post_id) as $index => $row) {
        $part = fz_sections()[$row['layout']]['part'];
        $args = ['content' => $row['content'], 'index' => $index];
        if ($row['layout'] === 'papers') {
            fz_part($part, $args);
            continue;
        }
        echo '<div class="fz">';
        fz_part($part, $args);
        echo '</div>';
    }
}

add_filter('theme_page_templates', function ($templates) {
    $templates[fz_sections_template()] = 'Foojan sections';
    return $templates;
});
