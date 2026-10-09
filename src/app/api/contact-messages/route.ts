import { adminError, getCurrentAdmin, notLoggedIn } from "@/server/session";
import { deleteForAdmin, listForAdmin, updateForAdmin } from "@/server/supabase";
import type { ContactMessage, ContactMessageUpdate } from "@/services/interface";
import { Table } from "@/types/enums";

const listMessages = () => listForAdmin<ContactMessage>(Table.ContactMessages, "created_at");

export async function GET() {
  if (!(await getCurrentAdmin())) return notLoggedIn();
  try {
    return Response.json(await listMessages());
  } catch (error) {
    return adminError(error);
  }
}

export async function PATCH(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();
  const { id, is_read } = (await request.json()) as ContactMessageUpdate;
  if (typeof id !== "number") return Response.json({ message: "Message not found" }, { status: 400 });
  try {
    await updateForAdmin(Table.ContactMessages, id, { is_read: Boolean(is_read) });
    return Response.json(await listMessages());
  } catch (error) {
    return adminError(error);
  }
}

export async function DELETE(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();
  const { id } = (await request.json()) as Pick<ContactMessage, "id">;
  if (typeof id !== "number") return Response.json({ message: "Message not found" }, { status: 400 });
  try {
    await deleteForAdmin(Table.ContactMessages, id);
    return Response.json(await listMessages());
  } catch (error) {
    return adminError(error);
  }
}
