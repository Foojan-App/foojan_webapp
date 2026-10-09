import { revalidatePath } from "next/cache";
import { getHeroContent, heroColumns, statColumns } from "@/server/content/hero";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveList, saveSingle } from "@/server/supabase";
import type { HeroContent, HeroStat } from "@/services/interface";
import { Table } from "@/types/enums";

export async function GET() {
  return Response.json(await getHeroContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as HeroContent;
  try {
    await saveSingle<HeroContent>(Table.Hero, pick(body, heroColumns));
    await saveList(Table.HeroStats, body.stats.map((stat) => pick(stat, statColumns) as HeroStat));
    revalidatePath("/");
    return Response.json(await getHeroContent());
  } catch (error) {
    return adminError(error);
  }
}
