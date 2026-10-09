import { insertPublic } from "@/server/supabase";
import type { ContactPayload } from "@/services/interface";
import { InquiryType, Table } from "@/types/enums";

const MIN_FILL_TIME = 3000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d\s().-]{0,40}$/;
const inquiryTypes = Object.values(InquiryType) as string[];

const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const badRequest = (message: string) => Response.json({ message }, { status: 400 });

const thankYou = () => Response.json({ message: "Thank you. Your message has been sent." });

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<ContactPayload>;

  if (clean(body.website)) return thankYou();
  if (typeof body.started_at !== "number" || Date.now() - body.started_at < MIN_FILL_TIME) return thankYou();

  const name = clean(body.name);
  const email = clean(body.email).toLowerCase();
  const phone = clean(body.phone);
  const organization = clean(body.organization);
  const inquiryType = clean(body.inquiry_type);
  const message = clean(body.message);

  if (!name || name.length > 120) return badRequest("Please enter your name.");
  if (!EMAIL_PATTERN.test(email) || email.length > 200) return badRequest("Please enter a valid email address.");
  if (!PHONE_PATTERN.test(phone)) return badRequest("Please enter a valid phone number.");
  if (organization.length > 200) return badRequest("Organization name is too long.");
  if (!inquiryTypes.includes(inquiryType)) return badRequest("Please choose what your inquiry is about.");
  if (message.length < 10) return badRequest("Please write a slightly longer message.");
  if (message.length > 5000) return badRequest("Your message is too long. Please keep it under 5,000 characters.");

  try {
    await insertPublic(Table.ContactMessages, { name, email, phone, organization, inquiry_type: inquiryType, message });
    return thankYou();
  } catch {
    return Response.json({ message: "Your message could not be sent. Please try again." }, { status: 500 });
  }
}
