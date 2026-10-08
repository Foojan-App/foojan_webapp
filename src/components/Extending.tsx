"use client";

import { ArrowRightIcon, ArrowUpRightIcon } from "@/utils/svg";
import { type ReactNode, useRef, useState } from "react";
import { Container, Eyebrow, TextLink } from "./ui";
import SmartPhoneIcon from "@/utils/svg/SmartPhoneIcon";
import SparklesIcon from "@/utils/svg/SparklesIcon";

const cards: {
  kicker: string;
  title: string;
  body: string;
  header: string;
  icon: ReactNode;
  links: { label: string; external?: boolean; width?: string }[];
}[] = [
  {
    kicker: "Institute",
    title: "International Awareness Integration Institute",
    body: "Professional training, certification, therapy, coaching and education built around Awareness Integration Theory.",
    header: "bg-[linear-gradient(107.79deg,#694DB8_0%,#513998_100%)]",
    icon: (
      <span className="font-serif text-[20.8px] leading-6.75 text-plum-950">
        IAII
      </span>
    ), // Lora 20.8px, 27px box, centred
    links: [{ label: "Explore IAII", width: "lg:w-[126.69px]" }],
  },
  {
    kicker: "Mobile App",
    title: "Foojan App",
    body: "A digital self-development experience bringing structured AIT-based reflection and growth tools to users.",
    header: "bg-[linear-gradient(107.79deg,#0E98A5_0%,#0A7682_100%)]",
    icon: <SmartPhoneIcon />,
    links: [
      { label: "App Store", external: true, width: "lg:w-[116.95px]" },
      { label: "Android", external: true, width: "lg:w-[102.5px]" },
    ],
  },
  {
    kicker: "AI Companion",
    title: "Mira",
    body: "An AIT-informed AI companion supporting structured self-reflection, emotional awareness and personal growth within clear ethical boundaries not a replacement for therapy, professional care or human relationship.",
    header: "bg-[linear-gradient(107.79deg,#F06C4D_0%,#F3B03A_100%)]",
    icon: <SparklesIcon />,
    links: [{ label: "Discover Mira", width: "lg:w-[144.92px]" }],
  },
];

