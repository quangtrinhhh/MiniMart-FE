import axios from "axios";
import qs from "qs";
import { axiosInstance } from "./axiosInstance";
import { toast } from "react-toastify";

/**
 * Hàm xử lý lỗi tập trung, log chi tiết lỗi trả về từ API
 */
function handleAxiosError(
  error: unknown,
  url: string,
  method: string,
  requestData?: unknown
): never {
  if (axios.isAxiosError(error)) {
    // const status = error.response?.status;
    const responseData = error.response?.data;
    // const responseHeaders = error.response?.headers;

    if (requestData) console.error("🔸 Request Data:", requestData);

    const userMessage =
      typeof responseData === "string"
        ? responseData
        : responseData?.message || "Yêu cầu thất bại, vui lòng thử lại.";

    toast.error(userMessage); // 👈 Thông báo người dùng

    throw new Error(userMessage);
  } else {
    console.error("❌ Unexpected Error:", error);
    toast.error("Đã xảy ra lỗi không xác định."); // 👈 fallback cho lỗi không xác định
    throw new Error("Đã xảy ra lỗi không xác định.");
  }
}

export const apiClient = {
  get: async <T>(url: string, params?: object): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(url, {
        params,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error, url, "get", params);
    }
  },

  post: async <T>(url: string, data: object | FormData): Promise<T> => {
    try {
      const isFormData = data instanceof FormData;
      const response = await axiosInstance.post<T>(url, data, {
        headers: isFormData
          ? { "Content-Type": "multipart/form-data" }
          : undefined,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error, url, "post", data);
    }
  },

  put: async <T>(url: string, data?: object): Promise<T> => {
    try {
      const response = await axiosInstance.put<T>(url, data);
      return response.data;
    } catch (error) {
      handleAxiosError(error, url, "put", data);
    }
  },

  patch: async <T>(url: string, data: object): Promise<T> => {
    try {
      const response = await axiosInstance.patch<T>(url, data);
      return response.data;
    } catch (error) {
      handleAxiosError(error, url, "patch", data);
    }
  },

  delete: async <T>(url: string): Promise<T> => {
    try {
      const response = await axiosInstance.delete<T>(url);
      return response.data;
    } catch (error) {
      handleAxiosError(error, url, "delete");
    }
  },
};
