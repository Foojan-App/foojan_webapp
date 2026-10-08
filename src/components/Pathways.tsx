import type { ReactNode } from "react";
import { ArrowRightIcon, ArrowUpRightIcon, BookIcon, HeartIcon, MicIcon, TargetIcon, VideoIcon } from "@/utils/svg";
import { Container, Eyebrow } from "./ui";

type Card = {
  n: string;
  icon: ReactNode;
  title: ReactNode;
  body: ReactNode;
  link?: string;
  box: string;
  textBox?: string;
  gap?: string;
};

const cards: Card[] = [
  {
    n: "01",
    icon: <TargetIcon />,
    title: "Awareness Integration Theory",
    body: "Explore the theory, clinical framework, research foundation and professional applications of AIT.",
    box: "max-lg:min-h-96.5 min-[390px]:max-lg:h-96.5 lg:p-6",
    textBox: "lg:w-md",
  },
  {
    n: "02",
    icon: <BookIcon />,
    title: "Books & Publications",
    body: (
      <span className="lg:whitespace-nowrap">
        Discover Dr. Foojan&rsquo;s books, peer-reviewed research, articles <br className="hidden lg:block" />
        and academic contributions.
      </span>
    ),
    box: "max-lg:min-h-88.25 min-[390px]:max-lg:h-88.25 lg:p-6",
    textBox: "lg:w-115",
  },
  {
    n: "03",
    icon: <MicIcon />,
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
    box: "min-h-90.25 min-[390px]:h-90.25 lg:self-start",
    gap: "gap-20",
    textBox: "lg:w-60.25",
  },
  {
    n: "04",
    icon: <VideoIcon />,
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
    box: "min-h-90.75 min-[390px]:h-90.75 p-6 lg:self-start",
    gap: "gap-20",
    textBox: "lg:w-60.25",
  },
  {
    n: "05",
    icon: <HeartIcon />,
    title: "Psychotherapy",
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
    box: "min-h-91.25 min-[390px]:h-91.25 p-6",
    gap: "gap-15",
    textBox: "w-65.75 min-w-0",
  },
];

function PathwayCard({ card }: { card: Card }) {
  return (
    <a
      href="#"
      className={`group relative flex flex-col rounded-[10px] border border-[#F8E6FF] bg-white px-7.25 py-8.75 transition ${card.box}`}
    >
      <div className={`flex flex-col ${card.gap ?? "gap-20 lg:gap-10"}`}>
        <div className="flex h-13.5 items-start justify-between">
          <span className="grid size-13.5 place-items-center rounded-lg bg-[#EFE4F4] text-purple">
            {card.icon}
          </span>
          <span className="font-serif text-[16px] leading-[25.5px] text-[#7A8091]">{card.n}</span>
        </div>
        <div className="flex items-end justify-between">
          <div className={`flex flex-col gap-3 ${card.textBox ?? ""}`}>
            <h3 className="font-serif text-[24px] leading-[32.64px] font-medium tracking-[-0.41px] text-plum-950">{card.title}</h3>
            <p className="text-[16px] leading-[25.5px] text-[#4A5163]">{card.body}</p>
            {card.link && (
              <p className="text-[13px] leading-4 font-semibold text-plum-950">{card.link} ↗</p>
            )}
          </div>
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
      <Container>
        <div className="mx-auto flex max-w-[1175.99px] flex-col gap-10">
          <div className="mx-auto flex max-w-171.75 flex-col gap-3 text-center lg:gap-8">
            <div className="flex flex-col gap-3">
              <Eyebrow center>Explore her work</Eyebrow>
              <h2 className="font-serif text-[32px] leading-[1.2] font-medium text-plum-950 lg:w-182.25 lg:self-center lg:text-[56px]">
                One body of <br className="lg:hidden" />
                work.{" "}
                <span className="text-purple">
                  Multiple <br />
                  pathways.
                </span>
              </h2>
            </div>
            <p className="text-[16px] leading-normal text-[#4A5163] lg:leading-[29.92px]">
              Find the part of Dr. Foojan&rsquo;s work that speaks to you — whether you are a{" "}
              <br className="hidden lg:block" />
              professional, a reader, an event organizer or someone seeking support.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:h-60">
                {cards.slice(0, 2).map((c) => (
                  <PathwayCard key={c.n} card={c} />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:h-91.25 lg:grid-cols-[minmax(0,378.66px)_minmax(0,378.67px)_minmax(0,364.65px)]">
                {cards.slice(2).map((c) => (
                  <PathwayCard key={c.n} card={c} />
                ))}
              </div>
            </div>
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
