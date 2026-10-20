"use client";

import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/utils/svg";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { HeaderProps } from "@/types/components";
import type { MenuLink } from "@/services/interface";
import Logo from "./Logo";
import SiteLink from "./SiteLink";

const external = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};

export default function Header({ nav }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const closeAll = () => {
    setMenuOpen(false);
    setOpenGroup(null);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeAll();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggleGroup = (index: number) => setOpenGroup((current) => (current === index ? null : index));

  const subLink = (link: MenuLink, className: string) => (
    <SiteLink key={link.label} href={link.href} {...external(link.href)} onClick={closeAll} className={className}>
      {link.label}
    </SiteLink>
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-[#E4DEDB] bg-[#FAF7F3F7] font-dm text-ink-blue backdrop-blur-[12px] transform-gpu"
    >
      <div className="mx-auto flex h-19 w-full max-w-370 items-center justify-between gap-3 pr-7 pl-5.75 lg:h-23.75 lg:px-[79px]">
        <Logo />

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-9.25 w-7 place-items-center text-navy lg:hidden"
        >
          {menuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="h-4 w-5.25" />}
        </button>

        <nav aria-label="Main" className="hidden items-center gap-4.75 lg:flex">
          {nav.map((item, index) =>
            item.children?.length ? (
              <div
                key={item.label}
                onMouseEnter={() => setOpenGroup((current) => (current === index ? current : null))}
                className="group relative flex items-center"
              >
                <SiteLink
                  href={item.href}
                  {...external(item.href)}
                  onClick={closeAll}
                  aria-haspopup="true"
                  className="text-[13px] leading-none font-bold whitespace-nowrap text-ink-blue transition hover:text-[#BD9040]"
                >
                  {item.label}
                </SiteLink>
                <button
                  type="button"
                  aria-label={`Expand ${item.label} menu`}
                  aria-expanded={openGroup === index}
                  onClick={() => toggleGroup(index)}
                  className="ml-1.25 grid h-5.5 w-2.25 place-items-center pt-1 text-[#26324a]"
                >
                  <ChevronDownIcon className="size-1.75" />
                </button>
                <div
                  className={`absolute top-full left-0 z-50 min-w-55 border border-[#e9e1d8] bg-white p-2.25 shadow-[0_15px_32px_rgba(20,28,48,0.12)] group-hover:block group-has-[:focus-visible]:block ${
                    openGroup === index ? "block" : "hidden"
                  }`}
                >
                  {item.children.map((link) =>
                    subLink(
                      link,
                      "block px-3 py-2.5 text-[12px] font-semibold whitespace-nowrap text-[#1b2842] hover:bg-[#f6f1eb] hover:text-[#795b7f] focus-visible:bg-[#f6f1eb] focus-visible:text-[#795b7f]",
                    ),
                  )}
                </div>
              </div>
            ) : (
              <SiteLink
                key={item.label}
                href={item.href}
                {...external(item.href)}
                onClick={closeAll}
                aria-current={pathname === item.href ? "page" : undefined}
                className="text-[13px] leading-none font-bold whitespace-nowrap text-ink-blue transition hover:text-[#BD9040]"
              >
                {item.label}
              </SiteLink>
            ),
          )}
          <SiteLink
            href="#contact"
            onClick={closeAll}
            className="flex h-10.5 w-41.25 items-center bg-navy pl-3.5 text-[12px] leading-none font-bold tracking-[1px] whitespace-nowrap text-white uppercase transition hover:bg-[#234b84]"
          >
            Invite Dr. Foojan ↗
          </SiteLink>
        </nav>
      </div>

      {menuOpen && (
        <nav
          id="site-menu"
          aria-label="Main"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-77px)] overflow-y-auto bg-paper pt-2 pr-7 pb-6 pl-5.75 shadow-[0_20px_25px_#0002] lg:hidden"
        >
          {nav.map((item, index) => (
            <div key={item.label} className="flex flex-wrap items-center">
              <SiteLink
                href={item.href}
                {...external(item.href)}
                onClick={closeAll}
                className="flex min-h-11 flex-1 items-center text-[15px] leading-none font-bold"
              >
                {item.label}
              </SiteLink>
              {item.children?.length ? (
                <>
                  <button
                    type="button"
                    aria-label={`Expand ${item.label} menu`}
                    aria-expanded={openGroup === index}
                    onClick={() => toggleGroup(index)}
                    className="grid h-11 w-7 place-items-center text-[#26324a]"
                  >
                    <ChevronDownIcon className={`size-2.5 transition ${openGroup === index ? "rotate-180" : ""}`} />
                  </button>
                  {openGroup === index && (
                    <div className="mb-2 w-full border-l-2 border-[#bca077] pl-3">
                      {item.children.map((link) => subLink(link, "flex min-h-10 items-center text-[14px] leading-none font-semibold text-[#1b2842]"))}
                    </div>
                  )}
                </>
              ) : null}
            </div>
          ))}
          <SiteLink
            href="#contact"
            onClick={closeAll}
            className="mt-4 flex h-10.5 items-center justify-center bg-navy px-3.5 text-[12px] leading-none font-bold tracking-[1px] text-white uppercase"
          >
            Invite Dr. Foojan ↗
          </SiteLink>
        </nav>
      )}
    </header>
  );
}
