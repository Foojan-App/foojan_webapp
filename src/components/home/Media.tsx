import Image from "next/image";
import { ArrowUpRightTinyIcon, SubstackLogoIcon, YouTubeLogoIcon } from "@/utils/svg";
import type { HomeMediaProps } from "@/types/components";
import SiteLink from "../SiteLink";

const external = { target: "_blank", rel: "noopener noreferrer" };
const isExternal = (href: string) => (href.startsWith("http") ? external : {});
const kicker = "text-[11px] leading-3.5 font-bold tracking-[3px] uppercase";

export default function Media({ content }: HomeMediaProps) {
  return (
    <div id="media-library" className="leading-[normal] @container scroll-mt-[77px] lg:scroll-mt-24 bg-[#F7F3F6] pt-16.25 pb-9.5 font-dm text-ink-blue lg:pt-25">
      <div className="mx-auto mb-9.5 w-full max-w-300 px-5.5 lg:px-[79px]">
        <p className={kicker}>{content.kicker}</p>
        <h2 className="my-5 font-playfair text-[51.2px] leading-[1.08] font-normal text-[#182440] lg:text-[clamp(3.2rem,6cqw,86.4px)]">
          {content.heading} <em className="text-[#8C6B8E]">{content.heading_accent}</em>
        </h2>
        <p className="max-w-180 text-[18.4px] leading-[1.75] text-[#55515F]">{content.paragraph}</p>
        <div className="mt-7.5 flex flex-wrap gap-3.5">
          {content.tabs.map((tab) => (
            <SiteLink
              key={tab.href}
              href={tab.href}
              className="border-b border-[#B38A5E] py-2.5 pr-5 text-[12px] leading-4 font-bold tracking-[2px] text-[#182440] uppercase"
            >
              {tab.label}
            </SiteLink>
          ))}
        </div>
      </div>

      <section
        id="podcast"
        className="relative scroll-mt-[77px] lg:scroll-mt-24 overflow-hidden bg-navy pt-15 pb-20 text-white lg:pt-[61px] lg:pb-[79px] before:pointer-events-none before:absolute before:top-[-15px] before:right-[max(-2cqw,-28.8px)] before:font-playfair before:text-[90px] before:leading-[normal] before:tracking-[-5px] before:whitespace-nowrap before:text-[#FFFFFF06] before:content-['INNER_VOICE'] lg:before:text-[145px]"
      >
        <div className="relative mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
          <div className="grid items-center gap-[min(8cqw,115.2px)] lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
            <div>
              <p className={`${kicker} text-[#D6AC68]`}>{content.podcast_kicker}</p>
              <h2 className="my-4.25 max-w-195 font-playfair text-[48px] leading-[1.12] font-normal tracking-[-0.04em] lg:text-[clamp(54px,6cqw,86.4px)]">
                {content.podcast_heading} <em className="text-[#D9B66D]">{content.podcast_heading_accent}</em>
              </h2>
              <p className="mt-6 mb-7.5 max-w-162.5 text-[16px] leading-[1.8] text-[#F8FAFF]">{content.podcast_text}</p>
              <div className="grid gap-3 lg:flex lg:flex-wrap">
                <SiteLink href={content.podcast_primary.href} {...isExternal(content.podcast_primary.href)} className="h-5.5 bg-[#F5F0E7] leading-5.5 text-[#102746] lg:h-auto lg:leading-[normal]">
                  {content.podcast_primary.label}
                </SiteLink>
                {content.podcast_links.map((item) => (
                  <SiteLink key={item.label} href={item.href} {...isExternal(item.href)} className="text-white">
                    {item.label}
                  </SiteLink>
                ))}
              </div>
            </div>
            <figure className="my-4 w-full max-w-66.5 justify-self-center bg-[#EEE8F7] p-3.5 lg:my-0 lg:max-w-[299px]">
              <Image
                src={content.podcast_image_url}
                alt={content.podcast_image_alt}
                width={1254}
                height={1254}
                sizes="(min-width: 1024px) 300px, 390px"
                className="block h-auto w-full"
              />
            </figure>
          </div>

          <div className="reveal mt-[51px] grid gap-7 lg:mt-[71px] lg:grid-cols-3 lg:gap-9">
            {content.episodes.map((episode) => (
              <article key={episode.label} className="border-t border-white/[0.18] pt-6">
                <small className="block text-[10px] tracking-[2px] text-[#D6AC68] uppercase">{episode.label}</small>
                <h3 className="my-8.5 font-playfair text-[34px] leading-[1.18] font-normal lg:min-h-20.5">{episode.title}</h3>
                <SiteLink href={episode.link.href} {...isExternal(episode.link.href)} className="mt-4.5 inline-block text-[13px] leading-[19px] text-[#C6D0DF] hover:text-white">
                  {episode.link.label}
                </SiteLink>
              </article>
            ))}
          </div>
          <p className="mt-13 mb-4 text-[16px] leading-[1.8] text-[#E5ECF7]">{content.podcast_note}</p>
        </div>
      </section>

      <section id="youtube" className="scroll-mt-[77px] lg:scroll-mt-24 border-t border-[rgba(24,36,64,0.14)] bg-[#F3EDF4] pt-20 pb-21.25">
        <div className="mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
          <div className="reveal mb-9 grid items-end gap-0 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className={kicker}>{content.youtube_kicker}</p>
              <h2 className="my-4.25 font-playfair text-[43px] leading-[1.12] font-normal tracking-[-0.04em] lg:text-[clamp(42px,5.2cqw,74.88px)]">
                {content.youtube_heading}
                <br />
                <em className="text-[#8B6A8D]">{content.youtube_heading_accent}</em>
              </h2>
            </div>
            <p className="my-4 text-[16px] leading-[1.8] text-[#56515C]">{content.youtube_text}</p>
          </div>
          <SiteLink
            href={content.youtube_href}
            {...external}
            aria-label="Visit Dr. Foojan's YouTube channel"
            className="reveal flex min-h-95 flex-col items-start justify-between gap-12 bg-[linear-gradient(134.49deg,#827087_0%,#51445F_52%,#162E56_100%)] lg:bg-[linear-gradient(99.85deg,#827087_0%,#51445F_52%,#162E56_100%)] p-9 text-white transition hover:brightness-[1.07] lg:flex-row lg:items-center lg:p-[clamp(36px,6cqw,85px)]"
          >
            <div className="max-w-180">
              <span className="mb-7.5 block h-4 max-w-[239px] text-[12px] leading-4 font-bold tracking-[3px] text-[#F3D295] uppercase lg:h-auto lg:max-w-none">{content.youtube_eyebrow}</span>
              <h3 className="mb-5.5 font-playfair text-[clamp(27px,5.2cqw,40px)] leading-[1.18] font-normal tracking-[-0.025em] lg:text-[clamp(24px,2.7cqw,38.88px)] lg:whitespace-nowrap">
                {content.youtube_title}
              </h3>
              <p className="mb-4 max-w-140 text-[17px] leading-[1.7] opacity-95">{content.youtube_card_text}</p>
              <span className="mt-[29px] inline-flex gap-6 border-b border-[#E9C482] pb-3.5 text-[13px] leading-[17px] font-bold tracking-[2px] lg:mt-7.5 uppercase">
                {content.youtube_cta}
              </span>
            </div>
            <div aria-hidden="true" className="flex flex-col items-center gap-6 self-center text-[11px] tracking-[2px] text-[#F3D295] uppercase lg:flex-[0_0_200px]">
              <YouTubeLogoIcon className="mx-auto mb-5 block max-w-full" />
              <span>{content.youtube_mark}</span>
            </div>
          </SiteLink>
        </div>
      </section>

      <section id="substack" className="scroll-mt-[77px] lg:scroll-mt-24 pt-5 pb-23.75">
        <div className="mx-auto w-full max-w-370 px-5.5 lg:px-[79px]">
          <div className="grid min-h-97.5 overflow-hidden bg-[linear-gradient(140.47deg,#263759_0%,#17223D_100%)] lg:bg-[linear-gradient(102.45deg,#263759_0%,#17223D_100%)] text-white lg:grid-cols-[1.3fr_1fr]">
            <div className="self-center p-9.5 lg:p-[clamp(38px,5cqw,72px)]">
              <p className={`${kicker} text-[#E8C99D]`}>{content.substack_kicker}</p>
              <h2 className="my-6.25 font-playfair text-[41.6px] leading-[1.12] font-normal tracking-[-0.04em] lg:text-[clamp(2.6rem,4cqw,57.6px)]">
                {content.substack_heading} <em className="text-[#DFC19E]">{content.substack_heading_accent}</em>
              </h2>
              <p className="mb-4 max-w-140 text-[16px] leading-[1.8] text-[#F2EDF1]">{content.substack_text}</p>
              <SiteLink
                href={content.substack_href}
                {...external}
                className="mt-7 inline-flex items-center gap-2 border-b border-[#DFBC83] pt-px pb-2.5 text-[13px] leading-[17px] font-bold tracking-[1px]"
              >
                {content.substack_link_label}
                <ArrowUpRightTinyIcon />
              </SiteLink>
            </div>
            <SiteLink
              href={content.substack_href}
              {...external}
              aria-label="Visit Dr. Foojan on Substack"
              className="flex min-h-65 items-center justify-center bg-[radial-gradient(circle_at_50%_42%,#FFF4E9_0%,#F5E6E4_54%,#E9DFE8_100%)] lg:bg-[radial-gradient(74.61%_78.14%_at_50%_42%,#FFF4E9_0%,#F5E6E4_54%,#E9DFE8_100%)] transition hover:brightness-[0.97] lg:min-h-90"
            >
              <span className="flex flex-col items-center justify-center gap-2.5 text-[#172441] lg:gap-[11px]">
                <SubstackLogoIcon className="size-18.75 lg:size-27" />
                <span className="font-[Georgia,serif] text-[48px] font-bold tracking-[-0.04em] lg:text-[clamp(42px,5cqw,68px)] lg:tracking-[-3px]">{content.substack_name}</span>
                <small className="text-[11px] font-bold tracking-[0.2em] uppercase lg:tracking-[2px]">{content.substack_byline}</small>
              </span>
            </SiteLink>
          </div>
        </div>
      </section>
    </div>
  );
}
