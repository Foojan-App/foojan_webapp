import type { SpeakingContent, SpeakingFormat, SpeakingTopic } from "@/services/interface";
import { Table } from "@/types/enums";
import { getList, getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultSpeaking: SpeakingContent = {
  image_url: "/images/photos/speaking.png",
  image_alt: "Dr. Foojan Zeine speaking to a professional audience",
  eyebrow: "Speaking & Education",
  heading: "Bringing awareness\n*to the room.*",
  paragraph:
    "Dr. Foojan speaks to professional, academic, leadership and\npublic audiences on psychology, Awareness Integration Theory,\npersonal development, relationships, mental health and\nconscious leadership.",
  button_label: "Invite Dr. Foojan to speak",
  button_href: "/contact",
  topics_title: "Signature topics",
  formats: [
    { title: "Keynotes", body: "Conferences & events" },
    { title: "Workshops", body: "Professional training" },
    { title: "Academic", body: "University lectures" },
  ],
  topics: [
    { label: "Awareness Integration Theory" },
    { label: "Awakened Leadership" },
    { label: "Mental Health & Resilience" },
    { label: "Relationships & Human Behavior" },
    { label: "Intentional Parenting" },
    { label: "AI & Mental Health" },
    { label: "Personal Growth" },
    { label: "Professional Education" },
  ],
};

export const speakingColumns: (keyof SpeakingContent)[] = [
  "image_url",
  "image_alt",
  "eyebrow",
  "heading",
  "paragraph",
  "button_label",
  "button_href",
  "topics_title",
];

export const speakingFormatColumns: (keyof SpeakingFormat)[] = ["id", "title", "body"];

export const speakingTopicColumns: (keyof SpeakingTopic)[] = ["id", "label"];

export const getSpeakingContent = async (): Promise<SpeakingContent> => {
  const [row, formats, topics] = await Promise.all([
    getSingle<SpeakingContent>(Table.Speaking).catch(() => null),
    getList<SpeakingFormat>(Table.SpeakingFormats).catch(() => []),
    getList<SpeakingTopic>(Table.SpeakingTopics).catch(() => []),
  ]);

  const content: SpeakingContent = { ...defaultSpeaking };

  if (row) {
    Object.assign(content, pick(row, speakingColumns));
  }

  if (formats.length > 0) {
    content.formats = formats.map((format) => pick(format, speakingFormatColumns) as SpeakingFormat);
  }

  if (topics.length > 0) {
    content.topics = topics.map((topic) => pick(topic, speakingTopicColumns) as SpeakingTopic);
  }

  return content;
};
