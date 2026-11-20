<?php
$c = $args['content'] ?? [];
$home = !empty($args['home']);
$h1 = !empty($args['wrap'])
    ? 'mt-5.25 font-playfair text-[44px] leading-[1.08] font-normal tracking-[-0.045em] text-ink-blue min-[600px]:max-lg:mt-5 min-[600px]:max-lg:text-[60px] min-[768px]:max-lg:text-[calc(5.6cqw-4px)] lg:mt-3.75 lg:text-[min(74.2px,calc(6.5cqw-19.4px))] lg:leading-[1.0395]'
    : 'mt-5.25 h-[2.436em] py-[0.118em] font-playfair text-[min(39px,calc(12.55cqw-6.5px))] leading-[1.1] font-normal tracking-[-0.0549em] whitespace-nowrap text-ink-blue min-[600px]:max-lg:mt-5 min-[600px]:max-lg:h-auto min-[600px]:max-lg:py-0 min-[600px]:max-lg:text-[60px] min-[600px]:max-lg:leading-[1.0395] min-[600px]:max-lg:tracking-[-0.045em] min-[768px]:max-lg:text-[calc(5.4cqw-6px)] lg:mt-3.75 lg:h-[2.372em] lg:py-[0.148em] lg:text-[min(74.2px,calc(6.5cqw-19.4px))] lg:leading-[1.0395] lg:tracking-[-0.045em]';

