import { ReactNode } from "react";

interface MenuItem {
  id: string;
  name: string;
  href: string | null;
  icon: ReactNode;
  active: boolean;
  showSubMenu?: boolean;
  subMenus: MenuItem[];
}

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: unknown };
    queryParams?: unknown;
    useCredentials?: boolean;
    headers?: unknown;
    nextOption?: unknown;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }
  interface ILogin {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    access_token: string;
  }
}
interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
interface Product {
  id: number;
  category: Category;
  name: string;
  price: string; // Nếu cần xử lý số, có thể dùng number
  slug: string;
  description: string;
  discount: string; // Nếu cần tính toán, có thể dùng number
  quantity: number;
  sold: number;
  status: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  assets: Asset[];
}

interface Asset {
  id: number;
  filename: string;
  path: string;
  type: string;
  size: number;
  created_at: string;
  updated_at: string;
}
