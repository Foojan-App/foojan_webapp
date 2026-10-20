import { ArrowUpRightBoldIcon } from "@/utils/svg";
import type { HomeAitProps } from "@/types/components";
import SiteLink from "../SiteLink";

export default function Ait({ content }: HomeAitProps) {
  return (
    <section
      id="ait"
      className="leading-[normal] @container relative scroll-mt-[77px] lg:scroll-mt-24 overflow-hidden bg-navy py-18.75 font-dm text-white before:pointer-events-none before:absolute before:top-[-100px] before:right-[max(-3cqw,-43.2px)] before:font-playfair before:text-[480px] before:leading-[normal] before:whitespace-nowrap before:text-[#FFFFFF06] before:content-['AIT'] lg:py-36"
    >
      <div className="relative mx-auto grid w-full max-w-370 items-center gap-[min(9cqw,129.6px)] px-5.5 lg:grid-cols-2 lg:px-[79px]">
        <div className="reveal">
          <p className="text-[11px] leading-3.5 font-bold tracking-[3px] text-[#D6AC68] uppercase">{content.kicker}</p>
          <h2 className="my-4.25 font-playfair text-[43px] leading-[1.12] font-normal tracking-[-0.04em] lg:text-[clamp(50px,6cqw,86.4px)]">
            {content.heading} <em className="text-[#D9B66D]">{content.heading_accent}</em>
          </h2>
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="my-4 text-[16px] leading-[1.8] text-[#CBD4E2] lg:leading-[29px]">
              {paragraph}
            </p>
          ))}
          <SiteLink
            href={content.button.href}
            className="group mt-5 inline-flex h-16.25 w-74 items-center gap-2.25 border border-[#E4C38A] bg-[#E4C38A] pl-4.75 text-[12px] leading-4 font-bold tracking-[1px] text-[#13294F] uppercase transition"
          >
            <span className="w-[229px] text-center whitespace-nowrap">{content.button.label}</span>
            <span className="grid h-7 w-[16.08px] place-items-center transition-transform duration-300 group-hover:translate-x-1.5">
              <ArrowUpRightBoldIcon />
            </span>
          </SiteLink>
        </div>

        <div
          id="ait-path"
          aria-label="The six phases of Awareness Integration Theory"
          className="reveal relative mx-auto mt-2.5 w-full max-w-162.5 scroll-mt-[77px] lg:scroll-mt-24 pt-6.5 pb-3 before:absolute before:top-12 before:bottom-12 before:left-[29px] before:w-px before:bg-[linear-gradient(#D9B66D,#7185A2_48%,#D9B66D)] before:content-[''] max-lg:mt-11.5 lg:before:left-9"
        >
          {content.steps.map((step, index) => (
            <div key={step.number} className="relative flex items-start gap-4.5 pb-5.5 lg:gap-6">
              <div
                className={`relative z-2 grid size-14.5 shrink-0 place-items-center rounded-full border border-[#D9B66D] font-playfair text-[22px] italic shadow-[0_0_0_8px_#13294F] lg:size-18 lg:text-[27px] ${
                  index === 0 ? "bg-[#E4C38A] text-[#13294F]" : "bg-[#13294F] text-[#EFD59D]"
                }`}
              >
                {step.number}
              </div>
              <div className="pt-2.5">
                <small className="mb-1.25 block text-[10px] tracking-[2px] text-[#D6AC68] uppercase">{step.eyebrow}</small>
                <strong className="mb-1.5 block font-playfair text-[24px] leading-[1.05] font-normal lg:text-[30px]">{step.title}</strong>
                <span className="block max-w-105 text-[13px] leading-[1.5] text-[#C3CBD7]">{step.text}</span>
              </div>
            </div>
          ))}
          <p className="mt-7 ml-19 border-l-2 border-[#D9B66D] bg-white/[0.035] px-5 py-4.5 font-playfair text-[19px] leading-[1.45] text-[#E6D4B3] italic lg:ml-24">
            {content.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
