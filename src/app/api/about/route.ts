import { revalidatePath } from "next/cache";
import { aboutColumns, getAboutContent } from "@/server/content/about";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveSingle } from "@/server/supabase";
import type { AboutContent } from "@/services/interface";
import { Table } from "@/types/enums";

export async function GET() {
  return Response.json(await getAboutContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as AboutContent;
  try {
    const row = await saveSingle<AboutContent>(Table.About, pick(body, aboutColumns));
    revalidatePath("/");
    return Response.json(pick(row, aboutColumns));
  } catch (error) {
    return adminError(error);
  }
}
