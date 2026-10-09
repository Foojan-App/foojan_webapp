import { revalidatePath } from "next/cache";
import { getLegalContent, legalColumns } from "@/server/content/legal";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { upsertForAdmin } from "@/server/supabase";
import type { LegalContent } from "@/services/interface";
import { LegalSlug, Table } from "@/types/enums";

const slugs = Object.values(LegalSlug) as string[];

export async function GET() {
  return Response.json(await getLegalContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as LegalContent;
  const pages = (body.pages ?? []).filter((page) => slugs.includes(page.slug));
  if (pages.length !== slugs.length || pages.some((page) => !page.title?.trim() || !page.body?.trim())) {
    return Response.json({ message: "Each page needs a title and some text" }, { status: 400 });
  }
  try {
    await upsertForAdmin(Table.LegalPages, pages.map((page) => pick(page, legalColumns)), "slug");
    revalidatePath("/", "layout");
    return Response.json(await getLegalContent());
  } catch (error) {
    return adminError(error);
  }
}
