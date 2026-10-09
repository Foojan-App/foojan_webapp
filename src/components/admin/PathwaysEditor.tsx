"use client";

import { App, AutoComplete, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { updatePathwaysApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { PathwaysContent } from "@/services/interface";
import type { PathwaysEditorProps } from "@/types/components";
import IconUpload from "./IconUpload";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";
import ImageUpload from "./ImageUpload";
import { sectionPhotos } from "@/components/sectionPhotos";

const required = (message: string) => [{ required: true, message }];
const linesHelp = "Enter = new line on computers, | = new line on phones.";

export default function PathwaysEditor({ initial }: PathwaysEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<PathwaysContent>();
  const [saving, setSaving] = useState(false);

  const handleSave = async (values: PathwaysContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updatePathwaysApi(values));
      message.success("Pathways saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save Pathways. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="Pathways" description="“One body of work. Multiple pathways.” and its five cards." />

      <Form<PathwaysContent>
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
            extra={`${linesHelp} *Stars* = purple words.`}
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
          </Form.Item>
          <Form.Item
            label="Paragraph"
            name="paragraph"
            rules={required("Enter the paragraph")}
            extra="Enter = new line on computers."
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
        </Card>

        <Form.List name="cards">
          {(fields) =>
            fields.map((field, index) => (
              <Card
                key={field.key}
                title={`Card ${String(index + 1).padStart(2, "0")}`}
                extra={
                  <span className="text-[13px] text-[#687080]">
                    {index < 2 ? "Large card, top row" : "Small card, bottom row"}
                  </span>
                }
              >
                <Form.Item name={[field.name, "id"]} hidden>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Icon"
                  name={[field.name, "icon_url"]}
                  rules={required("Upload an icon")}
                  extra="SVG (best), or PNG at least 68 × 68 px with a transparent background. Shown at 26×26 in purple."
                >
                  <IconUpload size={26} />
                </Form.Item>
                <Form.Item
                  label="Title"
                  name={[field.name, "title"]}
                  rules={required("Enter the title")}
                  extra="Enter = new line on computers."
                >
                  <Input.TextArea autoSize={{ minRows: 1, maxRows: 2 }} />
                </Form.Item>
                <Form.Item
                  label="Text"
                  name={[field.name, "body"]}
                  rules={required("Enter the text")}
                  extra={linesHelp}
                >
                  <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                </Form.Item>
                <div className="grid gap-x-4 sm:grid-cols-2">
                  <Form.Item label="Card goes to" name={[field.name, "href"]} rules={required("Choose a link")}>
                    <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
                  </Form.Item>
                  <Form.Item
                    label="Small link text (optional)"
                    name={[field.name, "link_label"]}
                    extra="Shown under the text with an ↗ arrow, e.g. for an outside website."
                  >
                    <Input placeholder="View IAII practitioner profile" />
                  </Form.Item>
                </div>
              </Card>
            ))
          }
        </Form.List>

        <Card title="Note under the cards">
          <Form.Item name="note" rules={required("Enter the note")} extra="Enter = new line on computers.">
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
        </Card>

        <Card title="Photo">
          <Form.Item
            label="Photo"
            name="image_url"
            extra={`Upload at least ${sectionPhotos.pathways.recommended} wide (JPG or PNG, under 5 MB). Shown under the heading, next to the cards. The crop box starts with the whole photo; use the shape slider only if you want to trim it. Whatever you save is shown in full. Leave empty to hide the photo.`}
          >
            <ImageUpload freeShape outputWidth={sectionPhotos.pathways.outputWidth} />
          </Form.Item>
          <Form.Item
            label="Photo description"
            name="image_alt"
            extra="Describes the photo for screen readers and Google, e.g. “Dr. Foojan Zeine at the Therapy Hub”."
          >
            <Input />
          </Form.Item>
        </Card>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save Pathways
          </Button>
        </div>
      </Form>
    </>
  );
}
