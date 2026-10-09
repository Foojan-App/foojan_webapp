import { revalidatePath } from "next/cache";
import { getPathwaysContent, pathwayCardColumns, pathwaysSectionColumns } from "@/server/content/pathways";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveList, saveSingle } from "@/server/supabase";
import type { PathwayCard, PathwaysContent } from "@/services/interface";
import { Table } from "@/types/enums";

const CARD_COUNT = 5;

export async function GET() {
  return Response.json(await getPathwaysContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as PathwaysContent;
  if (body.cards?.length !== CARD_COUNT) {
    return Response.json({ message: `There must be exactly ${CARD_COUNT} cards` }, { status: 400 });
  }
  try {
    await saveSingle<PathwaysContent>(Table.PathwaysSection, pick(body, pathwaysSectionColumns));
    await saveList(Table.Pathways, body.cards.map((card) => pick(card, pathwayCardColumns) as PathwayCard));
    revalidatePath("/", "layout");
    return Response.json(await getPathwaysContent());
  } catch (error) {
    return adminError(error);
  }
}
