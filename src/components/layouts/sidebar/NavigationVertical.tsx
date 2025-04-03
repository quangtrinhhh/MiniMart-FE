import { useState, useMemo, useCallback } from "react";
import { useSidebar } from "@/context/SidebarContext";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import { useCategories } from "@/app/api/categories/useCategries";
import { Category } from "@/types/backend"; // Giả sử kiểu Category đã được định nghĩa ở đây

const NavigationVertical: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [current] = useState(1);
  const [pageSize] = useState(10);
  const [filter] = useState("");

  const { data, isLoading, error } = useCategories(filter, current, pageSize);

  const menuItems = useMemo(() => {
    return Array.isArray(data?.data.result) ? data.data.result : [];
  }, [data]);

  // Kiểu Category cho children
  const handleToggleSubmenu = useCallback(
    (id: number, children: Category[] | undefined) => {
      if (children && children.length > 0) {
        // Kiểm tra nếu có con thì mới mở submenu
        setOpenSubmenu((prev) => (prev === id ? null : id));
      }
    },
    []
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading menu</p>;

  return (
    <div className="flex-grow overflow-y-auto no-scrollbar">
      <ul className="relative">
        {/* Tất cả sản phẩm */}
        <li
          className="px-6 group hover:bg-neutral-200 -mt-[1px] cursor-pointer"
          onClick={toggleSidebar}
        >
          <Link
            href="/collections"
            className="flex items-center gap-3.5 py-3 font-semibold"
          >
            Tất cả sản phẩm
          </Link>
        </li>

        {/* Các danh mục cha */}
        {menuItems.map((item) => (
          <li
            key={item.id} // Key phải là duy nhất
            className="relative px-6 group hover:bg-neutral-200 -mt-[1px]"
          >
            {/* Kiểm tra nếu không có menu con thì chuyển trang */}
            {!item.children || item.children.length === 0 ? (
              <Link href={`/collections/${item.slug}`} passHref>
                <div className="flex items-center gap-3.5 py-3 font-semibold">
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
              <div
                className="flex items-center gap-3.5 py-3 font-semibold justify-between cursor-pointer"
                onClick={() => handleToggleSubmenu(item.id, item.children)} // Toggle submenu
              >
                <span>{item.name}</span>
                <MdArrowForwardIos
                  size={15}
                  className={`font-extralight transition-transform ${
                    openSubmenu === item.id ? "rotate-90" : "rotate-0"
                  }`}
                />
              </div>
            )}

            {/* Danh mục con (submenu) */}
            {openSubmenu === item.id &&
              item.children &&
              item.children.length > 0 && (
                <div className="w-full py-2">
                  <ul className="text-sm">
                    {item.children.map((subItem) => (
                      <li
                        key={subItem.id} // Key cần phải duy nhất
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        <Link href={`/collections/${subItem.slug}`}>
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationVertical;
