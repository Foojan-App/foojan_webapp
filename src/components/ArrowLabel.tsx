import type { ArrowLabelProps } from "@/types/components";

const trailingArrow = /^([\s\S]*?)([↗↘→])\s*$/;

export default function ArrowLabel({ text }: ArrowLabelProps) {
  const match = text.match(trailingArrow);
  if (!match) return <>{text}</>;

  return (
    <span>
      {match[1]}
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">{match[2]}</span>
    </span>
  );
}
