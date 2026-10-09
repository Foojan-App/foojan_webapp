import { revalidatePath } from "next/cache";
import { aboutHighlightColumns, aboutPageColumns, getAboutPageContent } from "@/server/content/aboutPage";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveList, saveSingle } from "@/server/supabase";
import type { AboutHighlight, AboutPageContent } from "@/services/interface";
import { Table } from "@/types/enums";

export async function GET() {
  return Response.json(await getAboutPageContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as AboutPageContent;
  try {
    await saveSingle<AboutPageContent>(Table.AboutPage, pick(body, aboutPageColumns));
    await saveList(Table.AboutHighlights, (body.highlights ?? []).map((item) => pick(item, aboutHighlightColumns) as AboutHighlight));
    revalidatePath("/", "layout");
    return Response.json(await getAboutPageContent());
  } catch (error) {
    return adminError(error);
  }
}
