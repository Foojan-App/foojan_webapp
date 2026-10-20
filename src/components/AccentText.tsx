import { Fragment, type ReactNode } from "react";
import type { AccentTextProps } from "@/types/components";
import { LineBreaks } from "@/types/enums";

const accent = (text: string) =>
  text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={index} className="font-bold text-ink-blue">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <span key={index} className="accent text-[#8B6A8D]">
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });

const withBreaks = (parts: string[], renderPart: (part: string) => ReactNode, breakClass?: string) =>
  parts.map((part, index) => (
    <Fragment key={index}>
      {renderPart(part)}
      {index < parts.length - 1 && (
        <>
          {" "}
          <br className={breakClass} />
        </>
      )}
    </Fragment>
  ));

export default function AccentText({ text, breaks = LineBreaks.All }: AccentTextProps) {
  const lines = text.split("\n");
  if (breaks === LineBreaks.All) return withBreaks(lines, accent, "max-lg:hidden");
  if (breaks === LineBreaks.DesktopOnly) return withBreaks(lines, accent, "hidden lg:block");
  return withBreaks(lines, (line) => withBreaks(line.split("|"), accent, "hidden"), "hidden lg:block");
}
