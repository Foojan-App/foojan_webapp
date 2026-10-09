"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteLinkProps } from "@/types/components";

const EXTERNAL = /^(https?:|mailto:|tel:)/;

export default function SiteLink({ href, ...rest }: SiteLinkProps) {
  const pathname = usePathname();
  const samePageHash = href.startsWith("#") && pathname === "/";
  if (EXTERNAL.test(href) || href === "#" || samePageHash || rest.target === "_blank") return <a href={href} {...rest} />;
  return <Link href={href.startsWith("#") ? `/${href}` : href} {...rest} />;
}
