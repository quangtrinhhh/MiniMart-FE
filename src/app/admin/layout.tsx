import type { Metadata } from "next";

import "@/app/styles/globals.css";
import "@/app/styles/style.css";
import SidebarAdmin from "@/components/layouts/sidebar/SidebarAdmin";
import HeaderAdmin from "@/components/layouts/header/HeaderAdmin";

export const metadata: Metadata = {
  title: "Admin ",
  description: "Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#FFFFFF]">
      {/* Sidebar giữ nguyên kích thước, không co giãn */}
      <SidebarAdmin />

      {/* Main container chiếm phần còn lại */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden bg-[#E2E8F0]">
        <HeaderAdmin />

        {/* Nội dung cuộn riêng, tránh ảnh hưởng từ các thành phần khác */}
        <div className="p-3 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
