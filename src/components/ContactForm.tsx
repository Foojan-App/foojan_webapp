"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@/utils/svg";
import { sendContactApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { ContactFormProps } from "@/types/components";
import { FormStatus, InquiryType } from "@/types/enums";

const inputClass =
  "w-full rounded-md border border-[#E3D6EA] bg-white px-4 text-[15px] text-plum-950 transition placeholder:text-[#9AA0AE] focus:border-purple focus:ring-2 focus:ring-purple/15 focus:outline-none";
const labelClass = "text-[13px] font-semibold text-plum-950";

export default function ContactForm({ therapyHref }: ContactFormProps) {
  const startedAt = useRef(0);
  const [status, setStatus] = useState(FormStatus.Idle);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus(FormStatus.Sending);
    setFeedback("");
    try {
      const result = await sendContactApi({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        organization: String(data.get("organization") ?? ""),
        inquiry_type: String(data.get("inquiry_type") ?? "") as InquiryType,
        message: String(data.get("message") ?? ""),
        website: String(data.get("website") ?? ""),
        started_at: startedAt.current,
      });
      setStatus(FormStatus.Sent);
      setFeedback(result.message);
    } catch (err) {
      setStatus(FormStatus.Failed);
      setFeedback(errorMessage(err, "Your message could not be sent. Please try again."));
    }
  };

  if (status === FormStatus.Sent) {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-[10px] border border-[#F8E6FF] bg-white p-8 text-center">
        <p className="font-serif text-[28px] leading-[1.2] font-medium text-plum-950">Thank you.</p>
        <p className="text-[16px] leading-[25.5px] text-[#4A5163]">{feedback} Dr. Foojan’s office will get back to you.</p>
      </div>
    );
  }

  const sending = status === FormStatus.Sending;

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-5 rounded-[10px] border border-[#F8E6FF] bg-white p-6 lg:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Name *</span>
          <input name="name" required maxLength={120} autoComplete="name" placeholder="Full name" className={`${inputClass} h-12`} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Email *</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@example.com" className={`${inputClass} h-12`} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Phone</span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="+1 (555) 000-0000" className={`${inputClass} h-12`} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Organization</span>
          <input name="organization" maxLength={200} autoComplete="organization" placeholder="Company, university or event" className={`${inputClass} h-12`} />
        </label>
      </div>

      <div className="grid gap-5">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Your inquiry is about *</span>
          <select
            name="inquiry_type"
            required
            defaultValue=""
            className={`${inputClass} h-12 invalid:text-[#9AA0AE] [&_option]:text-plum-950`}
          >
            <option value="" disabled>
              Choose one
            </option>
            {Object.values(InquiryType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Message *</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="Tell us a little about your event, interview or idea…" className={`${inputClass} py-3`} />
      </label>

      <label aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <p className="rounded-md bg-[#F7F2FB] px-4 py-3 text-[13.5px] leading-[22px] text-[#4A5163]">
        This form is for speaking, media, education and collaboration inquiries. For psychotherapy, please visit{" "}
        {therapyHref ? (
          <a href={therapyHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-purple underline underline-offset-2">
            Dr. Foojan’s IAII practitioner profile ↗
          </a>
        ) : (
          <span className="font-semibold text-plum-950">Dr. Foojan’s IAII practitioner profile</span>
        )}
        . Please do not share health information here.
      </p>

      {status === FormStatus.Failed && (
        <p role="alert" className="text-[14px] font-medium text-[#C0392B]">
          {feedback}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex h-14 items-center justify-center gap-2.5 self-start rounded-md border border-black bg-plum-950 px-8 text-[14.5px] font-semibold tracking-[0.14px] text-white transition hover:bg-plum-900 disabled:opacity-60 max-sm:self-stretch"
      >
        {sending ? "Sending…" : "Send message"}
        {!sending && <ArrowRightIcon className="shrink-0" />}
      </button>
    </form>
  );
}
