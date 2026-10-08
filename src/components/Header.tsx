"use client";

import { ArrowRightRoundIcon, CloseIcon, MenuIcon } from "@/utils/svg";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { Container } from "./ui";

const nav = [
  { label: "About", href: "#about" },
  { label: "AIT", href: "#ait" },
  { label: "Books & Publications", href: "#books" },
  { label: "Media", href: "#media" },
  { label: "Speaking", href: "#speaking" },
  { label: "Experience", href: "#experience" },
  { label: "Her Work", href: "#work" },
];

export default function Header() {
  const [showBanner, setShowBanner] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // close the mobile menu on a tap/click outside the header, or on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);
  const [active, setActive] = useState(nav[0].href);

  // Highlight the nav item for whichever section is crossing the middle of the viewport.
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {showBanner && (
        // same 43px bar on all sizes; on mobile the line scrolls continuously right → left, on desktop it sits centred
        <div className="relative overflow-hidden bg-plum-950 py-2.5 pr-10 text-[14px] leading-[22.95px] text-white lg:pl-10 lg:text-center">
          <div className="flex w-max animate-marquee motion-reduce:animate-none lg:w-auto lg:animate-none lg:justify-center">
            {[0, 1].map((copy) => (
              <p
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                className={`shrink-0 pr-12 whitespace-nowrap lg:pr-0 ${copy === 1 ? "lg:hidden" : ""}`}
              >
                <span className="mr-1 text-[13.5px] text-gold">★</span>
                Recipient of the 2026 AAMFT Clinical Practice Innovation Award —{" "}
                <a href="#experience" tabIndex={copy === 1 ? -1 : undefined} className="font-semibold hover:underline">
                  Read more
                </a>
              </p>
            ))}
          </div>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setShowBanner(false)}
            className="absolute top-1/2 right-0 grid h-full w-10 -translate-y-1/2 place-items-center bg-plum-950 text-white/70 hover:text-white lg:right-4 lg:w-auto lg:bg-transparent"
          >
            <CloseIcon className="size-3.5" />
          </button>
        </div>
      )}

      <header ref={headerRef} className="sticky top-0 z-40 border-b border-black/8 bg-[#f8f2fb] backdrop-blur-lg">
        {/* mobile: 68px bar (67 + 1px border), 350×40 row 11px from the top; desktop: 85px bar, 64px row */}
        <Container className="flex h-16.75 items-start justify-between gap-6 pt-2.75 lg:h-21 lg:items-center lg:py-2.5">
          <Logo />

          <nav className="hidden items-center gap-5 lg:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActive(item.href)}
                aria-current={active === item.href ? "location" : undefined}
                className={`flex h-10.5 items-center px-1.75 text-[14px] leading-[24.65px] font-medium text-plum-950 transition hover:text-purple ${
                  active === item.href ? "shadow-[inset_0_-2px_0_0_var(--color-purple)]" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* right side on mobile: 168×40 = Connect (132×40) + 12px + 24px menu icon */}
          <div className="flex h-10 items-center gap-3 lg:contents">
            <a
              href="#contact"
              className="inline-flex h-10 w-33 items-center justify-center gap-2.5 rounded-md border border-black bg-plum-950 text-[14px] leading-4.5 font-semibold tracking-[0.14px] text-white transition hover:bg-plum-900 lg:h-12 lg:p-4"
            >
              Connect <ArrowRightRoundIcon className="size-4" />
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="text-black lg:hidden"
            >
              {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon />}
            </button>
          </div>
        </Container>

        {menuOpen && (
          <nav className="border-t border-black/8 bg-[#f8f2fb] lg:hidden">
            <Container className="flex flex-col py-3">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActive(item.href);
                    setMenuOpen(false);
                  }}
                  aria-current={active === item.href ? "location" : undefined}
                  className={`py-2.5 text-[14px] font-medium ${active === item.href ? "text-purple" : "text-plum-950"}`}
                >
                  {item.label}
                </a>
              ))}
            </Container>
          </nav>
        )}
      </header>
    </>
  );
}