[$primary_label, $primary_icon] = fz_label_arrow($c['primary_button_label'] ?? '');
[$secondary_label, $secondary_icon] = fz_label_arrow($c['secondary_button_label'] ?? '');
$button = 'group inline-flex h-16.25 items-center justify-center gap-2.25 border border-navy px-6 text-[12px] leading-4 font-bold tracking-[1px] uppercase transition';
?>
<section<?php echo !empty($args['id']) ? ' id="' . esc_attr($args['id']) . '"' : ''; ?> class="@container relative scroll-mt-[77px] overflow-hidden bg-[#EDE6E4] font-dm lg:scroll-mt-24">
    <div class="mx-auto grid w-full max-w-370 px-5.5 min-[768px]:max-lg:min-h-150 min-[768px]:max-lg:grid-cols-[50%_50%] min-[768px]:max-lg:px-8 lg:min-h-190 lg:grid-cols-[53%_47%] lg:px-[79px]">
        <div class="relative z-2 py-16.25 min-[600px]:max-lg:pt-20 min-[600px]:max-lg:pb-16 min-[768px]:max-lg:self-center min-[768px]:max-lg:py-16 min-[768px]:max-lg:pr-6 lg:pt-28.75 lg:pr-4.5 lg:pb-18.75">
            <p class="text-[11px] leading-3.5 font-bold tracking-[3px] text-[#815F37] uppercase"><?php echo esc_html($c['kicker']); ?></p>
            <h1 class="<?php echo $h1; ?>">
                <?php echo esc_html($c['heading']); ?>
                <br>
                <em class="text-[#956C4A]"><?php echo esc_html($c['heading_accent']); ?></em>
            </h1>
            <p class="mt-6.5 max-w-[344.92px] text-[15px] leading-[26px] text-[#494650] min-[600px]:max-lg:mt-6 min-[600px]:max-lg:max-w-[552.12px] min-[600px]:max-lg:text-[17px] min-[600px]:max-lg:leading-[29px] min-[768px]:max-lg:text-[16px] min-[768px]:max-lg:leading-[27px] lg:mt-5 lg:max-w-[min(552.12px,calc(53cqw-157.74px))] lg:text-[17px] lg:leading-[29px]"><?php echo esc_html($c['paragraph']); ?></p>
            <div class="mt-8.5 grid gap-3 min-[600px]:mt-8.75 min-[600px]:flex min-[600px]:flex-wrap">
                <?php if ($primary_label !== '') : ?>
                    <a<?php echo fz_local_link($c['primary_button_href'], $button . ' bg-navy text-white hover:bg-[#234b84]' . ($home ? ' min-[600px]:w-63.5 min-[600px]:justify-start min-[600px]:pr-0 min-[600px]:pl-4.75' : '')); ?>>
                        <span class="whitespace-nowrap<?php echo $home ? ' min-[600px]:w-46 min-[600px]:text-center' : ''; ?>"><?php echo esc_html($primary_label); ?></span>
                        <?php echo $primary_icon; ?>
                    </a>
                <?php endif; ?>
                <?php if ($secondary_label !== '') : ?>
                    <a<?php echo fz_local_link($c['secondary_button_href'], $button . ' text-navy hover:bg-[#f4e9d8]' . ($home ? ' min-[600px]:w-48.25 min-[600px]:justify-start min-[600px]:pr-0 min-[600px]:pl-5.25' : '')); ?>>
                        <span class="whitespace-nowrap<?php echo $home ? ' min-[600px]:w-30 min-[600px]:text-center' : ''; ?>"><?php echo esc_html($secondary_label); ?></span>
                        <?php echo $secondary_icon; ?>
                    </a>
                <?php endif; ?>
            </div>
            <?php echo $args['after_buttons'] ?? ''; ?>
        </div>

        <?php if (!empty($args['art'])) : ?>
            <?php echo $args['art']; ?>
        <?php else : ?>
        <div class="relative isolate min-h-122.5 overflow-hidden bg-[#EDE6E4] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(0deg,rgba(17,33,60,0.12)_0%,rgba(17,33,60,0)_25%)] min-[600px]:max-lg:min-h-190 max-lg:-mx-5.5 min-[768px]:max-lg:ml-0 min-[768px]:max-lg:-mr-8 min-[768px]:max-lg:min-h-0 lg:-ml-13.75 lg:-mr-[calc(79px+max(0px,(min(100cqw,1920px)-1480px)/2))] lg:min-h-190 lg:w-[calc(100%+55px+79px+max(0px,(min(100cqw,1920px)-1480px)/2))] lg:before:absolute lg:before:top-11.25 lg:before:-right-40 lg:before:bottom-0 lg:before:-left-25 lg:before:-z-1 lg:before:bg-[radial-gradient(70.71%_70.71%_at_50%_50%,#D4C4D1_0%,rgba(212,196,209,0)_65%)] lg:before:content-[''] lg:after:bg-[linear-gradient(0deg,rgba(17,33,60,0.13)_0%,rgba(17,33,60,0)_28%)]">
            <img src="<?php echo esc_url(fz_img($c['image_url'])); ?>" alt="<?php echo esc_attr($c['image_alt']); ?>" fetchpriority="high" decoding="async" class="absolute inset-0 size-full object-cover object-[center_22%] min-[600px]:object-[50%_20%] min-[768px]:max-lg:mask-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.08)_2%,rgba(0,0,0,0.5)_6%,#000_12%)] lg:mask-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.08)_2%,rgba(0,0,0,0.5)_6%,#000_12%)]">
            <?php if (($c['vertical_text'] ?? '') !== '') : ?>
            <p class="absolute top-3.5 right-[41px] z-3 text-[10px] leading-[13px] font-normal tracking-[3px] whitespace-nowrap text-white uppercase [text-shadow:0_1px_5px_#000000] [writing-mode:vertical-rl] min-[768px]:max-lg:right-[51px] lg:top-30 lg:right-[calc(19px+79px+max(0px,(min(100cqw,1920px)-1480px)/2))] lg:[text-shadow:0_2px_14px_#000000]"><?php echo esc_html($c['vertical_text']); ?></p>
            <?php endif; ?>
            <?php if (($c['caption'] ?? '') !== '') : ?>
            <p class="absolute right-[38px] bottom-7 z-2 font-playfair text-[min(24px,calc(7.678cqw-5.91px))] leading-8 font-normal whitespace-nowrap text-white italic [text-shadow:0_2px_14px_#000000] min-[768px]:max-lg:right-[48px] min-[768px]:max-lg:text-[19px] lg:right-[calc(79px+max(0px,(min(100cqw,1920px)-1480px)/2))] lg:bottom-10.5 lg:text-[24px]"><?php echo esc_html($c['caption']); ?></p>
            <?php endif; ?>
        </div>
        <?php endif; ?>
    </div>
</section>
