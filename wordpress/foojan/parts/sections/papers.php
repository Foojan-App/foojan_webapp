<?php
$c = $args['content'];
?>
<section<?php echo fz_section_attrs($c, fz_bg($c['background']) . ' ' . fz_ui('section')); ?>>
    <div class="fz">
        <div class="<?php echo fz_ui('container'); ?>">
            <?php echo fz_section_heading($c); ?>
        </div>
    </div>
    <div class="<?php echo fz_ui('container'); ?> mt-12 box-border flex flex-col gap-12 lg:mt-16">
        <?php foreach ($c['papers'] as $paper) : ?>
            <article class="mx-auto box-border w-full max-w-250 border border-t-[3px] border-[#E5DFE3] border-t-[#956C4A] bg-white px-4 py-7 lg:px-12 lg:py-10.5">
                <div class="fz flex flex-col items-center gap-2 text-center">
                    <?php foreach ($paper['lines'] as $line) : ?>
                        <p class="max-w-212.5 <?php echo $line['small'] ? 'text-[14px] leading-[1.6] text-[#56515C] lg:text-[15px]' : 'font-playfair text-[20px] leading-[1.3] text-[#19243E] lg:text-[24px]'; ?>"><?php echo esc_html($line['text']); ?></p>
                    <?php endforeach; ?>
                </div>
                <?php if (is_numeric($paper['book']) && (int) $paper['book'] > 0) : ?>
                    <div class="mt-7 box-border border border-[#E5DFE3] bg-[#EEE9E4] p-2 lg:p-4.5">
                        <?php echo do_shortcode('[dflip id="' . (int) $paper['book'] . '"][/dflip]'); ?>
                    </div>
                <?php endif; ?>
            </article>
        <?php endforeach; ?>
    </div>
</section>
