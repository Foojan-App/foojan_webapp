import ExtendingEditor from "@/components/admin/ExtendingEditor";
import { getExtendingContent } from "@/server/content/extending";

export default async function ExtendingEditorPage() {
  const extending = await getExtendingContent();
  return <ExtendingEditor initial={extending} />;
}
