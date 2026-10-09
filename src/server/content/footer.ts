import type { FooterContent, FooterLinkRow, FooterRow, FooterSocial } from "@/services/interface";
import { Table } from "@/types/enums";
import { getList, getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultFooter: FooterContent = {
  tagline: "Psychotherapist · Author · Educator ·\nInternational Speaker · Originator of Awareness\nIntegration Theory",
  copyright: "© 2026 Dr. Foojan Zeine, Psy.D., LMFT. All rights reserved.",
  address: "300 S. El Camino Real, Suite 216, San Clemente, CA 92672",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "About", href: "#about" },
        { label: "AIT", href: "#ait" },
        { label: "Books & Publications", href: "#books" },
        { label: "Experience", href: "#experience" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Media & Press", href: "#media" },
        { label: "Speaking", href: "#speaking" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "https://foojanzeineblog.wordpress.com/" },
      ],
    },
    {
      title: "Her Work",
      links: [
        { label: "IAII", href: "https://awarenessintegration.com/" },
        { label: "Foojan App", href: "https://foojan.com/" },
        { label: "Mira", href: "#" },
        { label: "Psychotherapy", href: "#" },
      ],
    },
  ],
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/drfoojanzeine", icon_url: "/images/social/linkedin.svg" },
    { name: "Instagram", url: "https://www.instagram.com/dr.foojanzeine/", icon_url: "/images/social/instagram.svg" },
    { name: "YouTube", url: "https://www.youtube.com/@DrFoojan", icon_url: "/images/social/youtube.svg" },
    { name: "Facebook", url: "https://www.facebook.com/DrFoojanZeine/", icon_url: "/images/social/facebook.svg" },
    { name: "X", url: "https://x.com/DrZeine", icon_url: "/images/social/x.svg" },
  ],
};

export const footerLinkColumns: (keyof FooterLinkRow)[] = ["id", "column_no", "label", "href"];

export const footerSocialColumns: (keyof FooterSocial)[] = ["id", "name", "url", "icon_url"];

export const footerToRows = (content: FooterContent) => {
  const row: FooterRow = {
    tagline: content.tagline,
    copyright: content.copyright,
    address: content.address,
    column_1_title: content.columns[0]?.title ?? "",
    column_2_title: content.columns[1]?.title ?? "",
    column_3_title: content.columns[2]?.title ?? "",
  };

  const links = content.columns.flatMap((column, index) =>
    column.links.map((link) => pick({ ...link, column_no: index + 1 }, footerLinkColumns) as FooterLinkRow),
  );

  const socials = content.socials.map((social) => pick(social, footerSocialColumns) as FooterSocial);

  return { row, links, socials };
};

export const getFooterContent = async (): Promise<FooterContent> => {
  const [row, links, socials] = await Promise.all([
    getSingle<FooterRow>(Table.Footer).catch(() => null),
    getList<FooterLinkRow>(Table.FooterLinks).catch(() => []),
    getList<FooterSocial>(Table.FooterSocials).catch(() => []),
  ]);

  if (!row) {
    return defaultFooter;
  }

  const titles = [row.column_1_title, row.column_2_title, row.column_3_title];

  const columns = titles.map((title, index) => {
    const columnLinks = links.filter((link) => link.column_no === index + 1);
    return {
      title,
      links: columnLinks.map((link) => ({ id: link.id, label: link.label, href: link.href })),
    };
  });

  return {
    tagline: row.tagline,
    copyright: row.copyright,
    address: row.address,
    columns,
    socials: socials.length > 0 ? socials.map((social) => pick(social, footerSocialColumns) as FooterSocial) : defaultFooter.socials,
  };
};
