<?php
$c = $args['content'] ?? fz_content('publications');
$books = $c['books'];
?>
<section id="publications" class="@container scroll-mt-[77px] bg-[#FAF7F2] py-16.25 font-dm leading-[normal] text-ink-blue lg:scroll-mt-24 lg:py-27.5">
    <div class="mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
        <p class="text-[11px] leading-3.5 font-bold tracking-[3px] uppercase"><?php echo esc_html($c['kicker']); ?></p>
        <div class="mt-5 mb-11.25 lg:flex lg:items-end lg:justify-between lg:gap-12.5">
            <h2 class="flex-1 font-playfair text-[44px] leading-[1.15] font-normal tracking-[-0.04em] text-[#19243E] lg:text-[clamp(44px,5.4cqw,77.76px)]">
                <?php echo esc_html($c['heading']); ?>
                <br>
                <em class="text-[#8F7090]"><?php echo esc_html($c['heading_accent']); ?></em>
            </h2>
            <p class="mt-5.5 mb-4.75 text-[19px] leading-[1.7] text-[#5E5B66] lg:mt-4.75 lg:max-w-97.5 lg:flex-[0_1_390px]"><?php echo esc_html($c['paragraph']); ?></p>
        </div>
        <div class="grid gap-5.5 lg:grid-cols-2">
            <?php foreach ($c['panels'] as $index => $panel) : ?>
                <div class="flex min-h-77.5 flex-col items-start p-7.5 text-white lg:min-h-91.25 lg:p-11.25 <?php echo $index === 0 ? 'bg-[linear-gradient(113.41deg,#997B84_0%,#483750_100%)]' : 'bg-[linear-gradient(113.41deg,#414F76_0%,#1C3057_100%)]'; ?>">
                    <p class="text-[12px] font-bold tracking-[2px] text-[#EAC98B] uppercase"><?php echo esc_html($panel['index']); ?></p>
                    <h3 class="mt-8.75 mb-2.5 font-playfair text-[30px] leading-[1.15] font-normal lg:text-[clamp(30px,3.5cqw,50px)]"><?php echo esc_html($panel['title']); ?></h3>
                    <p class="mb-7 max-w-105 text-[16px] leading-[1.7]"><?php echo esc_html($panel['text']); ?></p>
                    <a<?php echo fz_link($panel['link']['href'], 'group mt-auto inline-flex items-start border-b border-[#D9B36C] pb-2.5 text-[13px] leading-[17px] font-bold tracking-[2px] whitespace-nowrap uppercase'); ?>>
                        <span class="mt-2.25"><?php echo esc_html($panel['link']['label']); ?></span>
                        <span class="ml-3.25 grid h-7.5 w-3.25 place-items-center transition-transform duration-300 group-hover:translate-x-1.5"><?php echo fz_icon('arrow-up-right-small'); ?></span>
                    </a>
                </div>
            <?php endforeach; ?>
        </div>

        <?php if ($books) : ?>
            <div data-fz-carousel class="reveal mt-12 lg:mt-16">
                <div data-fz-track class="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto sm:gap-6 lg:grid lg:grid-cols-4 lg:gap-9 lg:overflow-visible">
                    <?php foreach ($books as $book) : ?>
                        <a<?php echo fz_link($book['link'], 'group block w-full min-w-0 shrink-0 snap-start min-[430px]:w-[calc(50%-8px)] sm:w-[calc(50%-12px)] lg:w-auto'); ?>>
                            <div class="bg-[#EEE8F7] p-[11%]">
                                <div class="relative aspect-[5/7] w-full overflow-hidden shadow-[0_4px_10px_#071A3D1F,0_20px_34px_-12px_#071A3D73] transition-transform duration-300 group-hover:-translate-y-1">
                                    <img src="<?php echo esc_url(fz_img($book['cover_url'])); ?>" alt="<?php echo esc_attr($book['title'] . ' book cover'); ?>" loading="lazy" decoding="async" class="absolute inset-0 size-full object-cover">
                                </div>
                            </div>
                            <p class="mt-5 text-[11px] leading-3.5 font-bold tracking-[2px] text-[#815F37] uppercase"><?php echo esc_html($book['category']); ?></p>
                            <h3 class="mt-2 font-playfair text-[22px] leading-[1.2] font-normal text-[#19243E] lg:text-[24px]"><?php echo esc_html($book['title']); ?></h3>
                            <p class="mt-2 text-[15px] leading-[1.6] text-[#5E5B66]"><?php echo esc_html($book['description']); ?></p>
                        </a>
                    <?php endforeach; ?>
                </div>
                <?php if (count($books) > 1) : ?>
                    <div class="mt-6 flex h-6 items-center justify-center lg:hidden">
                        <?php foreach ($books as $index => $book) : ?>
                            <button type="button" data-fz-dot="<?php echo (int) $index; ?>" aria-label="<?php echo esc_attr('Show ' . $book['title']); ?>" <?php echo $index === 0 ? 'aria-current="true"' : ''; ?> class="grid h-6 place-items-center px-2">
                                <span class="h-1.5 rounded-full transition-all <?php echo $index === 0 ? 'w-10 bg-[#13294F]' : 'w-1.5 bg-[#C9C3CA]'; ?>"></span>
                            </button>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <?php if ($c['note'] !== '') : ?>
            <p class="mt-5.5 mb-4 text-[16px] leading-[1.8] text-[#56515C]"><?php echo esc_html($c['note']); ?></p>
        <?php endif; ?>
    </div>
</section>
