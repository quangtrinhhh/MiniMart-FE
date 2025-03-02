import { APIResponse, Category } from "@/types/backend";
import httpClient from "@/ulils/httpClient";
import { AxiosError } from "axios";

/**
 * 🟢 Lấy danh sách danh mục
 */
export const getCategories = async (current: number, pageSize: number) => {
  try {
    const response = await httpClient.get(`/category`, {
      params: { current, pageSize },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to fetch categories");
  }
};

/**
 * 🟢 Thêm danh mục mới
 */
export const createCategory = async (
  name: string
): Promise<APIResponse<Category>> => {
  try {
    const response = await httpClient.post<APIResponse<Category>>(`/category`, {
      name,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to create category");
  }
};

/**
 * 🟢 Cập nhật danh mục
 */
export const updateCategory = async (
  id: string,
  name: string
): Promise<APIResponse<Category>> => {
  try {
    const response = await httpClient.put<APIResponse<Category>>(
      `/category/${id}`,
      { name }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to update category");
  }
};

/**
 * 🟢 Xóa danh mục
 */
export const deleteCategory = async (
  id: string
): Promise<APIResponse<null>> => {
  try {
    const response = await httpClient.delete<APIResponse<null>>(
      `/category/${id}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, "Failed to delete category");
  }
};

/**
 * 🚀 Hàm xử lý lỗi API (Không dùng `any`)
 */
const handleApiError = (error: unknown, defaultMessage: string) => {
  if (error instanceof AxiosError && error.response) {
    console.error("API Error:", error.response.data);
    throw new Error(error.response.data.message || defaultMessage);
  }

  console.error("Unexpected API Error:", error);
  throw new Error(defaultMessage);
};
