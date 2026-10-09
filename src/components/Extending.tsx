"use client";

import { ArrowRightIcon, ArrowUpRightIcon } from "@/utils/svg";
import { useRef, useState } from "react";
import type { ExtendingProps } from "@/types/components";
import { LineBreaks } from "@/types/enums";
import AccentText from "./AccentText";
import MaskIcon from "./MaskIcon";
import { Container, Eyebrow, TextLink } from "./ui";

const cardHeaders = [
  "bg-[linear-gradient(107.79deg,#694DB8_0%,#513998_100%)]",
  "bg-[linear-gradient(107.79deg,#0E98A5_0%,#0A7682_100%)]",
  "bg-[linear-gradient(107.79deg,#F06C4D_0%,#F3B03A_100%)]",
];

const linkWidths: Record<string, string> = {
  "Explore IAII": "lg:w-[126.69px]",
  "App Store": "lg:w-[116.95px]",
  Android: "lg:w-[102.5px]",
  "Discover Mira": "lg:w-[144.92px]",
};

export default function Extending({ content }: ExtendingProps) {
  const { cards } = content;
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onTrackScroll = () => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    setActive(Math.round(el.scrollLeft / (card.offsetWidth + gap)));
  };

  const goTo = (i: number) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollTo({ left: i * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="bg-[#F7F2FB] pt-11 pb-[44.7px] md:max-lg:py-24 lg:min-h-[1106.48px] lg:pt-[138.07px] lg:pb-[146.55px]">
      <Container>
        <div className="mx-auto flex max-w-160 flex-col gap-3 text-center lg:gap-8.25 lg:w-182.75 lg:max-w-none">
          <div className="flex flex-col gap-4.75">
            <Eyebrow center>{content.eyebrow}</Eyebrow>
            <h2 className="font-serif text-[32px] leading-[1.2] font-medium md:max-lg:text-[44px] text-plum-950 lg:text-[56px] lg:leading-[58.75px]">
              <AccentText text={content.heading} breaks={LineBreaks.DesktopAndPhone} />
            </h2>
          </div>
          <p className="text-[16px] leading-[29.92px] text-[#4A5163]">
            <AccentText text={content.paragraph} breaks={LineBreaks.DesktopAndPhone} />
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 lg:mt-[71.48px] lg:block">
          <div
            ref={track}
            onScroll={onTrackScroll}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto lg:grid lg:h-[460.8px] lg:grid-cols-3 lg:overflow-visible"
          >
            {cards.map((c, i) => (
              <article
                key={c.id ?? i}
                className="relative flex h-[460.8px] max-[389px]:h-auto max-[389px]:min-h-[460.8px] w-full md:max-lg:w-[calc(50%-12px)] shrink-0 snap-start flex-col overflow-hidden rounded-[10px] border border-[#F8E6FF] bg-white"
              >
                <div
                  className={`relative grid h-30 shrink-0 place-items-center lg:block ${cardHeaders[i] ?? cardHeaders[0]}`}
                >
                  <span className="grid size-16 place-items-center rounded-[10px] bg-[#FFFFFFF2] lg:absolute lg:top-7 lg:left-38.5">
                    {c.icon_url ? (
                      <MaskIcon src={c.icon_url} className="size-8.5 text-plum-950" />
                    ) : (
                      <span className="font-serif text-[20.8px] leading-6.75 text-plum-950">{c.icon_text}</span>
                    )}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7.5 pb-8">
                  <div className="flex w-[303.92px] flex-col gap-3.75 max-[389px]:w-full md:max-lg:w-full">
                    <div className="flex flex-col gap-2">
                      <p className="text-[11.5px] leading-[19.55px] font-bold tracking-[1.61px] text-purple uppercase">
                        {c.kicker}
                      </p>
                      <h3 className="font-serif text-[24px] leading-[29.76px] font-medium text-plum-950">
                        {c.title}
                      </h3>
                    </div>
                    <p className="text-[16px] leading-[25.5px] text-[#4A5163] w-81.5 max-[389px]:w-auto md:max-lg:w-auto">
                      {c.body}
                    </p>
                  </div>
                  <div className="mt-auto flex pt-8 lg:absolute lg:bottom-8 lg:left-7.5 lg:mt-0 lg:pt-0">
                    <div
                      className={`flex gap-6 ${c.links.length > 1 ? "border-b border-purple lg:gap-6.5 [&>a]:border-b-0 lg:[&>a]:h-[28.5px]" : ""}`}
                    >
                      {c.links.map((l, j) => (
                        <TextLink
                          key={`${l.label}-${j}`}
                          href={l.href}
                          className={`h-[29.5px] items-start! gap-[7.58px]! pb-0! text-[15px]! leading-4.75 text-plum-950! ${linkWidths[l.label] ?? ""}`}
                          icon={
                            l.external ? (
                              <ArrowUpRightIcon
                                width={16}
                                height={16}
                                className="mt-[4.75px] shrink-0"
                              />
                            ) : (
                              <ArrowRightIcon
                                width={16}
                                height={16}
                                className="mt-[4.75px] shrink-0"
                              />
                            )
                          }
                        >
                          <span className="mt-0.75 whitespace-nowrap">
                            {l.label}
                          </span>
                        </TextLink>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="flex h-1.5 items-center justify-center lg:hidden">
            {cards.map((c, i) => (
              <button
                key={c.id ?? i}
                type="button"
                aria-label={`Show ${c.title}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => goTo(i)}
                className="grid h-6 place-items-center px-[9px]"
              >
                <span className={`h-1.5 rounded-full transition-all ${i === active ? "w-10.5 bg-purple" : "w-1.5 bg-[#C2C8C3]"}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center lg:mt-[38.08px]">
          <TextLink
            href={content.link_href}
            className="h-[29.5px] w-[209.09px] items-start! gap-[7.58px]! pb-0! text-[15px]! leading-4.75 text-plum-950!"
            icon={
              <ArrowRightIcon
                width={16}
                height={16}
                className="mt-[4.75px] shrink-0"
              />
            }
          >
            <span className="mt-0.75 whitespace-nowrap">
              {content.link_label}
            </span>
          </TextLink>
        </div>
      </Container>
    </section>
  );
}
