import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { headers } from "next/headers"; // Import headers từ Next.js

export async function getAccessToken() {
  if (typeof window === "undefined") {
    // 🖥 Server Side: dùng auth()
    const session = await auth(); // Đảm bảo await được sử dụng
    return session?.access_token || null;
  } else {
    // 🌐 Client Side: dùng getSession()
    const session = await getSession();
    return session?.access_token || null;
  }
}
