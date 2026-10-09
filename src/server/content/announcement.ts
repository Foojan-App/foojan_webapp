import type { AnnouncementContent } from "@/services/interface";
import { Table } from "@/types/enums";
import { getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultAnnouncement: AnnouncementContent = {
  enabled: true,
  text: "Recipient of the 2026 AAMFT Clinical Practice Innovation Award —",
  link_label: "Read more",
  link_href: "#experience",
};

export const announcementColumns: (keyof AnnouncementContent)[] = ["enabled", "text", "link_label", "link_href"];

export const getAnnouncementContent = async (): Promise<AnnouncementContent> => {
  const row = await getSingle<AnnouncementContent>(Table.Announcement).catch(() => null);

  if (!row) {
    return defaultAnnouncement;
  }

  return { ...defaultAnnouncement, ...pick(row, announcementColumns) };
};
