import type { Metadata } from "next";

import "@/app/styles/globals.css";
import "@/app/styles/style.css";
import { quicksand } from "@/fonts";
import NextAuthWrapper from "@/lib/next_auth.wrapper";
import { ReactQueryProvider } from "@/context/ReactQueryProvider";
import { ConfigProvider } from "antd";

export const metadata: Metadata = {
  title: "EGA Mini Mart",
  description: "EGA Mini Mart",
  icons: {
    icon: "/asset/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased w-full h-full overflow-auto`}
        style={{ fontFamily: quicksand.style.fontFamily }}
      >
        <ConfigProvider theme={{}}>
          <NextAuthWrapper>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NextAuthWrapper>
        </ConfigProvider>
      </body>
    </html>
  );
}
