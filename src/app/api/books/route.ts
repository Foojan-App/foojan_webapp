import { revalidatePath } from "next/cache";
import { bookColumns, booksSectionColumns, getBooksContent } from "@/server/content/books";
import { pick } from "@/server/content/pick";
import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { saveList, saveSingle } from "@/server/supabase";
import type { Book, BooksContent } from "@/services/interface";
import { Table } from "@/types/enums";

export async function GET() {
  return Response.json(await getBooksContent());
}

export async function PUT(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const body = (await request.json()) as BooksContent;
  try {
    await saveSingle<BooksContent>(Table.BooksSection, pick(body, booksSectionColumns));
    await saveList(Table.Books, body.books.map((book) => pick(book, bookColumns) as Book));
    revalidatePath("/");
    return Response.json(await getBooksContent());
  } catch (error) {
    return adminError(error);
  }
}
