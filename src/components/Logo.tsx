import Image from "next/image";

export default function Logo({ light = false }: { light?: boolean }) {
  if (!light) {
    return (
      <a href="#" aria-label="Dr. Foojan Zeine — home" className="shrink-0">
        {/* 106×64 on desktop; 66.36×40 on mobile */}
        <Image
          src="/images/logo.png"
          alt="Dr. Foojan Zeine"
          width={106}
          height={64}
          priority
          className="h-10 w-auto lg:h-16"
        />
      </a>
    );
  }

  // footer (dark background) uses the light logo
  return (
    <a href="#" aria-label="Dr. Foojan Zeine — home" className="shrink-0">
      {/* 164×99 as in Figma (the PNG ratio is a hair off, so both sides are fixed) */}
      <Image src="/images/footer-logo.png" alt="Dr. Foojan Zeine" width={164} height={99} priority className="h-24.75 w-41" />
    </a>
  );
}
