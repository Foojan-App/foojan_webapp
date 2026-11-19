<?php

function fz_acf_key($path)
{
    return 'field_fz_' . substr(md5($path), 0, 13);
}

function fz_acf_fields($fields, $path, $prefix = '', $accordion = false)
{
    $out = [];
    foreach ($fields as $index => $field) {
        if ($field['type'] === 'tab') {
            $out[] = [
                'key' => fz_acf_key($path . '/tab-' . $index),
                'label' => $field['label'],
                'name' => '',
                'type' => $accordion ? 'accordion' : 'tab',
                'placement' => 'top',
                'open' => 0,
                'multi_expand' => 1,
                'endpoint' => 0,
            ];
            continue;
        }
        $name = $prefix . $field['name'];
        $key_path = $path . '/' . $field['name'];
        $base = [
            'key' => fz_acf_key($key_path),
            'label' => $field['label'],
            'name' => $name,
            'instructions' => $field['help'] ?? '',
        ];
        switch ($field['type']) {
            case 'textarea':
                $out[] = $base + ['type' => 'textarea', 'rows' => 3, 'new_lines' => ''];
                break;
            case 'link':
                $out[] = $base + ['type' => 'text', 'placeholder' => '#about, /page/ or https://'];
                break;
            case 'image':
                $out[] = $base + ['type' => 'image', 'return_format' => 'id', 'preview_size' => 'medium', 'library' => 'all'];
                break;
            case 'number':
                $out[] = $base + ['type' => 'number'];
                break;
            case 'toggle':
                $out[] = $base + ['type' => 'true_false', 'ui' => 1, 'default_value' => 1];
                break;
            case 'select':
                $out[] = $base + ['type' => 'select', 'choices' => $field['choices'], 'return_format' => 'value', 'ui' => 0];
                break;
            case 'wysiwyg':
                $out[] = $base + ['type' => 'wysiwyg', 'tabs' => 'all', 'toolbar' => 'full', 'media_upload' => 0];
                break;
            case 'texts':
                $sub_key = fz_acf_key($key_path . '/text');
                $out[] = $base + [
                    'type' => 'repeater',
                    'layout' => 'table',
                    'button_label' => 'Add ' . strtolower($field['item']),
                    'collapsed' => '',
                    'sub_fields' => [[
                        'key' => $sub_key,
                        'label' => $field['item'],
                        'name' => 'text',
                        'type' => 'textarea',
                        'rows' => 2,
                        'new_lines' => '',
                    ]],
                ];
                break;
            case 'group':
                $out[] = $base + [
                    'type' => 'group',
                    'layout' => 'block',
                    'sub_fields' => fz_acf_fields($field['fields'], $key_path, '', $accordion),
                ];
                break;
            case 'list':
                $sub_fields = fz_acf_fields($field['fields'], $key_path, '', $accordion);
                $out[] = $base + [
                    'type' => 'repeater',
                    'layout' => 'block',
                    'button_label' => 'Add ' . strtolower($field['item']),
                    'collapsed' => $sub_fields[0]['key'] ?? '',
                    'sub_fields' => $sub_fields,
                ];
                break;
            default:
                $out[] = $base + ['type' => 'text'];
        }
    }
    return $out;
}

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page') || !function_exists('acf_add_local_field_group')) {
        return;
    }

    acf_add_options_page([
        'page_title' => 'Site Content',
        'menu_title' => 'Site Content',
        'menu_slug' => 'fz-content',
        'capability' => 'edit_pages',
        'icon_url' => 'dashicons-edit-page',
        'position' => 3,
        'redirect' => true,
    ]);

    foreach (fz_schema() as $section => $config) {
        $slug = 'fz-content-' . $section;
        $in_builder = $section === 'hero' || $section === 'ticker' || in_array($section, fz_home_sections(), true);
        if (!$in_builder) {
            acf_add_options_sub_page([
                'page_title' => $config['title'],
                'menu_title' => $config['title'],
                'menu_slug' => $slug,
                'parent_slug' => 'fz-content',
                'capability' => 'edit_pages',
                'update_button' => 'Update',
                'updated_message' => 'Saved. The website is updated.',
            ]);
        }
        acf_add_local_field_group([
            'key' => 'group_fz_' . $section,
            'title' => $config['title'],
            'description' => $config['description'],
            'fields' => fz_acf_fields($config['fields'], $section, $section . '_'),
            'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => $slug]]],
            'style' => 'seamless',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
        ]);
    }

    acf_add_local_field_group([
        'key' => 'group_fz_meet',
        'title' => 'Meet Dr. Foojan page',
        'fields' => fz_acf_fields(fz_meet_schema(), 'meet', 'meet_'),
        'location' => [[['param' => 'page_template', 'operator' => '==', 'value' => 'template-meet.php']]],
        'style' => 'default',
        'position' => 'acf_after_title',
        'hide_on_screen' => ['the_content'],
    ]);

    $layouts = [];
    foreach (fz_sections() as $name => $section) {
        $layouts['layout_fz_' . $name] = [
            'key' => 'layout_fz_' . $name,
            'name' => $name,
            'label' => $section['label'],
            'display' => 'block',
            'sub_fields' => fz_acf_fields($section['fields'], 'sections/' . $name, '', true),
        ];
    }
    acf_add_local_field_group([
        'key' => 'group_fz_sections',
        'title' => 'Page sections',
        'fields' => [[
            'key' => fz_sections_field_key(),
            'label' => 'Sections',
            'name' => 'sections',
            'type' => 'flexible_content',
            'instructions' => 'Add, remove, hide or drag sections to change the page. Click a section bar to open or close it.',
            'button_label' => 'Add section',
            'layouts' => $layouts,
        ]],
        'location' => [
            [['param' => 'page_template', 'operator' => '==', 'value' => fz_sections_template()]],
            [['param' => 'page_type', 'operator' => '==', 'value' => 'front_page']],
        ],
        'style' => 'default',
        'position' => 'acf_after_title',
        'hide_on_screen' => ['the_content'],
    ]);

    acf_add_local_field_group([
        'key' => 'group_fz_legal',
        'title' => 'Page text',
        'fields' => fz_acf_fields(fz_legal_schema(), 'legal', 'legal_'),
        'location' => [[['param' => 'page_template', 'operator' => '==', 'value' => 'template-legal.php']]],
        'style' => 'default',
        'position' => 'acf_after_title',
        'hide_on_screen' => ['the_content'],
    ]);
});
