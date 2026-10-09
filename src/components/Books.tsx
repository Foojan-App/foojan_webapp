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

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 260) + gap), behavior: "smooth" });
  };

  return (
    <section id="books" className="bg-white py-20 md:max-lg:py-24 lg:py-25">
      <Container className="lg:min-h-[939.09px] lg:pt-[8.62px]">
        <div className="flex flex-col gap-6 lg:gap-10">
          <div className="flex flex-col gap-6 lg:gap-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex flex-col gap-3.5 lg:w-[696.73px]">
                <Eyebrow>Author &amp; researcher</Eyebrow>
                <div className="flex flex-col gap-4.25">
                  <h2 className="font-serif text-[32px] leading-[1.2] font-medium md:max-lg:text-[44px] text-plum-950 lg:h-[128.75px] lg:text-[56px] lg:leading-[58.75px]">
                    Ideas developed in <br className="max-[389px]:hidden md:hidden" />
                    print,
                    <br className="hidden lg:block" /> research{" "}
                    <span className="text-purple">
                      &amp; <br className="max-[389px]:hidden md:hidden" />
                      practice.
                    </span>
                  </h2>
                  <p className="text-[16px] leading-[29.92px] text-[#4A5163] lg:leading-5.25">
                    From personal transformation and parenting to clinical methodology and leadership.
                  </p>
                </div>
              </div>
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

            <div className="flex flex-col gap-4">
              <div
                ref={track}
                onScroll={onTrackScroll}
                className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto lg:gap-12.25"
              >
                {books.map((b) => (
                  <a key={b.title} href="#" className="group w-full shrink-0 snap-start md:max-lg:w-[calc(50%-12px)] lg:w-68.25">
                    <div className="aspect-273/364 rounded-[10px] bg-[#F9EBFF] p-7">
                      <div className="relative h-102.75 w-[289.57px] max-[389px]:aspect-[289.57/411] max-[389px]:h-auto max-[389px]:w-full overflow-hidden rounded-tl-[3px] lg:size-full rounded-tr-lg rounded-br-lg rounded-bl-[3px] shadow-[0_4px_10px_0_#071A3D1F,0_20px_34px_-12px_#071A3D73]">
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
                    <p className="mt-5.5 text-[11.5px] leading-[19.55px] font-bold tracking-[1.61px] text-purple uppercase">
                      {b.category}
                    </p>
                    <h3 className="mt-1.75 font-serif text-[22.4px] leading-[26.88px] lg:mt-1.5 font-medium tracking-[-0.34px] text-plum-950">
                      {b.title}
                    </h3>
                    <p className="mt-1.75 text-[14.5px] leading-[24.65px] text-[#7A8091] max-lg:h-[41.64px] max-[389px]:h-auto md:max-lg:h-auto lg:mt-2.75 lg:max-w-[260.43px]">
                      {b.body}
                    </p>
                  </a>
                ))}
              </div>
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

          <div className="flex flex-col border-t border-[#E8E1D5] pt-5.5 max-lg:min-h-48 min-[390px]:h-48 md:max-lg:h-auto md:max-lg:min-h-0 lg:h-21.5 lg:justify-end lg:pt-0">
            <div className="flex flex-col items-start gap-3.75 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
              <p className="text-[16px] leading-[25.5px] text-[#4A5163]">
                <strong className="font-bold text-plum-950">7 books</strong> and{" "}
                <strong className="font-bold text-plum-950">25 peer-reviewed articles</strong> across psychology,
                leadership and personal development.
              </p>
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
