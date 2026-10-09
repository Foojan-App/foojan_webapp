import Image from "next/image";
import { ArrowRightIcon } from "@/utils/svg";
import { Container, Eyebrow, TextLink } from "./ui";
import { LineBreaks, SignatureSize } from "@/types/enums";
import type { MeetFoojanProps, SignatureProps } from "@/types/components";
import AccentText from "./AccentText";

export function Signature({
  subtitle,
  name = "Dr. Foojan Zeine",
  image = "/images/foojan-avatar.png",
  center = false,
  size = SignatureSize.Large,
}: SignatureProps) {
  const sm = size === SignatureSize.Small;
  return (
    <div className={`flex items-center gap-3.5 ${center ? "justify-center" : ""}`}>
      <Image
        src={image}
        alt=""
        width={sm ? 52 : 58}
        height={sm ? 52 : 58}
        className={`shrink-0 rounded-full object-cover ${sm ? "size-13" : "size-14.5"}`}
      />
      <div className={`flex flex-col text-left ${sm ? "gap-1.75" : "gap-1.5"}`}>
        <p className={`text-[15px] leading-[25.5px] text-plum-950 ${sm ? "font-bold" : "font-semibold"}`}>
          {name}
        </p>
        <p className={`text-[#687080] ${sm ? "text-[13.5px] leading-4" : "text-[14px] leading-4.25 max-[389px]:text-[13px]"}`}>{subtitle}</p>
      </div>
    </div>
  );
}

export default function MeetFoojan({ content }: MeetFoojanProps) {
  return (
    <section id="about" className="bg-white py-20 md:max-lg:py-24 lg:py-25">
      <Container>
        <div className="flex flex-col gap-6 lg:min-h-[626.58px] lg:gap-14 lg:flex-row lg:justify-between lg:pl-0.5">
          <div className="pt-[8.63px] lg:sticky lg:top-30 lg:w-[511.09px] lg:self-start">
            <div className="flex w-73.5 max-[389px]:w-full md:max-lg:w-full flex-col gap-8 lg:w-125">
              <div className="flex flex-col gap-0.75">
                <Eyebrow>{content.eyebrow}</Eyebrow>
                <h2 className="font-serif text-[32px] leading-[1.2] font-medium md:max-lg:text-[44px] text-plum-950 max-md:text-[28px] max-[389px]:text-[26px] lg:w-135.5 lg:text-[56px]">
                  <AccentText text={content.heading} />
                </h2>
              </div>
              <Signature subtitle={content.signature_subtitle} name={content.signature_name} image={content.avatar_url} />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:w-[564.91px] lg:gap-11.25">
            <div className="flex flex-col gap-3 lg:gap-6">
              <p className="font-serif text-[20px] leading-normal text-plum-950 max-md:text-[18px] md:max-lg:text-[24px] lg:text-[24px]">
                <AccentText text={content.lead} breaks={LineBreaks.DesktopOnly} />
              </p>
              <p className="text-[16px] leading-normal text-[#4A5163] max-md:text-[15px] max-md:leading-[1.6] md:max-lg:text-[18px]">
                <AccentText text={content.body} breaks={LineBreaks.DesktopOnly} />
              </p>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8">
              <blockquote className="h-44.25 max-[389px]:h-auto max-[389px]:pb-5 md:max-lg:h-auto md:max-lg:pb-7 rounded-[10px] border-l-4 border-purple bg-[#EFE4F4] pt-6.25 pr-5.5 pl-4.25 lg:h-[219.58px] lg:pr-7 lg:pt-10.25 lg:pb-0 lg:pl-10">
                <p className="font-serif text-[20px] leading-[1.3] text-plum-950 italic max-md:text-[18px] lg:w-[455.31px] lg:text-[24px] lg:leading-[35.84px]">
                  &ldquo;
                  <AccentText text={content.quote} breaks={LineBreaks.DesktopOnly} />
                  &rdquo;
                </p>
                <footer className="mt-2 text-[13px] lg:mt-[20.82px] leading-4 tracking-[1.82px] text-purple uppercase">
                  — {content.quote_author}
                </footer>
              </blockquote>
              <div>
                <TextLink
                  href={content.link_href}
                  className="h-7.5 w-55.5 items-start! lg:w-55 gap-[6.54px]! pb-0! text-[16px]! leading-[25.5px] text-plum-950!"
                  icon={<ArrowRightIcon width={16} height={16} className="mt-[4.75px]" />}
                >
                  <span className="-mt-px">{content.link_label}</span>
                </TextLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
