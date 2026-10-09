import AnnouncementEditor from "@/components/admin/AnnouncementEditor";
import { getAnnouncementContent } from "@/server/content/announcement";

export default async function AnnouncementEditorPage() {
  const announcement = await getAnnouncementContent();
  return <AnnouncementEditor initial={announcement} />;
}
