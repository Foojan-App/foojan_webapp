import type { Metadata } from "next";
import AccentText from "@/components/AccentText";
import ContactForm from "@/components/ContactForm";
import ContactOffice from "@/components/ContactOffice";
import SitePage from "@/components/SitePage";
import { Container, Eyebrow } from "@/components/ui";
import { getContactPageContent } from "@/server/content/contactPage";
import { getFooterContent } from "@/server/content/footer";
import { getPathwaysContent } from "@/server/content/pathways";

export const metadata: Metadata = {
  title: "Contact",
  description: "Invite Dr. Foojan Zeine to speak, request an interview, or explore education and collaboration opportunities.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const [content, footer, pathways] = await Promise.all([getContactPageContent(), getFooterContent(), getPathwaysContent()]);
  const therapyCard = pathways.cards.find((card) => card.link_label);
  const therapyHref = therapyCard?.href.startsWith("http") ? therapyCard.href : "";

  return (
    <SitePage>
      <section className="bg-[#F7F2FB] py-16 md:py-24 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,460px)_minmax(0,640px)] lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-8 lg:pt-4">
            <div className="flex flex-col gap-5">
              <Eyebrow>{content.eyebrow}</Eyebrow>
              <h1 className="font-serif text-[32px] leading-[1.15] font-medium text-plum-950 max-[389px]:text-[28px] md:text-[44px] lg:text-[52px]">
                <AccentText text={content.heading} />
              </h1>
              <p className="text-[15px] leading-[1.6] text-[#4A5163] md:text-[18px] md:leading-7.5">{content.paragraph}</p>
            </div>
            <ContactOffice content={content} socials={footer.socials} />
          </div>
          <ContactForm therapyHref={therapyHref} />
        </Container>
      </section>
    </SitePage>
  );
}
