"use client";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DiscountCodeRow from "@/components/ui/DiscountCodeRow";
import Arrange from "@/components/layouts/collections/Arrange";
import ProductList from "@/components/layouts/collections/ProductList";
import Siderbar from "@/components/layouts/collections/Siderbar";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/api/products/product.api";
import Pagination from "@/components/layouts/admin/Pagination";

const PageCollections: React.FC = ({}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize] = useState(8);
  const [filter] = useState("");

  const { data } = useQuery({
    queryKey: ["products", filter, current, pageSize],
    queryFn: () => getProducts(current, pageSize),
    staleTime: 5000,
  });

  return (
    <div className="bg-[#f2f6f3]">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto p-3">
        <Image
          src="/asset/collection_main_banner.jpg"
          width={1432}
          height={120}
          alt=""
        />
        <div className="mt-5">
          <DiscountCodeRow />
        </div>
        <div className="grid grid-cols-1  xl:grid-cols-[9fr_3fr]  gap-3  mt-5">
          <div className="block">
            <h1 className="text-5xl text-[#016735] font-semibold">
              Tất cả sản phẩm
            </h1>
            <Arrange />
            <ProductList
              dataList={data?.data.result || []}
              totalItemsProps={Number(data?.data.totalItems)}
              totalPagesProps={Number(data?.data.totalPages)}
            />
            <Pagination
              setCurrent={setCurrent}
              totalItemsProps={data?.data.totalItems}
              totalPagesProps={data?.data.totalPages}
            />
          </div>
          <Siderbar />
        </div>
      </div>
    </div>
  );
};

export default PageCollections;
