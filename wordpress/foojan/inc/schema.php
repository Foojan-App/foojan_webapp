<?php

function fz_f_text($name, $label, $help = '')
{
    return ['name' => $name, 'label' => $label, 'type' => 'text', 'help' => $help];
}

function fz_f_area($name, $label, $help = '')
{
    return ['name' => $name, 'label' => $label, 'type' => 'textarea', 'help' => $help];
}

function fz_f_link($name, $label, $help = '')
{
    if ($help === '') {
        $help = 'Use #section for homepage sections (e.g. #about), /page/ for site pages, or a full https:// link.';
    }
    return ['name' => $name, 'label' => $label, 'type' => 'link', 'help' => $help];
}

function fz_f_image($name, $label, $help = '')
{
    return ['name' => $name, 'label' => $label, 'type' => 'image', 'help' => $help];
}

function fz_f_number($name, $label, $help = '')
{
    return ['name' => $name, 'label' => $label, 'type' => 'number', 'help' => $help];
}

function fz_f_toggle($name, $label, $help = '')
{
    return ['name' => $name, 'label' => $label, 'type' => 'toggle', 'help' => $help];
}

function fz_f_texts($name, $label, $item, $help = '')
{
    return ['name' => $name, 'label' => $label, 'type' => 'texts', 'item' => $item, 'help' => $help];
}

function fz_f_group($name, $label, $fields)
{
    return ['name' => $name, 'label' => $label, 'type' => 'group', 'fields' => $fields];
}

function fz_f_list($name, $label, $item, $fields, $help = '')
{
    return ['name' => $name, 'label' => $label, 'type' => 'list', 'item' => $item, 'fields' => $fields, 'help' => $help];
}

function fz_f_select($name, $label, $choices, $help = '')
{
    return ['name' => $name, 'label' => $label, 'type' => 'select', 'choices' => $choices, 'help' => $help];
}

function fz_f_tab($label)
{
    return ['name' => '', 'label' => $label, 'type' => 'tab'];
}

function fz_f_button($name, $label)
{
    return fz_f_group($name, $label, [fz_f_text('label', 'Button text'), fz_f_link('href', 'Link')]);
}

function fz_f_heading($prefix = '')
{
    return [
        fz_f_text($prefix . 'kicker', 'Small line above the heading'),
        fz_f_text($prefix . 'heading', 'Heading'),
        fz_f_text($prefix . 'heading_accent', 'Heading (italic part)', 'Shown in the coloured italic style after the heading.'),
    ];
}

