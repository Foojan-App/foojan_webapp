import type { MetadataRoute } from "next";
import { SITE_URL } from "@/server/config";

const PAGES = [
  { path: "", priority: 1 },
  { path: "/meet-dr-foojan-zeine", priority: 0.8 },
  { path: "/contact", priority: 0.6 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    priority,
  }));
}
