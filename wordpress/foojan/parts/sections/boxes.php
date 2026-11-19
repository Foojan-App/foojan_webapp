<?php
$c = $args['content'];
?>
<section<?php echo fz_section_attrs($c, fz_bg($c['background']) . ' ' . fz_ui('section')); ?>>
    <div class="<?php echo fz_ui('container'); ?>">
        <?php echo fz_section_heading($c); ?>
        <div class="mt-12 grid gap-4 min-[650px]:grid-cols-2 lg:mt-16 min-[1100px]:grid-cols-4">
            <?php foreach ($c['boxes'] as $box) : ?>
                <article class="reveal border-t-2 border-[#BD9040] p-6 lg:px-6.5 lg:py-7.5 <?php echo $c['background'] === 'paper' ? 'bg-white' : 'bg-paper'; ?>">
                    <?php echo fz_icon($box['icon'] ?: 'growth-wave', 'mb-6 size-9.5 text-[#956C4A]'); ?>
                    <h3 class="font-playfair text-[24px] leading-[1.2] font-normal text-[#19243E]"><?php echo esc_html($box['title']); ?></h3>
                    <p class="mt-3 <?php echo fz_ui('small'); ?>"><?php echo esc_html($box['text']); ?></p>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