function fz_schema()
{
    $link_fields = [fz_f_text('label', 'Label'), fz_f_link('href', 'Link')];

    return [
        'header' => [
            'title' => 'Header & Menu',
            'description' => 'Top menu and dropdown links.',
            'fields' => [
                fz_f_list('menu', 'Menu items', 'Menu item', [
                    fz_f_text('label', 'Label'),
                    fz_f_link('href', 'Link'),
                    fz_f_toggle('visible', 'Show on website'),
                    fz_f_list('children', 'Dropdown links', 'Dropdown link', $link_fields),
                ]),
            ],
        ],
        'hero' => [
            'title' => 'Hero',
            'description' => 'Main heading, buttons and portrait.',
            'fields' => [
                fz_f_tab('Text'),
                fz_f_text('kicker', 'Small line above the heading'),
                fz_f_text('heading', 'Heading (first line)'),
                fz_f_text('heading_accent', 'Heading (italic second line)'),
                fz_f_area('paragraph', 'Paragraph'),
                fz_f_tab('Buttons'),
                fz_f_text('primary_button_label', 'Dark button text'),
                fz_f_link('primary_button_href', 'Dark button link'),
                fz_f_text('secondary_button_label', 'Outline button text'),
                fz_f_link('secondary_button_href', 'Outline button link'),
                fz_f_tab('Portrait'),
                fz_f_image('image_url', 'Photo'),
                fz_f_text('image_alt', 'Photo description (for screen readers)'),
                fz_f_text('vertical_text', 'Vertical text on the photo'),
                fz_f_text('caption', 'Caption on the photo'),
            ],
        ],
        'award' => [
            'title' => 'Award',
            'description' => 'The AAMFT award section under the hero.',
            'fields' => [
                fz_f_tab('Text'),
                ...fz_f_heading(),
                fz_f_text('award_name', 'Award name (first line)'),
                fz_f_text('award_name_line2', 'Award name (second line)'),
                fz_f_texts('paragraphs', 'Paragraphs', 'Paragraph'),
                fz_f_tab('Photo'),
                fz_f_image('image_url', 'Award photo'),
                fz_f_text('image_alt', 'Photo description (for screen readers)'),
            ],
        ],
        'ticker' => [
            'title' => 'Ticker',
            'description' => 'The moving navy strip under the award section.',
            'fields' => [fz_f_texts('items', 'Words', 'Word')],
        ],
        'about' => [
            'title' => 'About',
            'description' => 'Understanding the mind, text and the 4 boxes.',
            'fields' => [
                fz_f_tab('Text'),
                ...fz_f_heading(),
                fz_f_texts('paragraphs', 'Paragraphs', 'Paragraph', 'Wrap words in **double stars** to make them bold.'),
                fz_f_button('link', 'Link under the text'),
                fz_f_tab('Boxes'),
                fz_f_list('proof', 'Boxes', 'Box', [fz_f_text('title', 'Title'), fz_f_text('label', 'Small line')]),
            ],
        ],
        'ait' => [
            'title' => 'AIT',
            'description' => 'Awareness Integration Theory and its 6 steps.',
            'fields' => [
                fz_f_tab('Text'),
                ...fz_f_heading(),
                fz_f_texts('paragraphs', 'Paragraphs', 'Paragraph'),
                fz_f_button('button', 'Gold button'),
                fz_f_tab('Steps'),
                fz_f_list('steps', 'Steps', 'Step', [
                    fz_f_text('number', 'Number'),
                    fz_f_text('eyebrow', 'Small line'),
                    fz_f_text('title', 'Title'),
                    fz_f_area('text', 'Text'),
                ]),
                fz_f_area('caption', 'Caption under the steps'),
            ],
        ],
        'speaking' => [
            'title' => 'Speaking',
            'description' => 'Speaking heading, photo card and inquiry link.',
            'fields' => [
                fz_f_tab('Heading'),
                ...fz_f_heading(),
                fz_f_area('paragraph', 'Paragraph'),
                fz_f_tab('Photo card'),
                fz_f_image('image_url', 'Photo'),
                fz_f_text('image_alt', 'Photo description (for screen readers)'),
                fz_f_link('card_href', 'Card link', '#contact opens the Invite Dr. Foojan form.'),
                fz_f_text('card_label', 'Label at the top'),
                fz_f_text('card_heading', 'Heading (first line)'),
                fz_f_text('card_heading_line2', 'Heading (second line)'),
                fz_f_text('card_heading_accent', 'Heading (italic end of second line)'),
                fz_f_area('card_text', 'Text'),
                fz_f_text('card_hook', 'Gold line'),
                fz_f_tab('Under the card'),
                fz_f_area('footer_text', 'Text'),
                fz_f_button('footer_link', 'Link'),
            ],
        ],
        'publications' => [
            'title' => 'Books & Research',
            'description' => 'Heading, the 2 panels, books and the note.',
            'fields' => [
                fz_f_tab('Heading'),
                ...fz_f_heading(),
                fz_f_area('paragraph', 'Paragraph'),
                fz_f_tab('Panels'),
                fz_f_list('panels', 'Panels', 'Panel', [
                    fz_f_text('index', 'Small line'),
                    fz_f_text('title', 'Title'),
                    fz_f_area('text', 'Text'),
                    fz_f_button('link', 'Link'),
                ]),
                fz_f_tab('Books'),
                fz_f_list('books', 'Books', 'Book', [
                    fz_f_image('cover_url', 'Cover'),
                    fz_f_text('category', 'Small line'),
                    fz_f_text('title', 'Title'),
                    fz_f_area('description', 'Text'),
                    fz_f_link('link', 'Link'),
                ]),
                fz_f_area('note', 'Note under the books'),
            ],
        ],
        'media' => [
            'title' => 'Media',
            'description' => 'Media Library, Inner Voice podcast, YouTube and Substack.',
            'fields' => [
                fz_f_tab('Media Library'),
                ...fz_f_heading(),
                fz_f_area('paragraph', 'Paragraph'),
                fz_f_list('tabs', 'Tabs', 'Tab', $link_fields),
                fz_f_tab('Inner Voice podcast'),
                ...fz_f_heading('podcast_'),
                fz_f_area('podcast_text', 'Text'),
                fz_f_button('podcast_primary', 'Light button'),
                fz_f_list('podcast_links', 'Podcast links', 'Podcast link', $link_fields),
                fz_f_image('podcast_image_url', 'Cover image'),
                fz_f_text('podcast_image_alt', 'Cover description (for screen readers)'),
                fz_f_area('podcast_note', 'Note at the bottom'),
                fz_f_tab('YouTube'),
                ...fz_f_heading('youtube_'),
                fz_f_area('youtube_text', 'Text next to the heading'),
                fz_f_link('youtube_href', 'YouTube channel link'),
                fz_f_text('youtube_eyebrow', 'Card: small line'),
                fz_f_text('youtube_title', 'Card: title'),
                fz_f_area('youtube_card_text', 'Card: text'),
                fz_f_text('youtube_cta', 'Card: link text'),
                fz_f_text('youtube_mark', 'Card: text under the logo'),
                fz_f_tab('Substack'),
                ...fz_f_heading('substack_'),
                fz_f_area('substack_text', 'Text'),
                fz_f_link('substack_href', 'Substack link'),
                fz_f_text('substack_link_label', 'Link text'),
                fz_f_text('substack_name', 'Big word in the right box'),
                fz_f_text('substack_byline', 'Small line under it'),
            ],
        ],
        'quote' => [
            'title' => 'Quote',
            'description' => 'The quote in the purple band.',
            'fields' => [
                fz_f_text('kicker', 'Small line above'),
                fz_f_area('quote', 'Quote'),
                fz_f_text('author', 'Name under the quote'),
            ],
        ],
        'mira' => [
            'title' => 'Foojan App & Mira',
            'description' => 'Heading, the 2 product cards, store buttons and the note.',
            'fields' => [
                fz_f_tab('Heading'),
                ...fz_f_heading(),
                fz_f_area('paragraph', 'Paragraph'),
                fz_f_tab('Cards'),
                fz_f_list('products', 'Cards', 'Card', [
                    fz_f_image('image_url', 'Phone image'),
                    fz_f_text('image_alt', 'Image description (for screen readers)'),
                    fz_f_text('kicker', 'Small line'),
                    fz_f_text('title', 'Title (first line)'),
                    fz_f_text('title_line2', 'Title (second line)'),
                    fz_f_texts('paragraphs', 'Paragraphs', 'Paragraph'),
                    fz_f_area('highlight', 'Bold line'),
                    fz_f_button('link', 'Link'),
                    fz_f_number('link_text_width', 'Link text width (px, from the design)'),
                ]),
                fz_f_tab('Store buttons'),
                fz_f_list('store_links', 'App store buttons', 'App store button', $link_fields, 'Name must be App Store or Google Play to show its logo.'),
                fz_f_area('note', 'Note under the cards'),
            ],
        ],
        'invite' => [
            'title' => 'Invite Form',
            'description' => 'The Invite Dr. Foojan speaking inquiry popup.',
            'fields' => [
                ...fz_f_heading(),
                fz_f_area('paragraph', 'Paragraph'),
                fz_f_text('form_title', 'Form title'),
                fz_f_text('submit_label', 'Send button text'),
                fz_f_text('send_to', 'Send inquiries to (email)', 'Every inquiry is also saved under Inquiries in the admin menu.'),
            ],
        ],
        'footer' => [
            'title' => 'Footer',
            'description' => 'Tagline, Explore links, Stay connected and copyright.',
            'fields' => [
                fz_f_text('tagline', 'Line under the logo'),
                fz_f_text('explore_title', 'Explore heading'),
                fz_f_list('explore_links', 'Explore links', 'Link', $link_fields),
                fz_f_text('connect_title', 'Stay connected heading'),
                fz_f_area('connect_text', 'Stay connected text'),
                fz_f_button('connect_link', 'Stay connected link'),
                fz_f_list('social_links', 'Social links', 'Social link', $link_fields, 'Name must be X, Facebook, LinkedIn or Instagram to show its icon.'),
                fz_f_text('copyright', 'Copyright line'),
                fz_f_list('legal_links', 'Bottom links', 'Link', $link_fields, 'Small links next to the copyright, e.g. Privacy Policy and Terms.'),
                fz_f_area('note', 'Note at the bottom right'),
            ],
        ],
    ];
}

