"use client";

import { useEffect, useRef } from "react";
import type { CountUpProps } from "@/types/components";

const DURATION = 1600;

const easeOut = (progress: number) => 1 - Math.pow(1 - progress, 3);

export default function CountUp({ value }: CountUpProps) {
  const target = /^\d+$/.test(value) ? Number(value) : null;
  const wrapper = useRef<HTMLSpanElement>(null);
  const number = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = wrapper.current;
    const text = number.current;
    if (target === null || !box || !text) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    text.textContent = "0";

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION, 1);
        text.textContent = String(Math.round(easeOut(progress) * target));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.5 },
    );
    observer.observe(box);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      text.textContent = value;
    };
  }, [target, value]);

  if (target === null) return value;

  return (
    <span ref={wrapper} className="relative inline-block">
      <span className="invisible">{value}</span>
      <span ref={number} className="absolute inset-0 text-center whitespace-nowrap">
        {value}
      </span>
    </span>
  );
}
