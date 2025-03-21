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

  interface IRegisterResponse {
    id: string;
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
      phone: string;
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
  children: Category[];
}

interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
interface Product {
  id: number;
  categories: Category[];
  name: string;
  price: string; // Nếu cần xử lý số, có thể dùng number
  slug: string;
  description: string;
  discount: number; // Nếu cần tính toán, có thể dùng number
  stock: number;
  sold: number;
  status: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  assets: Assets[];
  attributes: Attributes[];
  variants: Variant[];
}
interface VariantValue {
  id: number;
  attribute_name: string;
  value: string;
}

interface Variant {
  id: number;
  name: string;
  price: string;
  old_price: string;
  SKU: string;
  stock: number;
  created_at: string;
}
interface Attributes {
  id: number;
  name: string;
  value: string;
  created_at: Date;
}
interface Assets {
  id: number;
  type: string;
  asset: Asset;
}
interface Asset {
  id: number;
  filename: string;
  path: string;
  type: string;
  size: number;
  created_at: Date;
  updated_at: Date;
}
interface CartItem {
  id: number;
  name: string;
  image: Assets | null; // ⛔ Nhưng `image` trong `Product` là `Assets[]`
  price: number;
  quantity: number;
  variant?: Variant;
}

// Định nghĩa kiểu dữ liệu cho danh mục sản phẩm
interface ProductCategory {
  categoryId: number;
  categoryName: string;
  products: ProductTwo[];
}
interface ProductTwo {
  id: number;
  product: Product;
}
interface OrderItem {
  id: number;
  product: { name: string };
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  created_at: string;
  user: { email: string };
  status: string;
  total: number;
  payment_status: string;
  payment_method: sring;
  shipping_address: string;
  shipping_fee: string;
  consignee_name: string;
  created_at: Data;
  orderItems: OrderItem[];
}
