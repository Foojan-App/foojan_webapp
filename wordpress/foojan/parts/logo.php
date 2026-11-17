<?php
$light = !empty($args['light']);
?>
<a href="<?php echo esc_url(home_url('/')); ?>" data-fz-top aria-label="Dr. Foojan Zeine — home" class="shrink-0">
    <?php if ($light) : ?>
        <img src="<?php echo esc_url(FZ_URI . '/assets/images/footer-logo.png'); ?>" alt="Dr. Foojan Zeine" width="164" height="99" class="h-24.75 w-41" loading="lazy" decoding="async">
    <?php else : ?>
        <img src="<?php echo esc_url(FZ_URI . '/assets/images/logo.png'); ?>" alt="Dr. Foojan Zeine" width="106" height="64" class="h-14 w-auto lg:h-16" fetchpriority="high">
    <?php endif; ?>
</a>
