import { getAnnouncementContent } from "@/server/content/announcement";
import { getFooterContent } from "@/server/content/footer";
import { getHeaderContent } from "@/server/content/header";
import type { SitePageProps } from "@/types/components";
import Footer from "./Footer";
import Header from "./Header";
import ScrollTopButton from "./ScrollTopButton";

const toHomeLink = (href: string) => (href.startsWith("#") && href.length > 1 ? `/${href}` : href);

export default async function SitePage({ children }: SitePageProps) {
  const [header, announcement, footer] = await Promise.all([
    getHeaderContent(),
    getAnnouncementContent(),
    getFooterContent(),
  ]);

  const nav = header.menu
    .filter((item) => item.visible !== false)
    .map((item) => ({ ...item, href: toHomeLink(item.href) }));

  const footerContent = {
    ...footer,
    columns: footer.columns.map((column) => ({
      ...column,
      links: column.links.map((link) => ({ ...link, href: toHomeLink(link.href) })),
    })),
  };

  return (
    <>
      <Header nav={nav} announcement={{ ...announcement, link_href: toHomeLink(announcement.link_href) }} />
      <main>{children}</main>
      <Footer content={footerContent} />
      <ScrollTopButton />
    </>
  );
}
