import { getCurrentAdmin, notLoggedIn } from "@/server/session";
import { uploadImage } from "@/server/supabase";

const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await getCurrentAdmin())) return notLoggedIn();

  const file = (await request.formData()).get("file");
  if (!(file instanceof File)) return Response.json({ message: "No image was sent" }, { status: 400 });
  if (!file.type.startsWith("image/")) return Response.json({ message: "Please choose an image file" }, { status: 400 });
  if (file.size > MAX_SIZE) return Response.json({ message: "Image must be smaller than 5 MB" }, { status: 400 });

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  try {
    const url = await uploadImage(`uploads/${Date.now()}-${safeName}`, file);
    return Response.json({ url });
  } catch {
    return Response.json({ message: "Could not upload the image" }, { status: 500 });
  }
}
