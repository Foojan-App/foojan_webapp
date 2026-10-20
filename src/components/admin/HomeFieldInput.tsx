"use client";

import { PlusOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Form, Input, InputNumber, Switch } from "antd";
import type { HomeFieldInputProps } from "@/types/components";
import { FieldKind } from "@/types/enums";
import ImageUpload from "./ImageUpload";
import OrderButtons from "./OrderButtons";
import { pageSections } from "./pageSections";

export default function HomeFieldInput({ field, path }: HomeFieldInputProps) {
  const rules = field.optional ? [] : [{ required: true, message: `Enter the ${field.label.toLowerCase()}` }];

  switch (field.kind) {
    case FieldKind.Text:
      return (
        <Form.Item label={field.label} name={path} rules={rules} extra={field.help}>
          <Input />
        </Form.Item>
      );
    case FieldKind.TextArea:
      return (
        <Form.Item label={field.label} name={path} rules={rules} extra={field.help}>
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 10 }} />
        </Form.Item>
      );
    case FieldKind.Link:
      return (
        <Form.Item label={field.label} name={path} rules={rules} extra={field.help ?? "Choose a section or type a link. Use # if there is no link yet."}>
          <AutoComplete options={pageSections} placeholder="#section, /page or https://…" />
        </Form.Item>
      );
    case FieldKind.Number:
      return (
        <Form.Item label={field.label} name={path} extra={field.help}>
          <InputNumber min={0} step={0.1} className="w-40!" />
        </Form.Item>
      );
    case FieldKind.Toggle:
      return (
        <Form.Item label={field.label} name={path} valuePropName="checked">
          <Switch size="small" />
        </Form.Item>
      );
    case FieldKind.Image:
      return (
        <Form.Item label={field.label} name={path} rules={rules} extra={field.help}>
          <ImageUpload aspect={field.aspect} outputWidth={field.outputWidth ?? 1600} freeShape={field.freeShape} />
        </Form.Item>
      );
    case FieldKind.Group:
      return (
        <div className="mb-6 rounded-lg border border-[#E5DFE3] p-4 pb-0">
          <p className="mb-3 text-[13px] font-semibold text-[#4A5163]">{field.label}</p>
          {field.fields?.map((sub) => (
            <HomeFieldInput key={sub.name} field={sub} path={[...path, sub.name]} />
          ))}
        </div>
      );
    case FieldKind.TextList:
      return (
        <Form.List name={path}>
          {(items, { add, remove, move }) => (
            <div className="mb-6">
              {items.map((item, index) => (
                <div key={item.key} className="flex items-start gap-3">
                  <Form.Item
                    label={`${field.itemLabel ?? field.label} ${index + 1}`}
                    name={[item.name]}
                    rules={[{ required: true, message: "Enter the text or delete this row" }]}
                    extra={index === 0 ? field.help : undefined}
                    className="flex-1"
                  >
                    <Input.TextArea autoSize={{ minRows: 1, maxRows: 8 }} />
                  </Form.Item>
                  <div className="pt-7.5">
                    <OrderButtons index={index} count={items.length} move={move} remove={() => remove(item.name)} />
                  </div>
                </div>
              ))}
              <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add("")}>
                Add {(field.itemLabel ?? field.label).toLowerCase()}
              </Button>
            </div>
          )}
        </Form.List>
      );
    case FieldKind.List:
      return (
        <Form.List name={path}>
          {(items, { add, remove, move }) => (
            <div className="mb-6 flex flex-col gap-4">
              {items.map((item, index) => (
                <div key={item.key} className="rounded-lg border border-[#E5DFE3] p-4 pb-0">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[14px] font-semibold">
                      {field.itemLabel ?? field.label} {index + 1}
                    </p>
                    <OrderButtons index={index} count={items.length} move={move} remove={() => remove(item.name)} />
                  </div>
                  {field.fields?.map((sub) => (
                    <HomeFieldInput key={sub.name} field={sub} path={[item.name, sub.name]} />
                  ))}
                </div>
              ))}
              <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add({})}>
                Add {(field.itemLabel ?? field.label).toLowerCase()}
              </Button>
            </div>
          )}
        </Form.List>
      );
    default:
      return null;
  }
}
