"use client";

import { PlusOutlined } from "@ant-design/icons";
import { App, AutoComplete, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { updateAboutPageApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { AboutPageContent } from "@/services/interface";
import type { AboutPageEditorProps } from "@/types/components";
import ImageUpload from "./ImageUpload";
import OrderButtons from "./OrderButtons";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";

const PHOTO_ASPECT = 463.09 / 578.86;
const required = (message: string) => [{ required: true, message }];

export default function AboutPageEditor({ initial }: AboutPageEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<AboutPageContent>();
  const [saving, setSaving] = useState(false);

  const handleSave = async (values: AboutPageContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateAboutPageApi(values));
      message.success("About page saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the About page. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle
        title="About page"
        description="The full biography page at /meet-dr-foojan-zeine."
        extra={
          <a href="/meet-dr-foojan-zeine" target="_blank" rel="noreferrer" className="text-[13px]">
            View page ↗
          </a>
        }
      />

      <Form<AboutPageContent>
        form={form}
        layout="vertical"
        initialValues={initial}
        onFinish={handleSave}
        disabled={saving}
        requiredMark={false}
        className="flex flex-col gap-6"
      >
        <Card title="Intro">
          <div className="grid gap-x-6 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              <Form.Item label="Small line above the name" name="eyebrow" rules={required("Enter the small line")}>
                <Input />
              </Form.Item>
              <Form.Item label="Heading" name="heading" rules={required("Enter the heading")} extra="*Stars* = purple words.">
                <Input />
              </Form.Item>
              <Form.Item label="Roles line" name="subtitle" rules={required("Enter the roles")}>
                <Input />
              </Form.Item>
              <Form.Item label="Intro paragraph" name="intro" rules={required("Enter the intro")}>
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
              </Form.Item>
            </div>
            <Form.Item label="Photo" name="image_url" rules={required("Upload a photo")} extra="Cropped to the same shape as the homepage photo.">
              <ImageUpload aspect={PHOTO_ASPECT} outputWidth={926} />
            </Form.Item>
          </div>
        </Card>

        <Card title="Biography">
          <Form.Item
            name="body"
            rules={required("Enter the biography")}
            extra="Start a line with ## for a heading, or with - for a bullet point. Leave an empty line between paragraphs."
          >
            <Input.TextArea autoSize={{ minRows: 12, maxRows: 40 }} />
          </Form.Item>
        </Card>

        <Card title="At a glance (side cards)">
          <Form.Item label="Title above the cards" name="highlights_title" rules={required("Enter the title")}>
            <Input />
          </Form.Item>
          <Form.List name="highlights">
            {(fields, { add, remove, move }) => (
              <div className="flex flex-col gap-4">
                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    type="inner"
                    title={`Card ${index + 1}`}
                    extra={<OrderButtons index={index} count={fields.length} move={move} remove={() => remove(field.name)} />}
                  >
                    <Form.Item name={[field.name, "id"]} hidden>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Title" name={[field.name, "title"]} rules={required("Enter the title")}>
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Points"
                      name={[field.name, "items"]}
                      rules={required("Add at least one point")}
                      extra="One point per line."
                    >
                      <Input.TextArea autoSize={{ minRows: 2, maxRows: 8 }} />
                    </Form.Item>
                  </Card>
                ))}
                <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add({ title: "", items: "" })}>
                  Add card
                </Button>
              </div>
            )}
          </Form.List>
        </Card>

        <Card title="Call to action (bottom box)">
          <Form.Item label="Heading" name="cta_heading" rules={required("Enter the heading")} extra="*Stars* = gold words.">
            <Input />
          </Form.Item>
          <Form.Item label="Text" name="cta_paragraph" rules={required("Enter the text")}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Form.Item label="Button text" name="cta_button_label" rules={required("Enter the button text")}>
              <Input />
            </Form.Item>
            <Form.Item label="Button goes to" name="cta_button_href" rules={required("Choose a link")}>
              <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
            </Form.Item>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save About page
          </Button>
        </div>
      </Form>
    </>
  );
}
