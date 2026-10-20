import type { FooterProps } from "@/types/components";
import Logo from "./Logo";
import SiteLink from "./SiteLink";

export default function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-[#0B1B38] pt-15.5 pb-6.75 lg:pb-7 font-dm text-[#E2E5ED]">
      <div className="mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
        <div className="grid gap-y-15.75 sm:grid-cols-2 sm:gap-x-12.5 lg:grid-cols-3">
          <div>
            <Logo light />
            <p className="mt-7.5 text-[13px] leading-4.25 text-[#B4BFD1]">{content.tagline}</p>
          </div>
          <div className="flex flex-col gap-5 pt-4 lg:gap-4.75 lg:pt-1">
            <h4 className="text-[12px] leading-4 font-bold tracking-[1px] text-[#E1BC7D] uppercase">{content.explore_title}</h4>
            <ul className="flex flex-wrap gap-x-4 gap-y-4">
              {content.explore_links.map((link) => (
                <li key={link.label}>
                  <SiteLink href={link.href} className="block text-[13px] leading-4.25 transition hover:text-white">
                    {link.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4 lg:pt-1">
            <h4 className="text-[12px] leading-4 font-bold tracking-[1px] text-[#E1BC7D] uppercase">{content.connect_title}</h4>
            <p className="mt-4 text-[13px] leading-4.25 text-[#B4BFD1]">{content.connect_text}</p>
            <SiteLink href={content.connect_link.href} className="mt-4 block w-fit text-[13px] leading-4.25 transition hover:text-white">
              {content.connect_link.label}
            </SiteLink>
          </div>
        </div>
        <p className="mt-16.25 border-t border-[#314261] pt-6.25 text-[11px] leading-3.5 text-[#B4BFD1] lg:mt-15.75 lg:flex lg:justify-between lg:gap-6">
          <span>{content.copyright}</span>
          <span>{content.note}</span>
        </p>
      </div>
    </footer>
  );
}
