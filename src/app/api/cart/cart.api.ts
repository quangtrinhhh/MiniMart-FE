import { apiClient } from "@/lib/apiClient";
import { Product, Variant } from "@/types/backend";

interface CartResponse {
  data: {
    cart: {
      id: number;
      cartItems: CartItem[];
    };
    totalPrice: number;
  };
}

export interface CartItem {
  id: number;
  product: Product;
  variant?: Variant;
  quantity: number;
  price: string;
}
export const getAllItemCart = async () =>
  apiClient.get<CartResponse>(`/api/v1/cart`);
//
export const removeFromCart = async (cartItemId: number): Promise<void> => {
  await apiClient.delete(`/api/v1/cart/${cartItemId}`);
};
export const updateCartItemQuantity = async (
  cartItemId: number,
  quantity: number
): Promise<void> => {
  await apiClient.patch(`/api/v1/cart/${cartItemId}`, { quantity });
};

export const addToCart = async (
  productId: number,
  quantity: number,
  variantId?: number
): Promise<void> => {
  await apiClient.post(`/api/v1/cart`, {
    productId,
    quantity,
    variantId,
  });
};
