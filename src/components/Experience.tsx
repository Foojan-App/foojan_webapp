import { ArrowRightIcon } from "@/utils/svg";
import { Container, Eyebrow, TextLink } from "./ui";
import StarIcon from "@/utils/svg/StarIcon";

const tags = ["Clinical Psychology", "Psychotherapy", "Education", "Leadership"];

const timeline = [
  {
    kicker: "Education & Licensure",
    height: "lg:h-[311.33px]",
    mobileGap: "max-lg:mb-[15.32px]", // mobile gap to the next card
    title: "Clinical psychologist & LMFT",
    body: "I hold a Doctorate in Clinical Psychology, am a Licensed Marriage and Family Therapist, and earned a Graduate Certificate in Human Behavior from Harvard Extension School. My clinical and scholarly work has included intimate relationships, trauma, anxiety, depression, addictive behaviors, domestic violence, personal development, and integrative mental health.",
  },
  {
    kicker: "Leadership",
    height: "lg:h-[311.32px]",
    mobileGap: "max-lg:mb-[39.68px]",
    title: "Founder — Personal Growth Institute & My New Life",
    body: "Earlier in my career, I founded and led the Personal Growth Institute, a nonprofit that delivered multicultural and multilingual mental-health services across five Southern California locations and trained psychotherapy students from 12 universities. I also founded and served as CEO of My New Life, a licensed outpatient chemical-dependency program serving multicultural communities.",
  },
  {
    kicker: "Recognition · 2026",
    height: "lg:h-[285.55px]",
    title: "AAMFT Clinical Practice Innovation Award",
    body: "In 2026, I received the American Association for Marriage and Family Therapy Clinical Practice Innovation Award in recognition of innovative clinical practice and the development of Awareness Integration Theory.",
    highlight: true,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="bg-white pb-20 lg:py-25">
      {/* content block: 1240×908.2 = left 508 + 36px gap + timeline 696×908 (section padding 100px top and bottom);
          mobile: no top padding (the 80px gap comes from Media), 80px bottom, content 352×1392 = left (406) + 24px + timeline (908) */}
      <Container className="grid gap-6 lg:min-h-[908.2px] lg:grid-cols-[508px_696px] lg:gap-9">
        {/* left column: 508×465.38, 8.62px below the block top; eyebrow + 24px + content group (419.38); sticky — mobile 352×406 */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:w-127 lg:self-start lg:pt-[8.62px]">
          <Eyebrow>Professional Experience</Eyebrow>
          {/* heading, paragraph, tags, link: 508×419.38, 32px apart */}
          <div className="flex flex-col gap-8">
            {/* heading: Lora 500 — desktop 56px / 58.75px, 508×118; mobile 32px / 120%, 2 lines (derived from the 406px column) */}
            <h2 className="font-serif text-[32px] leading-[1.2] font-medium text-plum-950 lg:text-[56px] lg:leading-[58.75px]">
              Experience shaped <br className="hidden lg:block" />
              by <br className="lg:hidden" />
              <span className="text-purple">service.</span>
            </h2>
            {/* paragraph: Lora, #4A5163, 3 lines (same breaks on mobile) — desktop 20.8px / 31.2px, 508×89.38 (Figma box is slightly shorter than 3 × 31.2);
                mobile 16px / 150% (derived) */}
            <p className="font-serif text-[16px] leading-normal text-[#4A5163] lg:h-[89.38px] lg:text-[20.8px] lg:leading-[31.2px] lg:whitespace-nowrap">
              More than three decades of clinical practice, <br />
              scholarship, leadership and service across <br />
              diverse communities.
            </p>
            {/* tags: 351.65×86.5, 8px gap; each tag 39.25px tall, radius 4, white, 1px #E8E1D5, Inter 600 12.5px with 14px padding */}
            {/* two tags per row as in Figma (mobile too), rows 8px apart; tags never break inside; the first row is 351.65 wide, so on a 390 phone it runs 1.65px into the gutter as in Figma (352 frame), narrower phones wrap */}
            <div className="flex flex-col gap-2">
              {[tags.slice(0, 2), tags.slice(2)].map((row) => (
                <ul key={row[0]} className="flex flex-wrap gap-2 min-[390px]:flex-nowrap">
                  {row.map((t) => (
                    <li
                      key={t}
                      className="flex h-[39.25px] shrink-0 items-center rounded-sm border border-[#E8E1D5] bg-white px-3.5 text-[12.5px] leading-3.75 font-semibold tracking-[0.75px] whitespace-nowrap text-plum-950 uppercase"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            <div>
              {/* link: 232.22×29.5, 1px #942BA9 bottom border, text Inter 600 15px #1A002B (19px box, 3px from the top), 16px arrow 7.64px after it */}
              <TextLink
                className="h-[29.5px] w-[232.22px] items-start! gap-[7.64px]! pb-0! text-[15px]! leading-4.75 text-plum-950!"
                icon={<ArrowRightIcon width={16} height={16} className="mt-[4.75px] shrink-0" />}
              >
                <span className="mt-0.75 whitespace-nowrap">Full experience &amp; credentials</span>
              </TextLink>
            </div>
          </div>
        </div>

        <ol className="relative pl-10.5">
          {/* timeline line: 1.5×888.2, 10px from the top and 11px from the left, #942BA9 → white; mobile: the column is 351.65 wide (the first tag row), cards 309 wide, 42px from the left, 15.32px then 39.68px apart */}
          <span
            aria-hidden="true"
            className="absolute top-2.5 bottom-2.5 left-2.75 w-[1.5px] bg-linear-to-b from-purple to-white lg:bottom-auto lg:h-[888.2px]"
          />
          {timeline.map((item) => (
            // item: 653.61px wide, 42px from the timeline edge; heights 311.33 / 311.32 / 285.55 (= 908.2), card sits at its top
            <li key={item.title} className={`relative ${item.height} ${item.mobileGap ?? ""}`}>
              <span
                // dot: 16×16, 2px #942BA9 border, white (highlighted item: filled #942BA9 with a soft halo — halo size/colour estimated from a zoomed screenshot), 30px from the item top and 38px left of it (centred on the line)
                className={`absolute top-5 -left-9.5 size-4 rounded-full border-2 border-purple lg:top-7.5 ${
                  item.highlight ? "bg-purple ring-6 ring-purple/20" : "bg-white"
                }`}
              />
              <article
                // card: radius 10, 1px #F3DCFF border; white, or the Figma gradient on the highlighted card (653.61×259.55)
                className={`rounded-[10px] border border-[#F3DCFF] p-3 lg:pt-8 lg:pr-7 lg:pb-[34.35px] lg:pl-8 ${
                  item.highlight ? "bg-[linear-gradient(103.88deg,#FFFFFF_40%,#FCE5FF_100%)] lg:pb-7.5" : "bg-white"
                }`}
              >
                {/* category: Inter 700, 12px, 1.92px tracking, #942BA9 — desktop 15px box, 33px from the card top; mobile 20.4px line, 12px padding */}
                <p className="text-[12px] leading-[20.4px] font-bold tracking-[1.92px] text-purple uppercase lg:leading-3.75">
                  {item.kicker}
                </p>
                {/* title: Lora 500, 26.88px line — desktop 20px, 59.39px from the card top; mobile 18px, -0.34px tracking, right below the category */}
                <h3 className="font-serif text-[18px] leading-[26.88px] font-medium tracking-[-0.34px] text-plum-950 lg:mt-[11.39px] lg:text-[20px] lg:tracking-normal">
                  {item.title}
                </h3>
                {/* body: Inter / 150%, #4A5163 — desktop 16px, 571.5px wide, 99.26px from the card top; mobile 14px, 12px below the title */}
                <p className="mt-3 text-[14px] leading-normal text-[#4A5163] lg:mt-[12.99px] lg:max-w-[571.5px] lg:text-[16px]">
                  {item.body}
                </p>
                {item.highlight && (
                  // badge: 144.7×37.25, radius 4, #1A002B, 20.35px below the body (mobile 12px); 14px star at 14px, text 8px after it
                  <span className="mt-3 inline-flex h-[37.25px] w-[144.7px] items-center gap-2 rounded-sm bg-plum-950 pr-3 pl-3.5 text-[12.5px] leading-3.75 font-semibold text-[#FEEFFF] lg:mt-[20.35px]">
                    <StarIcon /> Award recipient
                  </span>
                )}
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
