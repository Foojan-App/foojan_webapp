import { ArrowRightIcon, ArrowRightRoundIcon } from "@/utils/svg";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  // mobile (390 frame): 20px gutters → 350px content; desktop: 1240px content + 24px gutters → 100px margins at 1440
  return <div className={`mx-auto w-full max-w-322 px-5 lg:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({
  children,
  center = false,
  tone = "purple",
}: {
  children: ReactNode;
  center?: boolean;
  tone?: "purple" | "gold";
}) {
  const color = tone === "gold" ? "text-gold" : "text-purple";
  const line = tone === "gold" ? "bg-gold" : "bg-purple";
  return (
    <p
      className={`flex items-center gap-3 text-[12px] leading-[21.25px] font-bold uppercase ${color} ${
        center ? "justify-center" : ""
      }`}
    >
      <span className={`h-[1.5px] w-7 ${line}`} />
      {children}
      {center && <span className={`h-[1.5px] w-7 ${line}`} />}
    </p>
  );
}

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "dark" | "outline" | "gold" | "outline-dark";
  arrow?: boolean;
  className?: string;
};

const variants = {
  dark: "border border-black bg-plum-950 text-white hover:bg-plum-900",
  outline: "border border-[#0B235038] text-plum-950 hover:border-purple/40",
  gold: "border border-black bg-gold text-plum-950 hover:brightness-105",
  "outline-dark": "border border-[#FFFFFF59] text-white hover:border-white/60",
};

export function Button({ href = "#", children, variant = "dark", arrow = false, className = "" }: ButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex h-11 items-center justify-center gap-2.5 rounded-md px-5 text-[13px] font-medium transition ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && <ArrowRightIcon className="shrink-0" />}
    </a>
  );
}

export function TextLink({
  href = "#",
  children,
  icon,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 border-b border-purple pb-1.5 text-[12px] font-semibold text-ink transition hover:text-purple ${className}`}
    >
      {children}
      {icon ?? <ArrowRightRoundIcon className="size-3.5" />}
    </a>
  );
}
