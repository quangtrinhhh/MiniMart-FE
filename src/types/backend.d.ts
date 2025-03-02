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
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
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
