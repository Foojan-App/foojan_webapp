import { revalidatePath } from "next/cache";
import { extendingCardColumns, extendingSectionColumns, getExtendingContent } from "@/server/content/extending";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveList, saveSingle } from "@/server/supabase";
import type { ExtendingCard, ExtendingContent } from "@/services/interface";
import { Table } from "@/types/enums";

const CARD_COUNT = 3;
const MAX_LINKS = 2;

export async function GET() {
  return Response.json(await getExtendingContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as ExtendingContent;
  if (body.cards?.length !== CARD_COUNT) {
    return Response.json({ message: `There must be exactly ${CARD_COUNT} cards` }, { status: 400 });
  }
  if (body.cards.some((card) => !card.links?.length || card.links.length > MAX_LINKS)) {
    return Response.json({ message: `Each card needs 1 or ${MAX_LINKS} links` }, { status: 400 });
  }
  try {
    await saveSingle<ExtendingContent>(Table.ExtendingSection, pick(body, extendingSectionColumns));
    await saveList(
      Table.ExtendingCards,
      body.cards.map((card) => ({
        ...(pick(card, extendingCardColumns) as ExtendingCard),
        icon_text: card.icon_text ?? "",
        icon_url: card.icon_url ?? "",
        links: card.links.map(({ label, href, external }) => ({ label, href, external: Boolean(external) })),
      })),
    );
    revalidatePath("/", "layout");
    return Response.json(await getExtendingContent());
  } catch (error) {
    return adminError(error);
  }
}
