import Image from "next/image";
import { AppleLogoIcon, ArrowUpRightBoldIcon, GooglePlayLogoIcon } from "@/utils/svg";
import type { HomeMiraProps } from "@/types/components";
import { StorePlatform } from "@/types/enums";
import SiteLink from "../SiteLink";

const stores = {
  [StorePlatform.AppStore]: { icon: AppleLogoIcon, caption: "Download on the" },
  [StorePlatform.GooglePlay]: { icon: GooglePlayLogoIcon, caption: "Get it on" },
};

const kicker = "text-[11px] leading-3.5 font-bold tracking-[3px] uppercase";

export default function Mira({ content }: HomeMiraProps) {
  return (
    <section id="mira" className="leading-[normal] @container scroll-mt-[77px] lg:scroll-mt-24 bg-[#F8F5EF] py-18.75 font-dm text-ink-blue lg:py-36">
      <div className="mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
        <p className={kicker}>{content.kicker}</p>
        <div className="reveal mt-6 mb-12 grid items-end gap-3.75 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[min(8cqw,115.2px)]">
          <h2 className="font-playfair text-[43px] leading-[1.12] font-normal tracking-[-0.04em] lg:text-[clamp(42px,5.2cqw,74.88px)]">
            {content.heading} <em className="text-[#8B6A8D]">{content.heading_accent}</em>
          </h2>
          <p className="mb-1.75 max-w-127.5 text-[16px] leading-[1.8] text-[#56515C]">{content.paragraph}</p>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-2">
          {content.products.map((product) => (
            <article key={product.kicker} className="reveal border border-[#E5DFE3] bg-white">
              <div className="relative h-90 bg-[#F7F4F1] p-3.75 lg:h-107.5 lg:px-4.5 lg:py-5">
                <div className="relative h-full w-full">
                  <Image src={product.image_url} alt={product.image_alt} fill sizes="(min-width: 1024px) 600px, 340px" className="object-contain" />
                </div>
              </div>
              <div className="p-6 lg:px-7.5 lg:pt-6.75 lg:pb-7.5">
                <span className={kicker}>{product.kicker}</span>
                <h3 className="mt-2.5 mb-3.5 font-playfair text-[31px] leading-[1.15] font-normal lg:text-[37px]">
                  {product.title}
                  {product.title_line2 && (
                    <>
                      <br />
                      {product.title_line2}
                    </>
                  )}
                </h3>
                {product.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mb-3.25 max-w-127.5 text-[15px] leading-[1.62] text-[#56515C] last-of-type:mb-3.75">
                    {paragraph}
                  </p>
                ))}
                {product.highlight && (
                  <p className="mb-3.75 max-w-127.5 text-[15px] leading-[1.62] text-[#56515C]">
                    <strong className="text-navy">{product.highlight}</strong>
                  </p>
                )}
                <SiteLink
                  href={product.link.href}
                  target={product.link.href.startsWith("http") ? "_blank" : undefined}
                  rel={product.link.href.startsWith("http") ? "noopener" : undefined}
                  className="group mt-3 inline-flex items-start border-b border-[#BD9040] pb-2.5 text-[12px] font-bold tracking-[1px] uppercase"
                >
                  <span className="mt-1.75 min-w-0 leading-4" style={{ width: `min(${product.link_text_width}px, 100%)` }}>
                    {product.link.label}
                  </span>
                  <span className="ml-[12.74px] grid h-7 w-[16.7px] place-items-center transition-transform duration-300 group-hover:translate-x-1.5">
                    <ArrowUpRightBoldIcon />
                  </span>
                </SiteLink>
              </div>
            </article>
          ))}
        </div>
        {content.store_links.length > 0 && (
          <div className="mt-6.75 flex flex-wrap gap-3">
            {content.store_links.map((store) => {
              const platform = stores[store.label as StorePlatform];
              const Icon = platform?.icon;
              return (
                <SiteLink
                  key={store.label}
                  href={store.href}
                  target={store.href.startsWith("http") ? "_blank" : undefined}
                  rel={store.href.startsWith("http") ? "noopener" : undefined}
                  className="inline-flex h-12 items-center gap-2.5 rounded-lg bg-[#13294F] px-4 text-white transition hover:bg-[#0B1B38]"
                >
                  {Icon && <Icon className="shrink-0" />}
                  <span className="flex flex-col leading-none">
                    {platform && <span className="text-[10px] tracking-[0.5px] uppercase">{platform.caption}</span>}
                    <span className="mt-0.5 text-[17px] font-medium">{store.label}</span>
                  </span>
                </SiteLink>
              );
            })}
          </div>
        )}
        <p className="mt-6.75 max-w-127.5 text-[12px] leading-[1.8] text-[#77717A]">{content.note}</p>
      </div>
    </section>
  );
}
