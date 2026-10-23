import { getHomeSection } from "@/server/content/home";
import type { SitePageProps } from "@/types/components";
import { HomeSection } from "@/types/enums";
import AnnouncementBar from "./AnnouncementBar";
import Footer from "./Footer";
import Header from "./Header";
import ScrollTopButton from "./ScrollTopButton";

const toHomeLink = (href: string) => (href.startsWith("#") && href.length > 1 ? `/${href}` : href);

export default async function SitePage({ children }: SitePageProps) {
  const [header, footer] = await Promise.all([getHomeSection(HomeSection.Header), getHomeSection(HomeSection.Footer)]);

  const nav = header.menu.filter((item) => item.visible !== false).map((item) => ({
    ...item,
    href: toHomeLink(item.href),
    children: item.children?.map((link) => ({ ...link, href: toHomeLink(link.href) })),
  }));

  const footerContent = {
    ...footer,
    explore_links: footer.explore_links.map((link) => ({ ...link, href: toHomeLink(link.href) })),
    connect_link: { ...footer.connect_link, href: toHomeLink(footer.connect_link.href) },
  };

  return (
    <>
      <AnnouncementBar content={{ ...header.announcement, link_href: toHomeLink(header.announcement.link_href) }} />
      <Header nav={nav} />
      <main>{children}</main>
      <Footer content={footerContent} />
      <ScrollTopButton />
    </>
  );
}
