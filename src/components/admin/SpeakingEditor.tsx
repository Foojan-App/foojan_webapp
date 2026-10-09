"use client";

import { PlusOutlined } from "@ant-design/icons";
import { App, AutoComplete, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import AccentText from "@/components/AccentText";
import { updateSpeakingApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { SpeakingContent } from "@/services/interface";
import type { SpeakingEditorProps } from "@/types/components";
import OrderButtons from "./OrderButtons";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";
import ImageUpload from "./ImageUpload";
import { sectionPhotos } from "@/components/sectionPhotos";

const required = (message: string) => [{ required: true, message }];

export default function SpeakingEditor({ initial }: SpeakingEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<SpeakingContent>();
  const [saving, setSaving] = useState(false);
  const heading = Form.useWatch("heading", form) ?? initial.heading;

  const handleSave = async (values: SpeakingContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateSpeakingApi(values));
      message.success("Speaking section saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the Speaking section. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="Speaking" description="Speaking & education: text, button, formats and signature topics." />

      <Form<SpeakingContent>
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
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
          <div className="mb-6 rounded-lg bg-[#F7F2FB] p-5">
            <p className="mb-2 text-[12px] font-semibold text-[#687080] uppercase">Heading preview</p>
            <p className="font-serif text-[28px] leading-[1.2] font-medium text-plum-950">
              <AccentText text={heading} />
            </p>
          </div>
          <Form.Item
            label="Paragraph"
            name="paragraph"
            rules={required("Enter the paragraph")}
            extra="Press Enter where a new line should start on computer screens. Phones wrap the text automatically."
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Form.Item label="Button text" name="button_label" rules={required("Enter the button text")}>
              <Input />
            </Form.Item>
            <Form.Item label="Button goes to" name="button_href" rules={required("Choose a link")}>
              <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
            </Form.Item>
          </div>
        </Card>

        <Card
          title="Formats"
          extra={<span className="text-[13px] text-[#687080]">Shown in a row under the button</span>}
        >
          <Form.List name="formats">
            {(fields, { add, remove, move }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    className="mb-4 grid gap-x-3 rounded-lg border border-line p-4 sm:mb-0 sm:grid-cols-[1fr_1fr_auto] sm:rounded-none sm:border-x-0 sm:border-b-0 sm:px-0 sm:pb-0 sm:first-of-type:border-t-0"
                  >
                    <Form.Item name={[field.name, "id"]} hidden>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Title" name={[field.name, "title"]} rules={required("Enter a title")}>
                      <Input placeholder="Keynotes" />
                    </Form.Item>
                    <Form.Item label="Text below" name={[field.name, "body"]} rules={required("Enter the text")}>
                      <Input placeholder="Conferences & events" />
                    </Form.Item>
                    <div className="sm:mt-7.5">
                      <OrderButtons index={index} count={fields.length} move={move} remove={() => remove(field.name)} />
                    </div>
                  </div>
                ))}
                <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add({ title: "", body: "" })}>
                  Add format
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        <Card title="Signature topics">
          <Form.Item label="Box title" name="topics_title" rules={required("Enter the title")}>
            <Input />
          </Form.Item>
          <Form.List name="topics">
            {(fields, { add, remove, move }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} className="grid grid-cols-[1fr_auto] items-start gap-x-3">
                    <Form.Item name={[field.name, "id"]} hidden>
                      <Input />
                    </Form.Item>
                    <Form.Item name={[field.name, "label"]} rules={required("Enter a topic")}>
                      <Input placeholder={`Topic ${index + 1}`} />
                    </Form.Item>
                    <OrderButtons index={index} count={fields.length} move={move} remove={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add({ label: "" })}>
                  Add topic
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        <Card title="Photo">
          <Form.Item
            label="Photo"
            name="image_url"
            extra={`Upload at least ${sectionPhotos.speaking.recommended} wide (JPG or PNG, under 5 MB). Shown full width under the Speaking section. The crop box starts with the whole photo; use the shape slider only if you want to trim it. Whatever you save is shown in full. Leave empty to hide the photo.`}
          >
            <ImageUpload freeShape outputWidth={sectionPhotos.speaking.outputWidth} />
          </Form.Item>
          <Form.Item
            label="Photo description"
            name="image_alt"
            extra="Describes the photo for screen readers and Google, e.g. “Dr. Foojan Zeine speaking to a professional audience”."
          >
            <Input />
          </Form.Item>
        </Card>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save Speaking
          </Button>
        </div>
      </Form>
    </>
  );
}
