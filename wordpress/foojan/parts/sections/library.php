<?php
$c = $args['content'];
$topics = array_values(array_unique(array_filter(array_map(fn($row) => trim($row['topic']), $c['items']), 'strlen')));
?>
<section data-fz-library data-fz-noun="<?php echo esc_attr($c['count_label']); ?>"<?php echo fz_section_attrs($c, fz_bg($c['background']) . ' ' . fz_ui('section')); ?>>
    <div class="<?php echo fz_ui('container'); ?>">
        <?php echo fz_section_heading($c, false); ?>
        <div class="mt-10 flex flex-wrap items-center gap-2.5" role="group" aria-label="<?php echo esc_attr($c['search_label']); ?>">
            <?php foreach (array_merge([''], $topics) as $topic) : ?>
                <button type="button" data-fz-topic="<?php echo esc_attr($topic); ?>" aria-pressed="<?php echo $topic === '' ? 'true' : 'false'; ?>" class="h-11 border border-[#D5CCC3] px-4 text-[12px] leading-4 font-bold tracking-[1px] text-navy uppercase transition hover:border-navy aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-white"><?php echo esc_html($topic === '' ? $c['all_label'] : $topic); ?></button>
            <?php endforeach; ?>
            <input type="search" data-fz-search aria-label="<?php echo esc_attr($c['search_label']); ?>" placeholder="<?php echo esc_attr($c['search_label']); ?>" class="h-11 min-w-55 flex-1 rounded-[3px] border border-[#C9C3CA] bg-white px-3.25 text-[15px] text-[#1C2741] placeholder:text-[#757575] focus:border-navy focus:outline-none">
        </div>
        <p data-fz-count aria-live="polite" class="mt-4 text-[14px] leading-5 text-[#56515C]"></p>
        <div class="mt-6 grid gap-4.5 min-[650px]:grid-cols-2 min-[1000px]:grid-cols-3">
            <?php foreach ($c['items'] as $index => $item) : ?>
                <article data-fz-item data-topic="<?php echo esc_attr(trim($item['topic'])); ?>" class="reveal flex min-h-57.5 flex-col border border-[#E5DFE3] bg-white p-6 transition-shadow hover:shadow-[0_8px_24px_#102B5712]">
                    <div class="mb-5 flex items-center justify-between gap-2">
                        <span class="<?php echo fz_ui('kicker_type'); ?> text-[#956C4A]"><?php echo esc_html($item['topic']); ?></span>
                        <span aria-hidden="true" data-fz-num class="font-playfair text-[24px] leading-none text-[#BDA68E]"><?php echo esc_html(str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT)); ?></span>
                    </div>
                    <h3 class="font-playfair text-[26px] leading-[1.2] font-normal text-[#19243E]"><?php echo esc_html($item['title']); ?></h3>
                    <p class="mt-3 mb-5 text-[14px] leading-[1.6] text-[#56515C]"><?php echo esc_html($item['text']); ?></p>
                    <?php echo fz_text_link($c['link_label'], $item['href']); ?>
                </article>
            <?php endforeach; ?>
        </div>
        <p data-fz-empty hidden class="mt-6 border border-dashed border-[#D5CCC3] bg-white p-7.5 text-center text-[15px] leading-6 text-[#56515C]"><?php echo esc_html($c['empty_label']); ?></p>
    </div>
</section>
