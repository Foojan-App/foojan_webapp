import Image from "next/image";
import type { SectionPhotoProps } from "@/types/components";

export default function SectionPhoto({ src, alt, photo, className = "" }: SectionPhotoProps) {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes={photo.sizes}
      className={`block h-auto w-full rounded-xl ${className}`}
    />
  );
}
