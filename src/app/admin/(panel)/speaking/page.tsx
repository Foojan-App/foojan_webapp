import SpeakingEditor from "@/components/admin/SpeakingEditor";
import { getSpeakingContent } from "@/server/content/speaking";

export default async function SpeakingEditorPage() {
  const speaking = await getSpeakingContent();
  return <SpeakingEditor initial={speaking} />;
}
