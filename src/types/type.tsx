import { FaHome, FaUser, FaCog, FaEnvelope } from "react-icons/fa";

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
