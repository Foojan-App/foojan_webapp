import type { Metadata } from "next";
import Link from "next/link";
import SitePage from "@/components/SitePage";
import { Container, Eyebrow } from "@/components/ui";
import { ArrowRightIcon } from "@/utils/svg";

export const metadata: Metadata = {
  title: "Page not found",
};

const quickLinks = [
  { label: "About Dr. Foojan", href: "/#about" },
  { label: "Awareness Integration Theory", href: "/#ait" },
  { label: "Books & Publications", href: "/#books" },
  { label: "Speaking", href: "/#speaking" },
  { label: "Media", href: "/#media" },
];

export default function NotFound() {
  return (
    <SitePage>
      <section className="bg-[#F7F2FB] py-20 md:py-28 lg:py-36">
        <Container className="flex flex-col items-center text-center">
          <Eyebrow center>Page not found</Eyebrow>
          <p className="mt-4 font-serif text-[96px] leading-none font-medium text-purple md:text-[140px]">404</p>
          <h1 className="mt-4 max-w-140 font-serif text-[28px] leading-[1.2] font-medium text-plum-950 md:text-[40px]">
            This page could not be found.
          </h1>
          <p className="mt-4 max-w-130 text-[15px] leading-[1.6] text-[#4A5163] md:text-[18px] md:leading-7.5">
            The link may be old or the page may have moved. You can head back to the homepage or explore Dr. Foojan’s
            work below.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link
              href="/"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-md border border-black bg-plum-950 px-7 text-[14.5px] font-semibold tracking-[0.14px] text-white transition hover:bg-plum-900"
            >
              Go to homepage <ArrowRightIcon className="shrink-0" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-md border border-[#0B235038] px-7 text-[14.5px] font-semibold tracking-[0.14px] text-plum-950 transition hover:border-purple/40"
            >
              Contact
            </Link>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-2.5 border-t border-[#E8DDF0] pt-8">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex h-10 items-center rounded-full border border-[#E3D6EA] bg-white px-4 text-[14px] font-medium text-plum-950 transition hover:border-purple hover:text-purple"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </SitePage>
  );
}
