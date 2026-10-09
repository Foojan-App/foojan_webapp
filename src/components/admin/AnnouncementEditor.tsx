"use client";

import { App, AutoComplete, Button, Card, Form, Input, Switch } from "antd";
import { useState } from "react";
import { updateAnnouncementApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { AnnouncementContent } from "@/services/interface";
import type { AnnouncementEditorProps } from "@/types/components";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";

export default function AnnouncementEditor({ initial }: AnnouncementEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<AnnouncementContent>();
  const [saving, setSaving] = useState(false);
  const preview = Form.useWatch([], form) ?? initial;

  const handleSave = async (values: AnnouncementContent) => {
    setSaving(true);
    try {
      await updateAnnouncementApi(values);
      message.success("Announcement bar saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the announcement. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="Announcement bar" description="The short message shown in the dark bar above the header." />

      <Card title="Preview" className="mb-6">
        {preview.enabled ? (
          <div className="overflow-hidden rounded-md bg-plum-950 px-4 py-2.5 text-center text-[14px] text-white">
            <span className="mr-1 text-gold">★</span>
            {preview.text}{" "}
            {preview.link_label && <span className="font-semibold underline-offset-2 hover:underline">{preview.link_label}</span>}
          </div>
        ) : (
          <p className="text-[14px] text-[#687080]">The bar is turned off and won&apos;t show on the website.</p>
        )}
      </Card>

      <Form<AnnouncementContent>
        form={form}
        layout="vertical"
        initialValues={initial}
        onFinish={handleSave}
        disabled={saving}
        requiredMark={false}
      >
        <Card>
          <Form.Item label="Show on website" name="enabled" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Message" name="text" rules={[{ required: true, message: "Enter the message" }]}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} maxLength={160} showCount />
          </Form.Item>
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Form.Item label="Link text" name="link_label" extra="Leave empty to show no link.">
              <Input placeholder="Read more" />
            </Form.Item>
            <Form.Item label="Link goes to" name="link_href">
              <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
            </Form.Item>
          </div>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save announcement
          </Button>
        </div>
      </Form>
    </>
  );
}
