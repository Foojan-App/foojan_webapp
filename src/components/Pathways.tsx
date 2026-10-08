import type { ReactNode } from "react";
import { ArrowRightIcon, ArrowUpRightIcon, BookIcon, HeartIcon, MicIcon, TargetIcon, VideoIcon } from "@/utils/svg";
import { Container, Eyebrow } from "./ui";

type Card = {
  n: string;
  icon: ReactNode;
  title: ReactNode;
  body: ReactNode;
  link?: string;
  /** padding/height from this card's own Figma specs (the cards are not all identical) */
  box: string;
  /** width of the title + body group, where specced */
  textBox?: string;
  /** gap between the top row and the bottom row (default 40px) */
  gap?: string;
};

const cards: Card[] = [
  {
    n: "01",
    icon: <TargetIcon />,
    title: "Awareness Integration Theory",
    body: "Explore the theory, clinical framework, research foundation and professional applications of AIT.",
    box: "max-lg:min-h-96.5 min-[390px]:max-lg:h-96.5 lg:p-6", // mobile 350×386; desktop 577.98×239.64
    textBox: "lg:w-md", // 448
  },
  {
    n: "02",
    icon: <BookIcon />,
    title: "Books & Publications",
    // line breaks match Figma on large screens
    body: (
      <span className="lg:whitespace-nowrap">
        Discover Dr. Foojan&rsquo;s books, peer-reviewed research, articles <br className="hidden lg:block" />
        and academic contributions.
      </span>
    ),
    box: "max-lg:min-h-88.25 min-[390px]:max-lg:h-88.25 lg:p-6", // mobile 350×353; desktop 578×240
    textBox: "lg:w-115", // 460
  },
  {
    n: "03",
    icon: <MicIcon />,
    // line breaks match Figma on large screens
    title: (
      <>
        Speaking &amp; <br className="hidden lg:block" />
        Education
      </>
    ),
    body: (
      <span className="lg:whitespace-nowrap">
        Keynotes, professional training, <br className="hidden lg:block" />
        university education, leadership <br className="hidden lg:block" />
        and global presentations.
      </span>
    ),
    box: "min-h-90.25 min-[390px]:h-90.25 lg:self-start", // 361 tall on both; desktop 378.66 wide; 35px top/bottom, 29px sides
    gap: "gap-20", // content 318.66×289
    textBox: "lg:w-60.25", // 241
  },
  {
    n: "04",
    icon: <VideoIcon />,
    // line breaks match Figma on large screens
    title: (
      <>
        Media &amp; <br className="hidden lg:block" />
        Conversations
      </>
    ),
    body: (
      <span className="lg:whitespace-nowrap">
        Podcast, television, radio, <br className="hidden lg:block" />
        interviews and conversations on <br className="hidden lg:block" />
        psychology and human <br className="hidden lg:block" />
        development.
      </span>
    ),
    box: "min-h-90.75 min-[390px]:h-90.75 p-6 lg:self-start", // 363 tall on both, 24px padding; desktop 378.67 wide
    gap: "gap-20", // same layout as card 03
    textBox: "lg:w-60.25", // 241
  },
  {
    n: "05",
    icon: <HeartIcon />,
    title: "Psychotherapy",
    // line breaks match Figma on mobile and desktop (same 263px text group); phones narrower than 390 let the lines wrap
    body: (
      <span className="min-[390px]:whitespace-nowrap">
        35+ years of clinical practice as an <br />
        LMFT — relationships, trauma, <br />
        anxiety, depression, addictive <br />
        behaviors and personal <br />
        development.
      </span>
    ),
    link: "View IAII practitioner profile",
    box: "min-h-91.25 min-[390px]:h-91.25 p-6", // 365 tall on both, 24px padding; desktop 364.65 wide
    gap: "gap-15", // content 314.65×315
    textBox: "w-65.75 min-w-0", // 263 on both; shrinks on phones narrower than 390
  },
];

