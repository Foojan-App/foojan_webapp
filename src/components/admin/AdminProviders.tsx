"use client";

import { App, ConfigProvider } from "antd";
import type { AdminProvidersProps } from "@/types/components";

const theme = {
  token: {
    colorPrimary: "#102b57",
    colorLink: "#102b57",
    colorText: "#17223c",
    colorBorder: "#d9d0d5",
    borderRadius: 6,
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  },
  components: {
    Button: { primaryShadow: "none" },
    Menu: { itemSelectedBg: "#ede6e4", itemSelectedColor: "#102b57", itemHoverBg: "#f3ecf3" },
    Switch: { colorPrimary: "#102b57" },
  },
};

export default function AdminProviders({ children }: AdminProvidersProps) {
  return (
    <ConfigProvider theme={theme}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
