<?php
get_header();
$modified = get_the_modified_date('F j, Y');
?>
<main class="fz">
    <section class="bg-white py-16 md:py-24 lg:py-28">
        <div class="mx-auto w-full max-w-200 px-5 lg:px-6">
            <div class="flex flex-col gap-4 border-b border-[#E8E1D5] pb-8">
                <p class="flex items-center gap-3 text-[12px] leading-[21.25px] font-bold text-[#815F37] uppercase max-[389px]:items-start max-[389px]:gap-2 max-[389px]:text-[11px]"><span class="h-[1.5px] w-7 shrink-0 bg-[#815F37] max-[389px]:mt-2.5"></span>Legal</p>
                <h1 class="font-serif text-[32px] leading-[1.15] font-normal text-ink-blue max-[389px]:text-[28px] md:text-[44px] lg:text-[52px]"><?php echo esc_html(get_the_title()); ?></h1>
                <?php if ($modified) : ?>
                    <p class="text-[14px] text-[#687080]">Last updated <?php echo esc_html($modified); ?></p>
                <?php endif; ?>
            </div>
            <div class="fz-prose pt-6">
                <?php echo wp_kses_post(fz_legal_body(get_the_ID())); ?>
            </div>
        </div>
    </section>
</main>
<?php get_footer(); ?>
