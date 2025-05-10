"use client";

import type React from "react";
import type { Product } from "@/types/backend";
import { ProductColumns } from "@/types/type";
import TableRowProduct from "./TableRowProduct";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Card, CardContent } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { Package2 } from "lucide-react";
import { useState } from "react";

interface IProps {
  data: Product[];
  totalPagesProps: number;
  totalItemsProps: number;
  isLoading?: boolean;
  error?: unknown;
  setCurrent?: (value: number) => void;
  setPageSize?: (value: number) => void;
}

const TableProductList: React.FC<IProps> = ({
  data,
  isLoading = false,
  error,
  setCurrent,
  totalPagesProps,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  if (error) {
    return (
      <Card className="mt-5 w-full mb-2">
        <CardContent className="">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="rounded-full bg-destructive/10 p-3 text-destructive mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Error Loading Products</h3>
            <p className="text-sm text-muted-foreground mt-2">
              There was a problem loading the product data. Please try again.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (setCurrent) {
      setCurrent(page);
    }
  };

  // const handlePageSizeChange = (value: string) => {
  //   if (setPageSize) {
  //     setPageSize(Number(value));
  //     if (setCurrent) {
  //       setCurrent(1);
  //     }
  //     setCurrentPage(1);
  //   }
  // };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPagesProps, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Card className="mt-5 w-full mb-2 ">
      <CardContent>
        <div className="w-full overflow-x-auto ">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {ProductColumns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={`font-semibold text-foreground ${column.className}`}
                  >
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      {ProductColumns.map((column) => (
                        <TableCell
                          key={`cell-skeleton-${column.key}`}
                          className={column.className}
                        >
                          <Skeleton className="h-8 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : data.length > 0 ? (
                data.map((product, index) => (
                  <TableRowProduct
                    key={product.id}
                    data={product}
                    isEven={index % 2 === 0}
                    isLoading={isLoading}
                    error={error}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={ProductColumns.length}
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="rounded-full bg-muted p-3 mb-3">
                        <Package2 className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No products found</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Try adjusting your search or filter to find what you re
                        looking for.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  handlePageChange(currentPage - 1);
                }
              }}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {renderPaginationItems()}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPagesProps) {
                  handlePageChange(currentPage + 1);
                }
              }}
              className={
                currentPage >= totalPagesProps
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Card>
  );
};

export default TableProductList;
