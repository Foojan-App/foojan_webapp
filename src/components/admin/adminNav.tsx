import {
  ApartmentOutlined,
  AppstoreOutlined,
  AudioOutlined,
  BulbOutlined,
  ContactsOutlined,
  BookOutlined,
  EditOutlined,
  FileProtectOutlined,
  IdcardOutlined,
  InboxOutlined,
  GlobalOutlined,
  LayoutOutlined,
  MailOutlined,
  MenuOutlined,
  NotificationOutlined,
  PictureOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { AdminNavItem } from "@/types/components";

export const dashboardNav: AdminNavItem = {
  href: "/admin",
  label: "Dashboard",
  description: "Overview of everything you can edit.",
  icon: <AppstoreOutlined />,
  ready: true,
};

export const sectionNav: AdminNavItem[] = [
  { href: "/admin/header", label: "Header menu", description: "Navigation links at the top.", icon: <MenuOutlined />, ready: true },
  { href: "/admin/announcement", label: "Announcement bar", description: "The message above the header.", icon: <NotificationOutlined />, ready: true },
  { href: "/admin/hero", label: "Hero", description: "Main heading, photo and stats.", icon: <PictureOutlined />, ready: true },
  { href: "/admin/pathways", label: "Pathways", description: "“One body of work” and its 5 cards.", icon: <ApartmentOutlined />, ready: true },
  { href: "/admin/ait", label: "AIT", description: "Awareness Integration Theory, pillars and tabs.", icon: <BulbOutlined />, ready: true },
  { href: "/admin/about", label: "About", description: "Meet Dr. Foojan and the quote.", icon: <UserOutlined />, ready: true },
  { href: "/admin/books", label: "Books", description: "Books and publications.", icon: <BookOutlined />, ready: true },
  { href: "/admin/media", label: "Media", description: "Featured show and media cards.", icon: <PlayCircleOutlined />, ready: true },
  { href: "/admin/speaking", label: "Speaking", description: "Formats and signature topics.", icon: <AudioOutlined />, ready: true },
  { href: "/admin/experience", label: "Experience", description: "Timeline and tags.", icon: <TrophyOutlined />, ready: true },
  { href: "/admin/extending", label: "Extending the work", description: "IAII, Foojan App and Mira cards.", icon: <GlobalOutlined />, ready: true },
  { href: "/admin/personal-note", label: "Personal note", description: "The short note near the end of the page.", icon: <EditOutlined />, ready: true },
  { href: "/admin/contact-band", label: "Contact band", description: "The purple box with the contact buttons.", icon: <MailOutlined />, ready: true },
  { href: "/admin/footer", label: "Footer", description: "Links, socials and address.", icon: <LayoutOutlined />, ready: true },
];

export const otherNav: AdminNavItem[] = [
  { href: "/admin/about-page", label: "About page", description: "Full biography page (/meet-dr-foojan-zeine).", icon: <IdcardOutlined />, ready: true },
  { href: "/admin/contact-page", label: "Contact page", description: "Intro text and office details.", icon: <ContactsOutlined />, ready: true },
  { href: "/admin/messages", label: "Messages", description: "Inquiries from the contact page.", icon: <InboxOutlined />, ready: true },
  { href: "/admin/legal", label: "Legal pages", description: "Privacy Policy and Terms of Use.", icon: <FileProtectOutlined />, ready: true },
];
