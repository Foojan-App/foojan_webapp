"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@/utils/svg";

const SHOW_AFTER = 600;

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full border border-white/30 bg-plum-950 text-white shadow-[0_10px_24px_-10px_#1A002B99] transition duration-300 hover:bg-purple lg:right-8 lg:bottom-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowRightIcon className="-rotate-90" />
    </button>
  );
}
