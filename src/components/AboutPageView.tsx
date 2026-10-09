import Image from "next/image";
import type { AboutPageViewProps } from "@/types/components";
import { ButtonVariant } from "@/types/enums";
import AccentText from "./AccentText";
import RichText from "./RichText";
import SitePage from "./SitePage";
import { Button, Container, Eyebrow } from "./ui";

export default function AboutPageView({ content }: AboutPageViewProps) {
  return (
    <SitePage>
      <section className="bg-[#F7F2FB] py-16 md:py-24 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,640px)_minmax(0,440px)] lg:justify-between">
          <div className="flex flex-col gap-6">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h1 className="font-serif text-[32px] leading-[1.15] font-medium text-plum-950 max-[389px]:text-[28px] md:text-[52px] md:leading-[1.12] lg:text-[60px]">
              <AccentText text={content.heading} />
            </h1>
            <p className="text-[14px] leading-6 font-semibold tracking-[0.2px] text-plum-950 md:text-[15px]">
              {content.subtitle}
            </p>
            <p className="text-[16px] leading-[1.6] text-[#4A5163] md:text-[19px] md:leading-8.25">{content.intro}</p>
          </div>
          <div className="relative mx-auto w-full max-w-110 pr-4.5 pb-4.5 pl-9 lg:mx-0">
            <div className="absolute top-4.5 right-0 bottom-0 left-13.5 rounded-[10px] border border-purple" />
            <div className="relative aspect-[463.09/578.86] overflow-hidden rounded-[10px] bg-[#D9CFE2] shadow-[0_14px_40px_-18px_#0B235033]">
              <Image src={content.image_url} alt="Dr. Foojan Zeine" fill priority sizes="(min-width: 1280px) 400px, 90vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,720px)_minmax(0,380px)] lg:justify-between lg:gap-16">
          <article className="[&_li]:text-[15px] [&_li]:leading-[1.6] [&_p]:text-[15px] [&_p]:leading-[1.6] md:[&_li]:text-[17px] md:[&_li]:leading-7.5 md:[&_p]:text-[17px] md:[&_p]:leading-7.5">
            <RichText body={content.body} />
          </article>
          <aside className="flex flex-col gap-4 self-start lg:sticky lg:top-32">
            <p className="text-[13px] leading-4 font-bold tracking-[1.82px] text-plum-950 uppercase">{content.highlights_title}</p>
            {content.highlights.map((highlight) => (
              <div key={highlight.id ?? highlight.title} className="rounded-[10px] border border-[#F1E7F6] bg-[#FBF8FD] p-5">
                <p className="font-serif text-[20px] leading-[1.3] font-medium text-plum-950">{highlight.title}</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {highlight.items
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)
                    .map((item) => (
                      <li key={item} className="flex gap-2.5 text-[15px] leading-6 text-[#4A5163]">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-purple" />
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </aside>
        </Container>
      </section>

      <section className="bg-white pb-20 md:pb-24">
        <Container>
          <div className="flex flex-col gap-6 rounded-[14px] bg-plum-950 p-8 text-white md:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="flex max-w-170 flex-col gap-3">
              <h2 className="font-serif text-[32px] leading-[1.2] max-md:text-[28px] max-[389px]:text-[26px] font-medium md:text-[40px] [&_.text-purple]:text-gold">
                <AccentText text={content.cta_heading} />
              </h2>
              <p className="text-[15px] leading-[1.6] text-[#DDDDDD] md:text-[17px] md:leading-6.75">{content.cta_paragraph}</p>
            </div>
            <Button
              href={content.cta_button_href}
              variant={ButtonVariant.Gold}
              arrow
              className="h-14! shrink-0 px-8! text-[14.5px]! font-semibold! tracking-[0.14px] text-[#071A3D]!"
            >
              {content.cta_button_label}
            </Button>
          </div>
        </Container>
      </section>
    </SitePage>
  );
}
