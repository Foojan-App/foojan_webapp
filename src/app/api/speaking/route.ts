import { revalidatePath } from "next/cache";
import { pick } from "@/server/content/pick";
import { getSpeakingContent, speakingColumns, speakingFormatColumns, speakingTopicColumns } from "@/server/content/speaking";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveList, saveSingle } from "@/server/supabase";
import type { SpeakingContent, SpeakingFormat, SpeakingTopic } from "@/services/interface";
import { Table } from "@/types/enums";

export async function GET() {
  return Response.json(await getSpeakingContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as SpeakingContent;
  try {
    await saveSingle<SpeakingContent>(Table.Speaking, pick(body, speakingColumns));
    await saveList(Table.SpeakingFormats, body.formats.map((item) => pick(item, speakingFormatColumns) as SpeakingFormat));
    await saveList(Table.SpeakingTopics, body.topics.map((item) => pick(item, speakingTopicColumns) as SpeakingTopic));
    revalidatePath("/");
    return Response.json(await getSpeakingContent());
  } catch (error) {
    return adminError(error);
  }
}
