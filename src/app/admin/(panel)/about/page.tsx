import AboutEditor from "@/components/admin/AboutEditor";
import { getAboutContent } from "@/server/content/about";

export default async function AboutEditorPage() {
  const about = await getAboutContent();
  return <AboutEditor initial={about} />;
}
