<?php
$c = fz_content('ait');
?>
<section id="ait" class="@container relative scroll-mt-[77px] overflow-hidden bg-navy py-18.75 font-dm leading-[normal] text-white before:pointer-events-none before:absolute before:top-[-100px] before:right-[max(-3cqw,-43.2px)] before:font-playfair before:text-[480px] before:leading-[normal] before:whitespace-nowrap before:text-[#FFFFFF06] before:content-['AIT'] lg:scroll-mt-24 lg:py-36">
    <div class="relative mx-auto grid w-full max-w-370 items-center gap-[min(9cqw,129.6px)] px-5.5 lg:grid-cols-2 lg:px-[79px]">
        <div class="reveal">
            <p class="text-[11px] leading-3.5 font-bold tracking-[3px] text-[#D6AC68] uppercase"><?php echo esc_html($c['kicker']); ?></p>
            <h2 class="my-4.25 font-playfair text-[43px] leading-[1.12] font-normal tracking-[-0.04em] lg:text-[clamp(50px,6cqw,86.4px)]">
                <?php echo esc_html($c['heading']); ?> <em class="text-[#D9B66D]"><?php echo esc_html($c['heading_accent']); ?></em>
            </h2>
            <?php foreach ($c['paragraphs'] as $paragraph) : ?>
                <p class="my-4 text-[16px] leading-[1.8] text-[#CBD4E2] lg:leading-[29px]"><?php echo esc_html($paragraph); ?></p>
            <?php endforeach; ?>
            <a<?php echo fz_link($c['button']['href'], 'group mt-5 inline-flex h-16.25 w-74 items-center gap-2.25 border border-[#E4C38A] bg-[#E4C38A] pl-4.75 text-[12px] leading-4 font-bold tracking-[1px] text-[#13294F] uppercase transition'); ?>>
                <span class="w-[229px] text-center whitespace-nowrap"><?php echo esc_html($c['button']['label']); ?></span>
                <span class="grid h-7 w-[16.08px] place-items-center transition-transform duration-300 group-hover:translate-x-1.5"><?php echo fz_icon('arrow-up-right-bold'); ?></span>
            </a>
        </div>

        <div id="ait-path" aria-label="The six phases of Awareness Integration Theory" class="reveal relative mx-auto mt-2.5 w-full max-w-162.5 scroll-mt-[77px] pt-6.5 pb-3 before:absolute before:top-12 before:bottom-12 before:left-[29px] before:w-px before:bg-[linear-gradient(#D9B66D,#7185A2_48%,#D9B66D)] before:content-[''] max-lg:mt-11.5 lg:scroll-mt-24 lg:before:left-9">
            <?php foreach ($c['steps'] as $index => $step) : ?>
                <div class="relative flex items-start gap-4.5 pb-5.5 lg:gap-6">
                    <div class="relative z-2 grid size-14.5 shrink-0 place-items-center rounded-full border border-[#D9B66D] font-playfair text-[22px] italic shadow-[0_0_0_8px_#13294F] lg:size-18 lg:text-[27px] <?php echo $index === 0 ? 'bg-[#E4C38A] text-[#13294F]' : 'bg-[#13294F] text-[#EFD59D]'; ?>"><?php echo esc_html($step['number']); ?></div>
                    <div class="pt-2.5">
                        <small class="mb-1.25 block text-[10px] tracking-[2px] text-[#D6AC68] uppercase"><?php echo esc_html($step['eyebrow']); ?></small>
                        <strong class="mb-1.5 block font-playfair text-[24px] leading-[1.05] font-normal lg:text-[30px]"><?php echo esc_html($step['title']); ?></strong>
                        <span class="block max-w-105 text-[13px] leading-[1.5] text-[#C3CBD7]"><?php echo esc_html($step['text']); ?></span>
                    </div>
                </div>
            <?php endforeach; ?>
            <p class="mt-7 ml-19 border-l-2 border-[#D9B66D] bg-white/[0.035] px-5 py-4.5 font-playfair text-[19px] leading-[1.45] text-[#E6D4B3] italic lg:ml-24"><?php echo esc_html($c['caption']); ?></p>
        </div>
    </div>
</section>
