import type { ReactNode } from "react";
import { ArrowRightIcon, FileTextIcon, MessageIcon, PlayIcon, PodcastIcon, TvIcon } from "@/utils/svg";
import { Button, Container, Eyebrow } from "./ui";

// card heights from Figma (fixed from 390 up; narrower phones let a card grow) — desktop 119.39px, except Articles (148.28px, two-line body); mobile 153.55px, Articles 184.55px
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
      {/* section: 1440×957, white; content block 1240×758.45, heading and cards 64px apart;
          mobile: 80px below Speaking and 80px above Experience, content 350×1270.45, heading (148) and cards (1098.45) 24px apart */}
      <Container className="flex flex-col gap-6 lg:gap-16">
        {/* heading group: desktop 850×152, mobile 350×148; 12px gap */}
        <div className="flex flex-col gap-3 lg:w-212.5">
          <Eyebrow>Media &amp; Thought Leadership</Eyebrow>
          {/* heading: Lora 500 — desktop 56px / 58.75px, two lines in an 850×118 box; mobile 32px / 120%, 3 lines (derived from the 148px group) */}
          <h2 className="font-serif text-[32px] leading-[1.2] font-medium text-plum-950 lg:text-[56px] lg:leading-[58.75px]">
            Conversations that <br className="lg:hidden" />
            bring <br className="hidden lg:block" />
            psychology into <br className="lg:hidden" />
            <span className="text-purple">everyday life.</span>
          </h2>
        </div>

        {/* cards row: 28px gap — desktop 1240×542.45, featured card 695.39 + list 516.61; mobile 350×1098.45, stacked */}
        <div className="grid gap-7 lg:h-[542.45px] lg:grid-cols-[695.39px_516.61px]">
          {/* featured card: radius 10, #1A002B — mobile 350×389.25, 16px padding; play, text and button 24px apart */}
          <div className="flex flex-col rounded-[10px] bg-plum-950 p-4 text-white lg:pt-9 lg:pr-10 lg:pb-[46.7px] lg:pl-12">
            <button
              type="button"
              aria-label="Play featured show"
              // play button: 72×72, radius 8, #FFFFFF1F fill, 1px #FFFFFF40 border, 36px from the top / 48px from the left
              className="grid size-18 place-items-center rounded-lg border border-[#FFFFFF40] bg-[#FFFFFF1F] transition hover:bg-white/20"
            >
              <PlayIcon />
            </button>
            <div className="mt-6 lg:mt-[66.89px]">
              {/* "Featured show": own style (92px gold line, 10px gap, 12.5px / 2.5px tracking), 18px above the title */}
              <p className="flex items-center gap-2.5 text-[12.5px] leading-[21.25px] font-bold tracking-[2.5px] text-gold uppercase">
                <span className="h-[1.5px] w-23 bg-gold" />
                Featured show
              </p>
              {/* title: Lora 500, -0.6px tracking, white — desktop 40px / 48px, 586.59×99, 214.14px from the card top; mobile 24px / 120%, 12px below */}
              <h3 className="mt-3 font-serif text-[24px] leading-[1.2] font-medium tracking-[-0.6px] text-white lg:mt-4.5 lg:h-24.75 lg:w-[586.59px] lg:text-[40px] lg:leading-12">
                Inner Voice — Heartfelt Chat
                <br />
                with Dr. Foojan
              </h3>
              {/* paragraph: Inter 17px / 28.9px, #DDDDDD, 77.78px box as in Figma (3 lines slightly overflow it) — desktop 515.37 wide, 328.14px from the card top; mobile 12px below the title */}
              <p className="mt-3 text-[17px] min-[390px]:h-[77.78px] leading-[28.9px] text-[#DDDDDD] lg:mt-3.75 lg:w-[515.37px]">
                Conversations with experts about psychology, <br className="hidden lg:block" />
                relationships, personal growth and what matters most in <br className="hidden lg:block" />
                life.
              </p>
              <div className="mt-6 lg:mt-[33.83px]">
                {/* button: 192×56, same style as "Explore AIT"; 439.75px from the card top, 46.7px above its bottom */}
                <Button
                  variant="gold"
                  arrow
                  className="h-14! w-48 text-[14.5px]! leading-[24.65px] font-semibold! tracking-[0.14px] text-[#071A3D]!"
                >
                  Watch episodes
                </Button>
              </div>
            </div>
          </div>

          {/* list: four cards, 12px apart — desktop 516.61px wide; mobile 350×681.2 */}
          <div className="flex flex-col gap-3">
            {channels.map((c) => (
              <a
                key={c.kicker}
                href={c.kicker === "Press" ? "#contact" : "#"}
                className={`group flex flex-col items-start gap-3 rounded-lg border border-[#F8E6FF] bg-white p-3 transition hover:border-purple/40 lg:flex-row lg:gap-4.5 lg:pt-5.5 lg:pr-5 lg:pb-5 lg:pl-6 ${c.height}`}
              >
                {/* icon box: 48×48, radius 8, #942BA9 — desktop vertically centred, 24px from the left, text 18px to its right; mobile: icon on top, text 12px below, 12px padding */}
                <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-purple text-white lg:self-center">
                  {c.icon}
                </span>
                <div className="flex-1">
                  {/* text: kicker 23px from the card top, title directly below, body 6.96px below the title;
                      mobile: text group 67.55 tall, title 19.2px / 24.96px and body 14px / 23.8px stacked with no gaps */}
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
