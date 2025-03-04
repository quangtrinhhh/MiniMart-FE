"use client";

import { CiUser } from "react-icons/ci";
import { useSidebar } from "@/context/SidebarContext";
import { IoIosClose } from "react-icons/io";
import FoorterSidebar from "./FoorterSidebar";
import NavigationVertical from "./NavigationVertical";
import Link from "next/link";
import { IUser } from "@/types/next-auth";

interface Session {
  user: IUser;
}

interface SidebarProps {
  session?: Session | null;
}
const Sidebar: React.FC<SidebarProps> = ({ session }) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="relative">
      {/* Overlay (Vùng tối) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-50"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-[400px] h-full bg-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[400px]"
        } transition-transform duration-300 z-50 overflow-y-auto flex flex-col`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-3 hover:bg-neutral-200 active:scale-95 transition-all duration-150 px-2 py-1 rounded-sm cursor-pointer">
            <div className="border p-1 rounded-lg">
              <CiUser size={25} />
            </div>
            <Link
              href="/account/login"
              className="flex flex-col"
              onClick={toggleSidebar}
            >
              <span className="text-xs">Tài khoản</span>
              <span className="font-semibold text-sm">
                {!session ? "Đăng nhập" : session.user.name}
              </span>
            </Link>
          </div>
          <button
            onClick={toggleSidebar}
            className="border rounded-full p-1 w-8 h-8 flex justify-center items-center hover:bg-[#ebebeb]"
          >
            <IoIosClose size={25} />
          </button>
        </div>

        {/* Navigation */}
        <NavigationVertical />

        {/* Footer */}
        <FoorterSidebar />
      </div>
    </div>
  );
};

export default Sidebar;
