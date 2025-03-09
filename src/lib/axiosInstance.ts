import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để tự động đính kèm token từ Auth.js
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log(`Không có token ở headers:${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);
