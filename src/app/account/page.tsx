"use client";
import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AccountSidebar from "@/components/layouts/sidebar/AccountSidebar";
import AccountContent from "@/components/layouts/account/AccountContent";

const PageAccount: React.FC = () => {
  const [activeSection, setActiveSection] = useState("info");

  return (
    <div className="bg-[#f2f6f3] pb-10">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto p-3">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_9fr] gap-6">
          {/* Truyền activeSection vào Sidebar */}
          <AccountSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <AccountContent activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
};

export default PageAccount;
