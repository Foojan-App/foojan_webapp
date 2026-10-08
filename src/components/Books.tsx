"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowRightIcon } from "@/utils/svg";
import { Button, Container, Eyebrow } from "./ui";

const books = [
  {
    category: "Leadership",
    title: "Awakened Leadership",
    body: "Uniting organization development and Awareness Integration Theory.",
    cover: "/images/book-awakened-leadership.png",
  },
  {
    category: "Clinical",
    title: "Awareness Integration Therapy",
    body: "A comprehensive presentation of the AIT therapeutic approach.",
    cover: "/images/book-ait-therapy.png",
  },
  {
    category: "Personal Growth",
    title: "Life Reset",
    body: "The Awareness Integration path to creating the life you want.",
    cover: "/images/book-life-reset.png",
  },
  {
    category: "Parenting",
    title: "Intentional Parenting",
    body: "A practical guide informed by Awareness Integration Theory.",
    cover: "/images/book-intentional-parenting.png",
  },
];

export default function Books() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // which book is in view (drives the mobile dots)
  const onTrackScroll = () => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    setActive(Math.round(el.scrollLeft / (card.offsetWidth + gap)));
  };

  // jump to a book (mobile dots)
  const goTo = (i: number) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollTo({ left: i * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 260) + gap), behavior: "smooth" });
  };

  return (
    <section id="books" className="bg-white py-20 lg:py-25">
      {/* section padding: desktop 100px, mobile 80px (top and bottom); content block 1240×939.09 */}
      <Container className="lg:min-h-[939.09px] lg:pt-[8.62px]">
        {/* inner: desktop 1241×907.33, 8.62px from the block top, 40px gaps; mobile 350×1079.86, 24px gaps */}
        <div className="flex flex-col gap-6 lg:gap-10">
          {/* heading + books: desktop 1241×781.33, 56px gap; mobile 24px */}
          <div className="flex flex-col gap-6 lg:gap-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              {/* text group: 696.73×202.75, 14px gap */}
              <div className="flex flex-col gap-3.5 lg:w-[696.73px]">
                <Eyebrow>Author &amp; researcher</Eyebrow>
                {/* heading + paragraph: 696.73×166.75, 17px gap */}
                <div className="flex flex-col gap-4.25">
                  {/* heading: Lora 500 — desktop 56px / 58.75px in a 128.75px box (2 lines); mobile 32px / 120%, 350×114 (3 lines) */}
                  <h2 className="font-serif text-[32px] leading-[1.2] font-medium text-plum-950 lg:h-[128.75px] lg:text-[56px] lg:leading-[58.75px]">
                    Ideas developed in <br className="lg:hidden" />
                    print,
                    <br className="hidden lg:block" /> research{" "}
                    <span className="text-purple">
                      &amp; <br className="lg:hidden" />
                      practice.
                    </span>
                  </h2>
                  {/* paragraph: Inter 16px / 29.92px, #4A5163 — desktop one line in a 21px box; mobile two lines, 350×60 */}
                  <p className="text-[16px] leading-[29.92px] text-[#4A5163] lg:leading-5.25">
                    From personal transformation and parenting to clinical methodology and leadership.
                  </p>
                </div>
              </div>
              {/* arrows: 114×52 at top 180.87px (≈30px below the 202.75px heading row), ending 33px before the right edge;
                  two 52×52 buttons, 10px apart: white, 1px #942BA9 border, radius 6, 35% opacity */}
              <div className="hidden gap-2.5 lg:mr-8.25 lg:flex lg:translate-y-[30.12px]">
                {([-1, 1] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    aria-label={dir === -1 ? "Previous books" : "Next books"}
                    onClick={() => scroll(dir)}
                    className="grid size-13 place-items-center rounded-md border border-purple bg-white text-plum-950 opacity-35 transition hover:opacity-100"
                  >
                    <ArrowRightIcon width={20} height={20} className={dir === -1 ? "rotate-180" : undefined} />
                  </button>
                ))}
              </div>
            </div>

            {/* book + dots — desktop: books row 1241×522.58, 49px gap, cards 273×522.58;
                mobile: 350×612.86, one book per view, dots 16px below the card */}
            <div className="flex flex-col gap-4">
              <div
                ref={track}
                onScroll={onTrackScroll}
                className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto lg:gap-12.25"
              >
                {books.map((b) => (
                  <a key={b.title} href="#" className="group w-full shrink-0 snap-start lg:w-68.25">
                    {/* cover box: 273×364, radius 10, #F9EBFF */}
                    <div className="aspect-273/364 rounded-[10px] bg-[#F9EBFF] p-7">
                      {/* cover: 217×308 at 28px, radius 3/8/8/3, two drop shadows + a 2px inset spine shadow (overlay so it sits above the image) */}
                      <div className="relative h-102.75 w-[289.57px] overflow-hidden rounded-tl-[3px] lg:size-full rounded-tr-lg rounded-br-lg rounded-bl-[3px] shadow-[0_4px_10px_0_#071A3D1F,0_20px_34px_-12px_#071A3D73]">
                        <Image
                          src={b.cover}
                          alt={`${b.title} book cover`}
                          fill
                          sizes="217px"
                          className="object-cover"
                        />
                        <span className="pointer-events-none absolute inset-0 shadow-[inset_-2px_0_0_0_#0000001F]" />
                      </div>
                    </div>
                    {/* category: Inter 700, 11.5px / 19.55px, 1.61px tracking, 22px below the cover box */}
                    <p className="mt-5.5 text-[11.5px] leading-[19.55px] font-bold tracking-[1.61px] text-purple uppercase">
                      {b.category}
                    </p>
                    {/* title: Lora 500, 22.4px / 26.88px, -0.34px tracking, 411.55px from the card top */}
                    <h3 className="mt-1.75 font-serif text-[22.4px] leading-[26.88px] lg:mt-1.5 font-medium tracking-[-0.34px] text-plum-950">
                      {b.title}
                    </h3>
                    {/* description: Inter 14.5px / 24.65px, #7A8091, 260.43px wide, 449.43px from the card top */}
                    <p className="mt-1.75 text-[14.5px] leading-[24.65px] text-[#7A8091] max-lg:h-[41.64px] lg:mt-2.75 lg:max-w-[260.43px]">
                      {b.body}
                    </p>
                  </a>
                ))}
              </div>
              {/* mobile dots: 350×6 row, 8px apart; active = 42×6 #942BA9 pill, others = 6×6 #C2C8C3 dots */}
              <div className="flex h-1.5 items-center justify-center gap-2 lg:hidden">
                {books.map((b, i) => (
                  <button
                    key={b.title}
                    type="button"
                    aria-label={`Show ${b.title}`}
                    aria-current={i === active ? "true" : undefined}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all ${i === active ? "w-10.5 bg-purple" : "w-1.5 bg-[#C2C8C3]"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* footer row: 1241×86, 1px #E8E1D5 top border; text + button sit at the bottom */}
          <div className="flex flex-col border-t border-[#E8E1D5] pt-5.5 max-lg:min-h-48 min-[390px]:h-48 lg:h-21.5 lg:justify-end lg:pt-0">
            {/* mobile: footer 350×192; text and button stacked 15px apart, 23px below the top edge */}
            <div className="flex flex-col items-start gap-3.75 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
              {/* Inter 16px / 25.5px; bold parts #1A002B, the rest #4A5163 */}
              <p className="text-[16px] leading-[25.5px] text-[#4A5163]">
                <strong className="font-bold text-plum-950">7 books</strong> and{" "}
                <strong className="font-bold text-plum-950">25 peer-reviewed articles</strong> across psychology,
                leadership and personal development.
              </p>
              {/* button: 249.17×54.64, radius 6, #1A002B, 1px black border */}
              <Button
                arrow
                className="h-[54.64px]! w-[249.17px] text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px]"
              >
                All books &amp; publications
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
