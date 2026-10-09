"use client";

import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import type { OrderButtonsProps } from "@/types/components";

export default function OrderButtons({ index, count, move, remove }: OrderButtonsProps) {
  return (
    <div className="flex gap-1">
      <Tooltip title="Move up">
        <Button icon={<ArrowUpOutlined />} disabled={index === 0} onClick={() => move(index, index - 1)} />
      </Tooltip>
      <Tooltip title="Move down">
        <Button icon={<ArrowDownOutlined />} disabled={index === count - 1} onClick={() => move(index, index + 1)} />
      </Tooltip>
      <Tooltip title="Delete">
        <Button danger icon={<DeleteOutlined />} onClick={remove} />
      </Tooltip>
    </div>
  );
}
