import { ArrowRightIcon } from "@/utils/svg";
import { Container } from "./ui";

export default function ContactBand() {
  return (
    <section className="bg-white pb-20 md:max-lg:pb-24 lg:py-25">
      <Container>
        <div
          id="contact"
          className="flex flex-col gap-6 rounded-[14px] bg-purple p-6 text-white lg:min-h-[262.38px] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-10"
        >
          <div className="flex flex-col gap-3 lg:w-153.25 lg:gap-4">
            <h2 className="font-serif text-[32px] leading-[1.2] font-medium md:max-lg:text-[44px] text-white max-lg:h-28.5 max-[389px]:h-auto! md:max-lg:h-auto! lg:w-157.5 lg:text-[48px]">
              Speaking. Media. <br className="max-[389px]:hidden md:hidden" />
              Education.{" "}
              <br className="max-[389px]:hidden md:max-lg:hidden" />
              Collaboration.
            </h2>
            <p className="text-[16px] leading-normal text-white lg:h-[50.38px] lg:text-[17.3px] lg:leading-[29.38px] lg:whitespace-nowrap">
              Whether you are planning an event, producing a program, or exploring <br className="hidden lg:block" />
              professional training in AIT — start a conversation with Dr. Foojan&rsquo;s office.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 md:max-lg:flex-row md:max-lg:[&>a]:flex-1 lg:w-60">
            <a
              href="mailto:"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-md border border-transparent bg-white text-[14.5px] leading-[24.65px] font-semibold tracking-[0.14px] text-plum-950 transition hover:bg-lavender-50"
            >
              Get in touch <ArrowRightIcon />
            </a>
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
