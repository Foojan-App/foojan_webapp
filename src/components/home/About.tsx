import { ArrowUpRightBoldIcon } from "@/utils/svg";
import type { HomeAboutProps } from "@/types/components";
import BoldText from "../BoldText";
import SiteLink from "../SiteLink";

export default function About({ content }: HomeAboutProps) {
  return (
    <section id="about" className="leading-[normal] @container scroll-mt-[77px] lg:scroll-mt-24 bg-paper py-18.75 font-dm text-ink-blue lg:py-36">
      <div className="mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-[min(9cqw,129.6px)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal">
            <p className="text-[11px] leading-3.5 font-bold tracking-[3px] uppercase min-[390px]:whitespace-nowrap lg:-mt-4.25 lg:mb-8.5">{content.kicker}</p>
            <h2 className="my-4.25 font-playfair lg:mt-0 lg:h-83.75 text-[43px] leading-[1.12] font-normal tracking-[-0.04em] lg:text-[clamp(42px,5.2083cqw,75px)]">
              {content.heading}
              <br />
              <em className="text-[#8B6A8D]">{content.heading_accent}</em>
            </h2>
          </div>
          <div className="reveal border-l border-[#B8AEB6] pl-6.25 lg:pl-10.5">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph} className="my-4.25 text-[17px] leading-[1.8] text-[#56515C] lg:my-4 lg:max-w-[491.2px] lg:leading-[31px] lg:first:mt-[16.5px]">
                <BoldText text={paragraph} />
              </p>
            ))}
            <SiteLink
              href={content.link.href}
              className="group mt-[22px] inline-flex items-start border-b border-[#BD9040] pb-2.5 text-[12px] font-bold tracking-[1px] uppercase"
            >
              <span className="mt-1.75 w-[137.26px] leading-4 whitespace-nowrap">{content.link.label}</span>
              <span className="ml-[12.74px] grid h-7 w-[16.7px] place-items-center transition-transform duration-300 group-hover:translate-x-1.5">
                <ArrowUpRightBoldIcon />
              </span>
            </SiteLink>
          </div>
        </div>
        <div className="reveal -mx-5 mt-[80.5px] grid grid-cols-2 lg:mt-20 text-center lg:mx-0 lg:grid-cols-4 lg:border-t lg:border-[#D9D0D5] lg:text-left">
          {content.proof.map((item, index) => (
            <div
              key={item.title}
              className={`border-r border-[#D9D0D5] px-2 pt-[29px] pb-7 min-[390px]:px-6 lg:px-7.5 lg:py-6.25 ${
                index < content.proof.length - 1 ? "lg:border-r" : "lg:border-r-0"
              } ${index === 0 ? "lg:pl-0" : ""}`}
            >
              <strong className="mb-2 block font-playfair text-[min(20px,calc(6.94cqw-2.5px))] font-normal whitespace-nowrap lg:mb-2.25 lg:text-[32px]">{item.title}</strong>
              <span className="block text-[11px] tracking-[1px] text-[#6A626B] uppercase lg:inline">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
