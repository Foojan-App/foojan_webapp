import type { HomeTickerProps } from "@/types/components";

export default function Ticker({ content }: HomeTickerProps) {
  return (
    <div aria-hidden="true" className="h-15.25 overflow-hidden pt-6 border-t-2 border-[#BD9040] bg-navy font-dm whitespace-nowrap">
      <div className="flex w-max animate-[marquee_35s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <p key={copy} className="pr-12.25 text-[11px] leading-3.5 font-bold tracking-[2.2px] text-[#F6EDE0] uppercase">
            {content.items.map((item) => (
              <span key={item}>
                {item} <b className="font-black text-[#D9AD5E]">✦</b>{" "}
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}
