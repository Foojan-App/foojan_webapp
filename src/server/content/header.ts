import type { HeaderContent, MenuItem } from "@/services/interface";
import { Table } from "@/types/enums";
import { getList } from "../supabase";
import { pick } from "./pick";

export const defaultHeader: HeaderContent = {
  menu: [
    { label: "About", href: "#about", icon_url: "/images/menu/about.svg" },
    { label: "AIT", href: "#ait", icon_url: "/images/menu/ait.svg" },
    { label: "Books & Publications", href: "#books", icon_url: "/images/menu/books.svg" },
    { label: "Media", href: "#media", icon_url: "/images/menu/media.svg" },
    { label: "Speaking", href: "#speaking", icon_url: "/images/menu/speaking.svg" },
    { label: "Experience", href: "#experience", icon_url: "/images/menu/experience.svg" },
    { label: "Psychotherapy", href: "#", icon_url: "/images/menu/psychotherapy.svg" },
  ],
};

export const menuColumns: (keyof MenuItem)[] = ["id", "label", "href", "icon_url", "visible"];

export const getHeaderContent = async (): Promise<HeaderContent> => {
  const menu = await getList<MenuItem>(Table.MenuItems).catch(() => []);

  if (menu.length === 0) {
    return defaultHeader;
  }

  return {
    menu: menu.map((item) => {
      const row = pick(item, menuColumns) as MenuItem;
      if (row.icon_url !== undefined) return row;
      const match = defaultHeader.menu.find((d) => d.href === row.href || d.label === row.label);
      return { ...row, icon_url: match?.icon_url ?? "" };
    }),
  };
};
