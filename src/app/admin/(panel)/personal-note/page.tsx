import PersonalNoteEditor from "@/components/admin/PersonalNoteEditor";
import { getPersonalNoteContent } from "@/server/content/personalNote";

export default async function PersonalNoteEditorPage() {
  const note = await getPersonalNoteContent();
  return <PersonalNoteEditor initial={note} />;
}
