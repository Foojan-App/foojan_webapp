<?php

add_action('init', function () {
    register_post_type('fz_inquiry', [
        'labels' => [
            'name' => 'Inquiries',
            'singular_name' => 'Inquiry',
            'menu_name' => 'Inquiries',
            'all_items' => 'All inquiries',
            'edit_item' => 'Inquiry',
            'search_items' => 'Search inquiries',
            'not_found' => 'No inquiries yet.',
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 4,
        'menu_icon' => 'dashicons-email-alt',
        'supports' => ['title'],
        'capability_type' => 'post',
        'capabilities' => ['create_posts' => 'do_not_allow'],
        'map_meta_cap' => true,
    ]);
});

function fz_inquiry_fields()
{
    return [
        'email' => 'Email',
        'phone' => 'Phone',
        'organization' => 'Organization',
        'event_date' => 'Event date',
        'details' => 'Event details',
    ];
}

add_action('add_meta_boxes_fz_inquiry', function () {
    add_meta_box('fz_inquiry_details', 'Details', function ($post) {
        echo '<table class="form-table"><tbody>';
        foreach (fz_inquiry_fields() as $key => $label) {
            $value = (string) get_post_meta($post->ID, '_fz_' . $key, true);
            if ($key === 'email' && $value !== '') {
                $value = '<a href="mailto:' . esc_attr($value) . '">' . esc_html($value) . '</a>';
            } else {
                $value = nl2br(esc_html($value !== '' ? $value : '—'));
            }
            echo '<tr><th scope="row">' . esc_html($label) . '</th><td>' . $value . '</td></tr>';
        }
        echo '<tr><th scope="row">Received</th><td>' . esc_html(get_the_date('F j, Y g:i a', $post)) . '</td></tr>';
        echo '</tbody></table>';
    }, 'fz_inquiry', 'normal', 'high');
});

add_filter('manage_fz_inquiry_posts_columns', function ($columns) {
    return [
        'cb' => $columns['cb'] ?? '',
        'title' => 'Name',
        'fz_email' => 'Email',
        'fz_organization' => 'Organization',
        'date' => 'Received',
    ];
});

add_action('manage_fz_inquiry_posts_custom_column', function ($column, $post_id) {
    if ($column === 'fz_email') {
        echo esc_html((string) get_post_meta($post_id, '_fz_email', true));
    }
    if ($column === 'fz_organization') {
        echo esc_html((string) get_post_meta($post_id, '_fz_organization', true) ?: '—');
    }
}, 10, 2);

function fz_mail_layout($body)
{
    $site = 'Dr. Foojan Zeine';
    $host = esc_html((string) wp_parse_url(home_url(), PHP_URL_HOST));
    return '<!doctype html><html><body style="margin:0;background:#FAF7F2;font-family:Arial,Helvetica,sans-serif;color:#17223C">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:32px 16px"><tr><td align="center">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-top:4px solid #13294F">'
        . '<tr><td style="padding:32px 32px 8px;font-family:Georgia,\'Times New Roman\',serif;font-size:22px;color:#13294F">' . $site . '</td></tr>'
        . '<tr><td style="padding:8px 32px 32px;font-size:15px;line-height:1.6">' . $body . '</td></tr>'
        . '</table><p style="font-size:12px;color:#77717A;margin:16px 0 0">' . $host . '</p>'
        . '</td></tr></table></body></html>';
}

function fz_mail_row($label, $value)
{
    return '<tr><td style="padding:8px 0;width:130px;vertical-align:top;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#815F37">'
        . esc_html($label) . '</td><td style="padding:8px 0;font-size:15px">' . ($value !== '' ? $value : '—') . '</td></tr>';
}

function fz_send_inquiry_emails($inquiry)
{
    $invite = fz_content('invite');
    $to = sanitize_email($invite['send_to'] ?? '') ?: 'foojanzeine@gmail.com';
    $name = $inquiry['name'];
    $email = $inquiry['email'];
    $message = 'Event date: ' . ($inquiry['event_date'] !== '' ? $inquiry['event_date'] : 'To be confirmed') . "\n\n" . $inquiry['details'];

    $details = '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">'
        . fz_mail_row('Name', esc_html($name))
        . fz_mail_row('Email', '<a href="mailto:' . esc_attr($email) . '" style="color:#13294F">' . esc_html($email) . '</a>')
        . fz_mail_row('Phone', esc_html($inquiry['phone']))
        . fz_mail_row('Organization', esc_html($inquiry['organization']))
        . '</table><p style="margin:24px 0 8px;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#815F37">Event details</p>'
        . '<p style="margin:0">' . nl2br(esc_html($message)) . '</p>';

    $html = ['Content-Type: text/html; charset=UTF-8'];

    wp_mail(
        $to,
        'New speaking inquiry from ' . $name,
        fz_mail_layout('<p style="margin:0 0 20px">A new speaking inquiry was sent from the website. Reply to this email to answer ' . esc_html($name) . ' directly.</p>' . $details),
        array_merge($html, ['Reply-To: ' . str_replace(["\r", "\n"], '', $name) . ' <' . $email . '>'])
    );

    wp_mail(
        $email,
        'Thank you for your inquiry – Dr. Foojan Zeine',
        fz_mail_layout(
            '<p style="margin:0 0 16px">Dear ' . esc_html($name) . ',</p>'
            . '<p style="margin:0 0 16px">Thank you for inviting Dr. Foojan Zeine. We have received your inquiry, and Dr. Foojan’s office will get back to you soon.</p>'
            . '<p style="margin:0 0 20px">Here is a copy of what you sent:</p>' . $details
            . '<p style="margin:28px 0 0">Warm regards,<br>The office of Dr. Foojan Zeine</p>'
        ),
        $html
    );
}

add_action('rest_api_init', function () {
    register_rest_route('fz/v1', '/inquiry', [
        'methods' => 'POST',
        'permission_callback' => '__return_true',
        'callback' => function (WP_REST_Request $request) {
            $thanks = new WP_REST_Response(['message' => 'Thank you. Your message has been sent.'], 200);
            $body = $request->get_json_params() ?: $request->get_body_params();
            $clean = fn($key) => trim(sanitize_textarea_field((string) ($body[$key] ?? '')));

            if ($clean('website') !== '') {
                return $thanks;
            }
            $started = (int) ($body['started_at'] ?? 0);
            if ($started <= 0 || (int) round(microtime(true) * 1000) - $started < 3000) {
                return $thanks;
            }

            $inquiry = [
                'name' => sanitize_text_field((string) ($body['name'] ?? '')),
                'email' => strtolower(sanitize_email((string) ($body['email'] ?? ''))),
                'phone' => sanitize_text_field((string) ($body['phone'] ?? '')),
                'organization' => sanitize_text_field((string) ($body['organization'] ?? '')),
                'event_date' => sanitize_text_field((string) ($body['date'] ?? '')),
                'details' => $clean('details'),
            ];

            $error = fn($message) => new WP_REST_Response(['message' => $message], 400);
            if ($inquiry['name'] === '' || strlen($inquiry['name']) > 120) {
                return $error('Please enter your name.');
            }
            if (!is_email($inquiry['email']) || strlen($inquiry['email']) > 200) {
                return $error('Please enter a valid email address.');
            }
            if (!preg_match('/^[+\d\s().-]{0,40}$/', $inquiry['phone'])) {
                return $error('Please enter a valid phone number.');
            }
            if (strlen($inquiry['organization']) > 200) {
                return $error('Organization name is too long.');
            }
            if ($inquiry['event_date'] !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $inquiry['event_date'])) {
                $inquiry['event_date'] = '';
            }
            if (strlen($inquiry['details']) < 10) {
                return $error('Please write a slightly longer message.');
            }
            if (strlen($inquiry['details']) > 4900) {
                return $error('Your message is too long. Please keep it under 4,900 characters.');
            }

            $id = wp_insert_post([
                'post_type' => 'fz_inquiry',
                'post_status' => 'private',
                'post_title' => $inquiry['name'],
            ], true);
            if (is_wp_error($id)) {
                return new WP_REST_Response(['message' => 'Your inquiry could not be sent. Please try again.'], 500);
            }
            foreach (fz_inquiry_fields() as $key => $label) {
                update_post_meta($id, '_fz_' . $key, $inquiry[$key]);
            }

            fz_send_inquiry_emails($inquiry);
            return $thanks;
        },
    ]);
});
