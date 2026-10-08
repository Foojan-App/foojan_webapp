"use client";

import { BookIcon, ChevronRightIcon, GraduationCapIcon, HeartIcon, MobileIcon } from "@/utils/svg";
import { type ReactNode, useState } from "react";
import { Button, Container, Eyebrow } from "./ui";
import { ButtonVariant, EyebrowTone } from "@/types/enums";

const pillars = [
  {
    title: "Awareness",
    mobileBox: "max-md:min-h-43.75 min-[390px]:max-md:h-43.75 max-md:pt-5.75 max-md:pl-7",
    mobileText: "max-md:mt-3.75 max-md:w-73.5 max-md:max-w-full",
    body: "Recognize the patterns, beliefs and past experiences shaping how you think, feel and relate.",
    bodyWidth: "lg:max-w-[379.79px]",
  },
  {
    title: "Integration",
    mobileBox: "max-md:min-h-43.75 min-[390px]:max-md:h-43.75 max-md:pt-6.25 max-md:pl-7.75",
    mobileText: "max-md:mt-3 max-md:w-72.25 max-md:max-w-full",
    body: "Work through unresolved experiences and align what you know with what you feel and believe.",
    bodyWidth: "lg:max-w-[373.26px]",
  },
  {
    title: "Transformation",
    mobileBox: "max-md:min-h-33.75 min-[390px]:max-md:h-33.75 max-md:pt-5.25 max-md:pl-6.25",
    mobileText: "max-md:mt-1.5 max-md:w-75.25 max-md:max-w-full",
    body: (
      <>
        Choose an intentional identity and translate it <br className="hidden lg:block" />
        into purposeful, consistent action.
      </>
    ),
    bodyWidth: "lg:max-w-[385.77px]",
  },
];

const tabs: { title: string; icon: ReactNode; body: ReactNode; tags: string[] }[] = [
  {
    title: "Clinical Application",
    icon: <HeartIcon />,
    body: (
      <>
        Psychotherapy and structured personal development — helping <br className="hidden lg:block" />
        clients move from understanding their patterns to living <br className="hidden lg:block" />
        differently.
      </>
    ),
    tags: ["Relationships", "Trauma", "Anxiety & depression", "Addictive behaviors", "Personal development"],
  },
  {
    title: "Research",
    icon: <BookIcon />,
    body: "Peer-reviewed studies and ongoing research examining how AIT supports measurable, lasting change across populations.",
    tags: ["Peer-reviewed articles", "Outcome studies", "Evidence-informed practice"],
  },
  {
    title: "Professional Education",
    icon: <GraduationCapIcon className="size-6.5" strokeWidth={1.5} />,
    body: "Training, certification and continuing education that equip clinicians, coaches and educators to apply AIT.",
    tags: ["Certification", "Clinical training", "University courses", "Coaching"],
  },
  {
    title: "Digital Application",
    icon: <MobileIcon className="size-6.5" strokeWidth={1.5} />,
    body: "Bringing structured AIT-based reflection and growth tools to people through the Foojan App and the Mira AI companion.",
    tags: ["Foojan App", "Mira", "Guided reflection"],
  },
];

const tagWidths: Record<string, number> = {
  Relationships: 111.61,
  Trauma: 76.23,
  "Anxiety & depression": 160.08,
  "Addictive behaviors": 151.5,
  "Personal development": 166.88,
};

