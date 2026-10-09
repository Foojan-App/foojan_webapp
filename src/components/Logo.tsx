"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import type { LogoProps } from "@/types/components";

export default function Logo({ light = false }: LogoProps) {
  const pathname = usePathname();

  const goTop = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    if (window.location.hash) window.history.replaceState(null, "", "/");
  };

  return (
    <Link href="/" onClick={goTop} aria-label="Dr. Foojan Zeine — home" className="shrink-0">
      {light ? (
        <Image src="/images/footer-logo.png" alt="Dr. Foojan Zeine" width={164} height={99} priority className="h-24.75 w-41" />
      ) : (
        <Image
          src="/images/logo.png"
          alt="Dr. Foojan Zeine"
          width={106}
          height={64}
          priority
          className="h-10 w-auto lg:h-16"
        />
      )}
    </Link>
  );
}
