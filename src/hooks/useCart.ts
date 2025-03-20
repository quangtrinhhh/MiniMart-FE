import {
  addToCart,
  getAllItemCart,
  removeFromCart,
  updateCartItemQuantity,
} from "@/app/api/cart/cart.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
// Định nghĩa types

export const useCart = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getAllItemCart(),
  });

  return {
    cart: data?.data.cart.cartItems ?? [],
    totalPrice: data?.data.totalPrice ?? 0,
    isLoading,
    error,
  };
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number;
      quantity: number;
    }) => updateCartItemQuantity(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Cập nhật lại giỏ hàng
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
      variantId,
    }: {
      productId: number;
      quantity: number;
      variantId?: number;
    }) => {
      return addToCart(productId, quantity, variantId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Thêm sản phẩm thành công");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response?.status === 400) {
        toast.warning(
          error.response?.data?.message || "An unexpected error occurred."
        );
      } else {
        toast.warning(error.message);
      }
    },
  });
};
