"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logoutApi } from "@/services/ApiCollection";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logoutApi().catch(() => undefined);
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <Button onClick={handleLogout} loading={loading}>
      Log out
    </Button>
  );
}
