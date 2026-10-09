import BooksEditor from "@/components/admin/BooksEditor";
import { getBooksContent } from "@/server/content/books";

export default async function BooksEditorPage() {
  const books = await getBooksContent();
  return <BooksEditor initial={books} />;
}
