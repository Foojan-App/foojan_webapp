"use client";

import { DeleteOutlined, MailOutlined } from "@ant-design/icons";
import { App, Button, Card, Empty, Popconfirm, Tag } from "antd";
import { useState } from "react";
import { deleteContactMessageApi, updateContactMessageApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { ContactMessage } from "@/services/interface";
import type { MessagesInboxProps } from "@/types/components";
import PageTitle from "./PageTitle";

const formatDate = (value: string) =>
  new Date(value).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

export default function MessagesInbox({ initial }: MessagesInboxProps) {
  const { message } = App.useApp();
  const [messages, setMessages] = useState<ContactMessage[]>(initial);
  const [busyId, setBusyId] = useState<number | null>(null);
  const unread = messages.filter((item) => !item.is_read).length;

  const run = async (id: number, action: () => Promise<ContactMessage[]>, failure: string) => {
    setBusyId(id);
    try {
      setMessages(await action());
    } catch (err) {
      message.error(errorMessage(err, failure));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <PageTitle
        title="Messages"
        description="Inquiries sent through the contact page."
        extra={<Tag color={unread ? "purple" : "default"}>{unread} unread</Tag>}
      />

      {messages.length === 0 ? (
        <Card>
          <Empty description="No messages yet" />
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((item) => (
            <Card
              key={item.id}
              className={item.is_read ? "" : "border-purple/40!"}
              title={
                <div className="flex flex-wrap items-center gap-2 py-2">
                  <span className="font-semibold">{item.name}</span>
                  <Tag className="m-0">{item.inquiry_type}</Tag>
                  {!item.is_read && (
                    <Tag color="purple" className="m-0">
                      New
                    </Tag>
                  )}
                </div>
              }
              extra={<span className="text-[13px] font-normal text-[#687080]">{formatDate(item.created_at)}</span>}
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-[#4A5163]">
                  <a href={`mailto:${item.email}`} className="text-purple">
                    {item.email}
                  </a>
                  {item.phone && (
                    <a href={`tel:${item.phone.replace(/[^+\d]/g, "")}`} className="text-purple">
                      {item.phone}
                    </a>
                  )}
                  {item.organization && <span>{item.organization}</span>}
                </div>
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-plum-950">{item.message}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button
                    loading={busyId === item.id}
                    onClick={() =>
                      run(
                        item.id,
                        () => updateContactMessageApi({ id: item.id, is_read: !item.is_read }),
                        "Could not update the message.",
                      )
                    }
                  >
                    {item.is_read ? "Mark as unread" : "Mark as read"}
                  </Button>
                  <Button icon={<MailOutlined />} href={`mailto:${item.email}?subject=${encodeURIComponent("Re: your inquiry")}`}>
                    Reply
                  </Button>
                  <Popconfirm
                    title="Delete this message?"
                    description="This cannot be undone."
                    okText="Delete"
                    okButtonProps={{ danger: true }}
                    onConfirm={() => run(item.id, () => deleteContactMessageApi(item.id), "Could not delete the message.")}
                  >
                    <Button danger icon={<DeleteOutlined />} disabled={busyId === item.id}>
                      Delete
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
