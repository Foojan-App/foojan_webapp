<?php
$c = $args['content'] ?? fz_content('award');
?>
<section id="award" aria-labelledby="award-heading" class="relative scroll-mt-[77px] overflow-hidden bg-[#FAF7F4] py-13.75 font-dm text-ink-blue before:pointer-events-none before:absolute before:-top-37.5 before:-right-45 before:size-105 before:rounded-full before:border before:border-[rgba(181,139,76,0.18)] before:content-[''] lg:scroll-mt-24 lg:pt-22.5 lg:pb-25">
    <div class="reveal relative mx-auto grid w-full max-w-370 items-center gap-8.75 px-5.5 md:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:gap-17.5 lg:px-[79px]">
        <div class="relative flex items-center justify-center border border-[#D6C5AD] bg-[#E9E1DB] p-4.5 after:pointer-events-none after:absolute after:inset-3.75 after:border after:border-[#CBB797] after:content-['']">
            <img src="<?php echo esc_url(fz_img($c['image_url'])); ?>" alt="<?php echo esc_attr($c['image_alt']); ?>" width="1082" height="1454" loading="lazy" decoding="async" class="block h-auto max-h-145 w-full max-w-127.5 object-contain shadow-[0_14px_36px_rgba(24,30,45,0.14)] md:max-h-172.5">
        </div>
        <div>
            <p class="text-[12px] leading-4 font-bold tracking-[0.3em] text-[#B58B4C] uppercase"><?php echo esc_html($c['kicker']); ?></p>
            <h2 id="award-heading" class="mt-5.5 mb-5 font-playfair text-[40px] leading-[1.13] font-normal tracking-[-0.025em] md:text-[clamp(35px,3.5vw,59px)]">
                <?php echo esc_html($c['heading']); ?> <em class="text-[#96704E]"><?php echo esc_html($c['heading_accent']); ?></em>
            </h2>
            <div class="my-6.5 h-0.5 w-16.25 bg-[#B58B4C]"></div>
            <p class="text-[20px] leading-[1.45] font-bold text-navy">
                <?php echo esc_html($c['award_name']); ?>
                <?php if ($c['award_name_line2'] !== '') : ?>
                    <br><?php echo esc_html($c['award_name_line2']); ?>
                <?php endif; ?>
            </p>
            <?php foreach ($c['paragraphs'] as $paragraph) : ?>
                <p class="mt-4 max-w-160 text-[17px] leading-[1.85] text-[#57545B]"><?php echo esc_html($paragraph); ?></p>
            <?php endforeach; ?>
        </div>
    </div>
</section>
