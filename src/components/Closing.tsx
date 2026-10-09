import { Signature } from "./MeetFoojan";
import { Container, Eyebrow } from "./ui";
import { SignatureSize } from "@/types/enums";

export default function Closing() {
  return (
    <section className="bg-white py-20 md:max-lg:py-24 lg:min-h-177 lg:pt-[98.07px] lg:pb-[97.78px]">
      <Container>
        <div className="mx-auto flex max-w-170 flex-col gap-6 text-center lg:gap-10 lg:min-h-[512.15px] lg:w-[893.22px] lg:max-w-none">
          <div className="flex flex-col gap-3 lg:gap-7">
            <div className="mx-auto flex flex-col gap-3.5 lg:w-[866.38px]">
              <Eyebrow center>A personal note</Eyebrow>
              <h2 className="font-serif text-[24px] leading-[1.2] font-medium tracking-[-0.74px] text-plum-950 md:max-lg:text-[38px] lg:h-[117.54px] lg:text-[48px] lg:leading-[53.57px]">
                One mission, expressed through <br className="max-[389px]:hidden md:hidden" />
                many <br className="hidden lg:block" />
                forms of work.
              </h2>
            </div>
            <p className="font-serif text-[18px] leading-normal text-plum-950 md:max-lg:text-[21px] lg:text-[24px] lg:whitespace-nowrap">
              Although my work spans psychotherapy, <br className="max-[389px]:hidden md:hidden" />
              education, research, leadership, <br className="max-[389px]:hidden md:max-lg:hidden" />
              media and technology, I do not see these <br className="max-[389px]:hidden md:hidden" />
              as separate pursuits. They are <br className="max-[389px]:hidden md:max-lg:hidden" />
              expressions of one mission: helping <br className="max-[389px]:hidden md:hidden" />
              human beings meet themselves with <br className="max-[389px]:hidden md:max-lg:hidden" />
              greater honesty, compassion, courage <br className="max-[389px]:hidden md:hidden" />
              and responsibility — and use that <br className="max-[389px]:hidden md:max-lg:hidden" />
              awareness to create lives and <br className="max-[389px]:hidden md:hidden" />
              relationships that reflect who they <br className="max-[389px]:hidden md:max-lg:hidden" />
              consciously choose to be.
            </p>
          </div>
          <div>
            <Signature subtitle="Psy.D., LMFT" center size={SignatureSize.Small} />
          </div>
        </div>
      </Container>
    </section>
  );
}
