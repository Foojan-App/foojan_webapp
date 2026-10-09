import Image from "next/image";
import type { SectionPhotoProps } from "@/types/components";

export default function SectionPhoto({ src, alt, width, height, photo, className = "" }: SectionPhotoProps) {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? photo.outputWidth}
      height={height ?? Math.round(photo.outputWidth / photo.aspect)}
      sizes={photo.sizes}
      className={`block h-auto w-full rounded-xl ${className}`}
    />
  );
}
