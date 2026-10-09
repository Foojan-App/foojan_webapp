import { revalidatePath } from "next/cache";
import { experienceItemColumns, experienceSectionColumns, experienceTagColumns, getExperienceContent } from "@/server/content/experience";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveList, saveSingle } from "@/server/supabase";
import type { ExperienceContent, ExperienceItem, ExperienceTag } from "@/services/interface";
import { Table } from "@/types/enums";

export async function GET() {
  return Response.json(await getExperienceContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as ExperienceContent;
  try {
    await saveSingle<ExperienceContent>(Table.ExperienceSection, pick(body, experienceSectionColumns));
    await saveList(Table.ExperienceTags, body.tags.map((tag) => pick(tag, experienceTagColumns) as ExperienceTag));
    await saveList(
      Table.ExperienceItems,
      body.items.map((item) => pick({ ...item, highlight: Boolean(item.highlight), badge_label: item.badge_label ?? "" }, experienceItemColumns) as ExperienceItem),
    );
    revalidatePath("/", "layout");
    return Response.json(await getExperienceContent());
  } catch (error) {
    return adminError(error);
  }
}
