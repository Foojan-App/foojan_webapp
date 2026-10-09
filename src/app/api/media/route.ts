import { revalidatePath } from "next/cache";
import { getMediaContent, mediaItemColumns, mediaSectionColumns } from "@/server/content/media";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveList, saveSingle } from "@/server/supabase";
import type { MediaContent, MediaItem } from "@/services/interface";
import { Table } from "@/types/enums";

export async function GET() {
  return Response.json(await getMediaContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as MediaContent;
  try {
    await saveSingle<MediaContent>(Table.MediaSection, pick(body, mediaSectionColumns));
    await saveList(Table.MediaItems, body.items.map((item) => pick(item, mediaItemColumns) as MediaItem));
    revalidatePath("/");
    return Response.json(await getMediaContent());
  } catch (error) {
    return adminError(error);
  }
}
