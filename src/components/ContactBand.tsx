import { ArrowRightIcon } from "@/utils/svg";
import type { ContactBandProps } from "@/types/components";
import { LineBreaks } from "@/types/enums";
import AccentText from "./AccentText";
import { Container } from "./ui";
import SiteLink from "./SiteLink";

export default function ContactBand({ content }: ContactBandProps) {
  return (
    <section className="bg-white pb-20 md:max-lg:pb-24 lg:py-25">
      <Container>
        <div
          id="contact"
          className="flex flex-col gap-6 rounded-[14px] bg-purple p-6 text-white lg:min-h-[262.38px] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-10"
        >
          <div className="flex flex-col gap-3 lg:w-153.25 lg:gap-4">
            <h2 className="font-serif text-[32px] leading-[1.2] max-md:h-auto! max-md:text-[26px] max-md:[&_br]:hidden max-[389px]:text-[24px] font-medium md:max-lg:text-[44px] text-white max-lg:h-28.5 max-[389px]:h-auto! md:max-lg:h-auto! lg:w-157.5 lg:text-[48px]">
              <AccentText text={content.heading} breaks={LineBreaks.DesktopAndPhone} />
            </h2>
            <p className="text-[16px] leading-normal text-white max-md:text-[15px] max-md:leading-[1.6] max-md:[&_br]:hidden md:max-lg:text-[18px] lg:h-[50.38px] lg:text-[17.3px] lg:leading-[29.38px]">
              <AccentText text={content.paragraph} breaks={LineBreaks.DesktopAndPhone} />
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 md:max-lg:flex-row md:max-lg:[&>a]:flex-1 lg:w-60">
            <SiteLink
              href={content.primary_button_href}
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-md border border-transparent bg-white max-md:h-12 text-[14.5px] leading-[24.65px] font-semibold tracking-[0.14px] text-plum-950 transition hover:bg-lavender-50"
            >
              {content.primary_button_label} <ArrowRightIcon />
            </SiteLink>
            <SiteLink
              href={content.secondary_button_href}
              className="inline-flex h-14 items-center justify-center rounded-md border border-[#FFFFFF40] max-md:h-12 text-[14.5px] leading-[24.65px] font-semibold tracking-[0.14px] text-white transition hover:border-white/60"
            >
              {content.secondary_button_label}
            </SiteLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
