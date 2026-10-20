import type { BoldTextProps } from "@/types/components";

export default function BoldText({ text, className }: BoldTextProps) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index} className={className}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}
