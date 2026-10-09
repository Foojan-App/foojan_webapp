"use client";

import { PlusOutlined } from "@ant-design/icons";
import { App, AutoComplete, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { updateMediaApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { MediaContent } from "@/services/interface";
import type { MediaEditorProps } from "@/types/components";
import IconUpload from "./IconUpload";
import OrderButtons from "./OrderButtons";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";

const required = (message: string) => [{ required: true, message }];

export default function MediaEditor({ initial }: MediaEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<MediaContent>();
  const [saving, setSaving] = useState(false);

  const handleSave = async (values: MediaContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateMediaApi(values));
      message.success("Media section saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the Media section. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="Media" description="Media & thought leadership: the featured show and the media cards." />

      <Form<MediaContent>
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
            extra="Enter = new line on computers, | = new line on phones, *stars* = purple words."
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
        </Card>

        <Card title="Featured show (dark box)">
          <Form.Item label="Small gold line" name="featured_eyebrow" rules={required("Enter the small line")}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Title"
            name="featured_title"
            rules={required("Enter the title")}
            extra="Each line in this box is a line on the website."
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
          </Form.Item>
          <Form.Item
            label="Text"
            name="featured_text"
            rules={required("Enter the text")}
            extra="Press Enter where a new line should start on computer screens."
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Form.Item label="Button text" name="featured_button_label" rules={required("Enter the button text")}>
              <Input />
            </Form.Item>
            <Form.Item label="Button goes to" name="featured_button_href" rules={required("Enter a link")}>
              <AutoComplete options={pageSections} placeholder="https://youtube.com/..." />
            </Form.Item>
          </div>
        </Card>

        <Card title="Media cards">
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
                    <Form.Item
                      label="Icon"
                      name={[field.name, "icon_url"]}
                      rules={required("Upload an icon")}
                      extra="SVG (best), or PNG at least 68 × 68 px with a transparent background. Shown at 22×22 in white on the purple square."
                    >
                      <IconUpload size={22} />
                    </Form.Item>
                    <div className="grid gap-x-4 sm:grid-cols-2">
                      <Form.Item label="Small purple line" name={[field.name, "kicker"]} rules={required("Enter the small line")}>
                        <Input placeholder="Podcast" />
                      </Form.Item>
                      <Form.Item label="Title" name={[field.name, "title"]} rules={required("Enter the title")}>
                        <Input />
                      </Form.Item>
                    </div>
                    <Form.Item
                      label="Text"
                      name={[field.name, "body"]}
                      rules={required("Enter the text")}
                      extra="One short line fits best. Press Enter for a second line on computers (the card gets taller)."
                    >
                      <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }} />
                    </Form.Item>
                    <Form.Item label="Card goes to" name={[field.name, "link"]} rules={required("Enter a link")}>
                      <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
                    </Form.Item>
                  </div>
                ))}
                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  onClick={() => add({ kicker: "", title: "", body: "", link: "#", icon_url: "" })}
                >
                  Add card
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save Media
          </Button>
        </div>
      </Form>
    </>
  );
}
