import { revalidatePath } from "next/cache";
import { getPersonalNoteContent, personalNoteColumns } from "@/server/content/personalNote";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveSingle } from "@/server/supabase";
import type { PersonalNoteContent } from "@/services/interface";
import { Table } from "@/types/enums";

export async function GET() {
  return Response.json(await getPersonalNoteContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as PersonalNoteContent;
  try {
    const row = await saveSingle<PersonalNoteContent>(Table.PersonalNote, pick(body, personalNoteColumns));
    revalidatePath("/");
    return Response.json(pick(row, personalNoteColumns));
  } catch (error) {
    return adminError(error);
  }
}
