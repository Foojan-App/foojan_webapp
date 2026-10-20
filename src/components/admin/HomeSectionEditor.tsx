"use client";

import { App, Button, Card, Form } from "antd";
import { useState } from "react";
import { updateHomeSectionApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { HomeSectionEditorProps } from "@/types/components";
import HomeFieldInput from "./HomeFieldInput";
import { findHomeSection } from "./homeSections";
import PageTitle from "./PageTitle";

export default function HomeSectionEditor({ sectionKey, initial }: HomeSectionEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const section = findHomeSection(sectionKey);
  if (!section) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateHomeSectionApi(sectionKey, form.getFieldsValue(true)));
      message.success(`${section.label} saved`);
    } catch (err) {
      message.error(errorMessage(err, "Could not save. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title={section.label} description={section.description} />
      <Form form={form} layout="vertical" initialValues={initial} onFinish={handleSave} disabled={saving} requiredMark={false} className="flex flex-col gap-6">
        {section.cards.map((card) => (
          <Card key={card.title} title={card.title}>
            {card.description && <p className="mb-4 text-[14px] text-[#4A5163]">{card.description}</p>}
            {card.fields.map((field) => (
              <HomeFieldInput key={field.name} field={field} path={[field.name]} />
            ))}
          </Card>
        ))}
        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save {section.label.toLowerCase()}
          </Button>
        </div>
      </Form>
    </>
  );
}
