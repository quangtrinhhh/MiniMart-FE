import { apiClient } from "@/lib/apiClient";
import { Category } from "@/types/backend";

interface CategoryResponse {
  data: {
    result: Category[];
    totalItems: number;
    totalPages: number;
  };
}
/**
 * 🟢 Lấy danh sách danh mục
 */
export const getCategories = async (current: number, pageSize: number) =>
  apiClient.get<IModelPaginate<Category>>(`/api/v1/category`, {
    current,
    pageSize,
  });

/**
 * 🟢 Tạo mới danh mục
 */
export const createCategory = async (categoryData: FormData) =>
  apiClient.post<CategoryResponse>(`/api/v1/category`, categoryData);

/**
 * 🟢 Xóa  */
export const deleteCategory = async (id: number) => {
  return apiClient.delete<CategoryResponse>(`/api/v1/category/${id}`);
};
/**
 *
 */
export const getAllParentCategories = async () => {
  return apiClient.get<CategoryResponse>(`/api/v1/category/parentcategories`);
};
/**
 *
 */

export const getCategoryMenu = async () => {
  return apiClient.get<IBackendResPage<Category>>(`/api/v1/category/menu`);
};
