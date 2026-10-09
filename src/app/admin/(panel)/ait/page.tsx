import AitEditor from "@/components/admin/AitEditor";
import { getAitContent } from "@/server/content/ait";

export default async function AitEditorPage() {
  const ait = await getAitContent();
  return <AitEditor initial={ait} />;
}
