import Image from "next/image";
import { AwardIcon } from "@/utils/svg";
import { Button, Container, Eyebrow } from "./ui";
import { ButtonVariant } from "@/types/enums";

const stats = [
  { value: "AIT", label: "Originator of Awareness\nIntegration Theory", color: "text-purple", bar: "bg-purple" },
  { value: "7", label: "Books authored\n& co-authored", color: "text-teal", bar: "bg-teal" },
  { value: "25", label: "Peer-reviewed\narticles", color: "text-coral", bar: "bg-coral" },
  {
    value: "35",
    sup: "+",
    label: "Years as a Licensed\nMarriage & Family Therapist",
    color: "text-amber",
    bar: "bg-amber",
  },
  {
    value: "35",
    sup: "+",
    label: "Years as a Licensed\nMarriage & Family Therapist",
    color: "text-indigo",
    bar: "bg-indigo",
  },
];

export default function Hero() {
  return (
    <section id="about" className="relative overflow-hidden">
      {/* desktop 1440×881: the right 38% is a tinted panel behind the portrait; mobile 390×1057: the bottom 38% is tinted */}
      <div className="min-h-264.25 bg-[linear-gradient(180deg,#F8F2FB_0%,#F7F2FB_62%,#EFE4F4_62%)] lg:min-h-220.25 lg:bg-[linear-gradient(90deg,#F8F2FB_0%,#F7F2FB_62%,#EFE4F4_62%)]">
        {/* content block — desktop: 1241×708, 87px from the top (86px below); mobile: 350×1013.99, 13px from the top, 30px below, text and photo 24px apart */}
        <Container className="relative grid items-center gap-6 pt-3.25 pb-7.5 lg:min-h-177 lg:grid-cols-[minmax(0,700px)_minmax(0,517px)] lg:justify-between lg:gap-5 lg:pt-21.75 lg:pb-21.5">
          {/* left column: 700px wide; [text group] and [award] spaced 35px apart */}
          <div className="flex flex-col gap-8.75 lg:self-start">
            {/* text group: desktop 700×589.56, 40px gaps; mobile 350×434, 24px gaps */}
            <div className="flex flex-col gap-6 lg:gap-10">
              {/* eyebrow + heading + paragraph: desktop 700×493.56, 32px gaps; mobile 350×362, 12px gaps */}
              <div className="flex flex-col gap-3 lg:gap-8">
                {/* eyebrow + heading: desktop 700×307, 12px gap; mobile 350×182, 8px gap */}
                <div className="flex flex-col gap-2 lg:gap-3">
                  <Eyebrow>Awareness · Integration · Transformation</Eyebrow>
                  {/* heading: Lora 500 / 120% — 32px on mobile, 64px on desktop; same four lines on both */}
                  <h1 className="font-serif text-[32px] leading-[1.2] font-medium text-plum-950 lg:text-[64px]">
                    Advancing human <br />
                    awareness through <br />
                    <span className="text-purple">psychology, education</span> <br />
                    &amp; leadership.
                  </h1>
                </div>
                {/* paragraph: #4A5163 — mobile Inter 16px / 150%; desktop 18px / 32.64px, width set so lines break as in Figma */}
                <p className="max-w-142.5 text-[16px] leading-normal text-[#4A5163] lg:text-[18px] lg:leading-[32.64px]">
                  Psychotherapist, educator, author, international speaker and originator of Awareness Integration
                  Theory (AIT). For more than three decades, Dr. Foojan Zeine has helped people move beyond insight —
                  integrating what they know with what they feel, believe, choose and practice.
                </p>
              </div>
              {/* buttons row: desktop 390×56 (199 + 177), mobile 350×48 (159 + 177; "Explore" text 10px from the edge, arrow right after it); 14px gap */}
              <div className="flex gap-3.5">
                <Button
                  href="#work"
                  arrow
                  className="h-12! w-39.75 gap-0! px-2.5! whitespace-nowrap lg:h-14! lg:w-49.75 lg:gap-2.5! lg:px-5! text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px]"
                >
                  Explore her work
                </Button>
                <Button
                  href="#speaking"
                  variant={ButtonVariant.Outline}
                  className="h-12! w-44.25 lg:h-14! text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px]"
                >
                  Speaking &amp; media
                </Button>
              </div>
            </div>

            {/* award row: 1px #E8D5E5 top border, text 29px from the top — desktop 700×83.39, mobile 350×117 */}
            <div className="flex h-29.25 items-start gap-4 border-t border-[#E8D5E5] pt-7 lg:h-[83.39px]">
              {/* icon box: 48×48, radius 8 — desktop 32.19px from the row top (3.19px below the text); mobile 49.19px from the row top */}
              <span className="mt-[20.19px] grid size-12 shrink-0 place-items-center self-start rounded-lg bg-purple text-white lg:mt-[3.19px]">
                <AwardIcon />
              </span>
              {/* title + subtitle, 6px gap, 64px from the row left — desktop 363.93×48.5 (one line each); mobile 287×74 (two-line title) */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[15px] leading-[25.5px] font-bold text-plum-950">
                  2026 AAMFT Clinical Practice Innovation Award
                </p>
                {/* Figma: 17px box, 23.8px line height, centred. Desktop: one line → 17px leading. Mobile: two lines that
                    spill below the 17px box, first line shifted up 3.4px as Figma centres it */}
                <p className="relative top-[-3.4px] h-4.25 text-[14px] leading-[23.8px] text-[#7A8091] lg:top-0 lg:leading-4.25">
                  American Association for Marriage and Family Therapy
                </p>
              </div>
            </div>
          </div>

          {/* Photo group: 517×597 incl. the badge overhang (36px left) and the frame offset (18px right/down).
              Desktop: sits 147px below the hero top (60px below the content block's top).
              Mobile: the same design scaled by 350/517 (≈0.677) into a 350×403.99 box, exactly as in the Figma mobile frame. */}
          <div className="mx-auto h-[403.99px] w-87.5 lg:mt-15 lg:h-auto lg:w-full lg:self-start">
            <div className="relative w-129.25 origin-top-left scale-[0.67698] pb-4.5 pl-9 pr-4.5 lg:w-full lg:scale-100">
              <div className="absolute top-4.5 right-0 bottom-0 left-13.5 rounded-[10px] border border-purple" />
              {/* photo: 463×579, radius 10 */}
              <div className="relative aspect-[463.09/578.86] overflow-hidden rounded-[10px] bg-[#D9CFE2] shadow-[0_14px_40px_-18px_#0B235033]">
                <Image
                  src="/images/foojan-hero.png"
                  alt="Dr. Foojan Zeine"
                  fill
                  priority
                  sizes="463px"
                  className="object-cover"
                />
              </div>
              {/* badge: 202.81×67.09, 471.77px below the group top */}
              <div className="absolute top-[471.77px] left-0 flex h-[67.09px] w-[202.81px] items-center gap-3.5 rounded-lg border-l-3 border-purple bg-white pr-4 pl-5">
                <span className="font-serif text-[30.4px] leading-[30.4px] text-plum-950">35+</span>
                <span className="text-[13px] leading-[17.55px] text-[#4A5163]">
                  years of
                  <br />
                  clinical practice
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* stats strip: 1440×159.53, white, 1px #E8E1D5 top/bottom border */}
      <div className="relative border-y border-[#E8E1D5] bg-white lg:h-[159.53px]">
        {/* mobile: 350×472.59 — rows of 157.53px: two, two, then the last cell full width; desktop: one row of five */}
        <Container className="grid grid-cols-2 lg:h-full lg:grid-cols-[repeat(4,minmax(0,248.2fr))_minmax(0,247.2fr)]">
          {/* cells: 4 × 248.2 + 1 × 247.2 = 1240; 1px #E8E1D5 right border except the last */}
          {stats.map((s, i) => (
            <div
              key={i}
              className="relative h-[157.53px] border-[#E8E1D5] pt-7.5 text-center lg:px-4 max-lg:last:col-span-2 not-last:border-r"
            >
              {/* top bar — desktop: 200×2, 24px from the cell's left; mobile: 146×2 at 15px in the half-width cells, 200×2 centred in the last */}
              <span
                className={`absolute top-0 h-0.5 lg:right-auto lg:left-6 lg:w-50 lg:translate-x-0 ${
                  i === stats.length - 1 ? "left-1/2 w-50 -translate-x-1/2" : "left-3.75 w-36.5"
                } ${s.bar}`}
              />
              {/* number: Lora 41.6px in a 53px box, 30px from the top; label 3.75px below */}
              <p className={`flex items-start justify-center font-serif text-[41.6px] leading-13.25 ${s.color}`}>
                {s.value}
                {/* "+": Lora 20.8px in a 27px box, 6.14px below the number's top */}
                {s.sup && <span className="mt-[6.14px] text-[20.8px] leading-6.75">{s.sup}</span>}
              </p>
              <p className="mt-[3.75px] text-[14px] leading-[18.9px] whitespace-pre-line text-[#7A8091]">{s.label}</p>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
