import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

// 🟢 Kiểm tra trang đăng nhập/đăng ký
const isAuthPage = (pathname: string) =>
  ["/account/login", "/account/register"].includes(pathname);

// 🟢 Kiểm tra trang cần xác thực (bao gồm checkout)
const isProtectedPage = (pathname: string) => {
  return (
    (pathname.startsWith("/account") &&
      !isAuthPage(pathname) &&
      !pathname.startsWith("/account/verify")) ||
    pathname.startsWith("/checkout")
  );
};

// 🟢 Kiểm tra trang admin
const isAdminPage = (pathname: string) => pathname.startsWith("/dashboard");

export async function middleware(req: NextRequest) {
  try {
    const session = await auth();
    const url = req.nextUrl;
    const { pathname } = url;

    // ✅ Nếu đã đăng nhập → chặn vào trang login/register/verify
    if (
      session &&
      (isAuthPage(pathname) || pathname.startsWith("/account/verify"))
    ) {
      return NextResponse.redirect(new URL("/account", req.url));
    }

    // ✅ Nếu chưa đăng nhập → chặn vào các route bảo vệ
    if (!session && isProtectedPage(pathname)) {
      const loginUrl = new URL("/account/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // ✅ Truy cập admin nhưng không phải admin
    if (isAdminPage(pathname) && session?.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/?error=unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.redirect(new URL("/error", req.url));
  }
}

// ✅ Áp dụng middleware cho các route cần bảo vệ
export const config = {
  matcher: ["/account/:path*", "/dashboard/:path*", "/checkout/:path*"],
};
