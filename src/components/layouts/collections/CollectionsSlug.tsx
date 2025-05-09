"use client";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DiscountCodeRow from "@/components/layouts/main/DiscountCodeRow";
import Image from "next/image";
import Arrange from "./Arrange";
import ProductList from "./ProductList";
import Siderbar from "@/components/layouts/collections/Siderbar";
import { useState } from "react";
import { useProductBySlugCategory } from "@/api/products/useProducts";

interface Props {
  slug: string;
}

const CollectionsSlug: React.FC<Props> = ({ slug }) => {
  const [current, setCurrent] = useState(1);
  const [sortBy, setSortBy] = useState("manual");
  const [filters, setFilters] = useState({
    colors: [] as string[],
    productTypes: [] as string[],
    tags: [] as string[],
    priceRanges: [] as string[],
  });
  const { categoryName, totalItems, totalPages, products, isLoading } =
    useProductBySlugCategory(slug, current, 8, sortBy, filters);
  console.log("products", products);

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
              {categoryName || "Tất cả sản phẩm"}
            </h1>
            <Arrange onSortChange={setSortBy} />
            <ProductList
              dataList={products || []}
              totalItemsProps={Number(totalItems)}
              totalPagesProps={Number(totalPages)}
              setCurrent={setCurrent}
            />
          </div>
          <Siderbar onFilterChange={setFilters} />
        </div>
      </div>
    </div>
  );
};

export default CollectionsSlug;
