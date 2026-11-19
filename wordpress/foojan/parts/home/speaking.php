<?php
$c = $args['content'] ?? fz_content('speaking');
?>
<section id="work" class="@container scroll-mt-[77px] bg-[#F3ECF3] py-16.25 font-dm leading-[normal] text-ink-blue lg:scroll-mt-24 lg:pt-25 lg:pb-27.5">
    <div class="mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
        <div class="reveal mb-9.5 max-w-245">
            <p class="text-[11px] leading-3.5 font-bold tracking-[3px] uppercase"><?php echo esc_html($c['kicker']); ?></p>
            <h2 class="my-4.5 font-playfair text-[44px] leading-[1.15] font-normal tracking-[-0.04em] text-[#19243E] lg:text-[clamp(44px,5.4cqw,77.76px)]">
                <?php echo esc_html($c['heading']); ?> <em class="text-[#8F7090]"><?php echo esc_html($c['heading_accent']); ?></em>
            </h2>
            <p class="mt-4.75 max-w-190 text-[19px] leading-[1.7] text-[#5E5B66]"><?php echo esc_html($c['paragraph']); ?></p>
        </div>

        <a<?php echo fz_link($c['card_href'], 'group reveal relative block h-180 min-h-150 w-full overflow-hidden bg-navy text-white transition-transform duration-300 hover:-translate-y-1 lg:h-[min(76cqw,720px)] lg:min-h-130'); ?>>
            <img src="<?php echo esc_url(fz_img($c['image_url'])); ?>" alt="<?php echo esc_attr($c['image_alt']); ?>" loading="lazy" decoding="async" class="absolute inset-0 size-full object-cover">
            <div class="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,25,54,0.96)_0%,rgba(8,25,54,0.7)_34%,rgba(8,25,54,0.1)_68%,rgba(8,25,54,0.08)_100%)]"></div>
            <p class="absolute top-4 left-4 z-10 w-fit max-w-[calc(100%-32px)] border-l-4 border-[#B38A49] bg-[rgba(250,247,239,0.96)] px-3.25 py-2.5 font-[Arial,Helvetica,sans-serif] text-[13px] leading-[19px] font-bold tracking-normal text-[#17233D] uppercase lg:top-[clamp(18px,3cqw,36px)] lg:left-[clamp(18px,4cqw,57.6px)] lg:max-w-[calc(100%-36px)] lg:pt-3 lg:pr-4.25 lg:pb-3.5 lg:pl-4.75 lg:text-[17px] lg:leading-[25px] lg:tracking-[1px]"><?php echo esc_html($c['card_label']); ?></p>
            <div class="absolute inset-x-0 bottom-0 z-2 px-10.5 pt-9.5 pb-10.5">
                <h3 class="m-0 font-playfair text-[25px] leading-[1.13] font-normal tracking-[-0.035em] [text-shadow:0_2px_18px_#0008] min-[1000px]:whitespace-nowrap lg:text-[clamp(25px,3.35cqw,48.24px)]">
                    <?php echo esc_html($c['card_heading']); ?>
                    <br>
                    <?php echo esc_html($c['card_heading_line2']); ?> <em><?php echo esc_html($c['card_heading_accent']); ?></em>
                </h3>
                <p class="mt-3.5 max-w-170 pr-17.5 text-[16px] leading-[1.65]"><?php echo esc_html($c['card_text']); ?></p>
                <span class="mt-3.5 block font-playfair text-[22px] leading-[1.35] text-[#F0CE91] italic"><?php echo esc_html($c['card_hook']); ?></span>
            </div>
            <span class="absolute right-8 bottom-8.5 z-3 grid size-12.5 place-items-center rounded-full border border-[#ffffff77]">
                <span class="grid place-items-center transition-transform duration-300 group-hover:translate-x-1.5"><?php echo fz_icon('arrow-up-right-large'); ?></span>
            </span>
        </a>

        <div class="mt-7 lg:flex lg:items-center lg:justify-between lg:gap-7.5">
            <p class="my-4 max-w-162.5 text-[16px] leading-[1.6] text-[#555363]"><?php echo esc_html($c['footer_text']); ?></p>
            <a<?php echo fz_link($c['footer_link']['href'], 'group mt-3.75 inline-flex items-start border-b border-[#D9B36C] pb-2.5 text-[13px] leading-[17px] font-bold tracking-[2px] whitespace-nowrap text-[#172A50] uppercase lg:mt-0'); ?>>
                <span class="mt-1.5 w-[211px]"><?php echo esc_html($c['footer_link']['label']); ?></span>
                <span class="ml-2.75 grid h-7.5 w-3.25 place-items-center transition-transform duration-300 group-hover:translate-x-1.5"><?php echo fz_icon('arrow-up-right-small'); ?></span>
            </a>
        </div>
    </div>
</section>
