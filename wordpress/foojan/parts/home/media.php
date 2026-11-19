<?php
$c = $args['content'] ?? fz_content('media');
$kicker = 'text-[11px] leading-3.5 font-bold tracking-[3px] uppercase';
?>
<div id="media-library" class="@container scroll-mt-[77px] bg-[#F7F3F6] pt-16.25 pb-9.5 font-dm leading-[normal] text-ink-blue lg:scroll-mt-24 lg:pt-25">
    <div class="mx-auto mb-9.5 w-full max-w-300 px-5.5 lg:px-[79px]">
        <p class="<?php echo $kicker; ?>"><?php echo esc_html($c['kicker']); ?></p>
        <h2 class="my-5 font-playfair text-[51.2px] leading-[1.08] font-normal text-[#182440] lg:text-[clamp(3.2rem,6cqw,86.4px)]">
            <?php echo esc_html($c['heading']); ?> <em class="text-[#8C6B8E]"><?php echo esc_html($c['heading_accent']); ?></em>
        </h2>
        <p class="max-w-180 text-[18.4px] leading-[1.75] text-[#55515F]"><?php echo esc_html($c['paragraph']); ?></p>
        <div class="mt-7.5 flex flex-wrap gap-3.5">
            <?php foreach ($c['tabs'] as $tab) : ?>
                <a<?php echo fz_link($tab['href'], 'group border-b border-[#B38A5E] py-2.5 pr-5 text-[12px] leading-4 font-bold tracking-[2px] text-[#182440] uppercase'); ?>><?php echo fz_arrow_label($tab['label']); ?></a>
            <?php endforeach; ?>
        </div>
    </div>

    <section id="podcast" class="relative scroll-mt-[77px] overflow-hidden bg-navy pt-15 pb-20 text-white before:pointer-events-none before:absolute before:top-[-15px] before:right-[max(-2cqw,-28.8px)] before:font-playfair before:text-[90px] before:leading-[normal] before:tracking-[-5px] before:whitespace-nowrap before:text-[#FFFFFF06] before:content-['INNER_VOICE'] lg:scroll-mt-24 lg:pt-[61px] lg:pb-[79px] lg:before:text-[145px]">
        <div class="relative mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
            <div class="grid items-center gap-[min(8cqw,115.2px)] lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
                <div>
                    <p class="<?php echo $kicker; ?> text-[#D6AC68]"><?php echo esc_html($c['podcast_kicker']); ?></p>
                    <h2 class="my-4.25 max-w-195 font-playfair text-[48px] leading-[1.12] font-normal tracking-[-0.04em] lg:text-[clamp(54px,6cqw,86.4px)]">
                        <?php echo esc_html($c['podcast_heading']); ?> <em class="text-[#D9B66D]"><?php echo esc_html($c['podcast_heading_accent']); ?></em>
                    </h2>
                    <p class="mt-6 mb-7.5 max-w-162.5 text-[16px] leading-[1.8] text-[#F8FAFF]"><?php echo esc_html($c['podcast_text']); ?></p>
                    <div class="grid gap-3 lg:flex lg:flex-wrap">
                        <a<?php echo fz_link($c['podcast_primary']['href'], 'group h-5.5 bg-[#F5F0E7] leading-5.5 text-[#102746] lg:h-auto lg:leading-[normal]'); ?>><?php echo fz_arrow_label($c['podcast_primary']['label']); ?></a>
                        <?php foreach ($c['podcast_links'] as $item) : ?>
                            <a<?php echo fz_link($item['href'], 'group text-white'); ?>><?php echo fz_arrow_label($item['label']); ?></a>
                        <?php endforeach; ?>
                    </div>
                </div>
                <figure class="my-4 w-full max-w-66.5 justify-self-center bg-[#EEE8F7] p-3.5 lg:my-0 lg:max-w-[299px]">
                    <img src="<?php echo esc_url(fz_img($c['podcast_image_url'])); ?>" alt="<?php echo esc_attr($c['podcast_image_alt']); ?>" width="1254" height="1254" loading="lazy" decoding="async" class="block h-auto w-full">
                </figure>
            </div>
            <p class="mt-13 mb-4 text-[16px] leading-[1.8] text-[#E5ECF7]"><?php echo esc_html($c['podcast_note']); ?></p>
        </div>
    </section>

    <section id="youtube" class="scroll-mt-[77px] border-t border-[rgba(24,36,64,0.14)] bg-[#F3EDF4] pt-20 pb-21.25 lg:scroll-mt-24">
        <div class="mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
            <div class="reveal mb-9 grid items-end gap-0 lg:grid-cols-2 lg:gap-20">
                <div>
                    <p class="<?php echo $kicker; ?>"><?php echo esc_html($c['youtube_kicker']); ?></p>
                    <h2 class="my-4.25 font-playfair text-[43px] leading-[1.12] font-normal tracking-[-0.04em] lg:text-[clamp(42px,5.2cqw,74.88px)]">
                        <?php echo esc_html($c['youtube_heading']); ?>
                        <br>
                        <em class="text-[#8B6A8D]"><?php echo esc_html($c['youtube_heading_accent']); ?></em>
                    </h2>
                </div>
                <p class="my-4 text-[16px] leading-[1.8] text-[#56515C]"><?php echo esc_html($c['youtube_text']); ?></p>
            </div>
            <a<?php echo fz_link($c['youtube_href'], 'group reveal flex min-h-95 flex-col items-start justify-between gap-12 bg-[linear-gradient(134.49deg,#827087_0%,#51445F_52%,#162E56_100%)] p-9 text-white transition hover:brightness-[1.07] lg:flex-row lg:items-center lg:bg-[linear-gradient(99.85deg,#827087_0%,#51445F_52%,#162E56_100%)] lg:p-[clamp(36px,6cqw,85px)]', 'aria-label="Visit Dr. Foojan\'s YouTube channel"'); ?>>
                <div class="max-w-180">
                    <span class="mb-7.5 block h-4 max-w-[239px] text-[12px] leading-4 font-bold tracking-[3px] text-[#F3D295] uppercase lg:h-auto lg:max-w-none"><?php echo esc_html($c['youtube_eyebrow']); ?></span>
                    <h3 class="mb-5.5 font-playfair text-[clamp(27px,5.2cqw,40px)] leading-[1.18] font-normal tracking-[-0.025em] lg:text-[clamp(24px,2.7cqw,38.88px)] lg:whitespace-nowrap"><?php echo esc_html($c['youtube_title']); ?></h3>
                    <p class="mb-4 max-w-140 text-[17px] leading-[1.7] opacity-95"><?php echo esc_html($c['youtube_card_text']); ?></p>
                    <span class="mt-[29px] inline-flex gap-6 border-b border-[#E9C482] pb-3.5 text-[13px] leading-[17px] font-bold tracking-[2px] uppercase lg:mt-7.5"><?php echo fz_arrow_label($c['youtube_cta']); ?></span>
                </div>
                <div aria-hidden="true" class="flex flex-col items-center gap-6 self-center text-[11px] tracking-[2px] text-[#F3D295] uppercase lg:flex-[0_0_200px]">
                    <?php echo fz_icon('youtube-logo', 'mx-auto mb-5 block max-w-full'); ?>
                    <span><?php echo esc_html($c['youtube_mark']); ?></span>
                </div>
            </a>
        </div>
    </section>

    <section id="substack" class="scroll-mt-[77px] pt-5 pb-23.75 lg:scroll-mt-24">
        <div class="mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
            <div class="grid min-h-97.5 overflow-hidden bg-[linear-gradient(140.47deg,#263759_0%,#17223D_100%)] text-white lg:grid-cols-[1.3fr_1fr] lg:bg-[linear-gradient(102.45deg,#263759_0%,#17223D_100%)]">
                <div class="self-center p-9.5 lg:p-[clamp(38px,5cqw,72px)]">
                    <p class="<?php echo $kicker; ?> text-[#E8C99D]"><?php echo esc_html($c['substack_kicker']); ?></p>
                    <h2 class="my-6.25 font-playfair text-[41.6px] leading-[1.12] font-normal tracking-[-0.04em] lg:text-[clamp(2.6rem,4cqw,57.6px)]">
                        <?php echo esc_html($c['substack_heading']); ?> <em class="text-[#DFC19E]"><?php echo esc_html($c['substack_heading_accent']); ?></em>
                    </h2>
                    <p class="mb-4 max-w-140 text-[16px] leading-[1.8] text-[#F2EDF1]"><?php echo esc_html($c['substack_text']); ?></p>
                    <a<?php echo fz_link($c['substack_href'], 'group mt-7 inline-flex items-center gap-2 border-b border-[#DFBC83] pt-px pb-2.5 text-[13px] leading-[17px] font-bold tracking-[1px]'); ?>>
                        <?php echo esc_html($c['substack_link_label']); ?>
                        <span class="transition-transform duration-300 group-hover:translate-x-1.5"><?php echo fz_icon('arrow-up-right-tiny'); ?></span>
                    </a>
                </div>
                <a<?php echo fz_link($c['substack_href'], 'flex min-h-65 items-center justify-center bg-[radial-gradient(circle_at_50%_42%,#FFF4E9_0%,#F5E6E4_54%,#E9DFE8_100%)] transition hover:brightness-[0.97] lg:min-h-90 lg:bg-[radial-gradient(74.61%_78.14%_at_50%_42%,#FFF4E9_0%,#F5E6E4_54%,#E9DFE8_100%)]', 'aria-label="Visit Dr. Foojan on Substack"'); ?>>
                    <span class="flex flex-col items-center justify-center gap-2.5 text-[#172441] lg:gap-[11px]">
                        <?php echo fz_icon('substack-logo', 'size-18.75 lg:size-27'); ?>
                        <span class="font-[Georgia,serif] text-[48px] font-bold tracking-[-0.04em] lg:text-[clamp(42px,5cqw,68px)] lg:tracking-[-3px]"><?php echo esc_html($c['substack_name']); ?></span>
                        <small class="text-[11px] font-bold tracking-[0.2em] uppercase lg:tracking-[2px]"><?php echo esc_html($c['substack_byline']); ?></small>
                    </span>
                </a>
            </div>
        </div>
    </section>
</div>
