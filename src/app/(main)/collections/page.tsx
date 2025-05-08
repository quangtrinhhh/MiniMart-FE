"use client";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import DiscountCodeRow from "@/components/ui/DiscountCodeRow";
import Arrange from "@/components/layouts/collections/Arrange";
import ProductList from "@/components/layouts/collections/ProductList";
import Siderbar from "@/components/layouts/collections/Siderbar";
import Image from "next/image";
import { useState } from "react";

import { useFindAllWithFilter } from "@/api/products/useProducts";

const PageCollections: React.FC = ({}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize] = useState(8);
  const [sortBy, setSortBy] = useState("manual");
  const [filters, setFilters] = useState({
    colors: [] as string[],
    productTypes: [] as string[],
    tags: [] as string[],
    priceRanges: [] as string[],
  });
  console.log("sortBy", sortBy);

  const { products, totalItems, totalPages } = useFindAllWithFilter(
    current,
    pageSize,
    sortBy,
    filters
  );
  console.log("filters", filters);

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
            <Arrange onSortChange={setSortBy} />
            <ProductList
              dataList={products}
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

export default PageCollections;
