import Footer from "@/components/Footer";
import Header from "@/components/Header";
import About from "@/components/home/About";
import Ait from "@/components/home/Ait";
import Hero from "@/components/home/Hero";
import InviteModal from "@/components/home/InviteModal";
import Media from "@/components/home/Media";
import Mira from "@/components/home/Mira";
import Publications from "@/components/home/Publications";
import Quote from "@/components/home/Quote";
import RevealObserver from "@/components/home/RevealObserver";
import Speaking from "@/components/home/Speaking";
import Ticker from "@/components/home/Ticker";
import ScrollTopButton from "@/components/ScrollTopButton";
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_NAME, SITE_URL } from "@/server/config";
import { getHomeContent } from "@/server/content/home";

export default async function Home() {
  const content = await getHomeContent();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}${SITE_IMAGE}`,
    description: SITE_DESCRIPTION,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      <Header nav={content.header.menu.filter((item) => item.visible !== false)} />
      <main>
        <Hero content={content.hero} />
        <Ticker content={content.ticker} />
        <About content={content.about} />
        <Ait content={content.ait} />
        <Speaking content={content.speaking} />
        <Publications content={content.publications} />
        <Media content={content.media} />
        <Quote content={content.quote} />
        <Mira content={content.mira} />
      </main>
      <Footer content={content.footer} />
      <InviteModal content={content.invite} />
      <RevealObserver />
      <ScrollTopButton />
    </>
  );
}
