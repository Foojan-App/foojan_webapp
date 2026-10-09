import type { MediaContent, MediaItem } from "@/services/interface";
import { Table } from "@/types/enums";
import { getList, getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultMedia: MediaContent = {
  eyebrow: "Media & Thought Leadership",
  heading: "Conversations that|bring\npsychology into|*everyday life.*",
  featured_eyebrow: "Featured show",
  featured_title: "Inner Voice — Heartfelt Chat\nwith Dr. Foojan",
  featured_text:
    "Conversations with experts about psychology,\nrelationships, personal growth and what matters most in\nlife.",
  featured_button_label: "Watch episodes",
  featured_button_href: "https://www.youtube.com/playlist?list=PLpwU0vKZyFKAPmuB5O-cjgbn7n71zsYt4",
  items: [
    {
      kicker: "Podcast",
      title: "Expert conversations & interviews",
      body: "Curated appearances and featured discussions.",
      link: "https://innervoicechat2018.podbean.com/",
      icon_url: "/images/media/podcast.svg",
    },
    {
      kicker: "Television & Radio",
      title: "Public psychology & education",
      body: "Selected media appearances and commentary.",
      link: "https://www.kmet1490am.com/inner-voice-heartfelt-chat",
      icon_url: "/images/media/tv.svg",
    },
    {
      kicker: "Articles",
      title: "Ideas for a broader audience",
      body: "Psychology, relationships, awareness and personal\ndevelopment.",
      link: "https://foojanzeineblog.wordpress.com/",
      icon_url: "/images/media/articles.svg",
    },
    {
      kicker: "Press",
      title: "Media inquiries",
      body: "For producers, journalists and event organizers.",
      link: "/contact",
      icon_url: "/images/media/press.svg",
    },
  ],
};

export const mediaSectionColumns: (keyof MediaContent)[] = [
  "eyebrow",
  "heading",
  "featured_eyebrow",
  "featured_title",
  "featured_text",
  "featured_button_label",
  "featured_button_href",
];

export const mediaItemColumns: (keyof MediaItem)[] = ["id", "kicker", "title", "body", "link", "icon_url"];

export const getMediaContent = async (): Promise<MediaContent> => {
  const [row, items] = await Promise.all([
    getSingle<MediaContent>(Table.MediaSection).catch(() => null),
    getList<MediaItem>(Table.MediaItems).catch(() => []),
  ]);

  const content: MediaContent = { ...defaultMedia };

  if (row) {
    Object.assign(content, pick(row, mediaSectionColumns));
  }

  if (items.length > 0) {
    content.items = items.map((item) => pick(item, mediaItemColumns) as MediaItem);
  }

  return content;
};
