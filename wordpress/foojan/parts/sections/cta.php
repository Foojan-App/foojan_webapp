<?php
$c = $args['content'];
?>
<section<?php echo fz_section_attrs($c, 'bg-navy text-center text-white ' . fz_ui('section')); ?>>
    <div class="reveal <?php echo fz_ui('container'); ?>">
        <?php if ($c['kicker'] !== '') : ?>
            <p class="<?php echo fz_ui('kicker_type'); ?> text-[#E4C38A]"><?php echo esc_html($c['kicker']); ?></p>
        <?php endif; ?>
        <h2 class="<?php echo fz_ui('h2_type') . ' text-white ' . fz_ui('h2_size'); ?>"><?php echo fz_lines($c['heading'], 'text-[#E4C38A]'); ?></h2>
        <?php if ($c['text'] !== '') : ?>
            <p class="mx-auto mt-4.5 max-w-162.5 text-[15px] leading-[26px] text-[#CBD4E2] lg:text-[17px] lg:leading-[29px]"><?php echo esc_html($c['text']); ?></p>
        <?php endif; ?>
        <?php if ($c['button']['label'] !== '') : ?>
            <div class="mt-8"><?php echo fz_button($c['button']['label'], $c['button']['href'], fz_ui('light')); ?></div>
        <?php endif; ?>
    </div>
</section>
