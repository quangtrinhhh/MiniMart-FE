import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(req: NextRequest) {
  try {
    const session = await auth(); // Lấy session từ auth.js
    console.log("Session:", session); // Debug session

    const url = req.nextUrl;
    const isAuthPage = ["/account/login", "/account/register"].includes(
      url.pathname
    );
    const isProtectedPage = url.pathname.startsWith("/account") && !isAuthPage;
    const isAdminPage = url.pathname.startsWith("/admin");

    // 🛑 Nếu đã đăng nhập, chặn vào login/register
    if (session && isAuthPage) {
      return NextResponse.redirect(new URL("/account", req.url));
    }

    // 🛑 Nếu chưa đăng nhập, chặn vào các trang cần xác thực
    if (!session && isProtectedPage) {
      return NextResponse.redirect(new URL("/account/login", req.url));
    }

    // 🛑 Nếu vào /admin nhưng KHÔNG phải ADMIN
    if (isAdminPage) {
      if (!session || session.user?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.redirect(new URL("/account/login", req.url));
  }
}

// ✅ Chỉ áp dụng middleware cho các trang cần thiết
export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};
