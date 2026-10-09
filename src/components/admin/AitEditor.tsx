"use client";

import { App, AutoComplete, Button, Card, Form, Input, Select } from "antd";
import { useState } from "react";
import { updateAitApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { AitContent } from "@/services/interface";
import type { AitEditorProps } from "@/types/components";
import IconUpload from "./IconUpload";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";
import ImageUpload from "./ImageUpload";
import { sectionPhotos } from "@/components/sectionPhotos";

const required = (message: string) => [{ required: true, message }];
const desktopLines = "Enter = new line on computers.";

export default function AitEditor({ initial }: AitEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<AitContent>();
  const [saving, setSaving] = useState(false);

  const handleSave = async (values: AitContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateAitApi(values));
      message.success("AIT saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save AIT. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="AIT" description="Awareness Integration Theory — heading, three pillars and four tabs." />

      <Form<AitContent>
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
          <Form.Item label="Heading" name="heading" rules={required("Enter the heading")} extra="Enter = new line.">
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
          </Form.Item>
          <Form.Item label="Paragraph" name="paragraph" rules={required("Enter the paragraph")} extra={desktopLines}>
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 7 }} />
          </Form.Item>
        </Card>

        <Card title="Buttons">
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Form.Item label="Gold button text" name="primary_button_label" rules={required("Enter the button text")}>
              <Input />
            </Form.Item>
            <Form.Item label="Gold button goes to" name="primary_button_href" rules={required("Choose a link")}>
              <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
            </Form.Item>
            <Form.Item
              label="Outline button text"
              name="secondary_button_label"
              rules={required("Enter the button text")}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Outline button goes to" name="secondary_button_href" rules={required("Choose a link")}>
              <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
            </Form.Item>
          </div>
        </Card>

        <Card title="Three pillars">
          <Form.List name="pillars">
            {(fields) => (
              <div className="grid gap-4 lg:grid-cols-3">
                {fields.map((field, index) => (
                  <Card key={field.key} type="inner" title={`Pillar ${index + 1}`}>
                    <Form.Item name={[field.name, "id"]} hidden>
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Title"
                      name={[field.name, "title"]}
                      rules={required("Enter the title")}
                      extra="A gold dot is added after it."
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Text"
                      name={[field.name, "body"]}
                      rules={required("Enter the text")}
                      extra={desktopLines}
                    >
                      <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>
                  </Card>
                ))}
              </div>
            )}
          </Form.List>
        </Card>

        <Form.List name="tabs">
          {(fields) =>
            fields.map((field, index) => (
              <Card key={field.key} title={`Tab ${String(index + 1).padStart(2, "0")}`}>
                <Form.Item name={[field.name, "id"]} hidden>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Icon"
                  name={[field.name, "icon_url"]}
                  rules={required("Upload an icon")}
                  extra="SVG (best), or PNG at least 68 × 68 px with a transparent background. Shown at 26×26 in gold."
                >
                  <IconUpload size={26} />
                </Form.Item>
                <Form.Item label="Title" name={[field.name, "title"]} rules={required("Enter the title")}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Text"
                  name={[field.name, "body"]}
                  rules={required("Enter the text")}
                  extra={desktopLines}
                >
                  <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} />
                </Form.Item>
                <Form.Item
                  label="Tags"
                  name={[field.name, "tags"]}
                  extra="Type a tag and press Enter. Click × to remove one."
                >
                  <Select mode="tags" open={false} tokenSeparators={[","]} placeholder="Add tags" />
                </Form.Item>
              </Card>
            ))
          }
        </Form.List>

        <Card title="Photo">
          <Form.Item
            label="Photo"
            name="image_url"
            extra={`Upload at least ${sectionPhotos.ait.recommended} wide (JPG or PNG, under 5 MB). Shown between the heading and the three pillars. The crop box starts with the whole photo; use the shape slider only if you want to trim it. Whatever you save is shown in full. Leave empty to hide the photo.`}
          >
            <ImageUpload freeShape outputWidth={sectionPhotos.ait.outputWidth} />
          </Form.Item>
          <Form.Item
            label="Photo description"
            name="image_alt"
            extra="Describes the photo for screen readers and Google, e.g. “Dr. Foojan Zeine presenting AIT research”."
          >
            <Input />
          </Form.Item>
        </Card>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save AIT
          </Button>
        </div>
      </Form>
    </>
  );
}
