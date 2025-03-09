import { Users } from "lucide-react";
import { FaHome, FaUser, FaCog, FaEnvelope } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { MdCategory, MdDashboard } from "react-icons/md";

export const menuItems = [
  { icon: FaHome, text: "Home", hasSubMenu: false },
  { icon: FaUser, text: "Profile", hasSubMenu: false },
  { icon: FaEnvelope, text: "Messages", hasSubMenu: false },
  {
    icon: FaCog,
    text: "Settings",
    hasSubMenu: true,
    subMenu: ["Submenu 1", "Submenu 2"],
  },
];

export const adminMenuItems = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: MdDashboard,
      isActive: true,
    },
    {
      title: "Products",
      url: "/admin/products/list",
      icon: FaProductHunt,
      items: [
        {
          title: "List Products",
          url: "/admin/products/list",
        },
        {
          title: "Add Products",
          url: "/admin/products/create",
        },
        {
          title: "Edit Products",
          url: "/admin/products/edit",
        },
      ],
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: MdCategory,
      items: [
        {
          title: "List Categories",
          url: "/admin/categories/list",
        },
        {
          title: "Add Categories",
          url: "/admin/categories/create",
        },
      ],
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: MdCategory,
      items: [
        {
          title: "Danh sách Categories",
          url: "#",
        },
        {
          title: "Thêm Categories",
          url: "#",
        },
        {
          title: "Sửa Categories",
          url: "#",
        },
      ],
    },
    {
      title: "Users",
      url: "/admin/users ",
      icon: Users,
      items: [
        {
          title: "Danh sách Categories",
          url: "#",
        },
        {
          title: "Thêm Categories",
          url: "#",
        },
        {
          title: "Sửa Categories",
          url: "#",
        },
      ],
    },
  ],
};

export const CategoryColumns = [
  { key: "name", label: "Category Name", className: "min-w-[250px]" },
  { key: "ID", label: "ID", className: "min-w-[100px]" },
  { key: "sulg", label: "sulg", className: "min-w-[100px]" },
  { key: "description", label: "Description", className: "min-w-[100px]" },
  { key: "status", label: "Status", className: "min-w-[100px]" },
  { key: "created", label: "Created", className: "min-w-[100px]" },
  {
    key: "action",
    label: "Action",
    className: "min-w-[150px] hidden md:table-cell",
  },
];

export const ProductColumns = [
  { key: "name", label: "Product Name", className: "min-w-[350px]" },
  { key: "id", label: "Id", className: "min-w-[100px]" },
  { key: "price", label: "Price", className: "min-w-[100px]" },
  { key: "slug", label: "slug", className: "min-w-[100px]" },
  { key: "description", label: "Description", className: "min-w-[100px]" },
  { key: "sold", label: "Sold", className: "min-w-[100px]" },
  { key: "status", label: "Status", className: "min-w-[100px]" },
  { key: "quantity", label: "quantity", className: "min-w-[100px]" },
  { key: "featured", label: "featured", className: "min-w-[100px]" },
  { key: "discount", label: "Discount", className: "min-w-[100px]" },
  { key: "created", label: "Created", className: "min-w-[100px]" },
  {
    key: "action",
    label: "Action",
    className: "min-w-[150px] hidden md:table-cell",
  },
];
