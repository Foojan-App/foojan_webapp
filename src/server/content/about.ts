import type { AboutContent } from "@/services/interface";
import { Table } from "@/types/enums";
import { getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultAbout: AboutContent = {
  avatar_url: "/images/foojan-avatar.png",
  signature_name: "Dr. Foojan Zeine",
  eyebrow: "Meet Dr. Foojan",
  heading: "A career devoted to understanding how *awareness* creates meaningful change.",
  signature_subtitle: "Psy.D., LMFT · Originator of AIT",
  lead: "I believe awareness is where transformation\nbegins — but awareness alone is not enough.\nWe may understand why we react as we do and\nstill repeat the same emotional, relational and\nbehavioral patterns.",
  body: "That conviction led me to develop Awareness Integration Theory — an\nevidence-informed, multimodality framework that helps people\nrecognize the patterns shaping their lives, choose an intentional\nidentity, and translate it into purposeful action.",
  quote: "Awareness is not simply insight. It\nbecomes powerful when it changes how\nwe relate, choose and act.",
  quote_author: "Dr. Foojan Zeine",
  link_label: "Read the full biography",
  link_href: "/meet-dr-foojan-zeine",
};

export const aboutColumns: (keyof AboutContent)[] = [
  "avatar_url",
  "signature_name",
  "eyebrow",
  "heading",
  "signature_subtitle",
  "lead",
  "body",
  "quote",
  "quote_author",
  "link_label",
  "link_href",
];

export const getAboutContent = async (): Promise<AboutContent> => {
  const row = await getSingle<AboutContent>(Table.About).catch(() => null);

  if (!row) {
    return defaultAbout;
  }

  return { ...defaultAbout, ...pick(row, aboutColumns) };
};
