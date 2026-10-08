import { Signature } from "./MeetFoojan";
import { Container, Eyebrow } from "./ui";

export default function Closing() {
  return (
    <section className="bg-white py-20 lg:min-h-177 lg:pt-[98.07px] lg:pb-[97.78px]">
      <Container>
        {/* personal note: 1440×708 section; content 893.22×512.15, centred, 98.07px from the top and 97.78px above
            the bottom; text group (420.15) + 40px + signature (184.16×52, 14px gap);
            mobile: content 350×479 = text group (403) + 24px + signature */}
        <div className="mx-auto flex max-w-170 flex-col gap-6 text-center lg:gap-10 lg:min-h-[512.15px] lg:w-[893.22px] lg:max-w-none">
          {/* text group: desktop 893.22×420.15, 28px gap; mobile 350×403, 12px gap */}
          <div className="flex flex-col gap-3 lg:gap-7">
            {/* eyebrow + heading: 866.38×153.54, 14px gap (mobile too) */}
            <div className="mx-auto flex flex-col gap-3.5 lg:w-[866.38px]">
              <Eyebrow center>A personal note</Eyebrow>
              {/* heading: Lora 500, -0.74px tracking — desktop 48px / 53.57px in an 866.38×117.54 box; mobile 24px / 120%, 2 lines */}
              <h2 className="font-serif text-[24px] leading-[1.2] font-medium tracking-[-0.74px] text-plum-950 lg:h-[117.54px] lg:text-[48px] lg:leading-[53.57px]">
                One mission, expressed through <br className="lg:hidden" />
                many <br className="hidden lg:block" />
                forms of work.
              </h2>
            </div>
            {/* paragraph: Lora / 150%, #1A002B, centred — desktop 24px, 893.22×238.61 (line breaks match Figma); mobile 18px, 350×297 (11 lines, breaks as in Figma) */}
            <p className="font-serif text-[18px] leading-normal text-plum-950 lg:text-[24px] lg:whitespace-nowrap">
              {/* desktop breaks: hidden lg:block, mobile breaks: lg:hidden, shared breaks: plain <br /> */}
              Although my work spans psychotherapy, <br className="lg:hidden" />
              education, research, leadership, <br />
              media and technology, I do not see these <br className="lg:hidden" />
              as separate pursuits. They are <br />
              expressions of one mission: helping <br className="lg:hidden" />
              human beings meet themselves with <br />
              greater honesty, compassion, courage <br className="lg:hidden" />
              and responsibility — and use that <br />
              awareness to create lives and <br className="lg:hidden" />
              relationships that reflect who they <br />
              consciously choose to be.
            </p>
          </div>
          <div>
            <Signature subtitle="Psy.D., LMFT" center size="sm" />
          </div>
        </div>
      </Container>
    </section>
  );
}
