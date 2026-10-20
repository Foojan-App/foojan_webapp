import { AppstoreOutlined, FileProtectOutlined, IdcardOutlined, InboxOutlined } from "@ant-design/icons";
import type { AdminNavItem } from "@/types/components";
import { homeSections } from "./homeSections";

export const dashboardNav: AdminNavItem = {
  href: "/admin",
  label: "Dashboard",
  description: "Overview of everything you can edit.",
  icon: <AppstoreOutlined />,
  ready: true,
};

export const sectionNav: AdminNavItem[] = homeSections.map((section) => ({
  href: `/admin/home/${section.key}`,
  label: section.label,
  description: section.description,
  icon: section.icon,
  ready: true,
}));

export const otherNav: AdminNavItem[] = [
  { href: "/admin/about-page", label: "About page", description: "Full biography page (/meet-dr-foojan-zeine).", icon: <IdcardOutlined />, ready: true },
  { href: "/admin/messages", label: "Messages", description: "Inquiries from the Invite Dr. Foojan form.", icon: <InboxOutlined />, ready: true },
  { href: "/admin/legal", label: "Legal pages", description: "Privacy Policy and Terms of Use.", icon: <FileProtectOutlined />, ready: true },
];
