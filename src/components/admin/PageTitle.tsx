import type { PageTitleProps } from "@/types/components";

export default function PageTitle({ title, description, extra }: PageTitleProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-serif text-[30px] leading-tight font-medium">{title}</h1>
        {description && <p className="mt-1 text-[15px] text-[#4A5163]">{description}</p>}
      </div>
      {extra}
    </div>
  );
}
