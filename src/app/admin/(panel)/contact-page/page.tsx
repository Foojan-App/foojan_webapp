import ContactPageEditor from "@/components/admin/ContactPageEditor";
import { getContactPageContent } from "@/server/content/contactPage";

export default async function ContactPageEditorPage() {
  const content = await getContactPageContent();
  return <ContactPageEditor initial={content} />;
}
