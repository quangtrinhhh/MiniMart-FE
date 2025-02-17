import type { Metadata } from "next";

import "@/app/styles/globals.css";
import "@/app/styles/style.css";
import SidebarAdmin from "@/components/layouts/sidebar/SidebarAdmin";

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
    <div className="flex h-screen gap-5 bg-[#FFFFFF]">
      <SidebarAdmin />
      <main className="p-3 bg-white w-full h-full">{children}</main>
    </div>
  );
}
