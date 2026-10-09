import HeroEditor from "@/components/admin/HeroEditor";
import { getHeroContent } from "@/server/content/hero";

export default async function HeroEditorPage() {
  const hero = await getHeroContent();
  return <HeroEditor initial={hero} />;
}
