import AboutPageEditor from "@/components/admin/AboutPageEditor";
import { getAboutPageContent } from "@/server/content/aboutPage";

export default async function AboutPageEditorPage() {
  const content = await getAboutPageContent();
  return <AboutPageEditor initial={content} />;
}
