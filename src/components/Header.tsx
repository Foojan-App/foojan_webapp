"use client";

import { ArrowRightRoundIcon, CloseIcon } from "@/utils/svg";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { HeaderProps } from "@/types/components";
import type { MenuItem } from "@/services/interface";
import Logo from "./Logo";
import MaskIcon from "./MaskIcon";
import { Container } from "./ui";
import SiteLink from "./SiteLink";

const NAV_GAP = 20;
const navItemClass =
  "flex h-10.5 items-center px-1.75 text-[14px] leading-[24.65px] font-medium text-plum-950 transition hover:text-purple";

export default function Header({ nav, announcement }: HeaderProps) {
  const [showBanner, setShowBanner] = useState(announcement.enabled);

  const pathname = usePathname();
  const [active, setActive] = useState(
    pathname === "/" ? (nav.find((item) => item.href.startsWith("#") && item.href.length > 1)?.href ?? "") : "",
  );
  const navRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const measureRef = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(true);

  useEffect(() => {
    const navEl = navRef.current;
    const measureEl = measureRef.current;
    if (!navEl || !measureEl) return;
    const fit = () => {
      const widths = [...measureEl.children].map((child) => (child as HTMLElement).offsetWidth);
      const total = widths.reduce((sum, w, i) => sum + w + (i ? NAV_GAP : 0), 0);
      setFits(navEl.clientWidth > 0 && total <= navEl.clientWidth);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(navEl);
    observer.observe(measureEl);
    return () => observer.disconnect();
  }, [nav]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () =>
      setEdges({ left: row.scrollLeft > 1, right: row.scrollLeft + row.clientWidth < row.scrollWidth - 1 });
    update();
    row.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(row);
    return () => {
      row.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [nav]);

  useEffect(() => {
    const row = rowRef.current;
    const current = row?.querySelector<HTMLElement>("[data-active]");
    if (!row || !current) return;
    const left = current.offsetLeft - row.scrollLeft;
    const visible = left >= 24 && left + current.offsetWidth <= row.clientWidth - 24;
    if (visible) return;
    row.scrollTo({ left: current.offsetLeft - (row.clientWidth - current.offsetWidth) / 2 });
  }, [pathname]);

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
                    <span className="sr-only"> about {announcement.text}</span>
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

      <header className="sticky top-0 z-40 border-b border-[#EBC3FF] bg-[#f8f2fb] transform-gpu">
        <Container className="flex h-15.5 items-center justify-between gap-6 min-[64rem]:h-21 min-[64rem]:py-2.5">
          <Logo />

          <nav ref={navRef} className="relative hidden min-w-0 flex-1 items-center justify-center gap-5 min-[64rem]:flex">
            <div ref={measureRef} aria-hidden="true" className="pointer-events-none invisible absolute top-0 left-0 flex">
              {nav.map((item, i) => (
                <span key={item.id ?? i} className={`${navItemClass} whitespace-nowrap`}>
                  {item.label}
                </span>
              ))}
            </div>
            {fits &&
              nav.map((item, i) => (
                <SiteLink
                  key={item.id ?? i}
                  {...linkProps(item)}
                  onClick={() => selectItem(item)}
                  className={`${navItemClass} shrink-0 whitespace-nowrap ${isActive(item) ? "shadow-[inset_0_-2px_0_0_var(--color-purple)]" : ""}`}
                >
                  {item.label}
                </SiteLink>
              ))}
          </nav>

          <div className="flex h-10 items-center gap-3 min-[64rem]:contents">
            <SiteLink
              href="/contact"
              className="inline-flex h-10 w-33 items-center justify-center gap-2.5 rounded-md border border-black bg-plum-950 text-[14px] leading-4.5 font-semibold tracking-[0.14px] text-white transition hover:bg-plum-900 min-[64rem]:h-12 min-[64rem]:p-4"
            >
              Connect <ArrowRightRoundIcon className="size-4" />
            </SiteLink>
          </div>
        </Container>

        <nav aria-label="Main" className={`relative ${fits ? "min-[64rem]:hidden" : ""}`}>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-[#f8f2fb] to-transparent transition-opacity ${edges.left ? "opacity-100" : "opacity-0"}`}
          />
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-[#f8f2fb] to-transparent transition-opacity ${edges.right ? "opacity-100" : "opacity-0"}`}
          />
          <div ref={rowRef} className="no-scrollbar overflow-x-auto">
            <div className="mx-auto flex h-17 w-max items-end gap-6.5 px-5 pt-0.5 pb-2">
              {nav.map((item, i) => (
                <SiteLink
                  key={item.id ?? i}
                  {...linkProps(item)}
                  data-active={isActive(item) || undefined}
                  onClick={() => selectItem(item)}
                  className={`group flex shrink-0 flex-col items-center border-b-[3px] pb-1 text-[12px] leading-4.5 whitespace-nowrap transition ${
                    isActive(item) ? "border-purple font-medium text-purple" : "border-transparent font-normal text-[#242424]"
                  }`}
                >
                  {item.icon_url && (
                    <MaskIcon
                      src={item.icon_url}
                      className={`size-6 ${isActive(item) ? "text-purple" : "text-plum-950 group-hover:text-purple"}`}
                    />
                  )}
                  <span
                    data-label={item.label}
                    className={`grid after:invisible after:h-0 after:font-medium after:content-[attr(data-label)] ${isActive(item) ? "" : "group-hover:text-purple"}`}
                  >
                    {item.label}
                  </span>
                </SiteLink>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
