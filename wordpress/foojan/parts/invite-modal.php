<?php
$c = fz_content('invite');
$label = 'mb-4 block text-[12px] font-bold tracking-[0.06em] uppercase';
$input = 'mt-2 block w-full rounded-[3px] border border-[#C9C3CA] bg-white p-3.25 text-[15px] font-normal tracking-normal text-[#1C2741] normal-case placeholder:text-[#757575] focus:border-navy focus:outline-none';
?>
<div data-fz-invite hidden role="dialog" aria-modal="true" aria-label="Invite Dr. Foojan speaking inquiry" class="fz fixed inset-0 z-[9999] flex items-start justify-center overflow-auto bg-[rgba(12,19,37,0.78)] p-3.75 font-dm text-[#1C2741] min-[801px]:px-5 min-[801px]:py-[5vh]">
    <div class="@container relative m-auto grid w-full max-w-260 gap-9 bg-[#F3EAF3] px-5.5 pt-12.5 pb-6.5 leading-[normal] shadow-[0_22px_100px_rgba(0,0,0,0.3)] min-[801px]:grid-cols-[1fr_1.15fr] min-[801px]:p-[clamp(30px,5vw,75px)]">
        <button type="button" data-fz-invite-close aria-label="Close invitation form" class="absolute top-2.5 right-4.25 px-3.5 py-2 text-[2.4rem] leading-none text-[#17223D]">×</button>
        <div>
            <p class="text-[11px] leading-3.5 font-bold tracking-[3px] uppercase"><?php echo esc_html($c['kicker']); ?></p>
            <h2 class="my-6 font-playfair text-[clamp(36px,4vw,56px)] leading-[1.12] font-normal tracking-[-0.04em]">
                <?php echo esc_html($c['heading']); ?> <em class="text-[#8C6B8E]"><?php echo esc_html($c['heading_accent']); ?></em>
            </h2>
            <p class="text-[18px] leading-[1.7] text-[#5D5964]"><?php echo esc_html($c['paragraph']); ?></p>
        </div>

        <div data-fz-invite-done hidden role="status" class="bg-white p-[clamp(22px,3vw,44px)] shadow-[0_15px_45px_#142C4C12]">
            <h3 class="mb-3 font-playfair text-[30px] font-normal">Thank you.</h3>
            <p class="text-[16px] leading-[1.7] text-[#5D5964]"><span data-fz-invite-message></span> Dr. Foojan’s office will get back to you.</p>
        </div>

        <form data-fz-invite-form novalidate class="relative bg-white p-[clamp(22px,3vw,44px)] shadow-[0_15px_45px_#142C4C12]">
            <h3 class="mb-5 font-playfair text-[30px] font-normal"><?php echo esc_html($c['form_title']); ?></h3>
            <div class="grid gap-x-3.75 min-[761px]:grid-cols-2">
                <label class="<?php echo $label; ?>">Your name
                    <input name="name" required maxlength="120" autocomplete="name" placeholder="Your full name" class="<?php echo $input; ?>">
                </label>
                <label class="<?php echo $label; ?>">Organization
                    <input name="organization" maxlength="200" placeholder="Organization" class="<?php echo $input; ?>">
                </label>
            </div>
            <label class="<?php echo $label; ?>">Email
                <input name="email" type="email" required maxlength="200" autocomplete="email" placeholder="you@example.com" class="<?php echo $input; ?>">
            </label>
            <div class="grid gap-x-3.75 min-[761px]:grid-cols-2">
                <label class="<?php echo $label; ?>">Phone
                    <input name="phone" type="tel" maxlength="40" autocomplete="tel" placeholder="Phone number" class="<?php echo $input; ?>">
                </label>
                <label class="<?php echo $label; ?>">
                    <span class="flex items-center justify-between gap-2">Event date
                        <button type="button" data-fz-date-clear hidden class="cursor-pointer text-[11px] font-bold tracking-[0.06em] text-[#8C6B8E] uppercase hover:underline">Clear</button>
                    </span>
                    <span class="relative mt-2 block">
                        <input name="date" type="date" data-fz-date class="peer fz-date-empty <?php echo $input; ?> mt-0!">
                        <span data-fz-date-placeholder class="pointer-events-none absolute top-1/2 right-10 left-3.5 -translate-y-1/2 truncate text-[15px] font-normal tracking-normal text-[#757575] normal-case peer-focus:hidden">Select date</span>
                    </span>
                </label>
            </div>
            <label class="<?php echo $label; ?>">Tell us about your event
                <textarea name="details" required minlength="10" maxlength="4900" rows="4" placeholder="Audience, location, topic, and what you have in mind" class="<?php echo $input; ?>"></textarea>
            </label>
            <input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="absolute -left-[9999px] h-0 w-0 opacity-0">
            <button type="submit" data-fz-invite-submit class="group inline-flex h-16.25 cursor-pointer items-center gap-2.25 border border-[#E4C38A] bg-[#E4C38A] px-6 text-[12px] leading-4 font-bold tracking-[1px] text-[#13294F] uppercase transition disabled:opacity-60">
                <span data-fz-submit-label data-label="<?php echo esc_attr($c['submit_label']); ?>"><?php echo esc_html($c['submit_label']); ?></span>
                <span class="grid h-7 w-[16.08px] place-items-center transition-transform duration-300 group-hover:translate-x-1.5"><?php echo fz_icon('arrow-up-right-bold'); ?></span>
            </button>
            <p data-fz-invite-error hidden role="alert" class="mt-3.5 text-[13px] leading-normal text-[#B42318]"></p>
        </form>
    </div>
</div>
