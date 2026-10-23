"use client";

import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { sendContactApi } from "@/services/ApiCollection";
import { ArrowUpRightBoldIcon } from "@/utils/svg";
import { errorMessage } from "@/services/errorMessage";
import type { InviteModalProps } from "@/types/components";
import { FormStatus, InquiryType } from "@/types/enums";

const HASH = "#contact";
const labelClass = "mb-4 block text-[12px] font-bold tracking-[0.06em] uppercase";
const inputClass =
  "mt-2 block w-full rounded-[3px] border border-[#C9C3CA] bg-white p-3.25 text-[15px] font-normal tracking-normal text-[#1C2741] normal-case focus:border-navy focus:outline-none";

export default function InviteModal({ content }: InviteModalProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(FormStatus.Idle);
  const [feedback, setFeedback] = useState("");
  const startedAt = useRef(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  const show = useCallback(() => {
    startedAt.current = Date.now();
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    if (window.location.hash === HASH) window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest("a");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.hash !== HASH || url.pathname !== window.location.pathname) return;
      event.preventDefault();
      show();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    if (window.location.hash === HASH) queueMicrotask(show);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [show, close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const date = String(data.get("date") ?? "");
    setStatus(FormStatus.Sending);
    setFeedback("");
    try {
      const result = await sendContactApi({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        organization: String(data.get("organization") ?? ""),
        inquiry_type: InquiryType.Speaking,
        message: `Event date: ${date || "To be confirmed"}\n\n${String(data.get("details") ?? "")}`,
        website: String(data.get("website") ?? ""),
        started_at: startedAt.current,
      });
      setStatus(FormStatus.Sent);
      setFeedback(result.message);
    } catch (err) {
      setStatus(FormStatus.Failed);
      setFeedback(errorMessage(err, "Your inquiry could not be sent. Please try again."));
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Invite Dr. Foojan speaking inquiry"
      onClick={(event) => event.target === event.currentTarget && close()}
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-auto bg-[rgba(12,19,37,0.78)] p-3.75 font-dm text-[#1C2741] min-[801px]:px-5 min-[801px]:py-[5vh]"
    >
      <div className="@container relative m-auto grid w-full max-w-260 leading-[normal] gap-9 bg-[#F3EAF3] px-5.5 pt-12.5 pb-6.5 shadow-[0_22px_100px_rgba(0,0,0,0.3)] min-[801px]:grid-cols-[1fr_1.15fr] min-[801px]:p-[clamp(30px,5vw,75px)]">
        <button
          ref={closeRef}
          type="button"
          aria-label="Close invitation form"
          onClick={close}
          className="absolute top-2.5 right-4.25 px-3.5 py-2 text-[2.4rem] leading-none text-[#17223D]"
        >
          ×
        </button>
        <div>
          <p className="text-[11px] leading-3.5 font-bold tracking-[3px] uppercase">{content.kicker}</p>
          <h2 className="my-6 font-playfair text-[clamp(36px,4vw,56px)] leading-[1.12] font-normal tracking-[-0.04em]">
            {content.heading} <em className="text-[#8C6B8E]">{content.heading_accent}</em>
          </h2>
          <p className="text-[18px] leading-[1.7] text-[#5D5964]">{content.paragraph}</p>
        </div>

        {status === FormStatus.Sent ? (
          <div role="status" className="bg-white p-[clamp(22px,3vw,44px)] shadow-[0_15px_45px_#142C4C12]">
            <h3 className="mb-3 font-playfair text-[30px] font-normal">Thank you.</h3>
            <p className="text-[16px] leading-[1.7] text-[#5D5964]">{feedback} Dr. Foojan’s office will get back to you.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative bg-white p-[clamp(22px,3vw,44px)] shadow-[0_15px_45px_#142C4C12]">
            <h3 className="mb-5 font-playfair text-[30px] font-normal">{content.form_title}</h3>
            <div className="grid gap-3.75 min-[761px]:grid-cols-2">
              <label className={labelClass}>
                Your name
                <input name="name" required maxLength={120} autoComplete="name" placeholder="Your full name" className={inputClass} />
              </label>
              <label className={labelClass}>
                Organization
                <input name="organization" maxLength={200} placeholder="Organization or event" className={inputClass} />
              </label>
            </div>
            <div className="grid gap-3.75 min-[761px]:grid-cols-2">
              <label className={labelClass}>
                Email
                <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@example.com" className={inputClass} />
              </label>
              <label className={labelClass}>
                Phone
                <input name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
              </label>
            </div>
            <div className="grid gap-3.75 min-[761px]:grid-cols-2">
              <label className={labelClass}>
                Event date
                <input name="date" type="date" className={inputClass} />
              </label>
            </div>
            <label className={labelClass}>
              Tell us about your event
              <textarea
                name="details"
                required
                minLength={10}
                maxLength={4900}
                rows={4}
                placeholder="Audience, location, topic, and what you have in mind"
                className={inputClass}
              />
            </label>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            <button
              type="submit"
              disabled={status === FormStatus.Sending}
              className="group inline-flex h-16.25 cursor-pointer items-center gap-2.25 border border-[#E4C38A] bg-[#E4C38A] px-6 text-[12px] leading-4 font-bold tracking-[1px] text-[#13294F] uppercase transition disabled:opacity-60"
            >
              {status === FormStatus.Sending ? "Sending…" : content.submit_label}
              <span className="grid h-7 w-[16.08px] place-items-center transition-transform duration-300 group-hover:translate-x-1.5">
                <ArrowUpRightBoldIcon />
              </span>
            </button>
            {status === FormStatus.Failed && (
              <p role="alert" className="mt-3.5 text-[13px] leading-normal text-[#B42318]">
                {feedback}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
