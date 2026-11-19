<?php
$c = $args['content'] ?? fz_content('about');
$count = count($c['proof']);
?>
<section id="about" class="@container scroll-mt-[77px] bg-paper py-18.75 font-dm leading-[normal] text-ink-blue lg:scroll-mt-24 lg:py-36">
    <div class="mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
        <div class="grid grid-cols-[minmax(0,1fr)] items-center gap-[min(9cqw,129.6px)] lg:grid-cols-[1.05fr_0.95fr]">
            <div class="reveal">
                <p class="text-[11px] leading-3.5 font-bold tracking-[3px] uppercase min-[390px]:whitespace-nowrap lg:-mt-4.25 lg:mb-8.5"><?php echo esc_html($c['kicker']); ?></p>
                <h2 class="my-4.25 font-playfair text-[43px] leading-[1.12] font-normal tracking-[-0.04em] lg:mt-0 lg:h-83.75 lg:text-[clamp(42px,5.2083cqw,75px)]">
                    <?php echo esc_html($c['heading']); ?>
                    <br>
                    <em class="text-[#8B6A8D]"><?php echo esc_html($c['heading_accent']); ?></em>
                </h2>
            </div>
            <div class="reveal border-l border-[#B8AEB6] pl-6.25 lg:pl-10.5">
                <?php foreach ($c['paragraphs'] as $paragraph) : ?>
                    <p class="my-4.25 text-[17px] leading-[1.8] text-[#56515C] lg:my-4 lg:max-w-[491.2px] lg:leading-[31px] lg:first:mt-[16.5px]"><?php echo fz_bold($paragraph); ?></p>
                <?php endforeach; ?>
                <a<?php echo fz_link($c['link']['href'], 'group mt-[22px] inline-flex items-start border-b border-[#BD9040] pb-2.5 text-[12px] font-bold tracking-[1px] uppercase'); ?>>
                    <span class="mt-1.75 w-[137.26px] leading-4 whitespace-nowrap"><?php echo esc_html($c['link']['label']); ?></span>
                    <span class="ml-[12.74px] grid h-7 w-[16.7px] place-items-center transition-transform duration-300 group-hover:translate-x-1.5"><?php echo fz_icon('arrow-up-right-bold'); ?></span>
                </a>
            </div>
        </div>
        <div class="reveal -mx-5 mt-[80.5px] grid grid-cols-2 text-center lg:mx-0 lg:mt-20 lg:grid-cols-4 lg:border-t lg:border-[#D9D0D5] lg:text-left">
            <?php foreach ($c['proof'] as $index => $item) : ?>
                <div class="border-r border-[#D9D0D5] px-2 pt-[29px] pb-7 min-[390px]:px-6 lg:px-7.5 lg:py-6.25 <?php echo $index < $count - 1 ? 'lg:border-r' : 'lg:border-r-0'; ?> <?php echo $index === 0 ? 'lg:pl-0' : ''; ?>">
                    <strong class="mb-2 block font-playfair text-[min(20px,calc(6.94cqw-2.5px))] font-normal whitespace-nowrap lg:mb-2.25 lg:text-[32px]"><?php echo esc_html($item['title']); ?></strong>
                    <span class="block text-[11px] tracking-[1px] text-[#6A626B] uppercase lg:inline"><?php echo esc_html($item['label']); ?></span>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
