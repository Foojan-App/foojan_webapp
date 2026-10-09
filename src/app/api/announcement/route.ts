import { revalidatePath } from "next/cache";
import { announcementColumns, getAnnouncementContent } from "@/server/content/announcement";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveSingle } from "@/server/supabase";
import type { AnnouncementContent } from "@/services/interface";
import { Table } from "@/types/enums";

export async function GET() {
  return Response.json(await getAnnouncementContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as AnnouncementContent;
  try {
    const row = await saveSingle<AnnouncementContent>(Table.Announcement, pick(body, announcementColumns));
    revalidatePath("/", "layout");
    return Response.json(pick(row, announcementColumns));
  } catch (error) {
    return adminError(error);
  }
}
