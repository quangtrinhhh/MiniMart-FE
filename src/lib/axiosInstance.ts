import axios from "axios";
import { getAccessToken } from "./getAccessToken";

let accessToken: string | null = null; // Bộ nhớ cache tạm thời

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để đính kèm token vào request
axiosInstance.interceptors.request.use(
  async (config) => {
    if (!accessToken) {
      accessToken = await getAccessToken(); // Cache token
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor để xử lý lỗi 401 (token hết hạn)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      accessToken = null; // Xóa cache token
      console.warn("Token hết hạn, cần đăng nhập lại.");
      // Có thể redirect đến trang login hoặc gọi refresh token nếu có
    }
    return Promise.reject(error);
  }
);
