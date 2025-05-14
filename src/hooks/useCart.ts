import {
  addToCart,
  getAllItemCart,
  removeFromCart,
  updateCartItemQuantity,
} from "@/api/cart/cart.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// Định nghĩa types

export const useCart = () => {
  const { status } = useSession(); // 🟢 Lấy session từ Auth.js

  const { data, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getAllItemCart,
    enabled: status === "authenticated", // 🔥 Chỉ gọi API nếu đã login
  });

  return {
    cart: data?.data?.cart?.cartItems ?? [],
    totalPrice: data?.data?.totalPrice ?? 0,
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
  const router = useRouter();
  const { status } = useSession();
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
      if (status !== "authenticated") {
        router.push("/account/login");
        throw new AxiosError(
          "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng."
        );
      }
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
