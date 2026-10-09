"use client";

import { RightOutlined } from "@ant-design/icons";
import { Card, Tag } from "antd";
import Link from "next/link";
import { sectionNav } from "./adminNav";

export default function SectionCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {sectionNav.map((section) => {
        const card = (
          <Card hoverable={section.ready} className={section.ready ? "" : "opacity-60"}>
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#F3E6F7] text-[18px] text-purple">
                {section.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[16px] font-semibold">{section.label}</p>
                  {section.ready ? <RightOutlined className="text-[#687080]" /> : <Tag className="m-0">Soon</Tag>}
                </div>
                <p className="mt-1 text-[14px] text-[#4A5163]">{section.description}</p>
              </div>
            </div>
          </Card>
        );
        return section.ready ? (
          <Link key={section.href} href={section.href}>
            {card}
          </Link>
        ) : (
          <div key={section.href}>{card}</div>
        );
      })}
    </div>
  );
}
