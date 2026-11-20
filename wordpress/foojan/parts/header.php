<?php
$menu = array_values(array_filter(fz_content('header')['menu'] ?? [], fn($item) => ($item['visible'] ?? true) !== false));
$current = trailingslashit(strtok((string) ($_SERVER['REQUEST_URI'] ?? '/'), '?'));
$top_link = 'text-[13px] leading-none font-bold whitespace-nowrap text-ink-blue transition hover:text-[#BD9040]';
?>
<header data-fz-header class="fz fz-zoom fz-site-header sticky top-0 z-[110] border-b border-[#E4DEDB] bg-[#FAF7F3F7] font-dm text-ink-blue backdrop-blur-[12px] transform-gpu">
    <div class="mx-auto flex h-19 w-full max-w-370 items-center justify-between gap-3 pr-7 pl-5.75 lg:h-23.75 lg:px-[79px]">
        <?php fz_part('logo'); ?>

        <button type="button" data-fz-menu-toggle aria-label="Open navigation" aria-expanded="false" aria-controls="site-menu" class="grid h-9.25 w-7 place-items-center text-navy lg:hidden [.fz-nav-full_&]:hidden">
            <span data-fz-icon-open><?php echo fz_icon('menu', 'h-4 w-5.25'); ?></span>
            <span data-fz-icon-close class="hidden"><?php echo fz_icon('close', 'size-5'); ?></span>
        </button>

        <nav aria-label="Main" data-fz-desktop-nav class="hidden items-center gap-4.75 lg:flex [.fz-nav-full_&]:flex">
            <?php foreach ($menu as $index => $item) : ?>
                <?php if (!empty($item['children'])) : ?>
                    <div data-fz-group="<?php echo (int) $index; ?>" class="group relative flex items-center">
                        <a<?php echo fz_link($item['href'], $top_link, 'aria-haspopup="true"'); ?>><?php echo esc_html($item['label']); ?></a>
                        <button type="button" data-fz-group-toggle aria-label="<?php echo esc_attr('Expand ' . $item['label'] . ' menu'); ?>" aria-expanded="false" class="ml-1.25 grid h-5.5 w-2.25 place-items-center pt-1 text-[#26324a]">
                            <?php echo fz_icon('chevron-down', 'size-1.75'); ?>
                        </button>
                        <div data-fz-dropdown class="absolute top-full left-0 z-50 hidden min-w-55 border border-[#e9e1d8] bg-white p-2.25 shadow-[0_15px_32px_rgba(20,28,48,0.12)] group-hover:block group-has-[:focus-visible]:block">
                            <?php foreach ($item['children'] as $link) : ?>
                                <a<?php echo fz_link($link['href'], 'block px-3 py-2.5 text-[12px] font-semibold whitespace-nowrap text-[#1b2842] hover:bg-[#f6f1eb] hover:text-[#795b7f] focus-visible:bg-[#f6f1eb] focus-visible:text-[#795b7f]'); ?>><?php echo esc_html($link['label']); ?></a>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php else : ?>
                    <?php $is_current = trailingslashit((string) wp_parse_url(fz_href($item['href']), PHP_URL_PATH)) === $current && !str_starts_with($item['href'], '#'); ?>
                    <a<?php echo fz_link($item['href'], $top_link, $is_current ? 'aria-current="page"' : ''); ?>><?php echo esc_html($item['label']); ?></a>
                <?php endif; ?>
            <?php endforeach; ?>
            <a<?php echo fz_link('#contact', 'group/invite flex h-10.5 w-41.25 items-center bg-navy pl-3.5 text-[12px] leading-none font-bold tracking-[1px] whitespace-nowrap text-white uppercase transition hover:bg-[#234b84]'); ?>>Invite Dr. Foojan&nbsp;<span class="inline-block transition-transform duration-300 group-hover/invite:translate-x-1">↗</span></a>
        </nav>
    </div>

    <nav id="site-menu" aria-label="Main" hidden class="absolute inset-x-0 top-full max-h-[calc(100dvh-77px)] overflow-y-auto bg-paper pt-2 pr-7 pb-6 pl-5.75 shadow-[0_20px_25px_#0002] lg:hidden [.fz-nav-full_&]:hidden">
        <?php foreach ($menu as $index => $item) : ?>
            <div data-fz-mobile-group class="flex flex-wrap items-center">
                <a<?php echo fz_link($item['href'], 'flex min-h-11 flex-1 items-center text-[15px] leading-none font-bold'); ?>><?php echo esc_html($item['label']); ?></a>
                <?php if (!empty($item['children'])) : ?>
                    <button type="button" data-fz-mobile-toggle aria-label="<?php echo esc_attr('Expand ' . $item['label'] . ' menu'); ?>" aria-expanded="false" class="grid h-11 w-7 place-items-center text-[#26324a]">
                        <?php echo fz_icon('chevron-down', 'size-2.5 transition'); ?>
                    </button>
                    <div data-fz-mobile-links hidden class="mb-2 w-full border-l-2 border-[#bca077] pl-3">
                        <?php foreach ($item['children'] as $link) : ?>
                            <a<?php echo fz_link($link['href'], 'flex min-h-10 items-center text-[14px] leading-none font-semibold text-[#1b2842]'); ?>><?php echo esc_html($link['label']); ?></a>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
        <a<?php echo fz_link('#contact', 'mt-4 flex h-10.5 items-center justify-center bg-navy px-3.5 text-[12px] leading-none font-bold tracking-[1px] text-white uppercase'); ?>>Invite Dr. Foojan ↗</a>
    </nav>
</header>
