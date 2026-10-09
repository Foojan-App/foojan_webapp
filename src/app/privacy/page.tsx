import type { Metadata } from "next";
import LegalPageView from "@/components/LegalPageView";
import { getLegalPage } from "@/server/content/legal";
import { LegalSlug } from "@/types/enums";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage(LegalSlug.Privacy);
  return { title: page.title, alternates: { canonical: "/privacy" } };
}

export default async function PrivacyPage() {
  const page = await getLegalPage(LegalSlug.Privacy);
  return <LegalPageView page={page} />;
}
