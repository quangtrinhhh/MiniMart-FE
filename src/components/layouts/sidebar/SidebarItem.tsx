import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";

interface SidebarItemProps {
  item: MenuItem;
  isCollapsed: boolean;
  openSubMenu: string | null;
  toggleSubMenu: (id: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isCollapsed,
  openSubMenu,
  toggleSubMenu,
}) => {
  const isOpen = openSubMenu === item.id;
  const hasSubMenu = item.subMenus && item.subMenus.length > 0;

  return (
    <li>
      <Link
        href={item.href || "#"}
        className="flex items-center p-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-200"
        onClick={(e) => {
          if (hasSubMenu) {
            e.preventDefault();
            toggleSubMenu(item.id);
          }
        }}
      >
        <span className="text-2xl">{item.icon}</span>
        {!isCollapsed && (
          <span className="ml-3 text-lg font-medium">{item.name}</span>
        )}
        {hasSubMenu && !isCollapsed && (
          <span className="ml-auto">
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        )}
      </Link>

      {/* Submenu */}
      {hasSubMenu && isOpen && !isCollapsed && (
        <ul className="ml-6 mt-2 space-y-1">
          {item.subMenus.map((sub) => (
            <SidebarItem
              key={sub.id}
              item={sub}
              isCollapsed={isCollapsed}
              openSubMenu={openSubMenu}
              toggleSubMenu={toggleSubMenu}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
