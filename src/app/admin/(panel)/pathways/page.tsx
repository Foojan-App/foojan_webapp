import PathwaysEditor from "@/components/admin/PathwaysEditor";
import { getPathwaysContent } from "@/server/content/pathways";

export default async function PathwaysEditorPage() {
  const pathways = await getPathwaysContent();
  return <PathwaysEditor initial={pathways} />;
}
