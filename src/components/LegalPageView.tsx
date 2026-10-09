import type { LegalPageViewProps } from "@/types/components";
import RichText from "./RichText";
import SitePage from "./SitePage";
import { Container, Eyebrow } from "./ui";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default function LegalPageView({ page }: LegalPageViewProps) {
  return (
    <SitePage>
      <section className="bg-white py-16 md:py-24 lg:py-28">
        <Container className="max-w-200!">
          <div className="flex flex-col gap-4 border-b border-[#E8E1D5] pb-8">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="font-serif text-[36px] leading-[1.15] font-medium text-plum-950 md:text-[44px] lg:text-[52px]">
              {page.title}
            </h1>
            {page.updated_at && <p className="text-[14px] text-[#687080]">Last updated {formatDate(page.updated_at)}</p>}
          </div>
          <div className="pt-6">
            <RichText body={page.body} />
          </div>
        </Container>
      </section>
    </SitePage>
  );
}
