"use client";
import { Menus } from "@/constants/menuData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";

const SidebarAdmin: React.FC = ({}) => {
  const [open, setOpen] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null); // Trạng thái mới để theo dõi submenu nào đang mở

  const handleSubMenuClick = (index: number) => {
    setActiveSubMenu(activeSubMenu === index ? null : index); // Mở hoặc đóng submenu
  };

  return (
    <div
      className={`bg-white h-screen p-3 pt-5 border-r ${
        open ? "w-72" : "w-20"
      } duration-300 relative`}
    >
      <BsArrowLeftShort
        className={`bg-white text-slate-900 text-2xl rounded-full absolute -right-3 top-3 border border-slate-900 cursor-pointer ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />
      <div className=" flex justify-center items-center">
        <Image
          src="/asset/logo.png"
          alt="Logo"
          width={100}
          height={50}
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
        />
      </div>

      <ul className="pt-2">
        {Menus.map((menu, index) => (
          <li key={index} className=" text-sm ">
            <Link
              href={menu.href || "#"}
              className="flex items-center cursor-pointer p-1 rounded-md hover:bg-slate-100"
              onClick={() => menu.submenu && handleSubMenuClick(index)}
            >
              <div
                className={`w-full flex gap-2 duration-500 ${
                  !open && "flex-col items-center text-xs gap-0"
                }`}
              >
                <span className="text-2xl float-left">
                  {menu.icon ? menu.icon : <AiOutlineDashboard />}
                </span>
                <span
                  className={`font-medium flex-1 duration-500 ${
                    !open ? "text-[10px]" : "text-base"
                  }  `}
                >
                  {menu.title}
                </span>
              </div>
              {menu.submenu && open && (
                <BsChevronDown
                  className={`${activeSubMenu === index && "rotate-180"}`}
                />
              )}
            </Link>

            {menu.submenu && activeSubMenu === index && open && (
              <ul className="pl-6 mt-2">
                {menu.submenuItems.map((submenuItem, subIndex) => (
                  <li
                    key={subIndex}
                    className=" text-sm cursor-pointer p-2 rounded-md hover:bg-slate-100"
                  >
                    <Link href={submenuItem.href || "#"}>
                      {submenuItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarAdmin;
