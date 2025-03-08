import { auth } from "@/auth";
import axios from "axios";
// import { getSession } from "next-auth/react";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACECKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để tự động đính kèm token từ Auth.js
axiosInstance.interceptors.request.use(
  async (config) => {
    let token = null;

    // Nếu đang chạy trên server
    if (typeof window === "undefined") {
      const session = await auth();
      token = session?.access_token;
    } else {
      token = localStorage.getItem("token"); // Lấy token từ localStorage trên trình duyệt
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("Không có token");
    }

    return config;
  },
  (error) => Promise.reject(error)
);
