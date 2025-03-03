import { axiosInstance } from "./axiosInstance";

export const apiClient = {
  get: async <T>(url: string, params?: object): Promise<T> => {
    const response = await axiosInstance.get<T>(url, { params });
    return response.data;
  },
  // post: async <T>(url: string, data?: object): Promise<T> => {
  //   const response = await axiosInstance.post<T>(url, data);
  //   return response.data;
  // },
  put: async <T>(url: string, data?: object): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
  },
  delete: async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.delete<T>(url);
    return response.data;
  },

  post: async <T>(url: string, data: object | FormData): Promise<T> => {
    const isFormData = data instanceof FormData;
    const response = await axiosInstance.post<T>(url, data, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
    });

    return response.data;
  },
};
