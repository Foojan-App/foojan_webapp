import type { HeroContent, HeroStat } from "@/services/interface";
import { Table } from "@/types/enums";
import { getList, getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultHero: HeroContent = {
  eyebrow: "Awareness · Integration · Transformation",
  heading: "Advancing human\nawareness through\n*psychology, education*\n& leadership.",
  paragraph:
    "Psychotherapist, educator, author, international speaker and originator of Awareness Integration Theory (AIT). For more than three decades, Dr. Foojan Zeine has helped people move beyond insight — integrating what they know with what they feel, believe, choose and practice.",
  primary_button_label: "Explore her work",
  primary_button_href: "#work",
  secondary_button_label: "Speaking & media",
  secondary_button_href: "#speaking",
  award_title: "2026 AAMFT Clinical Practice Innovation Award",
  award_subtitle: "American Association for Marriage and Family Therapy",
  image_url: "/images/foojan-hero.png",
  badge_value: "35+",
  badge_label: "years of\nclinical practice",
  stats: [
    { value: "AIT", suffix: "", label: "Originator of Awareness\nIntegration Theory" },
    { value: "7", suffix: "", label: "Books authored\n& co-authored" },
    { value: "25", suffix: "", label: "Peer-reviewed\narticles" },
    { value: "35", suffix: "+", label: "Years as a Licensed\nMarriage & Family Therapist" },
    { value: "35", suffix: "+", label: "Years as a Licensed\nMarriage & Family Therapist" },
  ],
};

export const heroColumns: (keyof HeroContent)[] = [
  "eyebrow",
  "heading",
  "paragraph",
  "primary_button_label",
  "primary_button_href",
  "secondary_button_label",
  "secondary_button_href",
  "award_title",
  "award_subtitle",
  "image_url",
  "badge_value",
  "badge_label",
];

export const statColumns: (keyof HeroStat)[] = ["id", "value", "suffix", "label"];

export const getHeroContent = async (): Promise<HeroContent> => {
  const [row, stats] = await Promise.all([
    getSingle<HeroContent>(Table.Hero).catch(() => null),
    getList<HeroStat>(Table.HeroStats).catch(() => []),
  ]);

  const content: HeroContent = { ...defaultHero };

  if (row) {
    Object.assign(content, pick(row, heroColumns));
  }

  if (stats.length > 0) {
    content.stats = stats.map((stat) => pick(stat, statColumns) as HeroStat);
  }

  return content;
};
