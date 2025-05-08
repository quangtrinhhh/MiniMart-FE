"use client";
import { useFindAllWithFilter } from "@/api/products/useProducts";
import BreadcrumbAdmin from "@/components/layouts/admin/breadcrumb..admin";
import TableProductList from "@/components/layouts/table/TableProductList";
import AddButton from "@/components/ui/AddButton";
import EntriesSelector from "@/components/ui/EntriesSelector";
import SearchInput from "@/components/ui/SearchInput";
import { useState } from "react";
const ListProductPage: React.FC = ({}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortBy] = useState("manual");
  const [filters, setFilters] = useState({
    keyword: "",
  });

  const { products, totalItems, totalPages, isLoading, error } =
    useFindAllWithFilter(current, pageSize, sortBy, filters);
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
          <SearchInput setFilter={(value) => setFilters({ keyword: value })} />
          {/*  */}
          <AddButton href="/admin/products/create" />
        </div>

        <TableProductList
          data={products ?? []}
          totalItemsProps={Number(totalItems)}
          totalPagesProps={Number(totalPages)}
          isLoading={isLoading}
          setCurrent={setCurrent}
          error={error}
        />
      </div>
    </div>
  );
};

export default ListProductPage;
