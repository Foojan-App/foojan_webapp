import type { FooterProps } from "@/types/components";
import AccentText from "./AccentText";
import Logo from "./Logo";
import MaskIcon from "./MaskIcon";
import { Container } from "./ui";
import SiteLink from "./SiteLink";


export default function Footer({ content }: FooterProps) {
  const { columns, socials } = content;
  return (
    <footer className="bg-plum-950 pt-14.75 pb-[58.54px] text-white lg:min-h-[457.02px] lg:pt-20 lg:pb-[29.97px]">
      <Container>
        <div className="flex w-[323.48px] max-w-full flex-col gap-10 md:max-lg:w-auto md:max-lg:gap-12 lg:w-auto lg:flex-row lg:gap-16.25">
          <div className="flex flex-col gap-5.75 lg:w-[323.48px]">
            <Logo light />
            <div className="flex flex-col gap-6.75">
              <p className="text-[14.5px] leading-[24.65px] text-[#E0E0E0] max-[389px]:[&_br]:hidden min-[390px]:h-[66.28px] min-[390px]:whitespace-nowrap">
                <AccentText text={content.tagline} />
              </p>
              <ul className="flex flex-wrap gap-2.5">
                {socials.map(({ id, name, icon_url, url }, i) => (
                  <li key={id ?? i}>
                    <SiteLink
                      href={url}
                      target={url.startsWith("http") ? "_blank" : undefined}
                      rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={name}
                      className="grid size-10.5 place-items-center rounded-md border border-[#FFFFFF33] text-white transition hover:border-white/60"
                    >
                      <MaskIcon src={icon_url} className="size-4.25" />
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-10 md:max-lg:grid md:max-lg:grid-cols-3 md:max-lg:gap-8 lg:flex-row lg:flex-wrap lg:gap-16.25">
            {columns.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-4.5 lg:w-[229.56px]">
                <p className="text-[12.5px] leading-[13.5px] font-bold tracking-[2px] text-white uppercase">{col.title}</p>
                <ul className="flex flex-col gap-2.5 lg:gap-[12.19px]">
                  {col.links.map((l, li) => (
                    <li key={l.id ?? li} className="flex items-center lg:min-h-5.75">
                      <SiteLink
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-[14.5px] leading-[24.65px] text-[#E0E0E0] lg:leading-4.25 transition hover:text-white">
                        {l.label}
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10.25 flex h-36 flex-col-reverse gap-[25.6px] md:max-lg:mt-12 md:max-lg:h-auto md:max-lg:flex-row md:max-lg:justify-between md:max-lg:gap-6 md:max-lg:text-left border-t border-[#FFFFFF1A] pt-7.25 text-center text-[13px] leading-[22.1px] text-[#E0E0E0] lg:mt-[40.77px] lg:leading-4 lg:h-12.25 lg:flex-row lg:justify-between lg:gap-3 lg:text-left">
          <p>
            {content.copyright}{" "}
            <span className="whitespace-nowrap">
              <SiteLink href="/privacy" className="underline-offset-2 transition hover:text-white hover:underline">
                Privacy Policy
              </SiteLink>
              {" · "}
              <SiteLink href="/terms" className="underline-offset-2 transition hover:text-white hover:underline">
                Terms of Use
              </SiteLink>
            </span>
          </p>
          <p>{content.address}</p>
        </div>
      </Container>
    </footer>
  );
}
