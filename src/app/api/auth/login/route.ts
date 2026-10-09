import { signIn, signOut } from "@/server/supabase";
import type { LoginPayload } from "@/services/interface";
import { UserRole } from "@/types/enums";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as LoginPayload;
  if (!email || !password) {
    return Response.json({ message: "Email and password are required" }, { status: 400 });
  }

  let profile;
  try {
    profile = await signIn(email, password);
  } catch {
    return Response.json({ message: "Wrong email or password" }, { status: 401 });
  }

  if (profile?.role !== UserRole.Admin) {
    await signOut().catch(() => undefined);
    return Response.json({ message: "You are not allowed to use the admin portal" }, { status: 403 });
  }

  return Response.json(profile);
}
