import type { Book, BooksContent } from "@/services/interface";
import { Table } from "@/types/enums";
import { getList, getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultBooks: BooksContent = {
  eyebrow: "Author & researcher",
  heading: "Ideas developed in|print,\nresearch *&*|*practice.*",
  paragraph: "From personal transformation and parenting to clinical methodology and leadership.",
  footer_text: "**7 books** and **25 peer-reviewed articles** across psychology, leadership and personal development.",
  button_label: "All books & publications",
  button_href: "#",
  books: [
    {
      category: "Leadership",
      title: "Awakened Leadership",
      description: "Uniting organization development and Awareness Integration Theory.",
      cover_url: "/images/book-awakened-leadership.png",
      link: "https://www.amazon.com/Awakened-Leadership-Organization-Development-Integration-ebook/dp/B0DG8M4GHT/",
    },
    {
      category: "Clinical",
      title: "Awareness Integration Therapy",
      description: "A comprehensive presentation of the AIT therapeutic approach.",
      cover_url: "/images/book-ait-therapy.png",
      link: "https://www.amazon.com/Awareness-Integration-Therapy-Foojan-Zeine/dp/1527568318/",
    },
    {
      category: "Personal Growth",
      title: "Life Reset",
      description: "The Awareness Integration path to creating the life you want.",
      cover_url: "/images/book-life-reset.png",
      link: "https://www.amazon.com/Life-Reset-Awareness-Integration-Create/dp/1442276096",
    },
    {
      category: "Parenting",
      title: "Intentional Parenting",
      description: "A practical guide informed by Awareness Integration Theory.",
      cover_url: "/images/book-intentional-parenting.png",
      link: "https://www.cambridgescholars.com/product/978-1-5275-8375-7/",
    },
  ],
};

export const booksSectionColumns: (keyof BooksContent)[] = [
  "eyebrow",
  "heading",
  "paragraph",
  "footer_text",
  "button_label",
  "button_href",
];

export const bookColumns: (keyof Book)[] = ["id", "category", "title", "description", "cover_url", "link"];

export const getBooksContent = async (): Promise<BooksContent> => {
  const [row, books] = await Promise.all([
    getSingle<BooksContent>(Table.BooksSection).catch(() => null),
    getList<Book>(Table.Books).catch(() => []),
  ]);

  const content: BooksContent = { ...defaultBooks };

  if (row) {
    Object.assign(content, pick(row, booksSectionColumns));
  }

  if (books.length > 0) {
    content.books = books.map((book) => pick(book, bookColumns) as Book);
  }

  return content;
};
