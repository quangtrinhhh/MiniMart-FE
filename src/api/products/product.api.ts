import { apiClient } from "@/lib/apiClient";
import { Product } from "@/types/backend";

interface ProductResponse {
  data: {
    result: Product[];
    totalItems: number;
    totalPages: number;
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
  apiClient.get<ProductResponse>(`/api/v1/products`, {
    // filter: search.trim() || undefined,
    current,
    pageSize,
  });

/**
 * 🟢 Tạo mới danh mục
 */
export const createproduct = async (productData: FormData) =>
  apiClient.post<ProductResponse>(`/api/v1/products`, productData);

/**
 * 🟢 Xóa  */
export const deleteProduct = async (id: number) => {
  return apiClient.delete<ProductResponse>(`/api/v1/products/${id}`);
};
/**
 *🟢 lấy chi tiết 1 product
 */
export const getOnlyProduct = async (slug: string) => {
  return apiClient.get<IBackendResPage<Product>>(`/api/v1/products/${slug}`);
};
/**
 *
 */
export const getDiscountedProducts = async () => {
  return apiClient.get<IBackendResPage<Product>>(`/api/v1/products/discounted`);
};
export const getProductsByCategory = async (id: number) => {
  return apiClient.get<IBackendResPage<Product>>(
    `/api/v1/products/${id}/categorie`
  );
};
/**
 *
 */

export const getRelatedProducts = async (id: number) => {
  return apiClient.get<IBackendResPage<Product>>(
    `/api/v1/products/${id}/related`
  );
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
    `/api/v1/products/category/${slug}`,
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
  sortBy?: string,
  filters?: {
    colors?: string[];
    productTypes?: string[];
    tags?: string[];
    priceRanges?: string[];
    keyword?: string;
  }
) => {
  return apiClient.get<ProductResponse>(`/api/v1/products/filter`, {
    current,
    pageSize,
    sortBy,
    ...filters,
  });
};

export const getSuggestProducts = async (limit: number) => {
  return apiClient.get<IBackendResPage<Product>>(
    `/api/v1/products/suggestions?limit=${limit}`
  );
};
