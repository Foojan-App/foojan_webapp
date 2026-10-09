"use client";

import { Alert, Button, Card, Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { LoginPayload } from "@/services/interface";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: LoginPayload) => {
    setError("");
    setLoading(true);
    try {
      await loginApi(values);
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(errorMessage(err));
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm" styles={{ body: { padding: 32 } }}>
      <Image src="/images/logo.png" alt="Dr. Foojan Zeine" width={106} height={64} priority className="h-14 w-auto" />
      <h1 className="mt-6 font-serif text-[28px] leading-tight font-medium">Admin login</h1>
      <p className="mt-1 mb-6 text-[14px] text-[#4A5163]">Sign in to manage the website content.</p>

      <Form<LoginPayload> layout="vertical" requiredMark={false} onFinish={handleLogin} disabled={loading}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input size="large" autoComplete="email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
          <Input.Password size="large" autoComplete="current-password" />
        </Form.Item>

        {error && <Alert type="error" title={error} showIcon className="mb-4" />}

        <Button type="primary" htmlType="submit" size="large" block loading={loading}>
          Sign in
        </Button>
      </Form>
    </Card>
  );
}
