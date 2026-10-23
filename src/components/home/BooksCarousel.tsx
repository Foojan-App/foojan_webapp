"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { BooksCarouselProps } from "@/types/components";
import SiteLink from "../SiteLink";

const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

export default function BooksCarousel({ books }: BooksCarouselProps) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const step = () => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return 0;
    return card.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
  };

  const onScroll = () => {
    const el = track.current;
    const size = step();
    if (!el || !size) return;
    const last = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setActive(last ? books.length - 1 : Math.round(el.scrollLeft / size));
  };

  const goTo = (index: number) => track.current?.scrollTo({ left: index * step(), behavior: "smooth" });

  return (
    <div className="reveal mt-12 lg:mt-16">
      <div
        ref={track}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto sm:gap-6 lg:grid lg:grid-cols-4 lg:gap-9 lg:overflow-visible"
      >
        {books.map((book) => (
          <SiteLink
            key={book.title}
            href={book.link}
            {...external(book.link)}
            className="group block w-full min-w-0 shrink-0 snap-start min-[430px]:w-[calc(50%-8px)] sm:w-[calc(50%-12px)] lg:w-auto"
          >
            <div className="bg-[#EEE8F7] p-[11%]">
              <div className="relative aspect-[5/7] w-full overflow-hidden shadow-[0_4px_10px_#071A3D1F,0_20px_34px_-12px_#071A3D73] transition-transform duration-300 group-hover:-translate-y-1">
                <Image src={book.cover_url} alt={`${book.title} book cover`} fill sizes="(min-width: 1024px) 230px, (min-width: 430px) 45vw, 90vw" className="object-cover" />
              </div>
            </div>
            <p className="mt-5 text-[11px] leading-3.5 font-bold tracking-[2px] text-[#815F37] uppercase">{book.category}</p>
            <h3 className="mt-2 font-playfair text-[22px] leading-[1.2] font-normal text-[#19243E] lg:text-[24px]">{book.title}</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-[#5E5B66]">{book.description}</p>
          </SiteLink>
        ))}
      </div>
      {books.length > 1 && (
        <div className="mt-6 flex h-6 items-center justify-center lg:hidden">
          {books.map((book, index) => (
            <button
              key={book.title}
              type="button"
              aria-label={`Show ${book.title}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => goTo(index)}
              className="grid h-6 place-items-center px-2"
            >
              <span className={`h-1.5 rounded-full transition-all ${index === active ? "w-10 bg-[#13294F]" : "w-1.5 bg-[#C9C3CA]"}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
