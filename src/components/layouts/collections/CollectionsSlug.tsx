"use client";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DiscountCodeRow from "@/components/ui/DiscountCodeRow";
import Image from "next/image";
import Arrange from "./Arrange";
import ProductList from "./ProductList";
import Siderbar from "@/components/layouts/collections/Siderbar";
import { useState } from "react";
import { useProductBySlugCategory } from "@/app/api/products/useProducts";

interface Props {
  slug: string;
}

const CollectionsSlug: React.FC<Props> = ({ slug }) => {
  const [current, setCurrent] = useState(1);
  const { data, isLoading } = useProductBySlugCategory(slug, current, 10);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-[#f2f6f3]">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto p-3">
        <Image
          src="/asset/collection_main_banner.jpg"
          width={1432}
          height={120}
          alt="banner"
        />
        <div className="mt-5">
          <DiscountCodeRow />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[9fr_3fr] gap-3 mt-5">
          <div className="block">
            <h1 className="text-5xl text-[#016735] font-semibold">
              {data?.data?.category || "Tất cả sản phẩm"}
            </h1>
            <Arrange />
            <ProductList
              dataList={data?.data?.products || []}
              totalItemsProps={Number(data?.data?.totalItems)}
              totalPagesProps={Number(data?.data?.totalPages)}
              setCurrent={setCurrent}
            />
          </div>
          <Siderbar />
        </div>
      </div>
    </div>
  );
};

export default CollectionsSlug;
