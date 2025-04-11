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
  // search: string,
  current: number,
  pageSize: number
) =>
  apiClient.get<ProductResponse>(`/api/v1/product`, {
    // filter: search.trim() || undefined,
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
/**
 *
 */
export const getDiscountedProducts = async () => {
  return apiClient.get<OnlyProductResponse>(`/api/v1/product/discounted`);
};
export const getProductsByCategory = async (id: number) => {
  return apiClient.get<OnlyProductResponse>(`/api/v1/product/${id}/categorie`);
};
/**
 *
 */

export const getRelatedProducts = async (id: number) => {
  return apiClient.get<OnlyProductResponse>(`/api/v1/product/${id}/related`);
};

interface IProductCategoryResponse {
  category: string;
  result: Product[];
  totalItems: number;
  totalPages: number;
}

export const getProductBySlugCategory = async (
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
  return apiClient.get<IBackendRes<IProductCategoryResponse>>(
    `/api/v1/product/category/${slug}`,
    {
      current,
      pageSize,
      sortBy,
      ...filters,
    }
  );
};

export const findAllWithFilter = async (
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
  return apiClient.get<ProductResponse>(`/api/v1/product/filter`, {
    current,
    pageSize,
    sortBy,
    ...filters,
  });
};
