<?php
get_header();
$c = fz_meet_content(get_the_ID());
$eyebrow = 'flex items-center gap-3 text-[12px] leading-[21.25px] font-bold text-[#815F37] uppercase max-[389px]:items-start max-[389px]:gap-2 max-[389px]:text-[11px]';
$rule = '<span class="h-[1.5px] w-7 shrink-0 bg-[#815F37] max-[389px]:mt-2.5"></span>';
?>
<main class="fz">
    <section class="bg-[#EDE6E4] py-16 md:py-24 lg:py-28">
        <div class="mx-auto grid w-full max-w-322 items-center gap-12 px-5 min-[700px]:max-lg:grid-cols-[minmax(0,640fr)_minmax(0,440fr)] min-[700px]:max-lg:gap-[4vw] lg:grid-cols-[minmax(0,640px)_minmax(0,440px)] lg:justify-between lg:px-6">
            <div class="flex flex-col gap-6">
                <p class="<?php echo $eyebrow; ?>"><?php echo $rule . esc_html($c['eyebrow']); ?></p>
                <h1 class="font-serif text-[32px] leading-[1.15] font-normal text-ink-blue max-[389px]:text-[28px] min-[430px]:max-lg:[&_br]:hidden min-[700px]:max-lg:text-[clamp(34px,5vw,52px)] md:leading-[1.12] lg:text-[60px]"><?php echo fz_accent($c['heading']); ?></h1>
                <p class="text-[14px] leading-6 font-semibold tracking-[0.2px] text-ink-blue md:text-[15px]"><?php echo esc_html($c['subtitle']); ?></p>
                <p class="text-[16px] leading-[1.6] text-[#56515C] min-[700px]:max-lg:text-[clamp(16px,1.75vw,19px)] lg:text-[19px] lg:leading-8.25"><?php echo esc_html($c['intro']); ?></p>
            </div>
            <div class="relative mx-auto w-full max-w-110 pr-4.5 pb-4.5 pl-9 min-[700px]:mx-0">
                <div class="absolute top-4.5 right-0 bottom-0 left-13.5 rounded-[10px] border border-[#BD9040]"></div>
                <div class="relative aspect-[463.09/578.86] overflow-hidden rounded-[10px] bg-[#E8E0ED] shadow-[0_14px_40px_-18px_#0B235033]">
                    <img src="<?php echo esc_url(fz_img($c['image_url'])); ?>" alt="Dr. Foojan Zeine" fetchpriority="high" decoding="async" class="absolute inset-0 size-full object-cover">
                </div>
            </div>
        </div>
    </section>

    <section class="bg-paper py-16 md:py-24">
        <div class="mx-auto grid w-full max-w-322 gap-12 px-5 md:max-lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:max-lg:gap-8 lg:grid-cols-[minmax(0,720px)_minmax(0,380px)] lg:justify-between lg:gap-16 lg:px-6">
            <article class="fz-prose fz-prose-meet">
                <?php echo wp_kses_post($c['body']); ?>
            </article>
            <aside class="flex flex-col gap-4 self-start min-[560px]:max-md:grid min-[560px]:max-md:grid-cols-2 min-[560px]:max-md:[&>p]:col-span-2 lg:sticky lg:top-32">
                <p class="text-[13px] leading-4 font-bold tracking-[1.82px] text-ink-blue uppercase"><?php echo esc_html($c['highlights_title']); ?></p>
                <?php foreach ($c['highlights'] as $highlight) : ?>
                    <div class="rounded-[10px] border border-[#E5DFE3] bg-white p-5">
                        <p class="font-serif text-[20px] leading-[1.3] font-normal text-ink-blue"><?php echo esc_html($highlight['title']); ?></p>
                        <ul class="mt-3 flex flex-col gap-2">
                            <?php foreach (array_filter(array_map('trim', preg_split('/\r?\n/', (string) $highlight['items']))) as $item) : ?>
                                <li class="flex gap-2.5 text-[15px] leading-6 text-[#56515C]"><span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#BD9040]"></span><?php echo esc_html($item); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endforeach; ?>
            </aside>
        </div>
    </section>

    <section class="bg-paper pb-20 md:pb-24">
        <div class="mx-auto w-full max-w-322 px-5 lg:px-6">
            <div class="flex flex-col gap-6 rounded-[14px] bg-navy p-8 text-white min-[700px]:flex-row min-[700px]:items-center min-[700px]:justify-between min-[700px]:gap-10 md:p-10">
                <div class="flex max-w-170 flex-col gap-3">
                    <h2 class="font-serif text-[32px] leading-[1.2] font-normal max-[389px]:text-[28px] min-[700px]:max-lg:text-[34px] lg:text-[40px] [&_.accent]:text-[#E4C38A]"><?php echo fz_accent($c['cta_heading']); ?></h2>
                    <p class="text-[15px] leading-[1.6] text-[#CBD4E2] md:text-[17px] md:leading-6.75"><?php echo esc_html($c['cta_paragraph']); ?></p>
                </div>
                <a<?php echo fz_link($c['cta_button_href'], 'group inline-flex h-14 max-w-full shrink-0 items-center justify-center gap-2.5 rounded-md border border-[#E4C38A] bg-[#E4C38A] px-8 text-[14.5px] font-semibold tracking-[0.14px] text-[#13294F] transition hover:brightness-105'); ?>>
                    <?php echo esc_html($c['cta_button_label']); ?>
                    <?php echo fz_icon('arrow-right', 'shrink-0 transition-transform duration-300 group-hover:translate-x-1.5'); ?>
                </a>
            </div>
        </div>
    </section>
</main>
<?php get_footer(); ?>
