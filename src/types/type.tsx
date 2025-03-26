import { Users } from "lucide-react";
import { FaHome, FaUser, FaCog, FaEnvelope } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import {
  MdCategory,
  MdDashboard,
  MdOutlineBorderVertical,
} from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";

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
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-tJ9WruDBMHyYM1cY3h-_PCNRgf5OnXZrqw&s",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: MdDashboard,
      isActive: false,
    },
    {
      title: "Users",
      url: "/dashboard/users ",
      icon: Users,
      isActive: false,
    },
    {
      title: "Products",
      url: "/dashboard/products/list",
      icon: FaProductHunt,
      items: [
        {
          title: "Danh sách sản phẩm",
          url: "/dashboard/products/list",
        },
        {
          title: "Thêm sản phẩm",
          url: "/dashboard/products/create",
        },
      ],
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: MdCategory,
      items: [
        {
          title: "Dánh sách loại sản phầm",
          url: "/dashboard/categories/list",
        },
        {
          title: "Thêm loại sản phẩm",
          url: "/dashboard/categories/create",
        },
      ],
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: MdOutlineBorderVertical,
      items: [
        {
          title: "Đơn hàng",
          url: "/dashboard/orders/list",
        },
      ],
    },
    {
      title: "Mã giảm giá",
      url: "/dashboard/orders",
      icon: RiCoupon2Fill,
      items: [
        {
          title: "Danh sách mã giảm giá",
          url: "/dashboard/coupon/list",
        },
        {
          title: "Thêm mã giảm giá",
          url: "/dashboard/coupon/create",
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
