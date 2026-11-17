<?php

function fz_is_custom_page()
{
    return is_front_page() || is_page_template('template-meet.php') || is_page_template('template-legal.php');
}

function fz_asset_version($relative)
{
    $file = FZ_DIR . '/' . $relative;
    return is_readable($file) ? (string) filemtime($file) : FZ_VERSION;
}

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'fz-fonts',
        'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap',
        [],
        null
    );
    wp_enqueue_style('fz-site', FZ_URI . '/assets/css/site.css', [], fz_asset_version('assets/css/site.css'));
    wp_enqueue_script('fz-site', FZ_URI . '/assets/js/site.js', [], fz_asset_version('assets/js/site.js'), ['in_footer' => true, 'strategy' => 'defer']);
    wp_localize_script('fz-site', 'fzSite', [
        'inquiryUrl' => esc_url_raw(rest_url('fz/v1/inquiry')),
        'home' => esc_url_raw(home_url('/')),
        'isHome' => is_front_page(),
    ]);
}, 20);

add_action('wp_head', function () {
    $whole = fz_is_custom_page() ? 'true' : 'false';
    ?>
<style id="fz-font-face">
@font-face{font-family:"DM Sans Arrow";src:url("<?php echo esc_url(FZ_URI . '/assets/fonts/dm-sans-arrow-400.woff2'); ?>") format("woff2");font-weight:400;font-style:normal;font-display:swap;unicode-range:U+2197-2198}
@font-face{font-family:"DM Sans Arrow";src:url("<?php echo esc_url(FZ_URI . '/assets/fonts/dm-sans-arrow-700.woff2'); ?>") format("woff2");font-weight:700;font-style:normal;font-display:swap;unicode-range:U+2197-2198}
</style>
<script id="fz-fit">
(function(){var r=document.documentElement,w=<?php echo $whole; ?>;r.classList.add("js");function f(){var x=window.innerWidth,s=x>=1024&&x<1280?String(x/1280):"";if(w){r.style.zoom=s;return}document.querySelectorAll(".fz-zoom").forEach(function(e){e.style.zoom=s})}f();document.addEventListener("DOMContentLoaded",f);window.addEventListener("resize",f)})();
</script>
<?php
}, 1);

add_filter('body_class', function ($classes) {
    $classes[] = 'fz-site';
    if (fz_is_custom_page()) {
        $classes[] = 'fz-custom-page';
    }
    return $classes;
});

add_filter('option_qode_options_proya', function ($options) {
    if (is_array($options) && !is_admin()) {
        $options['page_transitions'] = '0';
    }
    return $options;
});

add_filter('theme_page_templates', function ($templates) {
    $templates['template-meet.php'] = 'Meet Dr. Foojan';
    $templates['template-legal.php'] = 'Legal page (Privacy / Terms)';
    return $templates;
});
