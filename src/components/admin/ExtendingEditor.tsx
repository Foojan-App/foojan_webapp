"use client";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { App, AutoComplete, Button, Card, Form, Input, Switch } from "antd";
import { useState } from "react";
import { updateExtendingApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { ExtendingContent } from "@/services/interface";
import type { ExtendingEditorProps } from "@/types/components";
import IconUpload from "./IconUpload";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";
import ImageUpload from "./ImageUpload";
import { sectionPhotos } from "@/components/sectionPhotos";

const MAX_LINKS = 2;
const required = (message: string) => [{ required: true, message }];
const phoneLines = "| = new line on phones.";

export default function ExtendingEditor({ initial }: ExtendingEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<ExtendingContent>();
  const [saving, setSaving] = useState(false);

  const handleSave = async (values: ExtendingContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateExtendingApi(values));
      message.success("Extending the work saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save Extending the work. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle
        title="Extending the work"
        description="“From theory to institutions” and the IAII, Foojan App and Mira cards."
      />

      <Form<ExtendingContent>
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
            extra={`Enter = new line on computers, ${phoneLines} *Stars* = purple words.`}
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
          </Form.Item>
          <Form.Item label="Paragraph" name="paragraph" rules={required("Enter the paragraph")} extra={phoneLines}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
        </Card>

        <Form.List name="cards">
          {(fields) =>
            fields.map((field, index) => (
              <Card key={field.key} title={`Card ${index + 1}`}>
                <Form.Item name={[field.name, "id"]} hidden>
                  <Input />
                </Form.Item>
                <div className="grid gap-x-4 sm:grid-cols-2">
                  <Form.Item
                    label="Icon"
                    name={[field.name, "icon_url"]}
                    extra="SVG (best), or PNG at least 68 × 68 px with a transparent background. Shown at 34×34. Leave empty to show the text instead."
                  >
                    <IconUpload size={34} />
                  </Form.Item>
                  <Form.Item
                    label="Text instead of icon"
                    name={[field.name, "icon_text"]}
                    extra="Used only when there is no icon, e.g. IAII."
                    rules={[
                      ({ getFieldValue }) => ({
                        validator: (_, value) =>
                          value || getFieldValue(["cards", field.name, "icon_url"])
                            ? Promise.resolve()
                            : Promise.reject(new Error("Upload an icon or enter text")),
                      }),
                    ]}
                  >
                    <Input maxLength={6} />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Small line above the title"
                  name={[field.name, "kicker"]}
                  rules={required("Enter the small line")}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Title" name={[field.name, "title"]} rules={required("Enter the title")}>
                  <Input />
                </Form.Item>
                <Form.Item label="Text" name={[field.name, "body"]} rules={required("Enter the text")}>
                  <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                </Form.Item>

                <Form.List name={[field.name, "links"]}>
                  {(links, { add, remove }) => (
                    <div className="flex flex-col gap-3">
                      <span className="text-[14px]">Links</span>
                      {links.map((link) => (
                        <div
                          key={link.key}
                          className="grid gap-x-4 rounded-lg border border-[#F0F0F0] p-4 pb-0 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-start"
                        >
                          <Form.Item label="Text" name={[link.name, "label"]} rules={required("Enter the link text")}>
                            <Input />
                          </Form.Item>
                          <Form.Item label="Goes to" name={[link.name, "href"]} rules={required("Choose a link")}>
                            <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
                          </Form.Item>
                          <Form.Item label="Outside website ↗" name={[link.name, "external"]} valuePropName="checked">
                            <Switch />
                          </Form.Item>
                          <Form.Item label=" ">
                            <Button
                              danger
                              icon={<DeleteOutlined />}
                              disabled={saving || links.length === 1}
                              onClick={() => remove(link.name)}
                              aria-label="Remove link"
                            />
                          </Form.Item>
                        </div>
                      ))}
                      {links.length < MAX_LINKS && (
                        <Button
                          type="dashed"
                          icon={<PlusOutlined />}
                          onClick={() => add({ label: "", href: "#", external: false })}
                          className="self-start"
                        >
                          Add link
                        </Button>
                      )}
                    </div>
                  )}
                </Form.List>
              </Card>
            ))
          }
        </Form.List>

        <Card title="Link under the cards">
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Form.Item label="Text" name="link_label" rules={required("Enter the link text")}>
              <Input />
            </Form.Item>
            <Form.Item label="Goes to" name="link_href" rules={required("Choose a link")}>
              <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
            </Form.Item>
          </div>
        </Card>

        <Card title="Photo">
          <Form.Item
            label="Photo"
            name="image_url"
            extra={`Upload at least ${sectionPhotos.extending.recommended} wide (JPG or PNG, under 5 MB). Shown under the cards. The crop box starts with the whole photo; use the shape slider only if you want to trim it. Whatever you save is shown in full. Leave empty to hide the photo.`}
          >
            <ImageUpload freeShape outputWidth={sectionPhotos.extending.outputWidth} />
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
            Save Extending the work
          </Button>
        </div>
      </Form>
    </>
  );
}
