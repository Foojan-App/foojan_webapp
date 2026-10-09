"use client";

import { App, AutoComplete, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import AccentText from "@/components/AccentText";
import { updateAboutApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { AboutContent } from "@/services/interface";
import type { AboutEditorProps } from "@/types/components";
import ImageUpload from "./ImageUpload";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";

const required = (message: string) => [{ required: true, message }];
const desktopLinesHelp = "Press Enter where a new line should start on computer screens. Phones wrap the text automatically.";

export default function AboutEditor({ initial }: AboutEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<AboutContent>();
  const [saving, setSaving] = useState(false);
  const heading = Form.useWatch("heading", form) ?? initial.heading;

  const handleSave = async (values: AboutContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateAboutApi(values));
      message.success("About section saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the About section. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="About" description="The “Meet Dr. Foojan” section right below the hero." />

      <Form<AboutContent>
        form={form}
        layout="vertical"
        initialValues={initial}
        onFinish={handleSave}
        disabled={saving}
        requiredMark={false}
        className="flex flex-col gap-6"
      >
        <Card title="Heading">
          <Form.Item label="Small line above the heading" name="eyebrow" rules={required("Enter the small line")}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Heading"
            name="heading"
            rules={required("Enter the heading")}
            extra="Put words between *stars* to make them purple."
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
          <div className="mb-6 rounded-lg bg-[#F7F2FB] p-5">
            <p className="mb-2 text-[12px] font-semibold text-[#687080] uppercase">Heading preview</p>
            <p className="font-serif text-[26px] leading-[1.2] font-medium text-plum-950">
              <AccentText text={heading} />
            </p>
          </div>
        </Card>

        <Card title="Photo & name">
          <Form.Item name="avatar_url" rules={required("Upload a photo")} extra="Shown as a small round photo next to the name.">
            <ImageUpload aspect={1} outputWidth={240} round />
          </Form.Item>
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Form.Item label="Name" name="signature_name" rules={required("Enter the name")}>
              <Input />
            </Form.Item>
            <Form.Item label="Text under the name" name="signature_subtitle" rules={required("Enter the text")}>
              <Input />
            </Form.Item>
          </div>
        </Card>

        <Card title="Paragraphs">
          <Form.Item label="First paragraph (big text)" name="lead" rules={required("Enter the paragraph")} extra={desktopLinesHelp}>
            <Input.TextArea autoSize={{ minRows: 4, maxRows: 8 }} />
          </Form.Item>
          <Form.Item label="Second paragraph (small grey text)" name="body" rules={required("Enter the paragraph")} extra={desktopLinesHelp}>
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
          </Form.Item>
        </Card>

        <Card title="Quote">
          <Form.Item
            label="Quote"
            name="quote"
            rules={required("Enter the quote")}
            extra={`Quotation marks are added automatically. ${desktopLinesHelp}`}
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
          <Form.Item label="Said by" name="quote_author" rules={required("Enter the name")}>
            <Input />
          </Form.Item>
        </Card>

        <Card title="Link">
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Form.Item label="Link text" name="link_label" rules={required("Enter the link text")}>
              <Input />
            </Form.Item>
            <Form.Item label="Link goes to" name="link_href" rules={required("Choose a link")}>
              <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
            </Form.Item>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save About
          </Button>
        </div>
      </Form>
    </>
  );
}
