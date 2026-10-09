import HeaderEditor from "@/components/admin/HeaderEditor";
import { getHeaderContent } from "@/server/content/header";

export default async function HeaderEditorPage() {
  const header = await getHeaderContent();
  return <HeaderEditor initial={header} />;
}
