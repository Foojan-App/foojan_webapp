import { revalidatePath } from "next/cache";
import { contactBandColumns, getContactBandContent } from "@/server/content/contactBand";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveSingle } from "@/server/supabase";
import type { ContactBandContent } from "@/services/interface";
import { Table } from "@/types/enums";

export async function GET() {
  return Response.json(await getContactBandContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as ContactBandContent;
  try {
    const row = await saveSingle<ContactBandContent>(Table.ContactBand, pick(body, contactBandColumns));
    revalidatePath("/");
    return Response.json(pick(row, contactBandColumns));
  } catch (error) {
    return adminError(error);
  }
}
