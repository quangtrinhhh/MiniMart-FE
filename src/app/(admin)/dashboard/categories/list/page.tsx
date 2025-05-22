"use client";

import type React from "react";
import { getCategories } from "@/api/categories/category.api";
import BreadcrumbAdmin from "@/components/layouts/admin/breadcrumb..admin";
import TableCategoryList from "@/components/layouts/table/TableCategoryList";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

import { useMemo, useState } from "react";

const CategoriesPage: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories-all"],
    queryFn: () => getCategories(current, pageSize), // lấy tất cả 1000 bản ghi để lọc phía client
    staleTime: 5 * 60 * 1000, // cache 5 phút
  });

  // Dữ liệu sau khi lọc (theo tên)
  const filteredData = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  // Tính toán dữ liệu cho trang hiện tại
  const paginatedData = useMemo(() => {
    const start = (current - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, current, pageSize]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setCurrent(1); // Reset về trang đầu khi tìm kiếm
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrent(1); // Reset về trang đầu khi đổi số lượng
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        <BreadcrumbAdmin />
      </div>

      {/* Filters and actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filters & Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2 relative">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-8"
                value={filter}
                onChange={handleSearch}
              />
            </div>

            <div className="w-full sm:w-[180px]">
              <Select
                value={pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Show entries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 per page</SelectItem>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="25">25 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category list */}
      <TableCategoryList
        data={paginatedData}
        totalItemsProps={filteredData.length}
        totalPagesProps={Math.ceil(filteredData.length / pageSize)}
        isLoading={isLoading}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
        error={error}
      />
    </div>
  );
};

export default CategoriesPage;
