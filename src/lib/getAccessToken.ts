import { auth } from "@/auth";
import { getSession } from "next-auth/react";

export async function getAccessToken() {
  if (typeof window === "undefined") {
    // 🖥 Server Side: dùng auth()
    const session = await auth();
    return session?.access_token || null;
  } else {
    // 🌐 Client Side: dùng getSession()
    const session = await getSession();
    return session?.access_token || null;
  }
}
