import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { v4 as uuid } from "uuid";

import { RiBillLine } from "react-icons/ri";
import { LuChartNoAxesCombined } from "react-icons/lu";

export const Menus = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: <LuChartNoAxesCombined />,
    href: "/admin",
  },
  {
    id: uuid(),
    title: "Products",
    icon: <AiOutlineProduct />,
    active: true,
    href: null,
    submenu: true,
    submenuItems: [
      { id: uuid(), title: "List", href: "/admin/products/list", active: true },
      {
        id: uuid(),
        title: "Create",
        href: "/admin/products/create",
        active: true,
      },
      {
        id: uuid(),
        title: "Detail",
        href: "/admin/products/detail",
        active: true,
      },
    ],
  },
  {
    id: uuid(),
    title: "Categories",
    submenu: true,
    href: null,
    icon: <MdOutlineCategory />,
    submenuItems: [
      { id: uuid(), title: "List", href: "/admin/categories/list" },
      { id: uuid(), title: "Create", href: "/admin/categories/create" },
    ],
  },
  {
    id: uuid(),
    title: "Orders",
    submenu: true,
    href: null,
    icon: <RiBillLine />,
    submenuItems: [
      { id: uuid(), title: "List", href: null },
      { id: uuid(), title: "Create", href: null },
      { id: uuid(), title: "Detail", href: null },
    ],
  },
  {
    id: uuid(),
    title: "Ecommerce",
    icon: <GiShoppingCart />,
    href: "/",
  },
];
