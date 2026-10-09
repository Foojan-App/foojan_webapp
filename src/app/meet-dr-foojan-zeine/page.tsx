import type { Metadata } from "next";
import AboutPageView from "@/components/AboutPageView";
import { getAboutPageContent } from "@/server/content/aboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dr. Foojan Zeine, Psy.D., LMFT — psychotherapist, author, educator, international speaker and originator of Awareness Integration Theory (AIT).",
  alternates: { canonical: "/meet-dr-foojan-zeine" },
};

export default async function MeetDrFoojanPage() {
  const content = await getAboutPageContent();
  return <AboutPageView content={content} />;
}
