import type { ReactNode } from "react";
import type { RichTextProps } from "@/types/components";

export default function RichText({ body }: RichTextProps) {
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flush = () => {
    if (paragraph.length) {
      blocks.push(
        <p key={blocks.length} className="text-[16px] leading-[28px] text-[#4A5163]">
          {paragraph.join(" ")}
        </p>,
      );
      paragraph = [];
    }
    if (list.length) {
      blocks.push(
        <ul key={blocks.length} className="flex list-disc flex-col gap-2 pl-6 text-[16px] leading-[28px] text-[#4A5163]">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };

  body.split("\n").forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flush();
      return;
    }
    if (line.startsWith("## ")) {
      flush();
      blocks.push(
        <h2 key={blocks.length} className="mt-4 font-serif text-[24px] leading-[1.3] font-medium text-plum-950 md:text-[28px]">
          {line.slice(3)}
        </h2>,
      );
      return;
    }
    if (line.startsWith("- ")) {
      if (paragraph.length) flush();
      list.push(line.slice(2));
      return;
    }
    if (list.length) flush();
    paragraph.push(line);
  });
  flush();

  return <div className="flex flex-col gap-4">{blocks}</div>;
}
