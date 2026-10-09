"use client";

import { App, Button, Card, Form, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import { updatePersonalNoteApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { PersonalNoteContent } from "@/services/interface";
import type { PersonalNoteEditorProps } from "@/types/components";
import PageTitle from "./PageTitle";

const required = (message: string) => [{ required: true, message }];
const linesHelp = "Press Enter for a new line on computers. Type | for a new line on phones.";

export default function PersonalNoteEditor({ initial }: PersonalNoteEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<PersonalNoteContent>();
  const [saving, setSaving] = useState(false);

  const handleSave = async (values: PersonalNoteContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updatePersonalNoteApi(values));
      message.success("Personal note saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the personal note. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="Personal note" description="The short centred note near the end of the page." />

      <Form<PersonalNoteContent>
        form={form}
        layout="vertical"
        initialValues={initial}
        onFinish={handleSave}
        disabled={saving}
        requiredMark={false}
        className="flex flex-col gap-6"
      >
        <Card>
          <Form.Item label="Small line above the heading" name="eyebrow" rules={required("Enter the small line")}>
            <Input />
          </Form.Item>
          <Form.Item label="Heading" name="heading" rules={required("Enter the heading")} extra={linesHelp}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
          <Form.Item label="Paragraph" name="paragraph" rules={required("Enter the paragraph")} extra={linesHelp}>
            <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
          </Form.Item>
          <Form.Item
            label="Text under the name"
            name="signature_subtitle"
            rules={required("Enter the text")}
            extra={
              <>
                The photo and name come from the <Link href="/admin/about">About</Link> section.
              </>
            }
          >
            <Input />
          </Form.Item>
        </Card>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save personal note
          </Button>
        </div>
      </Form>
    </>
  );
}