export default function AitSection() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section
      id="ait"
      className="min-h-[1924px] bg-plum-950 pt-17.5 pb-22.25 text-white lg:min-h-301.25 lg:pt-[100.28px] lg:pb-[99.75px]"
    >
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-6 lg:gap-17.25">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-3.5 lg:w-[471.39px]">
              <Eyebrow tone={EyebrowTone.Gold}>Signature body of work</Eyebrow>
              <h2 className="font-serif text-[32px] leading-[1.2] font-medium text-white lg:w-125 lg:text-[56px] lg:leading-[58.75px]">
                Awareness <br />
                Integration Theory
              </h2>
            </div>
            <div className="flex flex-col gap-8.25 lg:w-[537.48px]">
              <p className="text-[16px] leading-normal text-[#DDDDDD] lg:leading-[30.46px] lg:whitespace-nowrap">
                Originated by Dr. Foojan Zeine, AIT is an evidence-informed, <br className="hidden lg:block" />
                multimodality psychological framework that moves people from <br className="hidden lg:block" />
                insight to integration — connecting awareness with beliefs, <br className="hidden lg:block" />
                emotions, behaviors, the body, past experiences, identity, <br className="hidden lg:block" />
                personal responsibility and purposeful action.
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Button
                  variant={ButtonVariant.Gold}
                  arrow
                  className="h-12! w-40 shrink-0 text-[12px]! lg:h-14! lg:text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px] text-[#071A3D]!"
                >
                  Explore AIT
                </Button>
                <Button
                  variant={ButtonVariant.OutlineDark}
                  href="#books"
                  className="h-12! w-44 px-0! text-[12px]! whitespace-nowrap lg:h-14! lg:w-55.5 lg:px-5! lg:text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px]"
                >
                  Research &amp; publications
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 border-y border-[#FFFFFF1F] py-px md:grid-cols-3 md:py-0 lg:h-[197.3px] lg:grid-cols-[392fr_392fr_456fr]">
            {pillars.map((p) => (
              <div
                key={p.title}
                className={`border-[#FFFFFF1F] py-8 max-md:border-b max-md:pb-0 ${p.mobileBox} md:px-6 md:not-first:border-l md:first:pl-0 lg:pt-7.25 lg:pb-0 lg:not-first:pt-7 lg:not-first:pl-8.5`}
              >
                <h3 className="font-serif text-[18px] leading-[36.8px] lg:text-[32px] lg:leading-11.75">
                  {p.title}
                  <span className="text-gold">.</span>
                </h3>
                <p className={`mt-3 text-[14px] leading-[25.5px] text-[#DDDDDD] lg:mt-[12.8px] lg:text-[16px] ${p.mobileText} ${p.bodyWidth}`}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:h-[442.86px] lg:grid-cols-[489.59px_1fr]">
          <div role="tablist" aria-label="AIT applications" className="flex flex-col gap-2">
            {tabs.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.title}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={`flex h-[69.19px] items-center gap-7 rounded-lg border pr-4.5 pl-5.5 text-left transition ${
                    selected ? "border-[#C79A3F99] bg-[#FFFFFF12]" : "border-[#FFFFFF1F] hover:border-white/25"
                  }`}
                >
                  <span className="w-[14.16px] shrink-0 font-serif text-[14px] leading-[23.8px] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[16px] leading-5 font-semibold text-white">{t.title}</span>
                  {selected && <ChevronRightIcon className="text-gold" />}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            className="flex flex-col rounded-[10px] border border-[#FFFFFF1F] bg-[#FFFFFF0D] px-6 py-5.75 max-lg:min-h-119.5 min-[390px]:max-lg:h-119.5 lg:p-12"
          >
            <span className="grid size-13.5 place-items-center rounded-lg bg-[#C79A3F26] text-gold">{tab.icon}</span>
            <h3 className="mt-5.25 font-serif text-[20px] leading-[42.24px] font-medium text-white lg:mt-[26.11px] lg:text-[32px] lg:leading-11.25">
              {tab.title}
            </h3>
            <p className="mt-3 text-[16px] leading-[28.56px] text-[#DDDDDD] lg:mt-[17.23px] lg:max-w-[569.68px]">
              {tab.body}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2 min-[390px]:max-lg:h-[84.19px] lg:mt-auto">
              {tab.tags.map((tag) => (
                <li
                  key={tag}
                  style={{ width: tagWidths[tag] }}
                  className="flex h-[38.09px] items-center justify-center rounded-sm border border-[#FFFFFF2E] px-3.5 text-[13px] whitespace-nowrap text-white"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
