import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { getCurrentAdmin } from "@/server/session";

export default async function AdminLoginPage() {
  if (await getCurrentAdmin()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <LoginForm />
    </main>
  );
}
