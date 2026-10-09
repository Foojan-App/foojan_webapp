import { revalidatePath } from "next/cache";
import { footerToRows, getFooterContent } from "@/server/content/footer";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveList, saveSingle } from "@/server/supabase";
import type { FooterContent } from "@/services/interface";
import { Table } from "@/types/enums";

export async function GET() {
  return Response.json(await getFooterContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const { row, links, socials } = footerToRows((await request.json()) as FooterContent);
  try {
    await saveSingle(Table.Footer, row);
    await saveList(Table.FooterLinks, links);
    await saveList(Table.FooterSocials, socials);
    revalidatePath("/");
    return Response.json(await getFooterContent());
  } catch (error) {
    return adminError(error);
  }
}
