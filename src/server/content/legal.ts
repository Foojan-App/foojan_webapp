import type { LegalContent, LegalPage } from "@/services/interface";
import { LegalSlug, Table } from "@/types/enums";
import { getRow } from "../supabase";
import { pick } from "./pick";

export const defaultLegal: LegalContent = {
  pages: [
    {
      slug: LegalSlug.Privacy,
      title: "Privacy Policy",
      body: "## This page is being prepared\nDr. Foojan Zeine’s Privacy Policy will be published here once the final text has been approved.\n\nIf you have a question about how your information is handled, please reach out through the contact page.",
    },
    {
      slug: LegalSlug.Terms,
      title: "Terms of Use",
      body: "## This page is being prepared\nThe Terms of Use for this website will be published here once the final text has been approved.\n\nIf you have a question in the meantime, please reach out through the contact page.",
    },
  ],
};

export const legalColumns: (keyof LegalPage)[] = ["slug", "title", "body"];

export const getLegalPage = async (slug: LegalSlug): Promise<LegalPage> => {
  const fallback = defaultLegal.pages.find((page) => page.slug === slug) ?? defaultLegal.pages[0];
  const row = await getRow<LegalPage>(Table.LegalPages, "slug", slug).catch(() => null);

  if (!row) {
    return fallback;
  }

  return { ...fallback, ...pick(row, [...legalColumns, "updated_at"]) };
};

export const getLegalContent = async (): Promise<LegalContent> => {
  const pages = await Promise.all(defaultLegal.pages.map((page) => getLegalPage(page.slug)));
  return { pages };
};
