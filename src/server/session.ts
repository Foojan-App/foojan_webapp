import { UserRole } from "@/types/enums";
import { getProfile } from "./supabase";

export const getCurrentAdmin = async () => {
  const profile = await getProfile().catch(() => null);
  return profile?.role === UserRole.Admin ? profile : null;
};

export const notLoggedIn = () => Response.json({ message: "Please log in again" }, { status: 401 });

export const adminError = (error: unknown) => {
  const code = (error as { code?: string }).code;
  if (code === "42501" || code === "PGRST301") {
    return Response.json({ message: "You are not allowed to save this" }, { status: 403 });
  }
  return Response.json({ message: "Could not save. Please try again." }, { status: 500 });
};
