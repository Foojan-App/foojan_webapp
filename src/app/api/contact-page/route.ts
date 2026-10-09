import { revalidatePath } from "next/cache";
import { contactPageColumns, getContactPageContent } from "@/server/content/contactPage";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveSingle } from "@/server/supabase";
import type { ContactPageContent } from "@/services/interface";
import { Table } from "@/types/enums";

export async function GET() {
  return Response.json(await getContactPageContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as ContactPageContent;
  try {
    await saveSingle<ContactPageContent>(Table.ContactPage, pick(body, contactPageColumns));
    revalidatePath("/contact");
    return Response.json(await getContactPageContent());
  } catch (error) {
    return adminError(error);
  }
}
