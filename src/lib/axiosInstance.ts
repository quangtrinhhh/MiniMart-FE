import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACECKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để tự động đính kèm token từ Auth.js
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user?.access_token) {
      config.headers.Authorization = `Bearer ${session.user.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
