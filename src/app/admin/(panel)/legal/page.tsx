import LegalEditor from "@/components/admin/LegalEditor";
import { getLegalContent } from "@/server/content/legal";

export default async function LegalEditorPage() {
  const legal = await getLegalContent();
  return <LegalEditor initial={legal} />;
}
