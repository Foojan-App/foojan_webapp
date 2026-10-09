import { ArrowRightIcon, ArrowUpRightIcon } from "@/utils/svg";
import type { PathwayCardProps, PathwaysProps } from "@/types/components";
import { LineBreaks } from "@/types/enums";
import AccentText from "./AccentText";
import MaskIcon from "./MaskIcon";
import { Container, Eyebrow } from "./ui";

const cardLayouts = [
  { box: "max-lg:min-h-96.5 min-[390px]:max-lg:h-96.5 lg:p-6", gap: "gap-20 lg:gap-10", textBox: "lg:w-md", body: "" },
  { box: "max-lg:min-h-88.25 min-[390px]:max-lg:h-88.25 lg:p-6", gap: "gap-20 lg:gap-10", textBox: "lg:w-115", body: "lg:whitespace-nowrap" },
  { box: "min-h-90.25 min-[390px]:h-90.25 lg:self-start", gap: "gap-20", textBox: "lg:w-60.25", body: "lg:whitespace-nowrap" },
  { box: "min-h-90.75 min-[390px]:h-90.75 p-6 lg:self-start", gap: "gap-20", textBox: "lg:w-60.25", body: "lg:whitespace-nowrap" },
  { box: "min-h-91.25 min-[390px]:h-91.25 p-6 md:max-lg:col-span-2", gap: "gap-15", textBox: "w-65.75 min-w-0 md:max-lg:w-auto md:max-lg:max-w-120", body: "min-[390px]:max-md:whitespace-nowrap lg:whitespace-nowrap" },
];

function PathwayCard({ card, index }: PathwayCardProps) {
  const layout = cardLayouts[index] ?? cardLayouts[0];
  return (
    <a
      href={card.href}
      className={`group relative flex flex-col rounded-[10px] border border-[#F8E6FF] bg-white px-7.25 py-8.75 transition md:max-lg:h-auto! ${layout.box}`}
    >
      <div className={`flex flex-col ${layout.gap}`}>
        <div className="flex h-13.5 items-start justify-between">
          <span className="grid size-13.5 place-items-center rounded-lg bg-[#EFE4F4] text-purple">
            <MaskIcon src={card.icon_url} className="size-6.5" />
          </span>
          <span className="font-serif text-[16px] leading-[25.5px] text-[#687080]">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="flex items-end justify-between md:max-lg:gap-6">
          <div className={`flex flex-col gap-3 ${layout.textBox}`}>
            <h3 className="font-serif text-[24px] leading-[32.64px] font-medium tracking-[-0.41px] text-plum-950">
              <AccentText text={card.title} breaks={LineBreaks.DesktopOnly} />
            </h3>
            <p className="text-[16px] leading-[25.5px] text-[#4A5163]">
              <span className={layout.body}>
                <AccentText text={card.body} breaks={LineBreaks.DesktopAndPhone} />
              </span>
            </p>
            {card.link_label && (
              <p className="text-[13px] leading-4 font-semibold text-plum-950">{card.link_label} ↗</p>
            )}
          </div>
          <span className="grid size-10.5 shrink-0 place-items-center rounded-md border border-purple text-plum-950 transition group-hover:bg-purple group-hover:text-white">
            {card.link_label ? <ArrowUpRightIcon /> : <ArrowRightIcon />}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Pathways({ content }: PathwaysProps) {
  const { cards } = content;
  return (
    <section id="work" className="bg-[#F7F2FB] pt-[23.5px] pb-[22.5px] md:max-lg:py-24 lg:min-h-301 lg:pt-[113.34px] lg:pb-[112.75px]">
      <Container>
        <div className="mx-auto flex max-w-[1175.99px] flex-col gap-10">
          <div className="mx-auto flex max-w-171.75 flex-col gap-3 text-center lg:gap-8">
            <div className="flex flex-col gap-3">
              <Eyebrow center>{content.eyebrow}</Eyebrow>
              <h2 className="font-serif text-[32px] leading-[1.2] font-medium md:max-lg:text-[44px] text-plum-950 lg:w-182.25 lg:self-center lg:text-[56px]">
                <AccentText text={content.heading} breaks={LineBreaks.DesktopAndPhone} />
              </h2>
            </div>
            <p className="text-[16px] leading-normal text-[#4A5163] lg:leading-[29.92px]">
              <AccentText text={content.paragraph} breaks={LineBreaks.DesktopOnly} />
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:h-60">
                {cards.slice(0, 2).map((c, i) => (
                  <PathwayCard key={c.id ?? i} card={c} index={i} />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:h-91.25 lg:grid-cols-[minmax(0,378.66px)_minmax(0,378.67px)_minmax(0,364.65px)]">
                {cards.slice(2).map((c, i) => (
                  <PathwayCard key={c.id ?? i + 2} card={c} index={i + 2} />
                ))}
              </div>
            </div>
            <p className="text-center text-[13.5px] leading-[22.95px] text-[#687080]">
              <AccentText text={content.note} breaks={LineBreaks.DesktopOnly} />
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
