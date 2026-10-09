"use client";

import { App, AutoComplete, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { updateContactBandApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { ContactBandContent } from "@/services/interface";
import type { ContactBandEditorProps } from "@/types/components";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";

const required = (message: string) => [{ required: true, message }];
const linesHelp = "Press Enter for a new line on computers. Type | for a new line on phones.";
const linkOptions = [{ value: "mailto:", label: "mailto: — opens an email (add the address after it)" }, ...pageSections];

export default function ContactBandEditor({ initial }: ContactBandEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<ContactBandContent>();
  const [saving, setSaving] = useState(false);

  const handleSave = async (values: ContactBandContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateContactBandApi(values));
      message.success("Contact band saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the contact band. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="Contact band" description="The purple box near the bottom with the contact buttons." />

      <Form<ContactBandContent>
        form={form}
        layout="vertical"
        initialValues={initial}
        onFinish={handleSave}
        disabled={saving}
        requiredMark={false}
        className="flex flex-col gap-6"
      >
        <Card title="Text">
          <Form.Item label="Heading" name="heading" rules={required("Enter the heading")} extra={linesHelp}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
          <Form.Item label="Paragraph" name="paragraph" rules={required("Enter the paragraph")} extra={linesHelp}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} />
          </Form.Item>
        </Card>

        <Card title="Buttons">
          {(["primary_button", "secondary_button"] as const).map((name, index) => (
            <div key={name} className="grid gap-x-4 sm:grid-cols-2">
              <Form.Item
                label={index === 0 ? "White button text" : "Outline button text"}
                name={`${name}_label`}
                rules={required("Enter the button text")}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Goes to"
                name={`${name}_href`}
                rules={required("Choose a link")}
                extra={index === 0 ? "For email use mailto:name@example.com" : undefined}
              >
                <AutoComplete options={linkOptions} placeholder="Choose a section, email or URL" />
              </Form.Item>
            </div>
          ))}
        </Card>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save contact band
          </Button>
        </div>
      </Form>
    </>
  );
}
