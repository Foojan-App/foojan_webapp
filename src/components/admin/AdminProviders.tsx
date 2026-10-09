"use client";

import { App, ConfigProvider } from "antd";
import type { AdminProvidersProps } from "@/types/components";

const theme = {
  token: {
    colorPrimary: "#942ba9",
    colorText: "#1a002b",
    colorBorder: "#e8e1d5",
    borderRadius: 6,
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  },
  components: {
    Button: { primaryShadow: "none" },
  },
};

export default function AdminProviders({ children }: AdminProvidersProps) {
  return (
    <ConfigProvider theme={theme}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
