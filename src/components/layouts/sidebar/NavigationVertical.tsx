import { useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/app/api/categories/category.api";
import { Category } from "@/types/backend";

const NavigationVertical: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [current] = useState(1);
  const [pageSize] = useState(10);
  const [filter] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["category", filter, current, pageSize],
    queryFn: () => getCategories(filter, current, pageSize),
    staleTime: 5000,
  });
  const menuItems: Category[] = Array.isArray(data?.data.result)
    ? data?.data.result
    : [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading menu</p>;

  const handleToggleSubmenu = (id: number) => {
    setOpenSubmenu((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex-grow overflow-y-auto no-scrollbar">
      <ul className="relative">
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
        {menuItems?.map((item) => (
          <li
            key={item.id}
            className="relative px-6 group hover:bg-neutral-200 -mt-[1px] cursor-pointer"
            onClick={() => handleToggleSubmenu(item.id)}
          >
            <div className="flex items-center gap-3.5 py-3 font-semibold justify-between">
              <span>{item.name}</span>
              {item.children && item.children.length > 0 && (
                <MdArrowForwardIos
                  size={15}
                  className={`font-extralight transition-transform ${
                    openSubmenu === item.id ? "rotate-90" : "rotate-0"
                  }`}
                />
              )}
            </div>
            {openSubmenu === item.id &&
              item.children &&
              item.children.length > 0 && (
                <div className="w-full py-2">
                  <ul className="text-sm">
                    {item.children.map((subItem) => (
                      <li
                        key={subItem.id}
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        <Link href={`/categories/${subItem.slug}`}>
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
