import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Users,
} from "lucide-react";
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
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: MdDashboard,
      isActive: false,
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
          url: "/admin/products/add",
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
