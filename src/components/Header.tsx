"use client";

import { ArrowRightRoundIcon, CloseIcon, MenuIcon } from "@/utils/svg";
import { useEffect, useRef, useState } from "react";
import type { HeaderProps } from "@/types/components";
import Logo from "./Logo";
import { Container } from "./ui";

export default function Header({ nav, announcement }: HeaderProps) {
  const [showBanner, setShowBanner] = useState(announcement.enabled);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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
  const [active, setActive] = useState(nav.find((item) => item.href.startsWith("#"))?.href ?? "");

  useEffect(() => {
    const sections = nav
      .filter((item) => item.href.startsWith("#") && item.href.length > 1)
      .map((item) => document.getElementById(item.href.slice(1)))
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
  }, [nav]);

  return (
    <>
      {showBanner && (
        <div className="relative overflow-hidden bg-plum-950 py-2.5 pr-10 text-[14px] leading-[22.95px] text-white lg:pl-10 lg:text-center">
          <div className="flex w-max animate-marquee motion-reduce:animate-none lg:w-auto lg:animate-none lg:justify-center">
            {[0, 1].map((copy) => (
              <p
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                className={`shrink-0 pr-12 whitespace-nowrap lg:pr-0 ${copy === 1 ? "lg:hidden" : ""}`}
              >
                <span className="mr-1 text-[13.5px] text-gold">★</span>
                {announcement.text}{" "}
                {announcement.link_label && (
                  <a href={announcement.link_href} tabIndex={copy === 1 ? -1 : undefined} className="font-semibold hover:underline">
                    {announcement.link_label}
                  </a>
                )}
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

          <div className="flex h-10 items-center gap-3 lg:contents">
            <a
              href="/contact"
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
