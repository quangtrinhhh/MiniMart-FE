import type { Metadata } from "next";

import "@/app/styles/globals.css";
import "@/app/styles/style.css";
import { quicksand } from "@/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        {children}
      </body>
    </html>
  );
}
