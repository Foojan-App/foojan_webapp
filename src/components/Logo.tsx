import Image from "next/image";

export default function Logo({ light = false }: { light?: boolean }) {
  if (!light) {
    return (
      <a href="#" aria-label="Dr. Foojan Zeine — home" className="shrink-0">
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

  return (
    <a href="#" aria-label="Dr. Foojan Zeine — home" className="shrink-0">
      <Image src="/images/footer-logo.png" alt="Dr. Foojan Zeine" width={164} height={99} priority className="h-24.75 w-41" />
    </a>
  );
}
