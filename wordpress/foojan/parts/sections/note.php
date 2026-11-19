<?php
$c = $args['content'];
?>
<div class="bg-paper font-dm">
    <div class="<?php echo fz_ui('container'); ?> flex justify-between gap-5 py-6 text-[13px] leading-5 text-[#6A626B] max-[650px]:flex-col max-[650px]:gap-1.5">
        <span><?php echo esc_html($c['left']); ?></span>
        <span><?php echo esc_html($c['right']); ?></span>
    </div>
</div>
