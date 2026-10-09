"use client";

import { PlusOutlined } from "@ant-design/icons";
import { App, AutoComplete, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { updateFooterApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { FooterContent } from "@/services/interface";
import type { FooterEditorProps } from "@/types/components";
import IconUpload from "./IconUpload";
import OrderButtons from "./OrderButtons";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";

const required = (message: string) => [{ required: true, message }];

export default function FooterEditor({ initial }: FooterEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<FooterContent>();
  const [saving, setSaving] = useState(false);

  const handleSave = async (values: FooterContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateFooterApi(values));
      message.success("Footer saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the footer. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="Footer" description="The dark area at the very bottom of the website." />

      <Form<FooterContent>
        form={form}
        layout="vertical"
        initialValues={initial}
        onFinish={handleSave}
        disabled={saving}
        requiredMark={false}
        className="flex flex-col gap-6"
      >
        <Card title="Text">
          <Form.Item
            label="Text under the logo"
            name="tagline"
            rules={required("Enter the text")}
            extra="Each line in this box is a line on the website."
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 4 }} />
          </Form.Item>
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Form.Item label="Copyright" name="copyright" rules={required("Enter the copyright line")}>
              <Input />
            </Form.Item>
            <Form.Item label="Address" name="address" rules={required("Enter the address")}>
              <Input />
            </Form.Item>
          </div>
        </Card>

        <Card title="Social media">
          <Form.List name="socials">
            {(fields, { add, remove, move }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    className="mb-4 grid gap-x-3 rounded-lg border border-[#ECE6F0] p-4 sm:grid-cols-[150px_1fr_auto]"
                  >
                    <Form.Item name={[field.name, "id"]} hidden>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Name" name={[field.name, "name"]} rules={required("Enter the name")}>
                      <Input placeholder="Instagram" />
                    </Form.Item>
                    <Form.Item label="Link" name={[field.name, "url"]} rules={required("Enter the profile link")}>
                      <Input placeholder="https://..." />
                    </Form.Item>
                    <div className="sm:mt-7.5">
                      <OrderButtons index={index} count={fields.length} move={move} remove={() => remove(field.name)} />
                    </div>
                    <Form.Item
                      label="Icon"
                      name={[field.name, "icon_url"]}
                      rules={required("Upload an icon")}
                      className="sm:col-span-3"
                      extra="SVG (best), or PNG at least 68 × 68 px with a transparent background. A PNG opens a square crop so the icon fills the space. It is shown at 17×17 in white, like the other icons."
                    >
                      <IconUpload />
                    </Form.Item>
                  </div>
                ))}
                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  onClick={() => add({ name: "", url: "", icon_url: "" })}
                >
                  Add social link
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        <Form.List name="columns">
          {(columnFields) =>
            columnFields.map((columnField) => (
              <Card key={columnField.key} title={`Link column ${columnField.name + 1}`}>
                <Form.Item label="Column title" name={[columnField.name, "title"]} rules={required("Enter the title")}>
                  <Input />
                </Form.Item>
                <Form.List name={[columnField.name, "links"]}>
                  {(fields, { add, remove, move }) => (
                    <>
                      {fields.map((field, index) => (
                        <div
                          key={field.key}
                          className="mb-4 grid gap-x-3 rounded-lg border border-[#ECE6F0] p-4 sm:mb-0 sm:grid-cols-[1fr_1fr_auto] sm:rounded-none sm:border-x-0 sm:border-b-0 sm:px-0 sm:pb-0"
                        >
                          <Form.Item name={[field.name, "id"]} hidden>
                            <Input />
                          </Form.Item>
                          <Form.Item label="Text" name={[field.name, "label"]} rules={required("Enter the text")}>
                            <Input />
                          </Form.Item>
                          <Form.Item label="Goes to" name={[field.name, "href"]} rules={required("Choose a link")}>
                            <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
                          </Form.Item>
                          <div className="sm:mt-7.5">
                            <OrderButtons index={index} count={fields.length} move={move} remove={() => remove(field.name)} />
                          </div>
                        </div>
                      ))}
                      <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add({ label: "", href: "#" })}>
                        Add link
                      </Button>
                    </>
                  )}
                </Form.List>
              </Card>
            ))
          }
        </Form.List>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save footer
          </Button>
        </div>
      </Form>
    </>
  );
}
