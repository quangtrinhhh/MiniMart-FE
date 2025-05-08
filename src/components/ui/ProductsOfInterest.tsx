"use client";
import { useState, useEffect } from "react";
import TitleHeading from "./TitleHeading";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import CardProduct from "../layouts/product/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "@/api/products/product.api";
import { ProductCategory } from "@/types/backend";

const ProductsOfInterest: React.FC = () => {
  const categoryId = 3; // ID danh mục cha
  const { data } = useQuery({
    queryKey: ["product", categoryId],
    queryFn: () => getProductsByCategory(categoryId),
  });

  const productsByCategoryList: ProductCategory[] = Array.isArray(
    data?.data.result
  )
    ? data?.data.result
    : [];

  // Lấy danh sách category từ API
  const categoryTabs = productsByCategoryList.map(
    (category) => category.categoryName
  );

  // State lưu tab đang chọn, mặc định lấy tab đầu tiên (nếu có dữ liệu)
  const [selectedTab, setSelectedTab] = useState<string>("");

  // Cập nhật tab mặc định sau khi có dữ liệu từ API
  useEffect(() => {
    if (categoryTabs.length > 0 && !selectedTab) {
      setSelectedTab(categoryTabs[0]); // Đặt tab đầu tiên làm mặc định
    }
  }, [categoryTabs, selectedTab]);

  return (
    <div className="mt-10">
      <TitleHeading titleHeading="Đồ dùng nhà bếp" />
      <div>
        {/* Render các tab danh mục */}
        <ul className="flex flex-wrap gap-5 text-center justify-center mt-5 cursor-pointer text-sm">
          {categoryTabs.map((tab) => (
            <li
              key={tab}
              className={`py-2 px-5 font-semibold ${
                selectedTab === tab
                  ? "bg-[#ff3c02] text-white"
                  : "bg-white text-[#ff3c02] hover:text-black"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>

        {/* Hiển thị sản phẩm theo tab được chọn */}
        <div className="grid grid-cols-6 mt-5 gap-[0.8px] max-lg:grid-cols-3 max-md:grid-cols-2">
          {productsByCategoryList
            .find((category) => category.categoryName === selectedTab)
            ?.products.map((product, index) => (
              <CardProduct key={index} product={product.product} />
            ))}
        </div>
      </div>

      <Link
        href="/"
        className="bg-white w-full text-center py-2 mt-5 rounded-md flex justify-center items-center gap-1 text-[#016735]"
      >
        Xem tất cả
        <IoIosArrowForward size={15} />
      </Link>
    </div>
  );
};

export default ProductsOfInterest;
