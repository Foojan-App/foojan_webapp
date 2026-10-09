import { ArrowRightIcon, ArrowRightRoundIcon } from "@/utils/svg";
import type { ReactNode } from "react";
import { ButtonVariant, EyebrowTone } from "@/types/enums";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-322 px-5 lg:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({
  children,
  center = false,
  tone = EyebrowTone.Purple,
}: {
  children: ReactNode;
  center?: boolean;
  tone?: EyebrowTone;
}) {
  const color = tone === EyebrowTone.Gold ? "text-gold" : "text-purple";
  const line = tone === EyebrowTone.Gold ? "bg-gold" : "bg-purple";
  return (
    <p
      className={`flex items-center gap-3 text-[12px] leading-[21.25px] font-bold uppercase max-[389px]:items-start max-[389px]:gap-2 max-[389px]:text-[11px] ${color} ${
        center ? "justify-center" : ""
      }`}
    >
      <span className={`h-[1.5px] w-7 shrink-0 max-[389px]:mt-[10px] ${line}`} />
      {children}
      {center && <span className={`h-[1.5px] w-7 shrink-0 max-[389px]:mt-[10px] ${line}`} />}
    </p>
  );
}

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
};

const variants: Record<ButtonVariant, string> = {
  [ButtonVariant.Dark]: "border border-black bg-plum-950 text-white hover:bg-plum-900",
  [ButtonVariant.Outline]: "border border-[#0B235038] text-plum-950 hover:border-purple/40",
  [ButtonVariant.Gold]: "border border-black bg-gold text-plum-950 hover:brightness-105",
  [ButtonVariant.OutlineDark]: "border border-[#FFFFFF59] text-white hover:border-white/60",
};

export function Button({ href = "#", children, variant = ButtonVariant.Dark, arrow = false, className = "" }: ButtonProps) {
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
