import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProduct,
  findAllWithFilter,
  getDiscountedProducts,
  getOnlyProduct,
  getProductBySlugCategory,
  getProductsByCategory,
  getSuggestProducts,
  updateProduct,
} from "./product.api";
import { useMemo } from "react";
import { toast } from "react-toastify";

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

export const useProductDetail = (slug: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["product"],
    queryFn: () => getOnlyProduct(slug),
  });

  return {
    data, // Trả về danh sách sản phẩm gợi ý
    isLoading: isPending,
    error: error, // Trả về lỗi nếu có
  };
};
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
export const useDiscountedProducts = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getDiscountedProducts(),
  });

  return {
    data: data?.data.result || [], // Trả về danh sách sản phẩm gợi ý
    isLoading: isPending,
    error: error, // Trả về lỗi nếu có
  };
};

export const useProductsByCategory = (idCategory: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", idCategory],
    queryFn: () => getProductsByCategory(idCategory),
  });
  return {
    data: data?.data.result || [],
    isLoading,
    error,
  };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      // Invalidate cache hoặc cập nhật lại danh sách sản phẩm
      queryClient.invalidateQueries({
        queryKey: ["findAllWithFilter"],
      });
      toast.success("Xóa sản phẩm thành công");
    },
    onError: (error) => {
      toast.error(`Lỗi khi xóa sản phẩm: ${error.message}`);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", "findAllWithFilter"],
      });
      toast.success("Cập nhật sản phẩm thành công");
    },
    onError: (error) => {
      toast.error(`Lỗi khi cập nhật sản phẩm: ${error.message}`);
    },
  });
};
