import Image from "next/image";
import type { HomeHeroProps } from "@/types/components";
import { ArrowUpRightBoldIcon } from "@/utils/svg";
import SiteLink from "../SiteLink";

const buttonClass =
  "group inline-flex h-16.25 items-center justify-center gap-2.25 border border-navy px-6 text-[12px] leading-4 font-bold tracking-[1px] uppercase transition";

export default function Hero({ content }: HomeHeroProps) {
  return (
    <section id="home" className="@container relative scroll-mt-[77px] lg:scroll-mt-24 overflow-hidden bg-[#EDE6E4] font-dm">
      <div className="mx-auto grid w-full max-w-370 px-5.5 lg:min-h-190 lg:grid-cols-[53%_47%] lg:px-[79px]">
        <div className="relative z-2 py-16.25 min-[600px]:max-lg:pt-20 min-[600px]:max-lg:pb-16 lg:pt-28.75 lg:pr-4.5 lg:pb-18.75">
          <p className="text-[11px] leading-3.5 font-bold tracking-[3px] text-[#815F37] uppercase">{content.kicker}</p>
          <h1 className="mt-5.25 h-[2.436em] py-[0.118em] font-playfair text-[min(39px,calc(12.55cqw-6.5px))] leading-[1.1] font-normal tracking-[-0.0549em] whitespace-nowrap text-ink-blue min-[600px]:max-lg:mt-5 min-[600px]:max-lg:h-auto min-[600px]:max-lg:py-0 min-[600px]:max-lg:text-[60px] min-[600px]:max-lg:leading-[1.0395] min-[600px]:max-lg:tracking-[-0.045em] lg:mt-3.75 lg:h-[2.372em] lg:py-[0.148em] lg:text-[min(74.2px,calc(6.5cqw-19.4px))] lg:leading-[1.0395] lg:tracking-[-0.045em]">
            {content.heading}
            <br />
            <em className="text-[#956C4A]">{content.heading_accent}</em>
          </h1>
          <p className="mt-6.5 max-w-[344.92px] text-[15px] leading-[26px] text-[#494650] min-[600px]:max-lg:mt-6 min-[600px]:max-lg:max-w-[552.12px] min-[600px]:max-lg:text-[17px] min-[600px]:max-lg:leading-[29px] lg:mt-5 lg:max-w-[min(552.12px,calc(53cqw-157.74px))] lg:text-[17px] lg:leading-[29px]">{content.paragraph}</p>
          <div className="mt-8.5 grid gap-3 min-[600px]:mt-8.75 min-[600px]:flex min-[600px]:flex-wrap">
            <SiteLink
              href={content.primary_button_href}
              className={`${buttonClass} bg-navy text-white hover:bg-[#234b84] min-[600px]:w-63.5 min-[600px]:justify-start min-[600px]:pr-0 min-[600px]:pl-4.75`}
            >
              <span className="whitespace-nowrap min-[600px]:w-46 min-[600px]:text-center">{content.primary_button_label}</span>
              <span className="grid h-7 w-[16.08px] place-items-center transition-transform duration-300 group-hover:translate-x-1.5">
                <ArrowUpRightBoldIcon />
              </span>
            </SiteLink>
            <SiteLink href={content.secondary_button_href} className={`${buttonClass} text-navy hover:bg-[#f4e9d8] min-[600px]:w-48.25 min-[600px]:justify-start min-[600px]:pr-0 min-[600px]:pl-5.25`}>
              <span className="whitespace-nowrap min-[600px]:w-30 min-[600px]:text-center">{content.secondary_button_label}</span>
              <span className="grid h-7 w-[16.08px] place-items-center transition-transform duration-300 group-hover:translate-x-1.5">
                <ArrowUpRightBoldIcon />
              </span>
            </SiteLink>
          </div>
          <p className="absolute bottom-10 left-0 hidden text-[11px] leading-3.5 font-normal tracking-[2px] text-[#615B63] uppercase lg:block">
            {content.footnote}
          </p>
        </div>

        <div className="relative isolate min-h-122.5 overflow-hidden min-[600px]:max-lg:min-h-190 bg-[#EDE6E4] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(0deg,rgba(17,33,60,0.12)_0%,rgba(17,33,60,0)_25%)] lg:-ml-13.75 lg:min-h-190 lg:w-[calc(100%+55px)] lg:before:absolute lg:before:top-11.25 lg:before:-right-40 lg:before:bottom-0 lg:before:-left-25 lg:before:-z-1 lg:before:bg-[radial-gradient(70.71%_70.71%_at_50%_50%,#D4C4D1_0%,rgba(212,196,209,0)_65%)] lg:before:content-[''] lg:after:bg-[linear-gradient(0deg,rgba(17,33,60,0.13)_0%,rgba(17,33,60,0)_28%)]">
          <Image
            src={content.image_url}
            alt={content.image_alt}
            fill
            priority
            sizes="(min-width: 1024px) 657px, 100vw"
            className="object-cover object-[center_22%] min-[600px]:object-[50%_20%] lg:mask-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.08)_2%,rgba(0,0,0,0.5)_6%,#000_12%)]"
          />
          <p className="absolute top-3.5 right-4.75 z-3 text-[10px] leading-[13px] font-normal tracking-[3px] whitespace-nowrap text-white uppercase [text-shadow:0_1px_5px_#000000] [writing-mode:vertical-rl] lg:top-30 lg:[text-shadow:0_2px_14px_#000000]">
            {content.vertical_text}
          </p>
          <p className="absolute right-4 bottom-7 z-2 font-playfair text-[min(24px,calc(7.678cqw-5.91px))] leading-8 font-normal whitespace-nowrap text-white italic [text-shadow:0_2px_14px_#000000] lg:right-0 lg:bottom-10.5 lg:text-[24px]">
            {content.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
