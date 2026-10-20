import { ArrowRightIcon } from "@/utils/svg";
import type { ButtonProps, ContainerProps, EyebrowProps } from "@/types/components";
import SiteLink from "./SiteLink";

export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-322 px-5 lg:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, center = false }: EyebrowProps) {
  return (
    <p
      className={`flex items-center gap-3 text-[12px] leading-[21.25px] font-bold text-[#815F37] uppercase max-[389px]:items-start max-[389px]:gap-2 max-[389px]:text-[11px] ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="h-[1.5px] w-7 shrink-0 bg-[#815F37] max-[389px]:mt-2.5" />
      {children}
      {center && <span className="h-[1.5px] w-7 shrink-0 bg-[#815F37] max-[389px]:mt-2.5" />}
    </p>
  );
}

export function Button({ href = "#", children, arrow = false, className = "" }: ButtonProps) {
  return (
    <SiteLink
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`inline-flex h-11 max-w-full items-center justify-center gap-2.5 rounded-md border border-[#E4C38A] bg-[#E4C38A] px-5 text-[13px] font-medium text-[#13294F] transition hover:brightness-105 ${className}`}
    >
      {children}
      {arrow && <ArrowRightIcon className="shrink-0" />}
    </SiteLink>
  );
}
