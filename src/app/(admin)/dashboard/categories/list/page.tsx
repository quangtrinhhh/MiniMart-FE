"use client";
import TableProductList from "@/components/layouts/table/TableCategoryList";
import { getCategories } from "@/api/categories/category.api";
import AddButton from "@/components/ui/AddButton";
import EntriesSelector from "@/components/ui/EntriesSelector";
import SearchInput from "@/components/ui/SearchInput";
import { useQuery } from "@tanstack/react-query";
import BreadcrumbAdmin from "@/components/layouts/admin/breadcrumb..admin";
import { useState } from "react";

const Page: React.FC = ({}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");

  console.log(current, pageSize, filter);

  const { data, isLoading, error } = useQuery({
    queryKey: ["category", filter, current, pageSize],
    queryFn: () => getCategories(filter, current, pageSize),
    staleTime: 5000,
  });
  console.log("category: ", data);

  return (
    <div>
      <div className="p-[30px] ">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3 className="text-2xl text-black font-bold">Categries List</h3>
          <BreadcrumbAdmin />
        </div>
        {/*  */}
        <div className="bg-white rounded-md  p-5 mt-5">
          <div className="flex gap-5 ">
            <EntriesSelector setPageSize={setPageSize} />
            {/*  */}
            <SearchInput setFilter={setFilter} />
            {/*  */}
            <AddButton href="/admin/categories/create" />
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
    </div>
  );
};

export default Page;
