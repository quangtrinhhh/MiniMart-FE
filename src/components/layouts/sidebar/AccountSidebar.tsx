"use client";

import { useUsers } from "@/api/users/useUsers";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface AccountSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const { user } = useUsers();
  return (
    <div className="lg:border-r border-neutral-300 pr-6">
      <h5 className="text-lg font-semibold text-secondary">Trang tài khoản</h5>
      <p className="text-gray-600">
        Xin chào,{" "}
        <span className="font-semibold">
          {user?.first_name + " " + user?.last_name}
        </span>
        !
      </p>
      <ul className="space-y-3 mt-5 list-disc pl-4 text-sm">
        {[
          { key: "info", label: "Thông tin tài khoản" },
          { key: "orders", label: "Đơn hàng của bạn" },
          { key: "changepassword", label: "Đổi mật khẩu" },
          { key: "addresses", label: "Sổ địa chỉ (0)" },
        ].map((item) => (
          <li key={item.key}>
            <button
              className={`font-semibold ${
                activeSection === item.key
                  ? "text-orange-500"
                  : "hover:text-orange-400"
              }`}
              onClick={() => setActiveSection(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}

        {/* Xử lý riêng cho Đăng xuất */}
        {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
          <li>
            <Link
              href="/dashboard"
              className="font-semibold text-error hover:text-red-600"
            >
              Đến Admin
            </Link>
          </li>
        )}

        <li>
          <button
            className="font-semibold text-error hover:text-red-600"
            onClick={() => signOut()}
          >
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;
