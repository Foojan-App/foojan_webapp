import type { ContactPageContent } from "@/services/interface";
import { Table } from "@/types/enums";
import { getSingle } from "../supabase";
import { pick } from "./pick";

export const defaultContactPage: ContactPageContent = {
  eyebrow: "Get in touch",
  heading: "Speaking, media, education *& collaboration.*",
  paragraph:
    "Use this form to invite Dr. Foojan to speak, request an interview, or explore education and collaboration opportunities. Her office will get back to you.",
  office_title: "Our office",
  office_area: "San Clemente, CA",
  address: "300 S. El Camino Real, Suite 216, San Clemente, CA 92672",
  map_url: "https://goo.gl/maps/bixyQgFJaG4uGSwf6",
  email: "foojanzeine@gmail.com",
  phone: "+1 (818) 648 2140",
};

export const contactPageColumns: (keyof ContactPageContent)[] = [
  "eyebrow",
  "heading",
  "paragraph",
  "office_title",
  "office_area",
  "address",
  "map_url",
  "email",
  "phone",
];

export const getContactPageContent = async (): Promise<ContactPageContent> => {
  const row = await getSingle<ContactPageContent>(Table.ContactPage).catch(() => null);

  if (!row) {
    return defaultContactPage;
  }

  return { ...defaultContactPage, ...pick(row, contactPageColumns) };
};
