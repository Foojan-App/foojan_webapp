<?php
$items = $args['items'] ?? [];
$repeat = max(1, (int) ($args['repeat'] ?? 1));
if (!$items) {
    return;
}
?>
<div aria-hidden="true" class="h-15.25 overflow-hidden border-t-2 border-[#BD9040] bg-navy pt-6 font-dm whitespace-nowrap">
    <div class="flex w-max animate-[marquee_35s_linear_infinite] motion-reduce:animate-none">
        <?php for ($copy = 0; $copy < 2 * $repeat; $copy++) : ?>
            <p class="pr-12.25 text-[11px] leading-3.5 font-bold tracking-[2.2px] text-[#F6EDE0] uppercase">
                <?php foreach ($items as $item) : ?>
                    <span><?php echo esc_html($item); ?> <b class="font-black text-[#D9AD5E]">✦</b> </span>
                <?php endforeach; ?>
            </p>
        <?php endfor; ?>
    </div>
</div>
