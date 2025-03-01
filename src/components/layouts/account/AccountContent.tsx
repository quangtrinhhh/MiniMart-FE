"use client";
import AccountInfo from "./AccountInfo";
import AccountOrders from "./AccountOrders";
import ChangePassword from "./ChangePassword";
import AccountAddresses from "./AccountAddresses";

interface AccountContentProps {
  activeSection: string;
}

const AccountContent: React.FC<AccountContentProps> = ({ activeSection }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm px-3 py-4 md:p-6">
      {activeSection === "info" && <AccountInfo />}
      {activeSection === "orders" && <AccountOrders />}
      {activeSection === "changepassword" && <ChangePassword />}
      {activeSection === "addresses" && <AccountAddresses />}
    </div>
  );
};

export default AccountContent;
