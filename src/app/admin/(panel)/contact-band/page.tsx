import ContactBandEditor from "@/components/admin/ContactBandEditor";
import { getContactBandContent } from "@/server/content/contactBand";

export default async function ContactBandEditorPage() {
  const contactBand = await getContactBandContent();
  return <ContactBandEditor initial={contactBand} />;
}
