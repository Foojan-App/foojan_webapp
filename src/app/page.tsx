import AitSection from "@/components/AitSection";
import Books from "@/components/Books";
import Closing from "@/components/Closing";
import ContactBand from "@/components/ContactBand";
import Experience from "@/components/Experience";
import Extending from "@/components/Extending";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Media from "@/components/Media";
import MeetFoojan from "@/components/MeetFoojan";
import Pathways from "@/components/Pathways";
import ScrollTopButton from "@/components/ScrollTopButton";
import Speaking from "@/components/Speaking";
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_NAME, SITE_URL } from "@/server/config";
import { getPageContent } from "@/server/content";

export default async function Home() {
  const content = await getPageContent();
  const nav = content.header.menu.filter((item) => item.visible !== false);
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}${SITE_IMAGE}`,
    description: SITE_DESCRIPTION,
    sameAs: content.footer.socials.map((social) => social.url).filter((url) => url.startsWith("http")),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      <Header nav={nav} announcement={content.announcement} />
      <main>
        <Hero content={content.hero} />
        <MeetFoojan content={content.about} />
        <Pathways content={content.pathways} />
        <AitSection content={content.ait} />
        <Books content={content.books} />
        <Speaking content={content.speaking} />
        <Media content={content.media} />
        <Experience content={content.experience} />
        <Extending content={content.extending} />
        <Closing content={content.personalNote} about={content.about} />
        <ContactBand content={content.contactBand} />
      </main>
      <Footer content={content.footer} />
      <ScrollTopButton />
    </>
  );
}
