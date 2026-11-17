<?php
$content = fz_content('footer');
$social_icons = ['X' => 'x', 'Facebook' => 'facebook', 'LinkedIn' => 'linkedin', 'Instagram' => 'instagram'];
?>
<footer class="fz fz-zoom bg-[#0B1B38] pt-15.5 pb-6.75 font-dm text-[#E2E5ED] lg:pb-7">
    <div class="mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
        <div class="grid gap-y-15.75 sm:grid-cols-2 sm:gap-x-12.5 lg:grid-cols-3">
            <div>
                <?php fz_part('logo', ['light' => true]); ?>
                <p class="mt-7.5 text-[13px] leading-4.25 text-[#B4BFD1]"><?php echo esc_html($content['tagline']); ?></p>
            </div>
            <div class="flex flex-col gap-5 pt-4 lg:gap-4.75 lg:pt-1">
                <h4 class="text-[12px] leading-4 font-bold tracking-[1px] text-[#E1BC7D] uppercase"><?php echo esc_html($content['explore_title']); ?></h4>
                <ul class="flex flex-wrap gap-x-4 gap-y-4">
                    <?php foreach ($content['explore_links'] as $link) : ?>
                        <li><a<?php echo fz_link($link['href'], 'block text-[13px] leading-4.25 transition hover:text-white'); ?>><?php echo esc_html($link['label']); ?></a></li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <div class="pt-4 lg:pt-1">
                <h4 class="text-[12px] leading-4 font-bold tracking-[1px] text-[#E1BC7D] uppercase"><?php echo esc_html($content['connect_title']); ?></h4>
                <?php if (!empty($content['connect_text'])) : ?>
                    <p class="mt-4 text-[13px] leading-4.25 text-[#B4BFD1]"><?php echo esc_html($content['connect_text']); ?></p>
                <?php endif; ?>
                <a<?php echo fz_link($content['connect_link']['href'], 'group mt-4 block w-fit text-[13px] leading-4.25 transition hover:text-white'); ?>><?php echo fz_arrow_label($content['connect_link']['label']); ?></a>
                <?php if (!empty($content['social_links'])) : ?>
                    <ul class="mt-5 flex flex-wrap gap-4">
                        <?php foreach ($content['social_links'] as $social) : ?>
                            <?php $icon = $social_icons[$social['label']] ?? ''; ?>
                            <li>
                                <a href="<?php echo esc_url($social['href']); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr($social['label']); ?>" class="grid size-9 place-items-center rounded-full border border-[#314261] text-[#E2E5ED] transition hover:border-[#E1BC7D] hover:text-[#E1BC7D]">
                                    <?php echo $icon !== '' ? fz_icon($icon) : '<span class="text-[11px]">' . esc_html($social['label']) . '</span>'; ?>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </div>
        </div>
        <div class="mt-16.25 border-t border-[#314261] pt-6.25 text-[11px] leading-3.5 text-[#B4BFD1] lg:mt-15.75 lg:flex lg:justify-between lg:gap-6">
            <p class="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span><?php echo esc_html($content['copyright']); ?></span>
                <?php foreach ($content['legal_links'] ?? [] as $link) : ?>
                    <a<?php echo fz_link($link['href'], 'transition hover:text-white'); ?>><?php echo esc_html($link['label']); ?></a>
                <?php endforeach; ?>
            </p>
            <?php if (!empty($content['note'])) : ?>
                <p class="mt-2 lg:mt-0"><?php echo esc_html($content['note']); ?></p>
            <?php endif; ?>
        </div>
    </div>
</footer>
<?php fz_part('invite-modal'); ?>
<button type="button" data-fz-scroll-top aria-label="Back to top" tabindex="-1" aria-hidden="true" class="fz pointer-events-none fixed right-5 bottom-5 z-[110] grid size-12 translate-y-3 place-items-center rounded-full border border-white/30 bg-navy text-white opacity-0 shadow-[0_10px_24px_-10px_#102B5799] transition duration-300 hover:bg-[#234b84] lg:right-8 lg:bottom-8">
    <?php echo fz_icon('arrow-right', '-rotate-90'); ?>
</button>
