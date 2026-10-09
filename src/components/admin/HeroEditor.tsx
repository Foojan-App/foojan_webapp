"use client";

import { App, AutoComplete, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import AccentText from "@/components/AccentText";
import { updateHeroApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { HeroContent } from "@/services/interface";
import type { HeroEditorProps } from "@/types/components";
import ImageUpload from "./ImageUpload";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";

const PHOTO_ASPECT = 463.09 / 578.86;
const required = (message: string) => [{ required: true, message }];

export default function HeroEditor({ initial }: HeroEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<HeroContent>();
  const [saving, setSaving] = useState(false);
  const heading = Form.useWatch("heading", form) ?? initial.heading;

  const handleSave = async (values: HeroContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateHeroApi(values));
      message.success("Hero saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the hero. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="Hero" description="The first thing visitors see: heading, photo, award and numbers." />

      <Form<HeroContent>
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
          <Form.Item
            label="Heading"
            name="heading"
            rules={required("Enter the heading")}
            extra="Each line in this box is a line on the website. Put words between *stars* to make them purple."
          >
            <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
          </Form.Item>
          <div className="mb-6 rounded-lg bg-[#F7F2FB] p-5">
            <p className="mb-2 text-[12px] font-semibold text-[#687080] uppercase">Heading preview</p>
            <p className="font-serif text-[28px] leading-[1.2] font-medium text-plum-950">
              <AccentText text={heading} />
            </p>
          </div>
          <Form.Item label="Paragraph" name="paragraph" rules={required("Enter the paragraph")}>
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
        </Card>

        <Card title="Buttons">
          {(["primary_button", "secondary_button"] as const).map((name, index) => (
            <div key={name} className="grid gap-x-4 sm:grid-cols-2">
              <Form.Item label={`Button ${index + 1} text`} name={`${name}_label`} rules={required("Enter the button text")}>
                <Input />
              </Form.Item>
              <Form.Item label={`Button ${index + 1} goes to`} name={`${name}_href`} rules={required("Choose a link")}>
                <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
              </Form.Item>
            </div>
          ))}
        </Card>

        <Card title="Award">
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Form.Item label="Award name" name="award_title" rules={required("Enter the award name")}>
              <Input />
            </Form.Item>
            <Form.Item label="Given by" name="award_subtitle" rules={required("Enter who gave the award")}>
              <Input />
            </Form.Item>
          </div>
        </Card>

        <Card title="Photo">
          <Form.Item
            name="image_url"
            rules={required("Upload a photo")}
            extra="Upload at least 926 × 1158 px (JPG or PNG, under 5 MB). The crop box has the same shape as the photo frame on the website — what you see inside the box is exactly what is shown."
          >
            <ImageUpload aspect={PHOTO_ASPECT} outputWidth={926} />
          </Form.Item>
          <div className="grid gap-x-4 sm:grid-cols-[160px_1fr]">
            <Form.Item label="Badge number" name="badge_value" rules={required("Enter the number")}>
              <Input placeholder="35+" />
            </Form.Item>
            <Form.Item label="Badge text" name="badge_label" rules={required("Enter the text")} extra="Press Enter for a second line.">
              <Input.TextArea autoSize={{ minRows: 2, maxRows: 2 }} />
            </Form.Item>
          </div>
        </Card>

        <Card title="Numbers strip">
          <Form.List name="stats">
            {(fields) =>
              fields.map((field, index) => (
                <div
                  key={field.key}
                  className="grid gap-x-4 border-t border-[#ECE6F0] pt-4 first:border-t-0 first:pt-0 sm:grid-cols-[120px_90px_1fr]"
                >
                  <Form.Item name={[field.name, "id"]} hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item label={`Number ${index + 1}`} name={[field.name, "value"]} rules={required("Enter a value")}>
                    <Input placeholder="25" />
                  </Form.Item>
                  <Form.Item label="After it" name={[field.name, "suffix"]}>
                    <Input placeholder="+" />
                  </Form.Item>
                  <Form.Item label="Text below" name={[field.name, "label"]} rules={required("Enter the text")}>
                    <Input.TextArea autoSize={{ minRows: 2, maxRows: 2 }} />
                  </Form.Item>
                </div>
              ))
            }
          </Form.List>
        </Card>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save hero
          </Button>
        </div>
      </Form>
    </>
  );
}
