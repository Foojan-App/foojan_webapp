import Image from "next/image";
import type { CSSProperties } from "react";
import { AwardIcon } from "@/utils/svg";
import { Button, Container, Eyebrow } from "./ui";
import { ButtonVariant } from "@/types/enums";
import type { HeroProps } from "@/types/components";
import AccentText from "./AccentText";
import CountUp from "./CountUp";

const statColors = [
  { color: "text-purple", bar: "bg-purple" },
  { color: "text-teal", bar: "bg-teal" },
  { color: "text-coral", bar: "bg-coral" },
  { color: "text-amber", bar: "bg-amber" },
  { color: "text-indigo", bar: "bg-indigo" },
];

export default function Hero({ content }: HeroProps) {
  const { stats } = content;
  const oddCount = stats.length % 2 === 1;
  return (
    <section className="relative overflow-hidden">
      <div className="min-h-264.25 bg-[linear-gradient(180deg,#F8F2FB_0%,#F7F2FB_62%,#EFE4F4_62%)] max-[389px]:bg-[linear-gradient(180deg,#F8F2FB_0%,#F7F2FB_calc(100%-322px),#EFE4F4_calc(100%-322px))] min-[430px]:max-[699px]:min-h-0 min-[430px]:max-[699px]:bg-[linear-gradient(180deg,#F8F2FB_0%,#F7F2FB_calc(100%-322px),#EFE4F4_calc(100%-322px))] min-[700px]:max-lg:min-h-0 min-[700px]:max-lg:bg-[linear-gradient(90deg,#F8F2FB_0%,#F7F2FB_62%,#EFE4F4_62%)] lg:min-h-220.25 lg:bg-[linear-gradient(90deg,#F8F2FB_0%,#F7F2FB_62%,#EFE4F4_62%)]">
        <Container className="relative grid items-center gap-6 pt-3.25 pb-7.5 min-[700px]:max-lg:grid-cols-[minmax(0,700fr)_minmax(0,517fr)] min-[700px]:max-lg:gap-[1.6vw] min-[700px]:max-lg:pt-[6.8vw] min-[700px]:max-lg:pb-[6.7vw] lg:min-h-177 lg:grid-cols-[minmax(0,700px)_minmax(0,517px)] lg:justify-between lg:gap-5 lg:pt-21.75 lg:pb-21.5">
          <div className="flex flex-col gap-8.75 min-[700px]:max-lg:self-start lg:self-start">
            <div className="flex flex-col gap-6 lg:gap-10">
              <div className="flex flex-col gap-3 lg:gap-8">
                <div className="flex flex-col gap-2 lg:gap-3">
                  <Eyebrow>{content.eyebrow}</Eyebrow>
                  <h1 className="font-serif text-[32px] leading-[1.2] font-medium text-plum-950 max-[389px]:text-[28px] min-[700px]:max-lg:text-[clamp(30px,5vw,64px)] lg:text-[64px]">
                    <AccentText text={content.heading} />
                  </h1>
                </div>
                <p className="max-w-142.5 text-[16px] leading-normal text-[#4A5163] max-md:text-[15px] max-md:leading-[1.6] min-[700px]:max-lg:text-[clamp(15px,1.41vw,18px)] lg:text-[18px] lg:leading-[32.64px]">
                  {content.paragraph}
                </p>
              </div>
              <div className="flex gap-3.5 max-[389px]:flex-wrap min-[700px]:max-[899px]:flex-wrap">
                <Button
                  href={content.primary_button_href}
                  arrow
                  className="h-12! w-39.75 max-[389px]:w-full min-[700px]:max-[767px]:w-auto min-[700px]:max-[767px]:px-4! gap-0! px-2.5! whitespace-nowrap lg:h-14! lg:w-49.75 lg:gap-2.5! lg:px-5! text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px]"
                >
                  {content.primary_button_label}
                </Button>
                <Button
                  href={content.secondary_button_href}
                  variant={ButtonVariant.Outline}
                  className="h-12! w-44.25 whitespace-nowrap max-[389px]:w-full min-[700px]:max-[767px]:w-auto min-[700px]:max-[767px]:px-4! lg:h-14! text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px]"
                >
                  {content.secondary_button_label}
                </Button>
              </div>
            </div>

            <div className="flex min-h-29.25 items-start gap-4 border-t pb-1 border-[#E8D5E5] pt-7 lg:h-[83.39px] lg:min-h-0 lg:pb-0">
              <span className="mt-[20.19px] grid size-12 shrink-0 place-items-center self-start rounded-lg bg-purple text-white lg:mt-[3.19px]">
                <AwardIcon />
              </span>
              <div className="flex flex-col gap-1.5">
                <p className="text-[15px] leading-[25.5px] font-bold text-plum-950">
                  {content.award_title}
                </p>
                <p className="relative top-[-3.4px] text-[14px] leading-[23.8px] text-[#687080] lg:top-0 lg:leading-4.25">
                  {content.award_subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto h-[403.99px] w-87.5 max-[389px]:h-[323.19px] max-[389px]:w-70 min-[700px]:max-lg:@container min-[700px]:max-lg:mt-[4.69vw] min-[700px]:max-lg:h-auto min-[700px]:max-lg:w-full min-[700px]:max-lg:self-start lg:mt-15 lg:h-auto lg:w-full lg:self-start">
            <div className="relative w-129.25 origin-top-left scale-[0.67698] max-[389px]:scale-[0.54159] min-[700px]:max-lg:w-full min-[700px]:max-lg:scale-100 min-[700px]:max-lg:pt-0 min-[700px]:max-lg:pr-[3.48cqw] min-[700px]:max-lg:pb-[3.48cqw] min-[700px]:max-lg:pl-[6.96cqw] pb-4.5 pl-9 pr-4.5 lg:w-full lg:scale-100">
              <div className="absolute top-4.5 right-0 bottom-0 left-13.5 rounded-[10px] border border-purple min-[700px]:max-lg:top-[3.48cqw] min-[700px]:max-lg:left-[10.44cqw]" />
              <div className="relative aspect-[463.09/578.86] overflow-hidden rounded-[10px] bg-[#D9CFE2] shadow-[0_14px_40px_-18px_#0B235033]">
                <Image
                  src={content.image_url}
                  alt="Dr. Foojan Zeine"
                  fill
                  priority
                  sizes="463px"
                  className="object-cover"
                />
              </div>
              <div className="absolute top-[471.77px] left-0 flex h-[67.09px] w-[202.81px] items-center gap-3.5 rounded-lg border-l-3 border-purple bg-white pr-4 pl-5 min-[700px]:max-lg:top-[91.25cqw] min-[700px]:max-lg:h-[12.98cqw] min-[700px]:max-lg:w-[39.23cqw] min-[700px]:max-lg:gap-[2.71cqw] min-[700px]:max-lg:pr-[3.09cqw] min-[700px]:max-lg:pl-[3.87cqw]">
                <span className="font-serif text-[30.4px] leading-[30.4px] text-plum-950 min-[700px]:max-lg:text-[5.88cqw] min-[700px]:max-lg:leading-[5.88cqw]">{content.badge_value}</span>
                <span className="text-[13px] leading-[17.55px] whitespace-pre-line text-[#4A5163] min-[700px]:max-lg:text-[2.51cqw] min-[700px]:max-lg:leading-[3.39cqw]">{content.badge_label}</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div
        className="relative border-y border-[#E8E1D5] bg-white lg:h-[159.53px]"
        style={{ "--stat-count": stats.length } as CSSProperties}
      >
        <Container className="grid grid-cols-2 min-[600px]:grid-cols-[repeat(var(--stat-count),minmax(0,1fr))] lg:h-full">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`relative h-[157.53px] border-[#E8E1D5] pt-7.5 text-center max-[599px]:h-auto max-[599px]:px-2 max-[599px]:pt-2.5 max-[599px]:pb-2.5 min-[600px]:max-lg:h-auto min-[600px]:max-lg:px-2 min-[600px]:max-lg:pb-7 lg:px-4 max-[599px]:odd:border-r min-[600px]:not-last:border-r ${oddCount ? "max-[599px]:last:col-span-2 max-[599px]:last:border-r-0!" : ""}`}
            >
              <span
                className={`absolute top-0 h-0.5 min-[600px]:max-lg:right-4! min-[600px]:max-lg:left-4! min-[600px]:max-lg:w-auto! min-[600px]:max-lg:translate-x-0! lg:right-auto lg:left-6 lg:w-50 lg:translate-x-0 ${
                  oddCount && i === stats.length - 1 ? "left-1/2 w-50 -translate-x-1/2" : "left-3.75 w-36.5 max-[389px]:right-3.75 max-[389px]:w-auto min-[430px]:max-md:right-3.75 min-[430px]:max-md:w-auto"
                } ${statColors[i % statColors.length].bar}`}
              />
              <p className={`flex items-start justify-center font-serif text-[41.6px] leading-13.25 max-[599px]:text-[20px] max-[599px]:leading-6 min-[600px]:max-[767px]:text-[34px] min-[600px]:max-[767px]:leading-11 ${statColors[i % statColors.length].color}`}>
                <CountUp value={s.value} />
                {s.suffix && <span className="mt-[6.14px] text-[20.8px] leading-6.75 max-[599px]:mt-0 max-[599px]:text-[10px] max-[599px]:leading-3">{s.suffix}</span>}
              </p>
              <p className="mt-[3.75px] text-[14px] leading-[18.9px] whitespace-pre-line text-[#687080] max-[599px]:mt-0.5 max-[599px]:text-[10.5px] max-[599px]:leading-3.5 min-[600px]:max-lg:leading-[18px] min-[600px]:max-[767px]:text-[12px] min-[600px]:max-[767px]:leading-4 md:max-[1023px]:text-[13px] min-[1024px]:max-lg:text-[14px]">{s.label}</p>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
