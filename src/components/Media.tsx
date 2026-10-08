import type { ReactNode } from "react";
import { ArrowRightIcon, FileTextIcon, MessageIcon, PlayIcon, PodcastIcon, TvIcon } from "@/utils/svg";
import { Button, Container, Eyebrow } from "./ui";
import { ButtonVariant } from "@/types/enums";

const channels: { icon: ReactNode; kicker: string; title: string; body: ReactNode; height: string }[] = [
  {
    icon: <PodcastIcon />,
    kicker: "Podcast",
    title: "Expert conversations & interviews",
    body: "Curated appearances and featured discussions.",
    height: "max-lg:min-h-[153.55px] min-[390px]:h-[153.55px] lg:h-[119.39px]",
  },
  {
    icon: <TvIcon />,
    kicker: "Television & Radio",
    title: "Public psychology & education",
    body: "Selected media appearances and commentary.",
    height: "max-lg:min-h-[153.55px] min-[390px]:h-[153.55px] lg:h-[119.39px]",
  },
  {
    icon: <FileTextIcon />,
    kicker: "Articles",
    title: "Ideas for a broader audience",
    body: (
      <>
        <span className="lg:leading-[23.8px]">
          Psychology, relationships, awareness and personal <br className="hidden lg:block" />
          development.
        </span>
      </>
    ),
    height: "max-lg:min-h-[184.55px] min-[390px]:h-[184.55px] lg:h-[148.28px]",
  },
  {
    icon: <MessageIcon />,
    kicker: "Press",
    title: "Media inquiries",
    body: "For producers, journalists and event organizers.",
    height: "max-lg:min-h-[153.55px] min-[390px]:h-[153.55px] lg:h-[119.39px]",
  },
];

export default function Media() {
  return (
    <section id="media" className="bg-white py-20 lg:min-h-239.25 lg:pt-[99.19px] lg:pb-[99.36px]">
      <Container className="flex flex-col gap-6 lg:gap-16">
        <div className="flex flex-col gap-3 lg:w-212.5">
          <Eyebrow>Media &amp; Thought Leadership</Eyebrow>
          <h2 className="font-serif text-[32px] leading-[1.2] font-medium text-plum-950 lg:text-[56px] lg:leading-[58.75px]">
            Conversations that <br className="lg:hidden" />
            bring <br className="hidden lg:block" />
            psychology into <br className="lg:hidden" />
            <span className="text-purple">everyday life.</span>
          </h2>
        </div>

        <div className="grid gap-7 lg:h-[542.45px] lg:grid-cols-[695.39px_516.61px]">
          <div className="flex flex-col rounded-[10px] bg-plum-950 p-4 text-white lg:pt-9 lg:pr-10 lg:pb-[46.7px] lg:pl-12">
            <button
              type="button"
              aria-label="Play featured show"
              className="grid size-18 place-items-center rounded-lg border border-[#FFFFFF40] bg-[#FFFFFF1F] transition hover:bg-white/20"
            >
              <PlayIcon />
            </button>
            <div className="mt-6 lg:mt-[66.89px]">
              <p className="flex items-center gap-2.5 text-[12.5px] leading-[21.25px] font-bold tracking-[2.5px] text-gold uppercase">
                <span className="h-[1.5px] w-23 bg-gold" />
                Featured show
              </p>
              <h3 className="mt-3 font-serif text-[24px] leading-[1.2] font-medium tracking-[-0.6px] text-white lg:mt-4.5 lg:h-24.75 lg:w-[586.59px] lg:text-[40px] lg:leading-12">
                Inner Voice — Heartfelt Chat
                <br />
                with Dr. Foojan
              </h3>
              <p className="mt-3 text-[17px] min-[390px]:h-[77.78px] leading-[28.9px] text-[#DDDDDD] lg:mt-3.75 lg:w-[515.37px]">
                Conversations with experts about psychology, <br className="hidden lg:block" />
                relationships, personal growth and what matters most in <br className="hidden lg:block" />
                life.
              </p>
              <div className="mt-6 lg:mt-[33.83px]">
                <Button
                  variant={ButtonVariant.Gold}
                  arrow
                  className="h-14! w-48 text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px] text-[#071A3D]!"
                >
                  Watch episodes
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {channels.map((c) => (
              <a
                key={c.kicker}
                href={c.kicker === "Press" ? "#contact" : "#"}
                className={`group flex flex-col items-start gap-3 rounded-lg border border-[#F8E6FF] bg-white p-3 transition hover:border-purple/40 lg:flex-row lg:gap-4.5 lg:pt-5.5 lg:pr-5 lg:pb-5 lg:pl-6 ${c.height}`}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-purple text-white lg:self-center">
                  {c.icon}
                </span>
                <div className="flex-1">
                  <p className="text-[11.5px] leading-[19.55px] font-bold tracking-[1.61px] text-purple uppercase">
                    {c.kicker}
                  </p>
                  <p className="font-serif text-[19.2px] leading-[24.96px] text-plum-950 lg:leading-6">{c.title}</p>
                  <p className="text-[14px] leading-[23.8px] text-[#7A8091] lg:mt-[6.96px] lg:leading-4.25">{c.body}</p>
                </div>
                <ArrowRightIcon className="shrink-0 self-center text-plum-950 max-lg:hidden opacity-50 transition group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
