import type { PersonalNoteContent } from "@/services/interface";
import { Table } from "@/types/enums";
import { getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultPersonalNote: PersonalNoteContent = {
  eyebrow: "A personal note",
  heading: "One mission, expressed through|many\nforms of work.",
  paragraph:
    "Although my work spans psychotherapy,|education, research, leadership,|\nmedia and technology, I do not see these|as separate pursuits. They are|\nexpressions of one mission: helping|human beings meet themselves with|\ngreater honesty, compassion, courage|and responsibility — and use that|\nawareness to create lives and|relationships that reflect who they|\nconsciously choose to be.",
  signature_subtitle: "Psy.D., LMFT",
};

export const personalNoteColumns: (keyof PersonalNoteContent)[] = ["eyebrow", "heading", "paragraph", "signature_subtitle"];

export const getPersonalNoteContent = async (): Promise<PersonalNoteContent> => {
  const row = await getSingle<PersonalNoteContent>(Table.PersonalNote).catch(() => null);

  if (!row) {
    return defaultPersonalNote;
  }

  return { ...defaultPersonalNote, ...pick(row, personalNoteColumns) };
};
