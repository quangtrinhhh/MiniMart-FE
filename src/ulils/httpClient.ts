import axios from "axios";
import { auth } from "@/auth";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACECKEND_URL}/api/v1`;

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Thêm Interceptor để tự động thêm Token vào request
httpClient.interceptors.request.use(async (config) => {
  const session = await auth();
  const token = session?.user.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;
