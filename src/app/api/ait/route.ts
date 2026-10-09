import { revalidatePath } from "next/cache";
import { aitPillarColumns, aitSectionColumns, aitTabColumns, getAitContent } from "@/server/content/ait";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveList, saveSingle } from "@/server/supabase";
import type { AitContent, AitPillar, AitTab } from "@/services/interface";
import { Table } from "@/types/enums";

const PILLAR_COUNT = 3;
const TAB_COUNT = 4;

export async function GET() {
  return Response.json(await getAitContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as AitContent;
  if (body.pillars?.length !== PILLAR_COUNT) {
    return Response.json({ message: `There must be exactly ${PILLAR_COUNT} pillars` }, { status: 400 });
  }
  if (body.tabs?.length !== TAB_COUNT) {
    return Response.json({ message: `There must be exactly ${TAB_COUNT} tabs` }, { status: 400 });
  }
  try {
    await saveSingle<AitContent>(Table.AitSection, pick(body, aitSectionColumns));
    await saveList(Table.AitPillars, body.pillars.map((pillar) => pick(pillar, aitPillarColumns) as AitPillar));
    await saveList(
      Table.AitTabs,
      body.tabs.map((tab) => ({ ...(pick(tab, aitTabColumns) as AitTab), tags: tab.tags ?? [] })),
    );
    revalidatePath("/", "layout");
    return Response.json(await getAitContent());
  } catch (error) {
    return adminError(error);
  }
}