export default function Extending() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // which card is in view (drives the mobile dots)
  const onTrackScroll = () => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    setActive(Math.round(el.scrollLeft / (card.offsetWidth + gap)));
  };

  // jump to a card (mobile dots)
  const goTo = (i: number) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollTo({ left: i * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="bg-[#F7F2FB] pt-11 pb-[44.7px] lg:min-h-[1106.48px] lg:pt-[138.07px] lg:pb-[146.55px]">
      {/* section: #F7F2FB — desktop 1440×1106.48, heading group 138.07px from the top, 146.55px below the bottom link;
          mobile 390×902, content 350×813.3 at 44px (heading group, carousel, link — 24px apart) */}
      <Container>
        {/* heading group: 731×222, centred, 33px gap */}
        <div className="mx-auto flex max-w-160 flex-col gap-3 text-center lg:gap-8.25 lg:w-182.75 lg:max-w-none">
          {/* eyebrow + heading: 731×159, 19px gap */}
          <div className="flex flex-col gap-4.75">
            <Eyebrow center>Extending the work</Eyebrow>
            {/* heading: Lora 500, centred — desktop 56px / 58.75px, 731×118; mobile 32px / 120%, 3 lines */}
            <h2 className="font-serif text-[32px] leading-[1.2] font-medium text-plum-950 lg:text-[56px] lg:leading-[58.75px]">
              From theory to <br className="lg:hidden" />
              institutions, <br className="hidden lg:block" />
              education <br className="lg:hidden" />
              <span className="text-purple">&amp; technology.</span>
            </h2>
          </div>
          {/* paragraph: Inter 16px / 29.92px, #4A5163 — desktop one line, 731×30; mobile 3 lines as in Figma */}
          <p className="text-[16px] leading-[29.92px] text-[#4A5163]">
            Organizations and products designed to make <br className="lg:hidden" />
            AIT accessible to professionals and the <br className="lg:hidden" />
            public.
          </p>
        </div>

        {/* cards + dots — mobile 350×478.8: one 460.8px card per view, swipeable, dots 12px below */}
        <div className="mt-6 flex flex-col gap-3 lg:mt-[71.48px] lg:block">
          {/* cards: 1240×460.8, 24px gap (three 397.33px cards), 71.48px below the heading group */}
          <div
            ref={track}
            onScroll={onTrackScroll}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto lg:grid lg:h-[460.8px] lg:grid-cols-3 lg:overflow-visible"
          >
            {cards.map((c) => (
              // card: 397.33×460.8, radius 10, white, 1px #F8E6FF border
              <article
                key={c.title}
                className="relative flex h-[460.8px] w-full shrink-0 snap-start flex-col overflow-hidden rounded-[10px] border border-[#F8E6FF] bg-white"
              >
                {/* header: 120px tall (395×120 inside the 1px border); mobile: icon centred */}
                <div
                  className={`relative grid h-30 shrink-0 place-items-center lg:block ${c.header}`}
                >
                  {/* icon box: 64×64, radius 10, #FFFFFFF2; 28px from the top, 155px from the card's left edge (as in Figma, not centred) */}
                  <span className="grid size-16 place-items-center rounded-[10px] bg-[#FFFFFFF2] lg:absolute lg:top-7 lg:left-38.5">
                    {c.icon}
                  </span>
                </div>
                {/* body: 30px padding; text group 303.92×181.3 = (category + title, 89.3) + 15px + paragraph (same on mobile, at 31/151 from the card edge) */}
                <div className="flex flex-1 flex-col p-7.5 pb-8">
                  <div className="flex w-[303.92px] flex-col gap-3.75">
                    {/* category + title: 8px gap */}
                    <div className="flex flex-col gap-2">
                      <p className="text-[11.5px] leading-[19.55px] font-bold tracking-[1.61px] text-purple uppercase">
                        {c.kicker}
                      </p>
                      <h3 className="font-serif text-[24px] leading-[29.76px] font-medium text-plum-950">
                        {c.title}
                      </h3>
                    </div>
                    {/* paragraph: Inter 16px / 25.5px, #4A5163; 326px wide in Figma (hugs past the 303.92px group) */}
                    <p className="text-[16px] leading-[25.5px] text-[#4A5163] w-81.5">
                      {c.body}
                    </p>
                  </div>
                  {/* links: 29.5px tall, 1px #942BA9 underline, pinned 32px above the card bottom;
                    text Inter 600 15px #1A002B (19px box, 3px from the top), 16px arrow 7.58px after the text; fixed-width links keep the spare space after the arrow */}
                  {/* links row; with two links (App Store, Android) they sit 26px apart and share one continuous underline */}
                  <div className="mt-auto flex pt-8 lg:absolute lg:bottom-8 lg:left-7.5 lg:mt-0 lg:pt-0">
                    <div
                      className={`flex gap-6 ${c.links.length > 1 ? "border-b border-purple lg:gap-6.5 [&>a]:border-b-0 lg:[&>a]:h-[28.5px]" : ""}`}
                    >
                      {c.links.map((l) => (
                        <TextLink
                          key={l.label}
                          className={`h-[29.5px] items-start! gap-[7.58px]! pb-0! text-[15px]! leading-4.75 text-plum-950! ${l.width ?? ""}`}
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
          {/* mobile dots: 8px apart; active = 42×6 #942BA9 pill, others = 6×6 #C2C8C3 dots (as in Books) */}
          <div className="flex h-1.5 items-center justify-center gap-2 lg:hidden">
            {cards.map((c, i) => (
              <button
                key={c.title}
                type="button"
                aria-label={`Show ${c.title}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-10.5 bg-purple" : "w-1.5 bg-[#C2C8C3]"}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 text-center lg:mt-[38.08px]">
          {/* link: 209.09×29.5, centred, 38.08px below the cards; Inter 600 15px, 16px arrow 7.58px after the text */}
          <TextLink
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
              Explore her work in depth
            </span>
          </TextLink>
        </div>
      </Container>
    </section>
  );
}
