import FooterEditor from "@/components/admin/FooterEditor";
import { getFooterContent } from "@/server/content/footer";

export default async function FooterEditorPage() {
  const footer = await getFooterContent();
  return <FooterEditor initial={footer} />;
}
