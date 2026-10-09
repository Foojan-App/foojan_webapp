"use client";

import { PlusOutlined } from "@ant-design/icons";
import { App, AutoComplete, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { updateBooksApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { BooksContent } from "@/services/interface";
import type { BooksEditorProps } from "@/types/components";
import ImageUpload from "./ImageUpload";
import OrderButtons from "./OrderButtons";
import PageTitle from "./PageTitle";
import { pageSections } from "./pageSections";

const COVER_ASPECT = 217 / 308;
const required = (message: string) => [{ required: true, message }];

export default function BooksEditor({ initial }: BooksEditorProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<BooksContent>();
  const [saving, setSaving] = useState(false);

  const handleSave = async (values: BooksContent) => {
    setSaving(true);
    try {
      form.setFieldsValue(await updateBooksApi(values));
      message.success("Books saved");
    } catch (err) {
      message.error(errorMessage(err, "Could not save the books. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle title="Books" description="Author & researcher: the heading, the books and the line under them." />

      <Form<BooksContent>
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
            extra="Enter = new line on computers, | = new line on phones, *stars* = purple words."
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
          <Form.Item label="Paragraph" name="paragraph" rules={required("Enter the paragraph")}>
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
        </Card>

        <Card title="Books">
          <Form.List name="books">
            {(fields, { add, remove, move }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} className="mb-4 rounded-lg border border-[#ECE6F0] p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="text-[14px] font-semibold">Book {index + 1}</span>
                      <OrderButtons index={index} count={fields.length} move={move} remove={() => remove(field.name)} />
                    </div>
                    <Form.Item name={[field.name, "id"]} hidden>
                      <Input />
                    </Form.Item>
                    <div className="grid gap-x-5 md:grid-cols-[auto_1fr]">
                      <Form.Item
                        label="Cover"
                        name={[field.name, "cover_url"]}
                        rules={required("Upload the cover")}
                        extra="Upload at least 600 × 852 px. All covers use the same shape so the row lines up."
                      >
                        <ImageUpload aspect={COVER_ASPECT} outputWidth={600} />
                      </Form.Item>
                      <div>
                        <div className="grid gap-x-4 sm:grid-cols-2">
                          <Form.Item
                            label="Category"
                            name={[field.name, "category"]}
                            rules={required("Enter the category")}
                          >
                            <Input placeholder="Leadership" />
                          </Form.Item>
                          <Form.Item label="Title" name={[field.name, "title"]} rules={required("Enter the title")}>
                            <Input />
                          </Form.Item>
                        </div>
                        <Form.Item
                          label="Short description"
                          name={[field.name, "description"]}
                          rules={required("Enter the description")}
                        >
                          <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} maxLength={90} showCount />
                        </Form.Item>
                        <Form.Item
                          label="Link (where the book opens)"
                          name={[field.name, "link"]}
                          rules={required("Enter a link")}
                        >
                          <Input placeholder="https://www.amazon.com/..." />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  onClick={() => add({ category: "", title: "", description: "", cover_url: "", link: "#" })}
                >
                  Add book
                </Button>
              </>
            )}
          </Form.List>
        </Card>

        <Card title="Line under the books">
          <Form.Item
            label="Text"
            name="footer_text"
            rules={required("Enter the text")}
            extra="Put words between **two stars** to make them bold."
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
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

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save books
          </Button>
        </div>
      </Form>
    </>
  );
}
