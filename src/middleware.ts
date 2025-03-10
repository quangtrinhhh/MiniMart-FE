import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

// Hàm kiểm tra trang đăng nhập/đăng ký
const isAuthPage = (pathname: string) =>
  ["/account/login", "/account/register"].includes(pathname);

// Hàm kiểm tra trang cần xác thực
const isProtectedPage = (pathname: string) =>
  pathname.startsWith("/account") && !isAuthPage(pathname);

// Hàm kiểm tra trang admin
const isAdminPage = (pathname: string) => pathname.startsWith("/dashboard");

export async function middleware(req: NextRequest) {
  try {
    const session = await auth(); // Lấy session từ auth.js

    const url = req.nextUrl;
    const { pathname } = url;

    // 🛑 Nếu đã đăng nhập, chặn vào trang đăng nhập/đăng ký
    if (session && isAuthPage(pathname)) {
      return NextResponse.redirect(new URL("/account", req.url));
    }

    // 🛑 Nếu chưa đăng nhập, chặn vào các trang cần xác thực
    if (!session && isProtectedPage(pathname)) {
      return NextResponse.redirect(
        new URL(`/account/login?redirect=${pathname}`, req.url)
      );
    }

    // 🛑 Nếu vào trang admin nhưng KHÔNG phải ADMIN
    if (isAdminPage(pathname)) {
      if (!session || session.user?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/?error=unauthorized", req.url));
      }
    }

    // ✅ Cho phép truy cập nếu không có vấn đề
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    // Chuyển hướng đến trang lỗi nếu có lỗi xảy ra
    return NextResponse.redirect(new URL("/error", req.url));
  }
}

// ✅ Chỉ áp dụng middleware cho các trang cần thiết
export const config = {
  matcher: ["/account/:path*", "/dashboard/:path*"],
};
