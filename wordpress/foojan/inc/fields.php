<?php

function fz_acf_key($path)
{
    return 'field_fz_' . substr(md5($path), 0, 13);
}

function fz_acf_fields($fields, $path, $prefix = '')
{
    $out = [];
    foreach ($fields as $index => $field) {
        if ($field['type'] === 'tab') {
            $out[] = [
                'key' => fz_acf_key($path . '/tab-' . $index),
                'label' => $field['label'],
                'name' => '',
                'type' => 'tab',
                'placement' => 'top',
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
                    'sub_fields' => fz_acf_fields($field['fields'], $key_path),
                ];
                break;
            case 'list':
                $sub_fields = fz_acf_fields($field['fields'], $key_path);
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
        acf_add_options_sub_page([
            'page_title' => $config['title'],
            'menu_title' => $config['title'],
            'menu_slug' => $slug,
            'parent_slug' => 'fz-content',
            'capability' => 'edit_pages',
            'update_button' => 'Update',
            'updated_message' => 'Saved. The website is updated.',
        ]);
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
