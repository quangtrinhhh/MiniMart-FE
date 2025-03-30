import { axiosInstance } from "./axiosInstance";
import axios, { AxiosError } from "axios";

export const apiClient = {
  get: async <T>(url: string, params?: object): Promise<T> => {
    try {
      console.log("🔍 Fetching URL:", url, params);
      const response = await axiosInstance.get<T>(url, {
        params,
        paramsSerializer: (params) => new URLSearchParams(params).toString(), // 🔥 Fix lỗi Axios wrap params
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", {
          url,
          status: error.response?.status,
          responseData: error.response?.data,
        });
        throw new Error(
          `Lỗi API: ${error.response?.data?.message || error.message}`
        );
      } else {
        console.error("Unexpected Error:", error);
        throw new Error("Có lỗi xảy ra, vui lòng thử lại.");
      }
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
      if (axios.isAxiosError(error)) {
        console.error("PUT request failed:", {
          url,
          data,
          status: error.response?.status,
          responseData: error.response?.data,
        });
        throw new Error(
          `POST request failed: ${error.response?.status} - ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        throw new Error(
          `POST request failed: ${(error as AxiosError).message}`
        );
      }
    }
  },

  put: async <T>(url: string, data?: object): Promise<T> => {
    try {
      const response = await axiosInstance.put<T>(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("PUT request failed:", {
          url,
          data,
          status: error.response?.status,
          responseData: error.response?.data,
        });
        throw new Error(
          `PUT request failed: ${error.response?.status} - ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        throw new Error(`Unexpected error: ${(error as Error).message}`);
      }
    }
  },

  patch: async <T>(url: string, data: object): Promise<T> => {
    try {
      const response = await axiosInstance.patch<T>(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`PATCH request failed: ${(error as AxiosError).message}`);
    }
  },

  delete: async <T>(url: string): Promise<T> => {
    try {
      const response = await axiosInstance.delete<T>(url);
      return response.data;
    } catch (error) {
      throw new Error(
        `DELETE request failed: ${(error as AxiosError).message}`
      );
    }
  },
};
