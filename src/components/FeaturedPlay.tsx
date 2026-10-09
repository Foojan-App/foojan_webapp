"use client";

import { useRef, useState } from "react";
import { CloseIcon, PlayIcon } from "@/utils/svg";
import type { FeaturedPlayProps } from "@/types/components";

const toEmbedUrl = (href: string) => {
  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");
    const list = url.searchParams.get("list");
    if (host === "youtube.com" || host === "m.youtube.com") {
      const video = url.searchParams.get("v");
      if (video) return `https://www.youtube-nocookie.com/embed/${video}?autoplay=1${list ? `&list=${list}` : ""}`;
      if (list) return `https://www.youtube-nocookie.com/embed/videoseries?list=${list}&autoplay=1`;
    }
    if (host === "youtu.be") return `https://www.youtube-nocookie.com/embed${url.pathname}?autoplay=1`;
  } catch {}
  return null;
};

export default function FeaturedPlay({ href, title, eyebrow }: FeaturedPlayProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const embedUrl = toEmbedUrl(href);

  const buttonClass =
    "grid size-18 place-items-center rounded-lg border border-[#FFFFFF40] bg-[#FFFFFF1F] transition hover:bg-white/20";

  if (!embedUrl) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Play ${title}`} className={buttonClass}>
        <PlayIcon />
      </a>
    );
  }

  const show = () => {
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
    dialog.current?.showModal();
    panel.current?.focus();
  };

  const close = () => {
    dialog.current?.close();
  };

  const handleClose = () => {
    setOpen(false);
    document.documentElement.style.overflow = "";
  };

  return (
    <>
      <button type="button" aria-label={`Play ${title}`} onClick={show} className={buttonClass}>
        <PlayIcon />
      </button>
      <dialog
        ref={dialog}
        aria-label={title}
        onClose={handleClose}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
        className="m-auto w-[min(calc(100%-32px),calc((100dvh-190px)*16/9),1040px)] max-w-none scale-95 overflow-visible bg-transparent p-0 opacity-0 transition-all transition-discrete duration-300 backdrop:bg-plum-950/80 backdrop:opacity-0 backdrop:backdrop-blur-sm backdrop:transition-all backdrop:transition-discrete backdrop:duration-300 open:scale-100 open:opacity-100 open:backdrop:opacity-100 starting:open:scale-95 starting:open:opacity-0 starting:open:backdrop:opacity-0"
      >
        <div
          ref={panel}
          tabIndex={-1}
          className="rounded-[14px] border border-white/10 bg-plum-950 p-3 outline-none text-white shadow-[0_30px_80px_-20px_#000000B3] md:p-4">
          <div className="flex items-start justify-between gap-4 px-1 pt-1 pb-3 md:px-2 md:pb-4">
            <div className="flex min-w-0 flex-col gap-1">
              <p className="flex items-center gap-2.5 text-[11px] leading-4 font-bold tracking-[2.2px] text-gold uppercase">
                <span className="h-[1.5px] w-8 bg-gold" />
                {eyebrow}
              </p>
              <p className="truncate font-serif text-[18px] leading-[1.3] font-medium md:text-[22px]">{title}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close video"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-white/25 text-white transition hover:bg-white/10"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="aspect-video overflow-hidden rounded-[10px] bg-black">
            {open && (
              <iframe
                src={embedUrl}
                title={title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="size-full border-0"
              />
            )}
          </div>
          <div className="flex justify-end px-1 pt-3 md:px-2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold text-white/75 underline-offset-2 transition hover:text-white hover:underline"
            >
              Watch on YouTube ↗
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
