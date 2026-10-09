import MessagesInbox from "@/components/admin/MessagesInbox";
import { listForAdmin } from "@/server/supabase";
import type { ContactMessage } from "@/services/interface";
import { Table } from "@/types/enums";

export default async function MessagesPage() {
  const messages = await listForAdmin<ContactMessage>(Table.ContactMessages, "created_at").catch(() => []);
  return <MessagesInbox initial={messages} />;
}
