import { useMutation } from "@tanstack/react-query";
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
  console.log(response.data?.status);

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
