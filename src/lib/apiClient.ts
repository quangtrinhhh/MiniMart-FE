import { axiosInstance } from "./axiosInstance";
import { AxiosError } from "axios";

export const apiClient = {
  get: async <T>(url: string, params?: object): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(url, { params });
      return response.data;
    } catch (error) {
      throw new Error(`GET request failed: ${(error as AxiosError).message}`);
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
      throw new Error(`POST request failed: ${(error as AxiosError).message}`);
    }
  },

  put: async <T>(url: string, data?: object): Promise<T> => {
    try {
      const response = await axiosInstance.put<T>(url, data);
      return response.data;
    } catch (error) {
      throw new Error(`PUT request failed: ${(error as AxiosError).message}`);
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