function fz_meet_schema()
{
    return [
        fz_f_tab('Top'),
        fz_f_text('eyebrow', 'Small line above the heading'),
        fz_f_text('heading', 'Heading', 'Wrap words in *single stars* for the coloured part.'),
        fz_f_text('subtitle', 'Line under the heading'),
        fz_f_area('intro', 'Intro paragraph'),
        fz_f_image('image_url', 'Photo'),
        fz_f_tab('Biography'),
        ['name' => 'body', 'label' => 'Biography', 'type' => 'wysiwyg', 'help' => ''],
        fz_f_tab('At a glance'),
        fz_f_text('highlights_title', 'Heading of the side boxes'),
        fz_f_list('highlights', 'Boxes', 'Box', [
            fz_f_text('title', 'Title'),
            fz_f_area('items', 'Lines', 'One line per point.'),
        ]),
        fz_f_tab('Bottom banner'),
        fz_f_text('cta_heading', 'Heading', 'Wrap words in *single stars* for the gold part.'),
        fz_f_area('cta_paragraph', 'Text'),
        fz_f_text('cta_button_label', 'Button text'),
        fz_f_link('cta_button_href', 'Button link', '#contact opens the Invite Dr. Foojan form.'),
    ];
}

function fz_legal_schema()
{
    return [
        ['name' => 'body', 'label' => 'Page text', 'type' => 'wysiwyg', 'help' => ''],
    ];
}
