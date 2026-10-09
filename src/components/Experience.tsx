import { ArrowRightIcon } from "@/utils/svg";
import { Container, Eyebrow, TextLink } from "./ui";
import StarIcon from "@/utils/svg/StarIcon";
import type { ExperienceProps } from "@/types/components";
import { LineBreaks } from "@/types/enums";
import AccentText from "./AccentText";

const desktopHeights = ["lg:h-[311.33px]", "lg:h-[311.32px]", "lg:h-[285.55px]"];
const mobileGaps = ["max-lg:mb-[15.32px]", "max-lg:mb-[39.68px]"];

const pairs = <T,>(list: T[]) => list.reduce<T[][]>((rows, item, i) => (i % 2 ? rows[rows.length - 1].push(item) : rows.push([item]), rows), []);

export default function Experience({ content }: ExperienceProps) {
  const { tags, items } = content;
  const figmaLayout = items.length === desktopHeights.length;
  return (
    <section id="experience" className="bg-white pb-20 md:max-lg:pb-24 lg:py-25">
      <Container className="grid gap-6 lg:min-h-[908.2px] lg:grid-cols-[508px_696px] lg:gap-9">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:w-127 lg:self-start lg:pt-[8.62px]">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <div className="flex flex-col gap-8">
            <h2 className="font-serif text-[32px] leading-[1.2] font-medium md:max-lg:text-[44px] text-plum-950 lg:text-[56px] lg:leading-[58.75px]">
              <AccentText text={content.heading} breaks={LineBreaks.DesktopAndPhone} />
            </h2>
            <p className="font-serif text-[16px] leading-normal text-[#4A5163] max-[389px]:[&_br]:hidden lg:h-[89.38px] lg:text-[20.8px] lg:leading-[31.2px] lg:whitespace-nowrap">
              <AccentText text={content.paragraph} />
            </p>
            <div className="flex flex-col gap-2">
              {pairs(tags).map((row) => (
                <ul key={row[0].id ?? row[0].label} className="flex flex-wrap gap-2 min-[390px]:flex-nowrap">
                  {row.map((t) => (
                    <li
                      key={t.id ?? t.label}
                      className="flex h-[39.25px] shrink-0 items-center rounded-sm border border-[#E8E1D5] bg-white px-3.5 text-[12.5px] leading-3.75 font-semibold tracking-[0.75px] whitespace-nowrap text-plum-950 uppercase"
                    >
                      {t.label}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <div>
              <TextLink
                href={content.link_href}
                className="h-[29.5px] w-[232.22px] items-start! gap-[7.64px]! pb-0! text-[15px]! leading-4.75 text-plum-950!"
                icon={<ArrowRightIcon width={16} height={16} className="mt-[4.75px] shrink-0" />}
              >
                <span className="mt-0.75 whitespace-nowrap">{content.link_label}</span>
              </TextLink>
            </div>
          </div>
        </div>

        <ol className="relative pl-10.5">
          <span
            aria-hidden="true"
            className={`absolute top-2.5 bottom-2.5 left-2.75 w-[1.5px] bg-linear-to-b from-purple to-white ${figmaLayout ? "lg:bottom-auto lg:h-[888.2px]" : ""}`}
          />
          {items.map((item, i) => (
            <li
              key={item.id ?? item.title}
              className={`relative ${figmaLayout ? `${desktopHeights[i]} ${mobileGaps[i] ?? ""}` : i < items.length - 1 ? "mb-6" : ""}`}
            >
              <span
                className={`absolute top-5 -left-9.5 size-4 rounded-full border-2 border-purple lg:top-7.5 ${
                  item.highlight ? "bg-purple ring-6 ring-purple/20" : "bg-white"
                }`}
              />
              <article
                className={`rounded-[10px] border border-[#F3DCFF] p-3 lg:pt-8 lg:pr-7 lg:pb-[34.35px] lg:pl-8 ${
                  item.highlight ? "bg-[linear-gradient(103.88deg,#FFFFFF_40%,#FCE5FF_100%)] lg:pb-7.5" : "bg-white"
                }`}
              >
                <p className="text-[12px] leading-[20.4px] font-bold tracking-[1.92px] text-purple uppercase lg:leading-3.75">
                  {item.kicker}
                </p>
                <h3 className="font-serif text-[18px] leading-[26.88px] font-medium tracking-[-0.34px] text-plum-950 lg:mt-[11.39px] lg:text-[20px] lg:tracking-normal">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-normal text-[#4A5163] lg:mt-[12.99px] lg:max-w-[571.5px] lg:text-[16px]">
                  {item.body}
                </p>
                {item.highlight && (
                  <span className="mt-3 inline-flex h-[37.25px] w-[144.7px] items-center gap-2 rounded-sm bg-plum-950 pr-3 pl-3.5 text-[12.5px] leading-3.75 font-semibold text-[#FEEFFF] lg:mt-[20.35px]">
                    <StarIcon /> {item.badge_label}
                  </span>
                )}
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
