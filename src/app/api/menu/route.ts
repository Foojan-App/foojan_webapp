import { revalidatePath } from "next/cache";
import { getHeaderContent, menuColumns } from "@/server/content/header";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveList } from "@/server/supabase";
import type { HeaderContent, MenuItem } from "@/services/interface";
import { Table } from "@/types/enums";

export async function GET() {
  return Response.json(await getHeaderContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const { menu } = (await request.json()) as HeaderContent;
  try {
    const rows = await saveList(Table.MenuItems, menu.map((item) => pick(item, menuColumns) as MenuItem));
    revalidatePath("/", "layout");
    return Response.json({ menu: rows.map((item) => pick(item, menuColumns)) });
  } catch (error) {
    return adminError(error);
  }
}
