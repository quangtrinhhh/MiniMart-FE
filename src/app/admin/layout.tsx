import type { Metadata } from "next";

import "@/app/styles/globals.css";
import "@/app/styles/style.css";
import { AppSidebar } from "@/components/layouts/sidebar/sidebar.admin";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Admin ",
  description: "Admin",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#FFFFFF]">
      <SidebarProvider>
        {/* Sidebar giữ nguyên kích thước, không co giãn */}
        <AppSidebar />
        {/* Main container chiếm phần còn lại */}
        <div className="flex flex-col flex-1 h-screen overflow-hidden bg-[#E2E8F0]">
          <SidebarTrigger />
          {/* Nội dung cuộn riêng, tránh ảnh hưởng từ các thành phần khác */}
          <div className="p-3 flex-1 overflow-auto">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}
