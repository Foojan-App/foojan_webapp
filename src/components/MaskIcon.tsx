import type { MaskIconProps } from "@/types/components";

export default function MaskIcon({ src, className = "", size }: MaskIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`block bg-current ${className}`}
      style={{ mask: `url(${src}) center / contain no-repeat`, ...(size ? { width: size, height: size } : {}) }}
    />
  );
}
