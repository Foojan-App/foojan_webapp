import type { Metadata } from "next";
import LegalPageView from "@/components/LegalPageView";
import { getLegalPage } from "@/server/content/legal";
import { LegalSlug } from "@/types/enums";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage(LegalSlug.Terms);
  return { title: page.title, alternates: { canonical: "/terms" } };
}

export default async function TermsPage() {
  const page = await getLegalPage(LegalSlug.Terms);
  return <LegalPageView page={page} />;
}
