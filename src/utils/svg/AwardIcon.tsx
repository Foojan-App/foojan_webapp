import type { SVGProps } from "react";

export function AwardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" {...props}>
      <path
        d="M11 13.75C14.0376 13.75 16.5 11.2876 16.5 8.25C16.5 5.21243 14.0376 2.75 11 2.75C7.96243 2.75 5.5 5.21243 5.5 8.25C5.5 11.2876 7.96243 13.75 11 13.75Z"
        stroke="currentColor"
        strokeWidth="1.55833"
      />
      <path
        d="M7.79199 12.8333L6.41699 20.1666L11.0003 17.4166L15.5837 20.1666L14.2087 12.8333"
        stroke="currentColor"
        strokeWidth="1.55833"
      />
    </svg>
  );
}
