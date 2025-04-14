import { useState, useMemo, useCallback } from "react";
import { useSidebar } from "@/context/SidebarContext";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import { useMenu } from "@/app/api/categories/useCategries";
import { Category } from "@/types/backend";

const NavigationVertical: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const { data, isLoading, error } = useMenu();

  const menuItems = useMemo(() => {
    return Array.isArray(data?.data.result) ? data.data.result : [];
  }, [data]);

  const handleToggleSubmenu = useCallback(
    (id: number, children: Category[] | undefined) => {
      if (children && children.length > 0) {
        setOpenSubmenu((prev) => (prev === id ? null : id));
      }
    },
    []
  );

  if (isLoading) return <p className="px-6 py-4 text-gray-500">Đang tải...</p>;
  if (error)
    return <p className="px-6 py-4 text-red-500">Lỗi khi tải danh mục</p>;

  return (
    <div className="flex-grow overflow-y-auto no-scrollbar bg-white shadow-inner">
      <ul className="relative text-[15px]">
        <li
          className="px-6 group hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 cursor-pointer border-b"
          onClick={toggleSidebar}
        >
          <Link
            href="/collections"
            className="flex items-center gap-3.5 py-4 font-semibold text-gray-800"
          >
            Tất cả sản phẩm
          </Link>
        </li>

        {menuItems.map((item) => (
          <li
            key={item.id}
            className="relative px-6 group border-b hover:bg-gray-50 transition-colors duration-200"
          >
            {!item.children || item.children.length === 0 ? (
              <Link href={`/collections/${item.slug}`} passHref>
                <div className="flex items-center gap-3.5 py-4 font-medium text-gray-700 hover:text-black transition-colors">
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
              <div
                className="flex items-center justify-between gap-3.5 py-4 font-medium text-gray-700 hover:text-black transition-colors cursor-pointer"
                onClick={() => handleToggleSubmenu(item.id, item.children)}
              >
                <span>{item.name}</span>
                <MdArrowForwardIos
                  size={16}
                  className={`transition-transform duration-300 ${
                    openSubmenu === item.id
                      ? "rotate-90 text-black"
                      : "rotate-0 text-gray-400"
                  }`}
                />
              </div>
            )}

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSubmenu === item.id
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {item.children && (
                <ul className="pl-3 pr-2 py-2 bg-gray-50 rounded-md text-[14px]">
                  <li className="px-2 py-2 hover:bg-gray-100 rounded-md transition-colors">
                    <Link
                      href={`/collections/${item.slug}`}
                      className="block text-gray-700"
                    >
                      {item.name}
                    </Link>
                  </li>
                  {item.children.map((subItem: Category) => (
                    <li
                      key={subItem.id}
                      className="px-2 py-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Link
                        href={`/collections/${subItem.slug}`}
                        className="block text-gray-700"
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationVertical;
