import Image from "next/image";
import { ArrowRightIcon } from "@/utils/svg";
import { Container, Eyebrow, TextLink } from "./ui";
import { SignatureSize } from "@/types/enums";

// signature: photo + name/subtitle, 14px apart.
// Large (Meet section): 58px photo, name 600, text 6px apart. Small (personal note): 52px photo, name 700, 13.5px subtitle, 7px apart.
export function Signature({
  subtitle,
  center = false,
  size = SignatureSize.Large,
}: {
  subtitle: string;
  center?: boolean;
  size?: SignatureSize;
}) {
  const sm = size === SignatureSize.Small;
  return (
    <div className={`flex items-center gap-3.5 ${center ? "justify-center" : ""}`}>
      <Image
        src="/images/foojan-avatar.png"
        alt=""
        width={sm ? 52 : 58}
        height={sm ? 52 : 58}
        className={`shrink-0 rounded-full object-cover ${sm ? "size-13" : "size-14.5"}`}
      />
      <div className={`flex flex-col text-left ${sm ? "gap-1.75" : "gap-1.5"}`}>
        <p className={`text-[15px] leading-[25.5px] text-plum-950 ${sm ? "font-bold" : "font-semibold"}`}>
          Dr. Foojan Zeine
        </p>
        {/* lg: 14px in a 17px box; sm: 13.5px in a 16px box (Figma line heights centred in the box) */}
        <p className={`text-[#7A8091] ${sm ? "text-[13.5px] leading-4" : "text-[14px] leading-4.25"}`}>{subtitle}</p>
      </div>
    </div>
  );
}

export default function MeetFoojan() {
  return (
    <section className="bg-white py-20 lg:py-25">
      {/* section padding: 80px top and bottom on mobile, 100px on desktop */}
      <Container>
        {/* row: 1237.91×626.58, 2px in from the left, columns pushed to the edges */}
        <div className="flex flex-col gap-6 lg:min-h-[626.58px] lg:gap-14 lg:flex-row lg:justify-between lg:pl-0.5">
          {/* left column: 511.09×374.88, sticky while the right column scrolls past (below the 85px header) */}
          <div className="pt-[8.63px] lg:sticky lg:top-30 lg:w-[511.09px] lg:self-start">
            {/* inner group: 500×383, 8.63px from the column top, children spaced 32px apart */}
            <div className="flex w-73.5 flex-col gap-8 lg:w-125">
              {/* eyebrow + heading: 500×293, 3px gap */}
              <div className="flex flex-col gap-0.75">
                <Eyebrow>Meet Dr. Foojan</Eyebrow>
                {/* heading: Lora 500 / 120% — desktop 56px, 542px wide (overflows the 500px group); mobile 32px, 294×152 */}
                <h2 className="font-serif text-[32px] leading-[1.2] font-medium text-plum-950 lg:w-135.5 lg:text-[56px]">
                  A career devoted to understanding how <span className="text-purple">awareness</span> creates
                  meaningful change.
                </h2>
              </div>
              <Signature subtitle="Psy.D., LMFT · Originator of AIT" />
            </div>
          </div>

          {/* right column: 564.91×626.58 = paragraphs (300) + 45px gap + quote & link (281.58) */}
          <div className="flex flex-col gap-6 lg:w-[564.91px] lg:gap-11.25">
            {/* paragraphs: desktop 564.91×300, 24px gap; mobile 12px gap */}
            <div className="flex flex-col gap-3 lg:gap-6">
              <p className="font-serif text-[20px] leading-normal text-plum-950 lg:text-[24px]">
                {/* line breaks match Figma on large screens */}
                I believe awareness is where transformation <br className="hidden lg:block" />
                begins — but awareness alone is not enough. <br className="hidden lg:block" />
                We may understand why we react as we do and <br className="hidden lg:block" />
                still repeat the same emotional, relational and <br className="hidden lg:block" />
                behavioral patterns.
              </p>
              <p className="text-[16px] leading-normal text-[#4A5163]">
                That conviction led me to develop Awareness Integration Theory — an <br className="hidden lg:block" />
                evidence-informed, multimodality framework that helps people <br className="hidden lg:block" />
                recognize the patterns shaping their lives, choose an intentional <br className="hidden lg:block" />
                identity, and translate it into purposeful action.
              </p>
            </div>
            {/* quote + link: desktop 564.91×281.58, 32px gap; mobile 24px gap */}
            <div className="flex flex-col gap-6 lg:gap-8">
              {/* quote box: 564.91×219.58, radius 10, 4px #942BA9 left border, #EFE4F4 (padding not specced yet) */}
              <blockquote className="h-44.25 rounded-[10px] border-l-4 border-purple bg-[#EFE4F4] pt-6.25 pr-5.5 pl-4.25 lg:h-[219.58px] lg:pr-7 lg:pt-10.25 lg:pb-0 lg:pl-10">
                {/* quote: Lora italic 24px / 35.84px, 455.31px wide, 41px from the top and 44px from the left edge */}
                <p className="font-serif text-[20px] leading-[1.3] text-plum-950 italic lg:w-[455.31px] lg:text-[24px] lg:leading-[35.84px]">
                  &ldquo;Awareness is not simply insight. It <br className="hidden lg:block" />
                  becomes powerful when it changes how <br className="hidden lg:block" />
                  we relate, choose and act.&rdquo;
                </p>
                {/* attribution: Inter 13px, 1.82px tracking, 16px box, 20.82px below the quote */}
                <footer className="mt-2 text-[13px] lg:mt-[20.82px] leading-4 tracking-[1.82px] text-purple uppercase">
                  — Dr. Foojan Zeine
                </footer>
              </blockquote>
              <div>
                {/* link: 220×30 with 1px #942BA9 bottom border; text Inter 600 16/25.5 starting 1px above the top; 16px arrow */}
                <TextLink
                  className="h-7.5 w-55.5 items-start! lg:w-55 gap-[6.54px]! pb-0! text-[16px]! leading-[25.5px] text-plum-950!"
                  icon={<ArrowRightIcon width={16} height={16} className="mt-[4.75px]" />}
                >
                  <span className="-mt-px">Read the full biography</span>
                </TextLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
