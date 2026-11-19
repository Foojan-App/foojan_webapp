<?php
$c = $args['content'];
?>
<section<?php echo fz_section_attrs($c, fz_bg($c['background']) . ' ' . fz_ui('section')); ?>>
    <div class="<?php echo fz_ui('container'); ?> grid items-center gap-10 min-[650px]:grid-cols-2 lg:gap-17.5">
        <div class="reveal relative grid min-h-72.5 place-items-center overflow-hidden bg-navy text-[#F6EDE0] lg:min-h-125">
            <?php echo fz_icon('ait-orbit', 'w-[88%] max-h-[420px]'); ?>
            <?php if ($c['caption'] !== '') : ?>
                <p class="absolute bottom-6 text-[10px] leading-[13px] tracking-[3px] uppercase"><?php echo esc_html($c['caption']); ?></p>
            <?php endif; ?>
        </div>
        <div class="reveal">
            <?php if ($c['kicker'] !== '') : ?>
                <p class="<?php echo fz_ui('kicker'); ?>"><?php echo esc_html($c['kicker']); ?></p>
            <?php endif; ?>
            <h2 class="<?php echo fz_ui('h2_type'); ?> text-[#19243E] lg:text-[clamp(40px,4.2cqw,60px)]"><?php echo fz_lines($c['heading'], fz_ui('gold')); ?></h2>
            <?php foreach ($c['paragraphs'] as $text) : ?>
                <p class="mt-4.5 <?php echo fz_ui('paragraph'); ?>"><?php echo esc_html($text); ?></p>
            <?php endforeach; ?>
            <?php if ($c['button']['label'] !== '') : ?>
                <div class="mt-8"><?php echo fz_button($c['button']['label'], $c['button']['href'], fz_ui('outline')); ?></div>
            <?php endif; ?>
        </div>
    </div>
</section>
