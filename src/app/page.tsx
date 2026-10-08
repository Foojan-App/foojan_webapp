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
import Speaking from "@/components/Speaking";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MeetFoojan />
        <Pathways />
        <AitSection />
        <Books />
        <Speaking />
        <Media />
        <Experience />
        <Extending />
        <Closing />
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
