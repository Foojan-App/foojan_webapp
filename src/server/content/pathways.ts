import type { PathwayCard, PathwaysContent } from "@/services/interface";
import { Table } from "@/types/enums";
import { withPhotoSize } from "../photoSize";
import { getList, getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultPathways: PathwaysContent = {
  image_url: "/images/photos/psychotherapy.png",
  image_alt: "Dr. Foojan Zeine at the Therapy Hub",
  eyebrow: "Explore her work",
  heading: "One body of|work. *Multiple*|\n*pathways.*",
  paragraph:
    "Find the part of Dr. Foojan’s work that speaks to you — whether you are a\nprofessional, a reader, an event organizer or someone seeking support.",
  note: "Psychotherapy services, eligibility and current availability are provided through IAII and should be confirmed directly\nthrough Dr. Foojan’s IAII practitioner profile.",
  cards: [
    {
      title: "Awareness Integration Theory",
      body: "Explore the theory, clinical framework, research foundation and professional applications of AIT.",
      link_label: "",
      href: "#ait",
      icon_url: "/images/pathways/target.svg",
    },
    {
      title: "Books & Publications",
      body: "Discover Dr. Foojan’s books, peer-reviewed research, articles\nand academic contributions.",
      link_label: "",
      href: "#books",
      icon_url: "/images/pathways/book.svg",
    },
    {
      title: "Speaking &\nEducation",
      body: "Keynotes, professional training,\nuniversity education, leadership\nand global presentations.",
      link_label: "",
      href: "#speaking",
      icon_url: "/images/pathways/mic.svg",
    },
    {
      title: "Media &\nConversations",
      body: "Podcast, television, radio,\ninterviews and conversations on\npsychology and human\ndevelopment.",
      link_label: "",
      href: "#media",
      icon_url: "/images/pathways/video.svg",
    },
    {
      title: "Psychotherapy",
      body: "35+ years of clinical practice as an|\nLMFT — relationships, trauma,|\nanxiety, depression, addictive|\nbehaviors and personal|\ndevelopment.",
      link_label: "View IAII practitioner profile",
      href: "#",
      icon_url: "/images/pathways/heart.svg",
    },
  ],
};

export const pathwaysSectionColumns: (keyof PathwaysContent)[] = ["image_url", "image_alt", "eyebrow", "heading", "paragraph", "note"];

export const pathwayCardColumns: (keyof PathwayCard)[] = ["id", "title", "body", "link_label", "href", "icon_url"];

export const getPathwaysContent = async (): Promise<PathwaysContent> => {
  const [row, cards] = await Promise.all([
    getSingle<PathwaysContent>(Table.PathwaysSection).catch(() => null),
    getList<PathwayCard>(Table.Pathways).catch(() => []),
  ]);

  const content: PathwaysContent = { ...defaultPathways };

  if (row) {
    Object.assign(content, pick(row, pathwaysSectionColumns));
  }

  if (cards.length === defaultPathways.cards.length) {
    content.cards = cards.map((card) => pick(card, pathwayCardColumns) as PathwayCard);
  }

  return withPhotoSize(content);
};
