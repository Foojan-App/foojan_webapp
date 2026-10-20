import { ArrowUpRightSmallIcon } from "@/utils/svg";
import type { HomePublicationsProps } from "@/types/components";
import SiteLink from "../SiteLink";

export default function Publications({ content }: HomePublicationsProps) {
  return (
    <section id="publications" className="leading-[normal] @container scroll-mt-[77px] lg:scroll-mt-24 bg-[#FAF7F2] py-16.25 font-dm text-ink-blue lg:py-27.5">
      <div className="mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
        <p className="text-[11px] leading-3.5 font-bold tracking-[3px] uppercase">{content.kicker}</p>
        <div className="mt-5 mb-11.25 lg:flex lg:items-end lg:justify-between lg:gap-12.5">
          <h2 className="flex-1 font-playfair text-[44px] leading-[1.15] font-normal tracking-[-0.04em] text-[#19243E] lg:text-[clamp(44px,5.4cqw,77.76px)]">
            {content.heading}
            <br />
            <em className="text-[#8F7090]">{content.heading_accent}</em>
          </h2>
          <p className="mt-5.5 mb-4.75 text-[19px] leading-[1.7] text-[#5E5B66] lg:mt-4.75 lg:max-w-97.5 lg:flex-[0_1_390px]">{content.paragraph}</p>
        </div>
        <div className="grid gap-5.5 lg:grid-cols-2">
          {content.panels.map((panel, index) => (
            <div
              key={panel.index}
              className={`flex min-h-77.5 flex-col items-start p-7.5 text-white lg:min-h-91.25 lg:p-11.25 ${
                index === 0 ? "bg-[linear-gradient(113.41deg,#997B84_0%,#483750_100%)]" : "bg-[linear-gradient(113.41deg,#414F76_0%,#1C3057_100%)]"
              }`}
            >
              <p className="text-[12px] font-bold tracking-[2px] text-[#EAC98B] uppercase">{panel.index}</p>
              <h3 className="mt-8.75 mb-2.5 font-playfair text-[30px] leading-[1.15] font-normal lg:text-[clamp(30px,3.5cqw,50px)]">{panel.title}</h3>
              <p className="mb-7 max-w-105 text-[16px] leading-[1.7]">{panel.text}</p>
              <SiteLink
                href={panel.link.href}
                className="mt-auto inline-flex items-start border-b border-[#D9B36C] pb-2.5 text-[13px] leading-[17px] font-bold tracking-[2px] whitespace-nowrap uppercase"
              >
                <span className="mt-2.25">{panel.link.label}</span>
                <span className="ml-3.25 grid h-7.5 w-3.25 place-items-center">
                  <ArrowUpRightSmallIcon />
                </span>
              </SiteLink>
            </div>
          ))}
        </div>
        <p className="mt-5.5 mb-4 text-[16px] leading-[1.8] text-[#56515C]">{content.note}</p>
      </div>
    </section>
  );
}
