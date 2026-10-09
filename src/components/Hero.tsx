import Image from "next/image";
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
  return (
    <section className="relative overflow-hidden">
      <div className="min-h-264.25 bg-[linear-gradient(180deg,#F8F2FB_0%,#F7F2FB_62%,#EFE4F4_62%)] max-[389px]:bg-[linear-gradient(180deg,#F8F2FB_0%,#F7F2FB_calc(100%-322px),#EFE4F4_calc(100%-322px))] lg:min-h-220.25 lg:bg-[linear-gradient(90deg,#F8F2FB_0%,#F7F2FB_62%,#EFE4F4_62%)]">
        <Container className="relative grid items-center gap-6 pt-3.25 pb-7.5 lg:min-h-177 lg:grid-cols-[minmax(0,700px)_minmax(0,517px)] lg:justify-between lg:gap-5 lg:pt-21.75 lg:pb-21.5">
          <div className="flex flex-col gap-8.75 lg:self-start">
            <div className="flex flex-col gap-6 lg:gap-10">
              <div className="flex flex-col gap-3 lg:gap-8">
                <div className="flex flex-col gap-2 lg:gap-3">
                  <Eyebrow>{content.eyebrow}</Eyebrow>
                  <h1 className="font-serif text-[32px] leading-[1.2] font-medium text-plum-950 max-[389px]:text-[28px] md:max-lg:text-[52px] md:max-lg:[&_br]:hidden lg:text-[64px]">
                    <AccentText text={content.heading} />
                  </h1>
                </div>
                <p className="max-w-142.5 text-[16px] leading-normal text-[#4A5163] md:max-lg:max-w-none md:max-lg:text-[18px] lg:text-[18px] lg:leading-[32.64px]">
                  {content.paragraph}
                </p>
              </div>
              <div className="flex gap-3.5 max-[389px]:flex-wrap">
                <Button
                  href={content.primary_button_href}
                  arrow
                  className="h-12! w-39.75 max-[389px]:w-full gap-0! px-2.5! whitespace-nowrap lg:h-14! lg:w-49.75 lg:gap-2.5! lg:px-5! text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px]"
                >
                  {content.primary_button_label}
                </Button>
                <Button
                  href={content.secondary_button_href}
                  variant={ButtonVariant.Outline}
                  className="h-12! w-44.25 max-[389px]:w-full lg:h-14! text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px]"
                >
                  {content.secondary_button_label}
                </Button>
              </div>
            </div>

            <div className="flex h-29.25 items-start gap-4 border-t max-[389px]:h-auto max-[389px]:pb-1 border-[#E8D5E5] pt-7 lg:h-[83.39px]">
              <span className="mt-[20.19px] grid size-12 shrink-0 place-items-center self-start rounded-lg bg-purple text-white lg:mt-[3.19px]">
                <AwardIcon />
              </span>
              <div className="flex flex-col gap-1.5">
                <p className="text-[15px] leading-[25.5px] font-bold text-plum-950">
                  {content.award_title}
                </p>
                <p className="relative top-[-3.4px] h-4.25 max-[389px]:h-auto text-[14px] leading-[23.8px] text-[#687080] lg:top-0 lg:leading-4.25">
                  {content.award_subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto h-[403.99px] w-87.5 max-[389px]:h-[323.19px] max-[389px]:w-70 lg:mt-15 lg:h-auto lg:w-full lg:self-start">
            <div className="relative w-129.25 origin-top-left scale-[0.67698] max-[389px]:scale-[0.54159] pb-4.5 pl-9 pr-4.5 lg:w-full lg:scale-100">
              <div className="absolute top-4.5 right-0 bottom-0 left-13.5 rounded-[10px] border border-purple" />
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
              <div className="absolute top-[471.77px] left-0 flex h-[67.09px] w-[202.81px] items-center gap-3.5 rounded-lg border-l-3 border-purple bg-white pr-4 pl-5">
                <span className="font-serif text-[30.4px] leading-[30.4px] text-plum-950">{content.badge_value}</span>
                <span className="text-[13px] leading-[17.55px] whitespace-pre-line text-[#4A5163]">{content.badge_label}</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="relative border-y border-[#E8E1D5] bg-white lg:h-[159.53px]">
        <Container className="grid grid-cols-2 lg:h-full lg:grid-cols-[repeat(4,minmax(0,248.2fr))_minmax(0,247.2fr)]">
          {stats.map((s, i) => (
            <div
              key={i}
              className="relative h-[157.53px] border-[#E8E1D5] pt-7.5 text-center lg:px-4 max-lg:last:col-span-2 not-last:border-r"
            >
              <span
                className={`absolute top-0 h-0.5 lg:right-auto lg:left-6 lg:w-50 lg:translate-x-0 ${
                  i === stats.length - 1 ? "left-1/2 w-50 -translate-x-1/2" : "left-3.75 w-36.5 max-[389px]:right-3.75 max-[389px]:w-auto"
                } ${statColors[i % statColors.length].bar}`}
              />
              <p className={`flex items-start justify-center font-serif text-[41.6px] leading-13.25 ${statColors[i % statColors.length].color}`}>
                <CountUp value={s.value} />
                {s.suffix && <span className="mt-[6.14px] text-[20.8px] leading-6.75">{s.suffix}</span>}
              </p>
              <p className="mt-[3.75px] text-[14px] leading-[18.9px] whitespace-pre-line text-[#687080]">{s.label}</p>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
