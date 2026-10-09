import ExperienceEditor from "@/components/admin/ExperienceEditor";
import { getExperienceContent } from "@/server/content/experience";

export default async function ExperienceEditorPage() {
  const experience = await getExperienceContent();
  return <ExperienceEditor initial={experience} />;
}
