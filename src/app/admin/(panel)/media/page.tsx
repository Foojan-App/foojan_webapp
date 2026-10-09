import MediaEditor from "@/components/admin/MediaEditor";
import { getMediaContent } from "@/server/content/media";

export default async function MediaEditorPage() {
  const media = await getMediaContent();
  return <MediaEditor initial={media} />;
}
