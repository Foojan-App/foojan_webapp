<?php
$c = fz_content('quote');
?>
<section class="@container bg-[#D7C7D8] py-26.25 text-center font-dm leading-[normal] text-ink-blue">
    <div class="reveal mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
        <p class="text-[11px] leading-3.5 font-bold tracking-[3px] text-navy uppercase"><?php echo esc_html($c['kicker']); ?></p>
        <blockquote class="mx-auto my-5.25 max-w-[337px] font-playfair text-[38px] leading-[49px] tracking-[-2px] italic lg:my-5 lg:max-w-240 lg:py-0.5 lg:text-[clamp(36px,5cqw,72px)] lg:leading-[1.2778] lg:tracking-[-0.0417em]"><?php echo esc_html($c['quote']); ?></blockquote>
        <p class="text-[11px] leading-3.5 font-bold tracking-[3px] text-navy uppercase"><?php echo esc_html($c['author']); ?></p>
    </div>
</section>
