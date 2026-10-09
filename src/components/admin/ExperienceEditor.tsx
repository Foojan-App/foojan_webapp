"use client";

import { PlusOutlined } from "@ant-design/icons";
import { App, AutoComplete, Button, Card, Form, Input, Switch } from "antd";
import { useState } from "react";
import { updateExperienceApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { ExperienceContent } from "@/services/interface";
import type { ExperienceEditorProps } from "@/types/components";
import OrderButtons from "./OrderButtons";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";
import ImageUpload from "./ImageUpload";
import { sectionPhotos } from "@/components/sectionPhotos";

const required = (message: string) => [{ required: true, message }];

export default function ExperienceEditor({ initial }: ExperienceEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<ExperienceContent>();
  const [saving, setSaving] = useState(false);
  const items = Form.useWatch("items", form) ?? initial.items;

  const handleSave = async (values: ExperienceContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateExperienceApi(values));
      message.success("Experience saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the Experience section. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="Experience" description="Professional experience: heading, tags and the timeline cards." />

      <Form<ExperienceContent>
        form={form}
        layout="vertical"
        initialValues={initial}
        onFinish={handleSave}
        disabled={saving}
        requiredMark={false}
        className="flex flex-col gap-6"
      >
        <Card title="Left side">
          <Form.Item label="Small line above the heading" name="eyebrow" rules={required("Enter the small line")}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Heading"
            name="heading"
            rules={required("Enter the heading")}
            extra="Enter = new line on computers, | = new line on phones, *stars* = purple words."
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
          </Form.Item>
          <Form.Item
            label="Paragraph"
            name="paragraph"
            rules={required("Enter the paragraph")}
            extra="Each line in this box is a line on the website."
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 4 }} />
          </Form.Item>
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Form.Item label="Link text" name="link_label" rules={required("Enter the link text")}>
              <Input />
            </Form.Item>
            <Form.Item label="Link goes to" name="link_href" rules={required("Choose a link")}>
              <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
            </Form.Item>
          </div>
        </Card>

        <Card title="Tags" extra={<span className="text-[13px] text-[#687080]">Shown two per row</span>}>
          <Form.List name="tags">
            {(fields, { add, remove, move }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} className="grid grid-cols-[1fr_auto] items-start gap-x-3">
                    <Form.Item name={[field.name, "id"]} hidden>
                      <Input />
                    </Form.Item>
                    <Form.Item name={[field.name, "label"]} rules={required("Enter a tag")}>
                      <Input placeholder={`Tag ${index + 1}`} />
                    </Form.Item>
                    <OrderButtons index={index} count={fields.length} move={move} remove={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add({ label: "" })}>
                  Add tag
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        <Card title="Timeline">
          <Form.List name="items">
            {(fields, { add, remove, move }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} className="mb-4 rounded-lg border border-line p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="text-[14px] font-semibold">Card {index + 1}</span>
                      <OrderButtons index={index} count={fields.length} move={move} remove={() => remove(field.name)} />
                    </div>
                    <Form.Item name={[field.name, "id"]} hidden>
                      <Input />
                    </Form.Item>
                    <div className="grid gap-x-4 sm:grid-cols-2">
                      <Form.Item
                        label="Small purple line"
                        name={[field.name, "kicker"]}
                        rules={required("Enter the small line")}
                      >
                        <Input placeholder="Education & Licensure" />
                      </Form.Item>
                      <Form.Item label="Title" name={[field.name, "title"]} rules={required("Enter the title")}>
                        <Input />
                      </Form.Item>
                    </div>
                    <Form.Item label="Text" name={[field.name, "body"]} rules={required("Enter the text")}>
                      <Input.TextArea autoSize={{ minRows: 3, maxRows: 7 }} />
                    </Form.Item>
                    <div className="grid gap-x-4 sm:grid-cols-[auto_1fr] sm:items-start">
                      <Form.Item
                        label="Highlight"
                        name={[field.name, "highlight"]}
                        valuePropName="checked"
                        extra="Filled dot, soft pink card and a badge."
                      >
                        <Switch />
                      </Form.Item>
                      {items?.[field.name]?.highlight && (
                        <Form.Item
                          label="Badge text"
                          name={[field.name, "badge_label"]}
                          rules={required("Enter the badge text")}
                        >
                          <Input placeholder="Award recipient" />
                        </Form.Item>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  onClick={() => add({ kicker: "", title: "", body: "", highlight: false, badge_label: "" })}
                >
                  Add card
                </Button>
                <p className="mt-3 text-[13px] text-[#687080]">
                  With exactly 3 cards the timeline keeps the exact Figma spacing. With more or fewer cards each card
                  takes the height of its text.
                </p>
              </>
            )}
          </Form.List>
        </Card>

        <Card title="Photo">
          <Form.Item
            label="Photo"
            name="image_url"
            extra={`Upload at least ${sectionPhotos.experience.recommended} wide (JPG or PNG, under 5 MB). The crop box starts with the whole photo; use the shape slider only if you want to trim it. Whatever you save is shown in full. Leave empty to hide the photo.`}
          >
            <ImageUpload freeShape outputWidth={sectionPhotos.experience.outputWidth} />
          </Form.Item>
          <Form.Item
            label="Photo description"
            name="image_alt"
            extra="Describes the photo for screen readers and Google, e.g. “Dr. Foojan Zeine presenting the Foojan App”."
          >
            <Input />
          </Form.Item>
        </Card>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save Experience
          </Button>
        </div>
      </Form>
    </>
  );
}
