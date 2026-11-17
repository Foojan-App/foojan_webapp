<?php get_header(); ?>
<main class="fz">
    <?php
    foreach (['hero', 'award', 'ticker', 'about', 'ait', 'speaking', 'publications', 'media', 'quote', 'mira'] as $section) {
        fz_part('home/' . $section);
    }
    ?>
</main>
<?php get_footer(); ?>
