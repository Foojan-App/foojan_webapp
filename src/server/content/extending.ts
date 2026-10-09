import type { ExtendingCard, ExtendingContent } from "@/services/interface";
import { Table } from "@/types/enums";
import { getList, getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultExtending: ExtendingContent = {
  image_url: "/images/photos/foojan-app.png",
  image_alt: "Dr. Foojan Zeine presenting the Foojan App",
  eyebrow: "Extending the work",
  heading: "From theory to|institutions,\neducation|*& technology.*",
  paragraph: "Organizations and products designed to make|AIT accessible to professionals and the|public.",
  link_label: "Explore her work in depth",
  link_href: "#work",
  cards: [
    {
      kicker: "Institute",
      title: "International Awareness Integration Institute",
      body: "Professional training, certification, therapy, coaching and education built around Awareness Integration Theory.",
      icon_text: "IAII",
      icon_url: "",
      links: [{ label: "Explore IAII", href: "https://awarenessintegration.com/", external: false }],
    },
    {
      kicker: "Mobile App",
      title: "Foojan App",
      body: "A digital self-development experience bringing structured AIT-based reflection and growth tools to users.",
      icon_text: "",
      icon_url: "/images/extending/smartphone.svg",
      links: [
        { label: "App Store", href: "https://apps.apple.com/us/app/foojan/id1609189394", external: true },
        { label: "Android", href: "#", external: true },
      ],
    },
    {
      kicker: "AI Companion",
      title: "Mira",
      body: "An AIT-informed AI companion supporting structured self-reflection, emotional awareness and personal growth within clear ethical boundaries not a replacement for therapy, professional care or human relationship.",
      icon_text: "",
      icon_url: "/images/extending/sparkles.svg",
      links: [{ label: "Discover Mira", href: "#", external: false }],
    },
  ],
};

export const extendingSectionColumns: (keyof ExtendingContent)[] = ["image_url", "image_alt", "eyebrow", "heading", "paragraph", "link_label", "link_href"];

export const extendingCardColumns: (keyof ExtendingCard)[] = ["id", "kicker", "title", "body", "icon_text", "icon_url", "links"];

export const getExtendingContent = async (): Promise<ExtendingContent> => {
  const [row, cards] = await Promise.all([
    getSingle<ExtendingContent>(Table.ExtendingSection).catch(() => null),
    getList<ExtendingCard>(Table.ExtendingCards).catch(() => []),
  ]);

  const content: ExtendingContent = { ...defaultExtending };

  if (row) {
    Object.assign(content, pick(row, extendingSectionColumns));
  }

  if (cards.length === defaultExtending.cards.length) {
    content.cards = cards.map((card) => pick(card, extendingCardColumns) as ExtendingCard);
  }

  return content;
};
