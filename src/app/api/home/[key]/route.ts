import { revalidatePath } from "next/cache";
import { getHomeSection, isHomeSection, pickKnown } from "@/server/content/home";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveHomeRow } from "@/server/supabase";

const unknownSection = () => Response.json({ message: "Unknown section" }, { status: 404 });

export async function GET(_request: Request, ctx: RouteContext<"/api/home/[key]">) {
  const { key } = await ctx.params;
  if (!isHomeSection(key)) return unknownSection();
  return Response.json(await getHomeSection(key));
}

export async function PUT(request: Request, ctx: RouteContext<"/api/home/[key]">) {
  if (!(await getCurrentAdmin())) return notLoggedIn();
  const { key } = await ctx.params;
  if (!isHomeSection(key)) return unknownSection();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") return Response.json({ message: "Nothing to save" }, { status: 400 });

  try {
    const content = pickKnown(key, body);
    await saveHomeRow(key, content);
    revalidatePath("/", "layout");
    return Response.json(content);
  } catch (error) {
    return adminError(error);
  }
}
