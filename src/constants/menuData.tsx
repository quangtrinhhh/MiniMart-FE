import { AiOutlineProduct } from "react-icons/ai"; // Đảm bảo import ở đây
import { MdOutlineCategory } from "react-icons/md";
// import { v4 as uuid } from "uuid";

import { RiBillLine } from "react-icons/ri";

export const Menus = [
  { title: "Dashboard", href: "/admin" },
  {
    title: "Products",
    icon: <AiOutlineProduct />,
    href: null,
    submenu: true,
    submenuItems: [
      { title: "List", href: "/admin/products/list" },
      { title: "Create", href: "/admin/products/create" },
      { title: "Detail", href: "/list" },
    ],
  },
  {
    title: "Categories",
    submenu: true,
    href: null,
    icon: <MdOutlineCategory />,
    submenuItems: [
      { title: "List", href: null },
      { title: "Create", href: null },
      { title: "Detail", href: null },
    ],
  },
  {
    title: "Orders",
    submenu: true,
    href: null,
    icon: <RiBillLine />,
    submenuItems: [
      { title: "List", href: null },
      { title: "Create", href: null },
      { title: "Detail", href: null },
    ],
  },
];
