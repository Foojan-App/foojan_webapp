import type { HomeQuoteProps } from "@/types/components";

export default function Quote({ content }: HomeQuoteProps) {
  return (
    <section className="leading-[normal] @container bg-[#D7C7D8] py-26.25 text-center font-dm text-ink-blue">
      <div className="reveal mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
        <p className="text-[11px] leading-3.5 font-bold tracking-[3px] text-navy uppercase">{content.kicker}</p>
        <blockquote className="mx-auto my-5.25 max-w-[337px] font-playfair text-[38px] leading-[49px] tracking-[-2px] italic lg:my-5 lg:max-w-240 lg:py-0.5 lg:text-[clamp(36px,5cqw,72px)] lg:leading-[1.2778] lg:tracking-[-0.0417em]">
          {content.quote}
        </blockquote>
        <p className="text-[11px] leading-3.5 font-bold tracking-[3px] text-navy uppercase">{content.author}</p>
      </div>
    </section>
  );
}
