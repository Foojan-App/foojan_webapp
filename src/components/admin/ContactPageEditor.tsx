"use client";

import { App, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { updateContactPageApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { ContactPageContent } from "@/services/interface";
import type { ContactPageEditorProps } from "@/types/components";
import PageTitle from "./PageTitle";

const required = (message: string) => [{ required: true, message }];

export default function ContactPageEditor({ initial }: ContactPageEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<ContactPageContent>();
  const [saving, setSaving] = useState(false);

  const handleSave = async (values: ContactPageContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateContactPageApi(values));
      message.success("Contact page saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the contact page. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle
        title="Contact page"
        description="Intro text and office details shown next to the contact form."
        extra={
          <a href="/contact" target="_blank" rel="noreferrer" className="text-[13px]">
            View page ↗
          </a>
        }
      />

      <Form<ContactPageContent>
        form={form}
        layout="vertical"
        initialValues={initial}
        onFinish={handleSave}
        disabled={saving}
        requiredMark={false}
        className="flex flex-col gap-6"
      >
        <Card title="Heading & text">
          <Form.Item label="Small line above the heading" name="eyebrow" rules={required("Enter the small line")}>
            <Input />
          </Form.Item>
          <Form.Item label="Heading" name="heading" rules={required("Enter the heading")} extra="*Stars* = purple words.">
            <Input />
          </Form.Item>
          <Form.Item label="Paragraph" name="paragraph" rules={required("Enter the paragraph")}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} />
          </Form.Item>
        </Card>

        <Card title="Office details">
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Form.Item label="Box title" name="office_title" rules={required("Enter the title")}>
              <Input />
            </Form.Item>
            <Form.Item label="City / area" name="office_area" rules={required("Enter the city")}>
              <Input placeholder="San Clemente, CA" />
            </Form.Item>
          </div>
          <Form.Item label="Address" name="address" rules={required("Enter the address")}>
            <Input />
          </Form.Item>
          <Form.Item label="Map link" name="map_url" extra="Google Maps link for the address. Leave empty to hide “Map it”.">
            <Input placeholder="https://www.google.com/maps/..." />
          </Form.Item>
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Form.Item label="Email" name="email" rules={[{ type: "email", message: "Enter a valid email" }]} extra="Leave empty to hide.">
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone" extra="Leave empty to hide.">
              <Input />
            </Form.Item>
          </div>
          <p className="m-0 text-[13px] text-[#687080]">Social icons come from Footer → Social media.</p>
        </Card>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save contact page
          </Button>
        </div>
      </Form>
    </>
  );
}
