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
  interface IBackendResPage<T> {
    statusCode: number;
    message: string;
    data: {
      result: T;
      totalItems: number;
      totalPages: number;
    };
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
    data: T[];
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

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone_number: string;
  code: string;
  isActive: boolean;
  codeExpired: Date;
  created_at: Date;
  updated_at: Date;
}
interface Product {
  id: number;
  categories: Category[];
  name: string;
  price: string; // Nếu cần xử lý số, có thể dùng number
  price_old: string;
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
  products: Product[];
}

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: string;
  variant: Variant;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  product: Product;
  image: string;
}

interface Order {
  id: number;
  user: User;
  status: OrderStatus;
  total: number;
  payment_status: string;
  payment_method: sring;
  shipping_address: string;
  shipping_fee: string;
  note: string;
  consignee_name: string;
  created_at: Data;
  orderItems: OrderItem[];
}

interface CouponFormValues {
  id: number;
  coupon_code: string;
  coupon_type: CouponType;
  coupon_value: number;
  coupon_start_date: string;
  coupon_end_date: string;
  coupon_min_spend: number;
  coupon_max_spend: number;
  coupon_uses_per_customer: number;
  coupon_uses_per_coupon: number;
  coupon_status: CouponStatus;
}
