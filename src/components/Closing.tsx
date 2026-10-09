import { Signature } from "./MeetFoojan";
import { Container, Eyebrow } from "./ui";
import { LineBreaks, SignatureSize } from "@/types/enums";
import type { ClosingProps } from "@/types/components";
import AccentText from "./AccentText";

export default function Closing({ content, about }: ClosingProps) {
  return (
    <section className="bg-white py-20 md:max-lg:py-24 lg:min-h-177 lg:pt-[98.07px] lg:pb-[97.78px]">
      <Container>
        <div className="mx-auto flex max-w-170 flex-col gap-6 text-center lg:gap-10 lg:min-h-[512.15px] lg:w-[893.22px] lg:max-w-none">
          <div className="flex flex-col gap-3 lg:gap-7">
            <div className="mx-auto flex flex-col gap-3.5 lg:w-[866.38px]">
              <Eyebrow center>{content.eyebrow}</Eyebrow>
              <h2 className="font-serif text-[24px] leading-[1.2] font-medium tracking-[-0.74px] text-plum-950 max-md:text-[26px] max-md:text-balance max-md:[&_br]:hidden max-[389px]:text-[24px] md:max-lg:text-[38px] lg:h-[117.54px] lg:text-[48px] lg:leading-[53.57px]">
                <AccentText text={content.heading} breaks={LineBreaks.DesktopAndPhone} />
              </h2>
            </div>
            <p className="font-serif text-[18px] leading-normal text-plum-950 max-md:text-[16px] max-md:leading-[1.65] max-md:[&_br]:hidden md:max-lg:text-[21px] lg:text-[24px] lg:whitespace-nowrap">
              <AccentText text={content.paragraph} breaks={LineBreaks.DesktopAndPhone} />
            </p>
          </div>
          <div>
            <Signature
              subtitle={content.signature_subtitle}
              name={about.signature_name}
              image={about.avatar_url}
              center
              size={SignatureSize.Small}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
