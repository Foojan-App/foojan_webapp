"use client";

import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { App, AutoComplete, Button, Card, Form, Input, Switch, Tooltip } from "antd";
import { useState } from "react";
import { updateHeaderApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { HeaderContent } from "@/services/interface";
import type { HeaderEditorProps } from "@/types/components";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";

export default function HeaderEditor({ initial }: HeaderEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<HeaderContent>();
  const [saving, setSaving] = useState(false);

  const initialValues: HeaderContent = {
    menu: initial.menu.map((item) => ({ ...item, visible: item.visible !== false })),
  };

  const handleSave = async (values: HeaderContent) => {
    setSaving(true);
    try {
      const saved = await updateHeaderApi(values);
      form.setFieldsValue({ menu: saved.menu.map((item) => ({ ...item, visible: item.visible !== false })) });
      message.success("Header menu saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the menu. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="Header menu" description="Links shown in the navigation at the top of the website." />

      <Form<HeaderContent> form={form} initialValues={initialValues} onFinish={handleSave} disabled={saving}>
        <Form.List name="menu">
          {(fields, { add, remove, move }) => (
            <Card>
              <div className="hidden grid-cols-[1fr_1fr_auto_auto] gap-3 pb-2 text-[12px] font-semibold text-[#687080] uppercase sm:grid">
                <span>Label</span>
                <span>Link</span>
                <span className="w-14 text-center">Show</span>
                <span className="w-27">Order</span>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.key}
                  className="mb-4 grid grid-cols-1 gap-x-3 rounded-lg border border-[#ECE6F0] p-4 sm:mb-0 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-start sm:rounded-none sm:border-x-0 sm:border-b-0 sm:px-0 sm:pb-0 sm:first-of-type:border-t-0"
                >
                  <div className="order-first mb-3 flex items-center justify-between gap-1 sm:order-none sm:mb-6">
                    <span className="text-[13px] font-semibold text-[#687080] sm:hidden">Link {index + 1}</span>
                    <div className="flex gap-1">
                      <Tooltip title="Move up">
                        <Button icon={<ArrowUpOutlined />} disabled={index === 0} onClick={() => move(index, index - 1)} />
                      </Tooltip>
                      <Tooltip title="Move down">
                        <Button
                          icon={<ArrowDownOutlined />}
                          disabled={index === fields.length - 1}
                          onClick={() => move(index, index + 1)}
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                      </Tooltip>
                    </div>
                  </div>
                  <Form.Item name={[field.name, "id"]} hidden>
                    <Input />
                  </Form.Item>
                  <div className="sm:order-first">
                    <span className="mb-1 block text-[13px] font-semibold sm:hidden">Label</span>
                    <Form.Item name={[field.name, "label"]} rules={[{ required: true, message: "Enter a label" }]}>
                      <Input placeholder="About" />
                    </Form.Item>
                  </div>
                  <div className="sm:-order-1">
                    <span className="mb-1 block text-[13px] font-semibold sm:hidden">Link</span>
                    <Form.Item name={[field.name, "href"]} rules={[{ required: true, message: "Choose or type a link" }]}>
                      <AutoComplete options={pageSections} placeholder="Choose a section or type a URL" />
                    </Form.Item>
                  </div>
                  <div className="flex items-center gap-3 sm:-order-1 sm:w-14 sm:justify-center">
                    <span className="text-[13px] font-semibold sm:hidden">Show on website</span>
                    <Form.Item name={[field.name, "visible"]} valuePropName="checked" className="mb-0! sm:mb-6!">
                      <Switch size="small" />
                    </Form.Item>
                  </div>
                </div>
              ))}

              <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add({ label: "", href: "#", visible: true })}>
                Add link
              </Button>
            </Card>
          )}
        </Form.List>

        <div className="mt-6 flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save menu
          </Button>
        </div>
      </Form>
    </>
  );
}
