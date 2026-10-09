"use client";

import { ArrowRightRoundIcon, ChevronDownIcon, CloseIcon, MenuIcon } from "@/utils/svg";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { HeaderProps } from "@/types/components";
import type { MenuItem } from "@/services/interface";
import Logo from "./Logo";
import { Container } from "./ui";
import SiteLink from "./SiteLink";

const NAV_GAP = 20;
const navItemClass =
  "flex h-10.5 items-center px-1.75 text-[14px] leading-[24.65px] font-medium text-plum-950 transition hover:text-purple";

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
  const pathname = usePathname();
  const [active, setActive] = useState(
    pathname === "/" ? (nav.find((item) => item.href.startsWith("#") && item.href.length > 1)?.href ?? "") : "",
  );
  const navRef = useRef<HTMLElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(nav.length);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const navEl = navRef.current;
    const measureEl = measureRef.current;
    if (!navEl || !measureEl) return;
    const fit = () => {
      const widths = [...measureEl.children].map((child) => (child as HTMLElement).offsetWidth);
      const moreWidth = widths.pop() ?? 0;
      const available = navEl.clientWidth;
      const total = widths.reduce((sum, w, i) => sum + w + (i ? NAV_GAP : 0), 0);
      if (total <= available) return setVisibleCount(widths.length);
      let used = 0;
      let count = 0;
      for (const w of widths) {
        const next = used + (count ? NAV_GAP : 0) + w;
        if (next + NAV_GAP + moreWidth > available) break;
        used = next;
        count += 1;
      }
      setVisibleCount(count);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(navEl);
    observer.observe(measureEl);
    return () => observer.disconnect();
  }, [nav]);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  const isActive = (item: MenuItem) => active === item.href || pathname === item.href;
  const linkProps = (item: MenuItem) => ({
    href: item.href,
    target: item.href.startsWith("http") ? "_blank" : undefined,
    rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined,
    "aria-current": isActive(item) ? ("location" as const) : undefined,
  });
  const selectItem = (item: MenuItem) => {
    if (item.href !== "#" && !item.href.startsWith("http")) setActive(item.href);
  };
  const shown = nav.slice(0, visibleCount);
  const hidden = nav.slice(visibleCount);
  const moreActive = hidden.some(isActive);

  useEffect(() => {
    const sections = nav
      .filter((item) => item.href.startsWith("#") && item.href.length > 1)
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const hash = `#${entry.target.id}`;
          setActive(hash);
          if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );

    const onScroll = () => {
      if (window.scrollY < 10 && window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
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
                  <SiteLink href={announcement.link_href} tabIndex={copy === 1 ? -1 : undefined} className="font-semibold hover:underline">
                    {announcement.link_label}
                  </SiteLink>
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

          <nav ref={navRef} className="relative hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex">
            <div ref={measureRef} aria-hidden="true" className="pointer-events-none invisible absolute top-0 left-0 flex">
              {nav.map((item, i) => (
                <span key={item.id ?? i} className={`${navItemClass} whitespace-nowrap`}>
                  {item.label}
                </span>
              ))}
              <span className={`${navItemClass} gap-1`}>
                More <ChevronDownIcon />
              </span>
            </div>
            {shown.map((item, i) => (
              <SiteLink
                key={item.id ?? i}
                {...linkProps(item)}
                onClick={() => selectItem(item)}
                className={`${navItemClass} shrink-0 whitespace-nowrap ${isActive(item) ? "shadow-[inset_0_-2px_0_0_var(--color-purple)]" : ""}`}
              >
                {item.label}
              </SiteLink>
            ))}
            {hidden.length > 0 && (
              <div ref={moreRef} className="relative shrink-0">
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={moreOpen}
                  onClick={() => setMoreOpen((open) => !open)}
                  className={`${navItemClass} gap-1 ${moreActive ? "shadow-[inset_0_-2px_0_0_var(--color-purple)]" : ""}`}
                >
                  More <ChevronDownIcon className={`transition ${moreOpen ? "rotate-180" : ""}`} />
                </button>
                {moreOpen && (
                  <div className="absolute top-full right-0 z-50 mt-2 flex max-h-[70vh] min-w-52 flex-col overflow-y-auto rounded-md border border-black/8 bg-white py-2 shadow-lg">
                    {hidden.map((item, i) => (
                      <SiteLink
                        key={item.id ?? i}
                        {...linkProps(item)}
                        onClick={() => {
                          selectItem(item);
                          setMoreOpen(false);
                        }}
                        className={`px-4 py-2.5 text-[14px] font-medium transition hover:bg-lavender-50 hover:text-purple ${isActive(item) ? "text-purple" : "text-plum-950"}`}
                      >
                        {item.label}
                      </SiteLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>

          <div className="flex h-10 items-center gap-3 lg:contents">
            <SiteLink
              href="/contact"
              className="inline-flex h-10 w-33 items-center justify-center gap-2.5 rounded-md border border-black bg-plum-950 text-[14px] leading-4.5 font-semibold tracking-[0.14px] text-white transition hover:bg-plum-900 lg:h-12 lg:p-4"
            >
              Connect <ArrowRightRoundIcon className="size-4" />
            </SiteLink>
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
              {nav.map((item, i) => (
                <SiteLink
                  key={item.id ?? i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => {
                    if (item.href !== "#" && !item.href.startsWith("http")) setActive(item.href);
                    setMenuOpen(false);
                  }}
                  aria-current={active === item.href || pathname === item.href ? "location" : undefined}
                  className={`py-2.5 text-[14px] font-medium ${active === item.href || pathname === item.href ? "text-purple" : "text-plum-950"}`}
                >
                  {item.label}
                </SiteLink>
              ))}
            </Container>
          </nav>
        )}
      </header>
    </>
  );
}
