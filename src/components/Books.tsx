"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowRightIcon } from "@/utils/svg";
import type { BooksProps } from "@/types/components";
import { LineBreaks } from "@/types/enums";
import AccentText from "./AccentText";
import { Button, Container, Eyebrow } from "./ui";

const MAX_DOTS = 6;

export default function Books({ content }: BooksProps) {
  const { books } = content;
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
                <Eyebrow>{content.eyebrow}</Eyebrow>
                <div className="flex flex-col gap-4.25">
                  <h2 className="font-serif text-[32px] leading-[1.2] font-medium md:max-lg:text-[44px] text-plum-950 lg:h-[128.75px] lg:text-[56px] lg:leading-[58.75px]">
                    <AccentText text={content.heading} breaks={LineBreaks.DesktopAndPhone} />
                  </h2>
                  <p className="text-[16px] leading-[29.92px] text-[#4A5163] lg:leading-5.25">
                    {content.paragraph}
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
                  <a
                    key={b.id ?? b.title}
                    href={b.link}
                    target={b.link.startsWith("http") ? "_blank" : undefined}
                    rel={b.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group w-full shrink-0 snap-start md:max-lg:w-[calc(50%-12px)] lg:w-68.25">
                    <div className="aspect-273/364 rounded-[10px] bg-[#F9EBFF] p-7">
                      <div className="relative h-102.75 w-[289.57px] max-[389px]:aspect-[289.57/411] max-[389px]:h-auto max-[389px]:w-full overflow-hidden rounded-tl-[3px] lg:size-full rounded-tr-lg rounded-br-lg rounded-bl-[3px] shadow-[0_4px_10px_0_#071A3D1F,0_20px_34px_-12px_#071A3D73]">
                        <Image
                          src={b.cover_url}
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
                    <p className="mt-1.75 text-[14.5px] leading-[24.65px] text-[#687080] lg:mt-2.75 lg:max-w-[260.43px]">
                      {b.description}
                    </p>
                  </a>
                ))}
              </div>
              {books.length <= MAX_DOTS ? (
                <div className="flex h-1.5 items-center justify-center lg:hidden">
                  {books.map((b, i) => (
                    <button
                      key={b.id ?? b.title}
                      type="button"
                      aria-label={`Show ${b.title}`}
                      aria-current={i === active ? "true" : undefined}
                      onClick={() => goTo(i)}
                      className="grid h-6 place-items-center px-[9px]"
                    >
                      <span className={`h-1.5 rounded-full transition-all ${i === active ? "w-10.5 bg-purple" : "w-1.5 bg-[#C2C8C3]"}`} />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-4 lg:hidden">
                  <button
                    type="button"
                    aria-label="Previous book"
                    disabled={active === 0}
                    onClick={() => goTo(active - 1)}
                    className="grid size-10 place-items-center rounded-md border border-purple text-plum-950 transition disabled:opacity-35"
                  >
                    <ArrowRightIcon width={18} height={18} className="rotate-180" />
                  </button>
                  <span aria-live="polite" className="min-w-14 text-center text-[14px] font-semibold text-plum-950">
                    {active + 1} / {books.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Next book"
                    disabled={active === books.length - 1}
                    onClick={() => goTo(active + 1)}
                    className="grid size-10 place-items-center rounded-md border border-purple text-plum-950 transition disabled:opacity-35"
                  >
                    <ArrowRightIcon width={18} height={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col border-t border-[#E8E1D5] pt-5.5 max-lg:min-h-48 min-[390px]:h-48 md:max-lg:h-auto md:max-lg:min-h-0 lg:h-21.5 lg:justify-end lg:pt-0">
            <div className="flex flex-col items-start gap-3.75 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
              <p className="text-[16px] leading-[25.5px] text-[#4A5163]">
                <AccentText text={content.footer_text} />
              </p>
              <Button
                href={content.button_href}
                arrow
                className="h-[54.64px]! w-[249.17px] text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px]"
              >
                {content.button_label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
