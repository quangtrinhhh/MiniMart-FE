import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

export interface Order {
  id: number;
  status: string;
  shipping_fee: number;
  total: number;
  created_at: Date;
  canceled_at: Date | null;
  completed_at: Date | null;
  delivery_at: Date | null;
  user: {
    id: number;
    email: string;
    phone_number: string;
  };
}

export const checkout = async (
  payment_method: string,
  consignee_name: string,
  shipping_address: string,
  note: string,
  shipping_fee: number
) => {
  const response = await apiClient.post<IBackendRes<Order>>(`/api/v1/orders`, {
    payment_method,
    consignee_name,
    shipping_address,
    note,
    shipping_fee,
  });

  return response.data;
};

export const useCheckout = () => {
  return useMutation({
    mutationFn: (orderData: {
      payment_method: string;
      consignee_name: string;
      shipping_address: string;
      note: string;
      shipping_fee: number;
    }) =>
      checkout(
        orderData.payment_method,
        orderData.consignee_name,
        orderData.shipping_address,
        orderData.note,
        orderData.shipping_fee
      ),
  });
};

export const getOrder = async () => {
  const response = await apiClient.get<IBackendRes<Order>>(`/api/v1/orders`);
  return response.data;
};

export const cancelOrder = async (orderId: number) => {
  const response = await apiClient.delete<IBackendRes<Order>>(
    `/api/v1/orders/${orderId}/cancel`
  );
  return response.data;
};
export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: number) => cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // Gọi lại API lấy danh sách đơn hàng
    },
  });
};
