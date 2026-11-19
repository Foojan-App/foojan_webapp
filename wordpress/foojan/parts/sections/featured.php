<?php
$c = $args['content'];
$visuals = ['bg-navy', 'bg-[#87684F]', 'bg-[#323D50]'];
?>
<section<?php echo fz_section_attrs($c, fz_bg($c['background']) . ' ' . fz_ui('section')); ?>>
    <div class="<?php echo fz_ui('container'); ?>">
        <?php echo fz_section_heading($c, false); ?>
        <div class="mt-12 grid gap-6 min-[650px]:grid-cols-2 lg:mt-16 min-[1000px]:grid-cols-3">
            <?php foreach ($c['items'] as $index => $item) : ?>
                <article class="reveal flex flex-col bg-white transition-shadow hover:shadow-[0_8px_24px_#102B5712]">
                    <div class="relative flex h-41.25 items-end overflow-hidden p-6 text-white <?php echo $visuals[$index % 3]; ?>">
                        <span aria-hidden="true" class="absolute -top-14 right-2.5 font-playfair text-[180px] leading-none opacity-[.16]">“</span>
                        <span class="relative font-playfair text-[30px] leading-[1.15]"><?php echo esc_html($item['label']); ?></span>
                    </div>
                    <div class="flex flex-1 flex-col p-6 lg:p-7.5">
                        <h3 class="font-playfair text-[26px] leading-[1.2] font-normal text-[#19243E]"><?php echo esc_html($item['title']); ?></h3>
                        <p class="mt-2.5 mb-6 <?php echo fz_ui('small'); ?>"><?php echo esc_html($item['text']); ?></p>
                        <?php echo fz_text_link($c['link_label'], $item['href']); ?>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
