import type { ContactOfficeProps } from "@/types/components";
import MaskIcon from "./MaskIcon";

const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

export default function ContactOffice({ content, socials }: ContactOfficeProps) {
  const links = socials.filter((social) => social.url.startsWith("http"));

  return (
    <div className="flex flex-col gap-5 rounded-[10px] border border-[#F8E6FF] bg-white p-6 lg:p-8">
      <p className="text-[13px] leading-4 font-bold tracking-[1.82px] text-plum-950 uppercase">{content.office_title}</p>

      <dl className="flex flex-col gap-4 text-[15px] leading-6">
        <div className="flex flex-col gap-1">
          <dt className="text-[13px] text-[#687080]">{content.office_area}</dt>
          <dd className="text-plum-950">
            {content.address}{" "}
            {content.map_url && (
              <a
                href={content.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold whitespace-nowrap text-purple underline underline-offset-2"
              >
                Map it ↗
              </a>
            )}
          </dd>
        </div>
        {content.email && (
          <div className="flex flex-col gap-1">
            <dt className="text-[13px] text-[#687080]">Email</dt>
            <dd>
              <a href={`mailto:${content.email}`} className="text-plum-950 underline-offset-2 hover:text-purple hover:underline">
                {content.email}
              </a>
            </dd>
          </div>
        )}
        {content.phone && (
          <div className="flex flex-col gap-1">
            <dt className="text-[13px] text-[#687080]">Phone</dt>
            <dd>
              <a href={telHref(content.phone)} className="text-plum-950 underline-offset-2 hover:text-purple hover:underline">
                {content.phone}
              </a>
            </dd>
          </div>
        )}
      </dl>

      {links.length > 0 && (
        <ul className="flex flex-wrap gap-2.5 border-t border-[#F1E7F6] pt-5">
          {links.map((social, i) => (
            <li key={social.id ?? i}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="grid size-10.5 place-items-center rounded-md border border-[#E3D6EA] text-plum-950 transition hover:border-purple hover:text-purple"
              >
                <MaskIcon src={social.icon_url} className="size-4.25" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
