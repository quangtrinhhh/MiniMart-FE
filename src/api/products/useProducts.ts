import { useQuery } from "@tanstack/react-query";
import {
  findAllWithFilter,
  getOnlyProduct,
  getProductBySlugCategory,
  getSuggestProducts,
} from "./product.api";
import { useMemo } from "react";

export const useProductBySlugCategory = (
  slug: string,
  current: number,
  pageSize: number,
  sortBy: string,
  filters: {
    colors: string[];
    productTypes: string[];
    tags: string[];
    priceRanges: string[];
  }
) => {
  const serializedFilters = useMemo(() => JSON.stringify(filters), [filters]);

  const data = useQuery({
    queryKey: [
      "productBySlugCategory",
      slug,
      current,
      pageSize,
      sortBy,
      serializedFilters,
    ],
    queryFn: () =>
      getProductBySlugCategory(slug, current, pageSize, sortBy, filters), // gọi đúng hàm API
    staleTime: 5000,
    placeholderData: (previousData) => previousData, // Giữ dữ liệu cũ tránh flickering
  });

  console.log("data use", data.data); // Kiểm tra dữ liệu trả về từ API

  return {
    categoryName: data.data?.data?.category || "",
    totalItems: data.data?.data?.totalItems || 0,
    totalPages: data.data?.data?.totalPages || 0,
    products: data.data?.data?.result || [], // Trả về danh sách sản phẩm
    isLoading: data.isLoading,
    error: data.error, // Trả về lỗi nếu cóTrả về tổng số sản phẩm
  };
};

export const useFindAllWithFilter = (
  current: number,
  pageSize: number,
  sortBy?: string,
  filters?: {
    colors?: string[];
    productTypes?: string[];
    tags?: string[];
    priceRanges?: string[];
    keyword?: string;
  }
) => {
  const serializedFilters = useMemo(() => JSON.stringify(filters), [filters]);

  const data = useQuery({
    queryKey: [
      "findAllWithFilter",
      current,
      pageSize,
      sortBy,
      serializedFilters,
    ],
    queryFn: () => findAllWithFilter(current, pageSize, sortBy, filters),
    staleTime: 5 * 1000,
    placeholderData: (previousData) => previousData,
  });
  return {
    products: data.data?.data.result || [],
    totalItems: data.data?.data.totalItems || 0,
    totalPages: data.data?.data.totalPages || 0,
    isLoading: data.isLoading,
    error: data.error, // Trả về lỗi nếu có
  };
};

export const productQueryOptions = (slug: string) => ({
  queryKey: ["product", slug],
  queryFn: async () => {
    const res = await getOnlyProduct(slug);
    return res?.data?.result ?? null;
  },
  staleTime: 1000 * 60 * 5, // 5 phút cache
});

export const useSuggestProducts = (limit: number) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["suggestProducts", limit],
    queryFn: () => getSuggestProducts(limit),
    placeholderData: (previousData) => previousData,
  });

  return {
    data: data?.data.result || [], // Trả về danh sách sản phẩm gợi ý
    isLoading: isPending,
    error: error, // Trả về lỗi nếu có
  };
};
