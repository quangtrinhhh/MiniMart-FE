import { apiClient } from "@/lib/apiClient";
import { Product } from "@/types/backend";

interface ProductResponse {
  data: {
    result: Product[];
    totalItems: number;
    totalPages: number;
  };
}
interface OnlyProductResponse {
  data: {
    result: Product;
  };
}
/**
 * 🟢 Lấy danh sách danh mục
 */
export const getProducts = async (
  search: string,
  current: number,
  pageSize: number
) =>
  apiClient.get<ProductResponse>(`/api/v1/product`, {
    search: search.trim() || undefined,
    current,
    pageSize,
  });

/**
 * 🟢 Tạo mới danh mục
 */
export const createproduct = async (productData: FormData) =>
  apiClient.post<ProductResponse>(`/api/v1/product`, productData);

/**
 * 🟢 Xóa  */
export const deleteProduct = async (id: number) => {
  return apiClient.delete<ProductResponse>(`/api/v1/product/${id}`);
};
/**
 *🟢 lấy chi tiết 1 product
 */
export const getOnlyProduct = async (slug: string) => {
  return apiClient.get<OnlyProductResponse>(`/api/v1/product/${slug}`);
};
