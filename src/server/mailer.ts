import type { InquiryEmail } from "@/services/interface";
import { INQUIRY_FROM_EMAIL, INQUIRY_TO_EMAIL, SENDGRID_API_KEY, SITE_NAME, SITE_URL } from "./config";

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const paragraphs = (value: string) => escape(value).replace(/\n/g, "<br>");

const layout = (body: string) => `<!doctype html>
<html><body style="margin:0;background:#FAF7F2;font-family:Arial,Helvetica,sans-serif;color:#17223C">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-top:4px solid #13294F">
<tr><td style="padding:32px 32px 8px;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#13294F">${SITE_NAME}</td></tr>
<tr><td style="padding:8px 32px 32px;font-size:15px;line-height:1.6">${body}</td></tr>
</table>
<p style="font-size:12px;color:#77717A;margin:16px 0 0">${escape(SITE_URL.replace(/^https?:\/\//, ""))}</p>
</td></tr></table>
</body></html>`;

const row = (label: string, value: string) =>
  `<tr><td style="padding:8px 0;width:130px;vertical-align:top;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#815F37">${label}</td><td style="padding:8px 0;font-size:15px">${value || "—"}</td></tr>`;

type Address = { name: string; email: string };

type Mail = { to: Address; replyTo?: Address; subject: string; text: string; html: string };

export const isMailerConfigured = () => Boolean(SENDGRID_API_KEY && INQUIRY_FROM_EMAIL);

const sendMail = async ({ to, replyTo, subject, text, html }: Mail) => {
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${SENDGRID_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [to] }],
      from: { name: SITE_NAME, email: INQUIRY_FROM_EMAIL },
      ...(replyTo && { reply_to: replyTo }),
      subject,
      content: [
        { type: "text/plain", value: text },
        { type: "text/html", value: html },
      ],
    }),
  });
  if (!response.ok) throw new Error(`SendGrid ${response.status}: ${await response.text()}`);
};

export const sendInquiryEmails = async (inquiry: InquiryEmail) => {
  if (!isMailerConfigured()) return;

  const details = `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
${row("Name", escape(inquiry.name))}
${row("Email", `<a href="mailto:${escape(inquiry.email)}" style="color:#13294F">${escape(inquiry.email)}</a>`)}
${row("Phone", escape(inquiry.phone))}
${row("Organization", escape(inquiry.organization))}
</table>
<p style="margin:24px 0 8px;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#815F37">Event details</p>
<p style="margin:0">${paragraphs(inquiry.message)}</p>`;

  const notification = sendMail({
    to: { name: "Dr. Foojan Zeine", email: INQUIRY_TO_EMAIL },
    replyTo: { name: inquiry.name, email: inquiry.email },
    subject: `New speaking inquiry from ${inquiry.name}`,
    text: `New speaking inquiry from the website.\n\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone || "—"}\nOrganization: ${inquiry.organization || "—"}\n\n${inquiry.message}\n\nReply to this email to answer ${inquiry.name} directly.`,
    html: layout(
      `<p style="margin:0 0 20px">A new speaking inquiry was sent from the website. Reply to this email to answer ${escape(inquiry.name)} directly.</p>${details}`,
    ),
  });

  const confirmation = sendMail({
    to: { name: inquiry.name, email: inquiry.email },
    subject: `Thank you for your inquiry – ${SITE_NAME}`,
    text: `Dear ${inquiry.name},\n\nThank you for inviting Dr. Foojan Zeine. We have received your inquiry, and Dr. Foojan's office will get back to you soon.\n\nHere is a copy of what you sent:\n\n${inquiry.message}\n\nWarm regards,\nThe office of Dr. Foojan Zeine`,
    html: layout(
      `<p style="margin:0 0 16px">Dear ${escape(inquiry.name)},</p>
<p style="margin:0 0 16px">Thank you for inviting Dr. Foojan Zeine. We have received your inquiry, and Dr. Foojan’s office will get back to you soon.</p>
<p style="margin:0 0 20px">Here is a copy of what you sent:</p>${details}
<p style="margin:28px 0 0">Warm regards,<br>The office of Dr. Foojan Zeine</p>`,
    ),
  });

  const results = await Promise.allSettled([notification, confirmation]);
  results.forEach((result) => {
    if (result.status === "rejected") console.error("Inquiry email failed:", result.reason instanceof Error ? result.reason.message : result.reason);
  });
};
