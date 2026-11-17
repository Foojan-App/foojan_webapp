<?php
$c = fz_content('mira');
$kicker = 'text-[11px] leading-3.5 font-bold tracking-[3px] uppercase';
$stores = [
    'App Store' => ['icon' => 'apple-logo', 'caption' => 'Download on the'],
    'Google Play' => ['icon' => 'google-play-logo', 'caption' => 'Get it on'],
];
?>
<section id="mira" class="@container scroll-mt-[77px] bg-[#F8F5EF] py-18.75 font-dm leading-[normal] text-ink-blue lg:scroll-mt-24 lg:py-36">
    <div class="mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
        <p class="<?php echo $kicker; ?>"><?php echo esc_html($c['kicker']); ?></p>
        <div class="reveal mt-6 mb-12 grid items-end gap-3.75 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[min(8cqw,115.2px)]">
            <h2 class="font-playfair text-[43px] leading-[1.12] font-normal tracking-[-0.04em] lg:text-[clamp(42px,5.2cqw,74.88px)]">
                <?php echo esc_html($c['heading']); ?> <em class="text-[#8B6A8D]"><?php echo esc_html($c['heading_accent']); ?></em>
            </h2>
            <p class="mb-1.75 max-w-127.5 text-[16px] leading-[1.8] text-[#56515C]"><?php echo esc_html($c['paragraph']); ?></p>
        </div>
        <div class="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-2">
            <?php foreach ($c['products'] as $product) : ?>
                <?php $width = is_numeric($product['link_text_width'] ?? null) ? (float) $product['link_text_width'] : 0; ?>
                <article class="reveal border border-[#E5DFE3] bg-white">
                    <div class="relative h-90 bg-[#F7F4F1] p-3.75 lg:h-107.5 lg:px-4.5 lg:py-5">
                        <div class="relative h-full w-full">
                            <img src="<?php echo esc_url(fz_img($product['image_url'])); ?>" alt="<?php echo esc_attr($product['image_alt']); ?>" loading="lazy" decoding="async" class="absolute inset-0 size-full object-contain">
                        </div>
                    </div>
                    <div class="p-6 lg:px-7.5 lg:pt-6.75 lg:pb-7.5">
                        <span class="<?php echo $kicker; ?>"><?php echo esc_html($product['kicker']); ?></span>
                        <h3 class="mt-2.5 mb-3.5 font-playfair text-[31px] leading-[1.15] font-normal lg:text-[37px]">
                            <?php echo esc_html($product['title']); ?>
                            <?php if (($product['title_line2'] ?? '') !== '') : ?>
                                <br><?php echo esc_html($product['title_line2']); ?>
                            <?php endif; ?>
                        </h3>
                        <?php foreach ($product['paragraphs'] as $paragraph) : ?>
                            <p class="mb-3.25 max-w-127.5 text-[15px] leading-[1.62] text-[#56515C] last-of-type:mb-3.75"><?php echo esc_html($paragraph); ?></p>
                        <?php endforeach; ?>
                        <?php if (($product['highlight'] ?? '') !== '') : ?>
                            <p class="mb-3.75 max-w-127.5 text-[15px] leading-[1.62] text-[#56515C]"><strong class="text-navy"><?php echo esc_html($product['highlight']); ?></strong></p>
                        <?php endif; ?>
                        <a<?php echo fz_link($product['link']['href'], 'group mt-3 inline-flex items-start border-b border-[#BD9040] pb-2.5 text-[12px] font-bold tracking-[1px] uppercase'); ?>>
                            <span class="mt-1.75 min-w-0 leading-4"<?php echo $width > 0 ? ' style="width:min(' . esc_attr((string) $width) . 'px,100%)"' : ''; ?>><?php echo esc_html($product['link']['label']); ?></span>
                            <span class="ml-[12.74px] grid h-7 w-[16.7px] place-items-center transition-transform duration-300 group-hover:translate-x-1.5"><?php echo fz_icon('arrow-up-right-bold'); ?></span>
                        </a>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
        <?php if ($c['store_links']) : ?>
            <div class="mt-6.75 flex flex-wrap gap-3">
                <?php foreach ($c['store_links'] as $store) : ?>
                    <?php $platform = $stores[$store['label']] ?? null; ?>
                    <a<?php echo fz_link($store['href'], 'inline-flex h-12 items-center gap-2.5 rounded-lg bg-[#13294F] px-4 text-white transition hover:bg-[#0B1B38]'); ?>>
                        <?php if ($platform) : ?>
                            <?php echo fz_icon($platform['icon'], 'shrink-0'); ?>
                        <?php endif; ?>
                        <span class="flex flex-col leading-none">
                            <?php if ($platform) : ?>
                                <span class="text-[10px] tracking-[0.5px] uppercase"><?php echo esc_html($platform['caption']); ?></span>
                            <?php endif; ?>
                            <span class="mt-0.5 text-[17px] font-medium"><?php echo esc_html($store['label']); ?></span>
                        </span>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
        <p class="mt-6.75 max-w-127.5 text-[12px] leading-[1.8] text-[#77717A]"><?php echo esc_html($c['note']); ?></p>
    </div>
</section>
