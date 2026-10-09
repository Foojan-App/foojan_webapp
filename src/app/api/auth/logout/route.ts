import { signOut } from "@/server/supabase";

export async function POST() {
  await signOut().catch(() => undefined);
  return Response.json({ message: "Logged out" });
}
