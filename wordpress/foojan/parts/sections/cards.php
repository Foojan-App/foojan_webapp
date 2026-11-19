<?php
$c = $args['content'];
?>
<section<?php echo fz_section_attrs($c, fz_bg($c['background']) . ' ' . fz_ui('section')); ?>>
    <div class="<?php echo fz_ui('container'); ?>">
        <?php echo fz_section_heading($c); ?>
        <div class="mt-12 grid gap-6 min-[650px]:grid-cols-2 lg:mt-16">
            <?php foreach ($c['cards'] as $card) : ?>
                <article class="reveal flex flex-col border border-[#E5DFE3] p-6 lg:p-10.5 <?php echo $card['soft'] ? 'bg-[#EDE6E4]' : 'bg-white'; ?>">
                    <p class="font-playfair text-[22px] leading-[1.35] text-[#956C4A] italic"><?php echo esc_html($card['number']); ?></p>
                    <h3 class="mt-6 mb-3.5 font-playfair text-[31px] leading-[1.15] font-normal lg:text-[37px]"><?php echo esc_html($card['title']); ?></h3>
                    <p class="<?php echo fz_ui('small'); ?>"><?php echo esc_html($card['text']); ?></p>
                    <?php if ($card['points']) : ?>
                        <ul class="mt-5 mb-8 flex flex-col gap-2">
                            <?php foreach ($card['points'] as $point) : ?>
                                <li class="flex gap-2.5 text-[15px] leading-6 text-[#56515C]"><span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#BD9040]"></span><?php echo esc_html($point); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                    <div class="mt-auto"><?php echo fz_button($card['button']['label'], $card['button']['href'], fz_ui($card['soft'] ? 'outline' : 'dark')); ?></div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
