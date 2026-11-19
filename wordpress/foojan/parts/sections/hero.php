<?php
$c = $args['content'];
$card = ($c['style'] ?? 'photo') === 'card';
ob_start();
if ($c['stat_number'] !== '') : ?>
    <div class="mt-8 flex max-w-125 items-center gap-4.75 border-t border-[#CDB9A7] pt-5">
        <strong class="font-playfair text-[58px] leading-none font-normal text-[#956C4A]"><?php echo esc_html($c['stat_number']); ?></strong>
        <span class="text-[12px] leading-[1.5] font-bold tracking-[.12em] uppercase">
            <?php echo esc_html($c['stat_label']); ?>
            <?php if ($c['stat_note'] !== '') : ?>
                <small class="block text-[13px] font-normal tracking-normal text-[#56515C] normal-case"><?php echo esc_html($c['stat_note']); ?></small>
            <?php endif; ?>
        </span>
    </div>
<?php endif;
$after_buttons = ob_get_clean();
$art = '';
if ($card) {
    ob_start(); ?>
    <div aria-hidden="true" class="relative isolate grid min-h-122.5 place-items-center overflow-hidden bg-navy px-9 py-11 before:absolute before:-top-25 before:-right-27.5 before:size-120 before:rounded-full before:border before:border-[#C59D6650] before:content-[''] after:absolute after:-top-10 after:-right-12.5 after:size-90 after:rounded-full after:border after:border-[#C59D6650] after:content-[''] min-[600px]:max-lg:min-h-150 lg:min-h-190">
        <div class="relative z-1 w-[min(100%,340px)] -rotate-4 border-t-6 border-[#A67B4E] bg-paper px-8.75 py-10.5 text-ink-blue shadow-[18px_18px_0_#AF8B62,35px_35px_0_#FFFFFF15]">
            <p class="<?php echo fz_ui('kicker_type'); ?> text-[#956C4A]"><?php echo esc_html($c['art_kicker']); ?></p>
            <p class="my-7.5 font-playfair text-[36px] leading-[1.13] tracking-[-0.035em] min-[570px]:text-[44px]"><?php echo fz_lines($c['art_heading'], fz_ui('gold') . ' italic'); ?></p>
            <hr class="border-0 border-t border-[#BFA78D]">
            <p class="mt-4 text-[13px] leading-[1.6] tracking-[.1em] text-[#56515C] uppercase"><?php echo fz_lines($c['art_footer'], ''); ?></p>
        </div>
    </div>
    <?php $art = ob_get_clean();
}
fz_part('hero', [
    'content' => $c,
    'id' => is_front_page() ? 'home' : '',
    'home' => is_front_page(),
    'wrap' => !empty($c['long_heading']),
    'art' => $art,
    'after_buttons' => $after_buttons,
]);
