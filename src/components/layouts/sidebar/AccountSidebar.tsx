"use client";

interface AccountSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({
  activeSection,
  setActiveSection,
}) => {
  return (
    <div className="lg:border-r border-neutral-300 pr-6">
      <h5 className="text-lg font-semibold text-secondary">Trang tài khoản</h5>
      <p className="text-gray-600">
        Xin chào, <span className="font-semibold">ttt ttt</span>!
      </p>
      <ul className="space-y-3 mt-5 list-disc pl-4 text-sm">
        {[
          { key: "info", label: "Thông tin tài khoản" },
          { key: "orders", label: "Đơn hàng của bạn" },
          { key: "changepassword", label: "Đổi mật khẩu" },
          { key: "addresses", label: "Sổ địa chỉ (0)" },
          { key: "logout", label: "Đăng xuất", extraClass: "text-error" },
        ].map((item) => (
          <li key={item.key}>
            <button
              className={`font-semibold ${
                activeSection === item.key
                  ? "text-orange-500"
                  : "hover:text-orange-400"
              } ${item.extraClass || ""}`}
              onClick={() => setActiveSection(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSidebar;
