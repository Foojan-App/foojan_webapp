import type { ContactBandContent } from "@/services/interface";
import { Table } from "@/types/enums";
import { getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultContactBand: ContactBandContent = {
  heading: "Speaking. Media.|Education.|\nCollaboration.",
  paragraph:
    "Whether you are planning an event, producing a program, or exploring\nprofessional training in AIT — start a conversation with Dr. Foojan’s office.",
  primary_button_label: "Get in touch",
  primary_button_href: "/contact",
  secondary_button_label: "Speaking inquiries",
  secondary_button_href: "#speaking",
};

export const contactBandColumns: (keyof ContactBandContent)[] = [
  "heading",
  "paragraph",
  "primary_button_label",
  "primary_button_href",
  "secondary_button_label",
  "secondary_button_href",
];

export const getContactBandContent = async (): Promise<ContactBandContent> => {
  const row = await getSingle<ContactBandContent>(Table.ContactBand).catch(() => null);

  if (!row) {
    return defaultContactBand;
  }

  return { ...defaultContactBand, ...pick(row, contactBandColumns) };
};
