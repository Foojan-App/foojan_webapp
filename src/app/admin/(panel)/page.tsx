import PageTitle from "@/components/admin/PageTitle";
import SectionCards from "@/components/admin/SectionCards";
import { getCurrentAdmin } from "@/server/session";

export default async function AdminDashboard() {
  const admin = await getCurrentAdmin();

  return (
    <>
      <PageTitle
        title={`Welcome, ${admin?.full_name ?? "Admin"}`}
        description="Pick a section to change what visitors see on the website."
      />
      <SectionCards />
    </>
  );
}
