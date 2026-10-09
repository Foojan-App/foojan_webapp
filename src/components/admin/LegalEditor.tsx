"use client";

import { App, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { updateLegalApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { LegalContent } from "@/services/interface";
import type { LegalEditorProps } from "@/types/components";
import PageTitle from "./PageTitle";

const required = (message: string) => [{ required: true, message }];

export default function LegalEditor({ initial }: LegalEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<LegalContent>();
  const [saving, setSaving] = useState(false);

  const handleSave = async (values: LegalContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateLegalApi(values));
      message.success("Legal pages saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the legal pages. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="Legal pages" description="Privacy Policy and Terms of Use, linked from the footer." />

      <Form<LegalContent>
        form={form}
        layout="vertical"
        initialValues={initial}
        onFinish={handleSave}
        disabled={saving}
        requiredMark={false}
        className="flex flex-col gap-6"
      >
        <Form.List name="pages">
          {(fields) =>
            fields.map((field) => {
              const slug = initial.pages[field.name]?.slug;
              return (
                <Card
                  key={field.key}
                  title={initial.pages[field.name]?.title}
                  extra={
                    <a href={`/${slug}`} target="_blank" rel="noreferrer" className="text-[13px]">
                      View page ↗
                    </a>
                  }
                >
                  <Form.Item name={[field.name, "slug"]} hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Page title" name={[field.name, "title"]} rules={required("Enter the title")}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Text"
                    name={[field.name, "body"]}
                    rules={required("Enter the text")}
                    extra="Start a line with ## for a heading, or with - for a bullet point. Leave an empty line between paragraphs."
                  >
                    <Input.TextArea autoSize={{ minRows: 8, maxRows: 30 }} />
                  </Form.Item>
                </Card>
              );
            })
          }
        </Form.List>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save legal pages
          </Button>
        </div>
      </Form>
    </>
  );
}
