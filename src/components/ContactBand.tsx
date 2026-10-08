import { ArrowRightIcon } from "@/utils/svg";
import { Container } from "./ui";

// separate section after "A personal note"; box radius 14, #942BA9 — desktop 1240×262.38, 40px padding, section padding 100px top and bottom;
// mobile 350×418, 24px padding, section padding 0 top and 80px bottom
export default function ContactBand() {
  return (
    <section className="bg-white pb-20 lg:py-25">
      <Container>
        <div
          id="contact"
          className="flex flex-col gap-6 rounded-[14px] bg-purple p-6 text-white lg:min-h-[262.38px] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-10"
        >
          {/* text: desktop 613×182.38, heading and paragraph 16px apart; mobile 302×222, 12px gap */}
          <div className="flex flex-col gap-3 lg:w-153.25 lg:gap-4">
            {/* heading: Lora 500 / 120%, white — desktop 48px, 630×116 (overflows the 613px group); mobile 32px, 302×114 box (3 lines at 120% = 115.2, so the box is fixed at 114) */}
            <h2 className="font-serif text-[32px] leading-[1.2] font-medium text-white max-lg:h-28.5 lg:w-157.5 lg:text-[48px]">
              Speaking. Media. <br className="lg:hidden" />
              Education.
              <br />
              Collaboration.
            </h2>
            {/* paragraph: Inter, white — desktop 17.3px / 29.38px, 613×50.38 box (2 lines slightly overflow it); mobile 16px / 150%, 302×96 (4 lines) */}
            <p className="text-[16px] leading-normal text-white lg:h-[50.38px] lg:text-[17.3px] lg:leading-[29.38px] lg:whitespace-nowrap">
              Whether you are planning an event, producing a program, or exploring <br className="hidden lg:block" />
              professional training in AIT — start a conversation with Dr. Foojan&rsquo;s office.
            </p>
          </div>
          {/* buttons: 12px gap → two 56px buttons; desktop 240×124, mobile 302×124 */}
          <div className="flex w-full flex-col gap-3 lg:w-60">
            {/* 240×56, radius 6, white, 1px black border; Inter 600 14.5px #1A002B + 18px arrow, centred */}
            <a
              href="mailto:"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-md border border-black bg-white text-[14.5px] leading-[24.65px] font-semibold tracking-[0.14px] text-plum-950 transition hover:bg-lavender-50"
            >
              Get in touch <ArrowRightIcon />
            </a>
            {/* 240×56, radius 6, 1px #FFFFFF40 border, transparent */}
            <a
              href="#speaking"
              className="inline-flex h-14 items-center justify-center rounded-md border border-[#FFFFFF40] text-[14.5px] leading-[24.65px] font-semibold tracking-[0.14px] text-white transition hover:border-white/60"
            >
              Speaking inquiries
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
