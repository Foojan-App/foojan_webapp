import { ArrowRightIcon } from "@/utils/svg";
import { Button, Container, Eyebrow } from "./ui";
import type { MediaProps } from "@/types/components";
import { ButtonVariant, LineBreaks } from "@/types/enums";
import AccentText from "./AccentText";
import FeaturedPlay from "./FeaturedPlay";
import MaskIcon from "./MaskIcon";
import SiteLink from "./SiteLink";

const cardHeight = (body: string) =>
  body.includes("\n")
    ? "max-lg:min-h-[184.55px] min-[390px]:h-[184.55px] lg:h-[148.28px]"
    : "max-lg:min-h-[153.55px] min-[390px]:h-[153.55px] lg:h-[119.39px]";

export default function Media({ content }: MediaProps) {
  return (
    <section id="media" className="bg-white py-20 md:max-lg:py-24 lg:min-h-239.25 lg:pt-[99.19px] lg:pb-[99.36px]">
      <Container className="flex flex-col gap-6 lg:gap-16">
        <div className="flex flex-col gap-3 lg:w-212.5">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="font-serif text-[32px] leading-[1.2] max-md:text-[28px] max-[389px]:text-[26px] font-medium md:max-lg:text-[44px] text-plum-950 lg:text-[56px] lg:leading-[58.75px]">
            <AccentText text={content.heading} breaks={LineBreaks.DesktopAndPhone} />
          </h2>
        </div>

        <div className="grid gap-7 lg:h-[542.45px] lg:grid-cols-[695.39px_516.61px]">
          <div className="flex flex-col rounded-[10px] bg-plum-950 p-4 text-white lg:pt-9 lg:pr-10 lg:pb-[46.7px] lg:pl-12">
            <FeaturedPlay
              href={content.featured_button_href}
              title={content.featured_title.replace(/\n/g, " ")}
              eyebrow={content.featured_eyebrow}
            />
            <div className="mt-6 lg:mt-[66.89px]">
              <p className="flex items-center gap-2.5 text-[12.5px] leading-[21.25px] font-bold tracking-[2.5px] text-gold uppercase max-md:text-[11.5px] max-md:tracking-[2px]">
                <span className="h-[1.5px] w-23 bg-gold" />
                {content.featured_eyebrow}
              </p>
              <h3 className="mt-3 font-serif text-[24px] leading-[1.2] font-medium tracking-[-0.6px] text-white max-md:text-[20px] max-md:leading-tight max-md:[&_br]:hidden lg:mt-4.5 lg:h-24.75 lg:w-[586.59px] lg:text-[40px] lg:leading-12">
                <AccentText text={content.featured_title} />
              </h3>
              <p className="mt-3 text-[17px] min-[390px]:h-[77.78px] leading-[28.9px] text-[#DDDDDD] max-md:h-auto max-md:text-[15px] max-md:leading-6 md:max-lg:h-auto md:max-lg:text-[18px] lg:mt-3.75 lg:w-[515.37px]">
                <AccentText text={content.featured_text} breaks={LineBreaks.DesktopOnly} />
              </p>
              <div className="mt-6 lg:mt-[33.83px]">
                <Button
                  href={content.featured_button_href}
                  variant={ButtonVariant.Gold}
                  arrow
                  className="h-12! w-48 whitespace-nowrap text-[14px]! lg:h-14! lg:text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px] text-[#071A3D]!"
                >
                  {content.featured_button_label}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:gap-4">
            {content.items.map((c, i) => (
              <SiteLink
                key={c.id ?? i}
                href={c.link}
                target={c.link.startsWith("http") ? "_blank" : undefined}
                rel={c.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group flex flex-col items-start gap-3 rounded-lg border border-[#F8E6FF] bg-white p-3 transition hover:border-purple/40 lg:flex-row lg:gap-4.5 lg:pt-5.5 lg:pr-5 lg:pb-5 lg:pl-6 ${cardHeight(c.body)} max-md:h-auto! max-md:p-4 md:max-lg:h-auto! md:max-lg:gap-4 md:max-lg:p-6`}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-purple text-white max-md:size-10 lg:self-center">
                  <MaskIcon src={c.icon_url} className="size-5.5" />
                </span>
                <div className="flex-1">
                  <p className="text-[11.5px] leading-[19.55px] font-bold tracking-[1.61px] text-purple uppercase">
                    {c.kicker}
                  </p>
                  <p className="font-serif text-[19.2px] leading-[24.96px] text-plum-950 max-md:mt-0.5 max-md:text-[17px] max-md:leading-[1.3] md:max-lg:mt-1 md:max-lg:text-[22px] md:max-lg:leading-7 lg:leading-6">{c.title}</p>
                  <p className="text-[14px] leading-[23.8px] text-[#687080] max-md:mt-1 max-md:leading-[1.55] md:max-lg:mt-2 md:max-lg:text-[15px] lg:mt-[6.96px] lg:leading-4.25">
                    {c.body.includes("\n") ? (
                      <span className="lg:leading-[23.8px]">
                        <AccentText text={c.body} breaks={LineBreaks.DesktopOnly} />
                      </span>
                    ) : (
                      c.body
                    )}
                  </p>
                </div>
                <ArrowRightIcon className="shrink-0 self-center text-plum-950 max-lg:hidden opacity-50 transition group-hover:opacity-100" />
              </SiteLink>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
