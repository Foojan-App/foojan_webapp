"use client";

import { useState } from "react";
import type { AnnouncementBarProps } from "@/types/components";
import { CloseIcon } from "@/utils/svg";
import SiteLink from "./SiteLink";

export default function AnnouncementBar({ content }: AnnouncementBarProps) {
  const [open, setOpen] = useState(true);

  if (!open || !content.enabled || !content.text) return null;

  return (
    <div className="relative overflow-hidden bg-[#13294F] py-2.5 pr-11 font-dm text-[13px] leading-5 text-white lg:px-14 lg:text-center lg:text-[14px]">
      <div className="flex w-max animate-marquee motion-reduce:animate-none lg:w-auto lg:animate-none lg:justify-center">
        {[0, 1].map((copy) => (
          <p key={copy} aria-hidden={copy === 1 ? true : undefined} className={`shrink-0 pr-12 whitespace-nowrap lg:pr-0 ${copy === 1 ? "lg:hidden" : ""}`}>
            <span className="mr-1.5 text-[#E4C38A]">★</span>
            {content.text}
            {content.link_label && (
              <>
                {" "}
                <SiteLink
                  href={content.link_href}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="font-bold text-[#E4C38A] underline-offset-4 hover:underline"
                >
                  {content.link_label}
                  <span className="sr-only"> about {content.text}</span>
                </SiteLink>
              </>
            )}
          </p>
        ))}
      </div>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setOpen(false)}
        className="absolute top-0 right-0 grid h-full w-11 place-items-center bg-[#13294F] text-white/70 transition hover:text-white lg:right-4 lg:bg-transparent"
      >
        <CloseIcon className="size-3.5" />
      </button>
    </div>
  );
}
