import type { HeaderContent, MenuItem } from "@/services/interface";
import { Table } from "@/types/enums";
import { getList } from "../supabase";
import { pick } from "./pick";

export const defaultHeader: HeaderContent = {
  menu: [
    { label: "About", href: "#about" },
    { label: "AIT", href: "#ait" },
    { label: "Books & Publications", href: "#books" },
    { label: "Media", href: "#media" },
    { label: "Speaking", href: "#speaking" },
    { label: "Experience", href: "#experience" },
    { label: "Psychotherapy", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
};

export const menuColumns: (keyof MenuItem)[] = ["id", "label", "href", "visible"];

export const getHeaderContent = async (): Promise<HeaderContent> => {
  const menu = await getList<MenuItem>(Table.MenuItems).catch(() => []);

  if (menu.length === 0) {
    return defaultHeader;
  }

  return { menu: menu.map((item) => pick(item, menuColumns) as MenuItem) };
};
