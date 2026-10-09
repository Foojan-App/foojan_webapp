import { ArrowRightIcon, ArrowUpRightIcon } from "@/utils/svg";
import type { PathwayCardProps, PathwaysProps } from "@/types/components";
import { LineBreaks } from "@/types/enums";
import AccentText from "./AccentText";
import MaskIcon from "./MaskIcon";
import { Container, Eyebrow } from "./ui";
import SectionPhoto from "./SectionPhoto";
import { sectionPhotos } from "./sectionPhotos";

const cardLayouts = [
  { box: "max-lg:min-h-96.5 min-[390px]:max-lg:h-96.5 lg:h-[239.64px]", gap: "gap-20", textBox: "", body: "" },
  { box: "max-lg:min-h-88.25 min-[390px]:max-lg:h-88.25 lg:h-[240px]", gap: "gap-20", textBox: "", body: "" },
  { box: "max-lg:min-h-90.25 min-[390px]:max-lg:h-90.25 lg:h-[240px]", gap: "gap-20", textBox: "", body: "" },
  {
    box: "max-lg:min-h-90.75 min-[390px]:max-lg:h-90.75 max-lg:p-6 lg:h-[240px]",
    gap: "gap-20",
    textBox: "",
    body: "",
  },
  {
    box: "max-lg:min-h-91.25 min-[390px]:max-lg:h-91.25 max-lg:p-6 md:max-lg:col-span-2 lg:h-[266px]",
    gap: "gap-15",
    textBox: "max-lg:w-65.75 min-w-0 md:max-lg:w-auto md:max-lg:max-w-120",
    body: "min-[390px]:max-md:whitespace-nowrap",
  },
];

function PathwayCard({ card, index }: PathwayCardProps) {
  const layout = cardLayouts[index] ?? cardLayouts[0];
  return (
    <a
      href={card.href}
      className={`group relative flex flex-col rounded-[10px] border border-[#F8E6FF] bg-white px-7.25 py-8.75 transition md:max-lg:h-auto! lg:p-6 ${layout.box}`}
    >
      <div className={`flex flex-col ${layout.gap} lg:h-full lg:justify-between lg:gap-2.5`}>
        <div className="flex h-13.5 items-start justify-between">
          <span className="grid size-13.5 place-items-center rounded-lg bg-[#EFE4F4] text-purple">
            <MaskIcon src={card.icon_url} className="size-6.5" />
          </span>
          <span className="font-serif text-[16px] leading-[25.5px] text-[#687080]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-end justify-between md:max-lg:gap-6 lg:gap-8">
          <div className={`flex flex-col gap-3 ${layout.textBox} lg:flex-1`}>
            <h3 className="font-serif text-[24px] leading-[32.64px] font-medium tracking-[-0.41px] text-plum-950 lg:[&_br]:hidden">
              <AccentText text={card.title} breaks={LineBreaks.DesktopOnly} />
            </h3>
            <p className="text-[16px] leading-[25.5px] text-[#4A5163] lg:[&_br]:hidden">
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
    <section id="work" className="bg-[#F7F2FB] pt-[67px] pb-[60.98px] md:max-lg:py-24 lg:pt-[87.53px] lg:pb-[86.83px]">
      <Container>
        <div className="mx-auto flex max-w-[1175.99px] flex-col gap-10 lg:max-w-none lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          <div className="mx-auto flex max-w-171.75 flex-col gap-3 text-center max-md:text-left lg:sticky lg:top-28 lg:mx-0 lg:w-[580px] lg:max-w-none lg:gap-8 lg:text-left">
            <div className="flex flex-col gap-3 lg:gap-[3.42px]">
              <div className="hidden md:block lg:hidden">
                <Eyebrow center>{content.eyebrow}</Eyebrow>
              </div>
              <div className="md:hidden lg:block">
                <Eyebrow>{content.eyebrow}</Eyebrow>
              </div>
              <h2 className="font-serif text-[32px] leading-[1.2] font-medium md:max-lg:text-[44px] text-plum-950 max-md:[&_br]:hidden lg:text-[56px] lg:[&_br]:hidden">
                <AccentText text={content.heading} breaks={LineBreaks.DesktopAndPhone} />
              </h2>
            </div>
            <p className="text-[16px] leading-normal text-[#4A5163] lg:leading-[29.92px] lg:[&_br]:hidden">
              <AccentText text={content.paragraph} breaks={LineBreaks.DesktopOnly} />
            </p>
            <SectionPhoto
              src={content.image_url}
              alt={content.image_alt}
              photo={sectionPhotos.pathways}
              className="mt-7 md:max-lg:mt-3 lg:mt-[13px]"
            />
          </div>

          <div className="flex flex-col gap-4 lg:w-[578px] lg:gap-5">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1">
                {cards.slice(0, 2).map((c, i) => (
                  <PathwayCard key={c.id ?? i} card={c} index={i} />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1">
                {cards.slice(2).map((c, i) => (
                  <PathwayCard key={c.id ?? i + 2} card={c} index={i + 2} />
                ))}
              </div>
            </div>
            <p className="text-center text-[13.5px] leading-[22.95px] text-[#687080] lg:text-left lg:[&_br]:hidden">
              <AccentText text={content.note} breaks={LineBreaks.DesktopOnly} />
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