// card: white, 1px #F8E6FF border, radius 10. Heights are fixed from 390 up; narrower phones let a card grow so wrapped text stays inside. Mobile: 350 wide, heights 386/353/361/363/365 (group 350×1908, 20px apart),
// padding 35/29 (cards 4–5: 24), 80px between the top row and the text (card 5: 60). Desktop values via card.box/card.gap.
// Desktop padding/height/gap come from card.box and card.gap.
function PathwayCard({ card }: { card: Card }) {
  return (
    <a
      href="#"
      className={`group relative flex flex-col rounded-[10px] border border-[#F8E6FF] bg-white px-7.25 py-8.75 transition ${card.box}`}
    >
      {/* content: top (icon + number) and bottom (title, text, button), 40px apart unless the card says otherwise */}
      <div className={`flex flex-col ${card.gap ?? "gap-20 lg:gap-10"}`}>
        {/* top row: 54px tall, icon left / number right */}
        <div className="flex h-13.5 items-start justify-between">
          {/* icon box: 54×54, radius 8, #EFE4F4 */}
          <span className="grid size-13.5 place-items-center rounded-lg bg-[#EFE4F4] text-purple">
            {card.icon}
          </span>
          <span className="font-serif text-[16px] leading-[25.5px] text-[#7A8091]">{card.n}</span>
        </div>
        {/* bottom row: text (title + body) left, arrow button right; Figma has no gap, only space-between */}
        <div className="flex items-end justify-between">
          {/* title + body: 12px gap */}
          <div className={`flex flex-col gap-3 ${card.textBox ?? ""}`}>
            <h3 className="font-serif text-[24px] leading-[32.64px] font-medium tracking-[-0.41px] text-plum-950">{card.title}</h3>
            <p className="text-[16px] leading-[25.5px] text-[#4A5163]">{card.body}</p>
            {card.link && (
              // link: Inter 600 13px in a 16px box; the ↗ is a text character in Figma
              <p className="text-[13px] leading-4 font-semibold text-plum-950">{card.link} ↗</p>
            )}
          </div>
          {/* arrow button: 42×42, radius 6, 1px #942BA9 */}
          <span className="grid size-10.5 shrink-0 place-items-center rounded-md border border-purple text-plum-950 transition group-hover:bg-purple group-hover:text-white">
            {card.link ? <ArrowUpRightIcon /> : <ArrowRightIcon />}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Pathways() {
  return (
    <section id="work" className="bg-[#F7F2FB] pt-[23.5px] pb-[22.5px] lg:min-h-301 lg:pt-[113.34px] lg:pb-[112.75px]">
      {/* section: 1440×1204, #F7F2FB; content block 1175.99×977.91 centred = heading group (250.91) + 40px + cards & note (687) */}
      <Container>
        <div className="mx-auto flex max-w-[1175.99px] flex-col gap-10">
          {/* heading group: desktop 687×250.91, 32px gap; mobile 350×256, 12px gap */}
          <div className="mx-auto flex max-w-171.75 flex-col gap-3 text-center lg:gap-8">
            {/* eyebrow + heading: 12px gap — desktop 687×168, mobile 350×148 */}
            <div className="flex flex-col gap-3">
              <Eyebrow center>Explore her work</Eyebrow>
              {/* heading: Lora 500 / 120% — desktop 56px, 729px wide (overflows the 687px group, centred), two lines;
                  mobile 32px, 350×114, three lines */}
              <h2 className="font-serif text-[32px] leading-[1.2] font-medium text-plum-950 lg:w-182.25 lg:self-center lg:text-[56px]">
                One body of <br className="lg:hidden" />
                work.{" "}
                <span className="text-purple">
                  Multiple <br />
                  pathways.
                </span>
              </h2>
            </div>
            {/* paragraph: Inter 16px, #4A5163 — desktop 29.92px line height, 687px (Figma box 50.91px tall);
                mobile 150%, 350×96 */}
            <p className="text-[16px] leading-normal text-[#4A5163] lg:leading-[29.92px]">
              Find the part of Dr. Foojan&rsquo;s work that speaks to you — whether you are a{" "}
              <br className="hidden lg:block" />
              professional, a reader, an event organizer or someone seeking support.
            </p>
          </div>

          {/* cards + note: 1175.99×687, 16px gap */}
          <div className="flex flex-col gap-4">
            {/* card rows: 1175.99×625, 20px between rows */}
            <div className="flex flex-col gap-5">
              {/* row 1: 1175.99×240, 20px gap (two 578px cards) */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:h-60">
                {cards.slice(0, 2).map((c) => (
                  <PathwayCard key={c.n} card={c} />
                ))}
              </div>
              {/* row 2: 1175.99×365, 20px gap; cards are 378.66 / 378.67 / 364.65 wide (≈14px left over on the right) */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:h-91.25 lg:grid-cols-[minmax(0,378.66px)_minmax(0,378.67px)_minmax(0,364.65px)]">
                {cards.slice(2).map((c) => (
                  <PathwayCard key={c.n} card={c} />
                ))}
              </div>
            </div>
            {/* note: 1175.99×46, Inter 13.5px / 22.95px, #7A8091 */}
            <p className="text-center text-[13.5px] leading-[22.95px] text-[#7A8091]">
              Psychotherapy services, eligibility and current availability are provided through IAII and should be
              confirmed directly <br className="hidden lg:block" />
              through Dr. Foojan&rsquo;s IAII practitioner profile.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
