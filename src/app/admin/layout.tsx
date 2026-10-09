import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import AdminProviders from "@/components/admin/AdminProviders";

export const metadata: Metadata = {
  title: "Admin — Dr. Foojan Zeine",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <AntdRegistry>
      <AdminProviders>
        <div className="min-h-screen bg-[#F7F2FB] text-plum-950">{children}</div>
      </AdminProviders>
    </AntdRegistry>
  );
}
