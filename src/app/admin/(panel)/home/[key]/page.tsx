import { notFound } from "next/navigation";
import HomeSectionEditor from "@/components/admin/HomeSectionEditor";
import { getHomeSection, isHomeSection } from "@/server/content/home";
import { HomeSection } from "@/types/enums";

export default async function HomeSectionPage({ params }: PageProps<"/admin/home/[key]">) {
  const { key } = await params;
  if (!isHomeSection(key)) notFound();

  const content = await getHomeSection(key);
  const initial =
    key === HomeSection.Header && "menu" in content
      ? { ...content, menu: content.menu.map((item) => ({ ...item, visible: item.visible !== false, children: item.children ?? [] })) }
      : content;

  return <HomeSectionEditor sectionKey={key} initial={initial} />;
}
