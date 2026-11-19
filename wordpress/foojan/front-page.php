<?php
get_header();
?>
<main>
    <?php fz_render_sections((int) get_option('page_on_front') ?: get_the_ID()); ?>
</main>
<?php get_footer(); ?>
