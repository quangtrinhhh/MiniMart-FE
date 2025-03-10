"use client";
import { getProducts } from "@/app/api/products/product.api";
import BreadcrumbAdmin from "@/components/layouts/admin/breadcrumb..admin";
import TableProductList from "@/components/layouts/table/TableProductList";
import AddButton from "@/components/ui/AddButton";
import EntriesSelector from "@/components/ui/EntriesSelector";
import SearchInput from "@/components/ui/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
const ListProductPage: React.FC = ({}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", filter, current, pageSize],
    queryFn: () => getProducts(filter, current, pageSize),
    staleTime: 5000,
  });

  console.log("data", data);

  return (
    <div className="p-[30px] ">
      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3 className="text-2xl text-black font-bold">Product List</h3>
        <BreadcrumbAdmin />
      </div>

      <div className="bg-white rounded-md  p-5 mt-5">
        <div className="flex gap-5 ">
          <EntriesSelector setPageSize={setPageSize} />
          {/*  */}
          <SearchInput setFilter={setFilter} />
          {/*  */}
          <AddButton href="/admin/products/create" />
        </div>

        <TableProductList
          data={data?.data.result ?? []}
          totalItemsProps={Number(data?.data.totalItems)}
          totalPagesProps={Number(data?.data.totalPages)}
          isLoading={isLoading}
          setCurrent={setCurrent}
          error={error}
        />
      </div>
    </div>
  );
};

export default ListProductPage;
