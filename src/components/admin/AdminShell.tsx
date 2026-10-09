"use client";

import { ExportOutlined, MenuOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer, Layout, Menu, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { AdminLogoProps, AdminNavItem, AdminShellProps } from "@/types/components";
import { dashboardNav, otherNav, sectionNav } from "./adminNav";
import LogoutButton from "./LogoutButton";

const { Sider, Header, Content } = Layout;

const toMenuItem = ({ href, label, icon, ready }: AdminNavItem) => ({
  key: href,
  icon,
  disabled: !ready,
  label: ready ? (
    <Link href={href}>{label}</Link>
  ) : (
    <span className="flex items-center justify-between">
      {label}
      <Tag className="m-0">Soon</Tag>
    </span>
  ),
});

const menuItems = [
  toMenuItem(dashboardNav),
  { type: "group" as const, label: "Website sections", children: sectionNav.map(toMenuItem) },
  { type: "group" as const, label: "Inbox & pages", children: otherNav.map(toMenuItem) },
];

const AdminLogo = ({ className }: AdminLogoProps) => (
  <Link href="/admin" className="shrink-0">
    <Image src="/images/logo.png" alt="Dr. Foojan Zeine" width={106} height={64} priority className={className} />
  </Link>
);

export default function AdminShell({ admin, children }: AdminShellProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const name = admin.full_name ?? admin.email;

  return (
    <Layout className="min-h-screen">
      <Sider theme="light" width={248} className="hidden border-r border-[#ECE6F0] lg:block">
        <div className="flex h-18 items-center justify-center border-b border-[#ECE6F0] px-6">
          <AdminLogo className="h-14 w-auto" />
        </div>
        <Menu mode="inline" selectedKeys={[pathname]} items={menuItems} className="border-e-0! py-3" />
      </Sider>

      <Drawer
        placement="left"
        size={264}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={<AdminLogo className="h-11 w-auto" />}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={() => setDrawerOpen(false)}
          className="border-e-0! py-3"
        />
      </Drawer>

      <Layout>
        <Header className="flex h-18! items-center justify-between gap-3 border-b border-[#ECE6F0] bg-white! px-4! leading-normal! sm:px-6!">
          <div className="flex items-center gap-3 lg:invisible">
            <Button type="text" icon={<MenuOutlined />} onClick={() => setDrawerOpen(true)} aria-label="Open menu" />
            <AdminLogo className="h-11 w-auto" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button href="/" target="_blank" icon={<ExportOutlined />} aria-label="View website">
              <span className="hidden sm:inline">View website</span>
            </Button>
            <div className="hidden items-center gap-2 md:flex">
              <Avatar className="bg-purple!">{name.charAt(0).toUpperCase()}</Avatar>
              <span className="text-[14px]">{name}</span>
            </div>
            <LogoutButton />
          </div>
        </Header>
        <Content className="bg-[#F7F2FB] px-4 py-6 sm:px-10 sm:py-8">
          <div className="mx-auto max-w-5xl">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
