import type { AitContent, AitPillar, AitTab } from "@/services/interface";
import { Table } from "@/types/enums";
import { withPhotoSize } from "../photoSize";
import { getList, getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultAit: AitContent = {
  image_url: "/images/photos/ait-research.png",
  image_alt: "Dr. Foojan Zeine presenting Awareness Integration Theory research",
  eyebrow: "Signature body of work",
  heading: "Awareness\nIntegration Theory",
  paragraph:
    "Originated by Dr. Foojan Zeine, AIT is an evidence-informed,\nmultimodality psychological framework that moves people from\ninsight to integration — connecting awareness with beliefs,\nemotions, behaviors, the body, past experiences, identity,\npersonal responsibility and purposeful action.",
  primary_button_label: "Explore AIT",
  primary_button_href: "https://awarenessintegration.com/",
  secondary_button_label: "Research & publications",
  secondary_button_href: "#books",
  pillars: [
    {
      title: "Awareness",
      body: "Recognize the patterns, beliefs and past experiences shaping how you think, feel and relate.",
    },
    {
      title: "Integration",
      body: "Work through unresolved experiences and align what you know with what you feel and believe.",
    },
    {
      title: "Transformation",
      body: "Choose an intentional identity and translate it\ninto purposeful, consistent action.",
    },
  ],
  tabs: [
    {
      title: "Clinical Application",
      body: "Psychotherapy and structured personal development — helping\nclients move from understanding their patterns to living\ndifferently.",
      icon_url: "/images/ait/heart.svg",
      tags: ["Relationships", "Trauma", "Anxiety & depression", "Addictive behaviors", "Personal development"],
    },
    {
      title: "Research",
      body: "Peer-reviewed studies and ongoing research examining how AIT supports measurable, lasting change across populations.",
      icon_url: "/images/ait/book.svg",
      tags: ["Peer-reviewed articles", "Outcome studies", "Evidence-informed practice"],
    },
    {
      title: "Professional Education",
      body: "Training, certification and continuing education that equip clinicians, coaches and educators to apply AIT.",
      icon_url: "/images/ait/graduation-cap.svg",
      tags: ["Certification", "Clinical training", "University courses", "Coaching"],
    },
    {
      title: "Digital Application",
      body: "Bringing structured AIT-based reflection and growth tools to people through the Foojan App and the Mira AI companion.",
      icon_url: "/images/ait/mobile.svg",
      tags: ["Foojan App", "Mira", "Guided reflection"],
    },
  ],
};

export const aitSectionColumns: (keyof AitContent)[] = [
  "image_url",
  "image_alt",
  "eyebrow",
  "heading",
  "paragraph",
  "primary_button_label",
  "primary_button_href",
  "secondary_button_label",
  "secondary_button_href",
];

export const aitPillarColumns: (keyof AitPillar)[] = ["id", "title", "body"];

export const aitTabColumns: (keyof AitTab)[] = ["id", "title", "body", "icon_url", "tags"];

export const getAitContent = async (): Promise<AitContent> => {
  const [row, pillars, tabs] = await Promise.all([
    getSingle<AitContent>(Table.AitSection).catch(() => null),
    getList<AitPillar>(Table.AitPillars).catch(() => []),
    getList<AitTab>(Table.AitTabs).catch(() => []),
  ]);

  const content: AitContent = { ...defaultAit };

  if (row) {
    Object.assign(content, pick(row, aitSectionColumns));
  }

  if (pillars.length === defaultAit.pillars.length) {
    content.pillars = pillars.map((pillar) => pick(pillar, aitPillarColumns) as AitPillar);
  }

  if (tabs.length === defaultAit.tabs.length) {
    content.tabs = tabs.map((tab) => pick(tab, aitTabColumns) as AitTab);
  }

  return withPhotoSize(content);
};
