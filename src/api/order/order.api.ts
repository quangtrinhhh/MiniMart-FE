import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { Order } from "@/types/backend";
import { toast } from "react-toastify";

export const checkout = async (
  payment_method: string,
  consignee_name: string,
  shipping_address: string,
  note: string,
  shipping_fee: number,
  total: number
): Promise<Order | string> => {
  try {
    const response = await apiClient.post<IBackendRes<Order | string>>(
      `/api/v1/checkout`,
      {
        payment_method,
        consignee_name,
        shipping_address,
        note,
        shipping_fee,
        total,
      }
    );

    if (response.data) {
      return response.data;
    } else {
      throw new Error("Lỗi không xác định từ server.");
    }
  } catch (error) {
    console.error("❌ Lỗi khi đặt hàng:", error);
    throw new Error("Không thể thực hiện thanh toán. Vui lòng thử lại.");
  }
};

export const useCheckout = () => {
  return useMutation({
    mutationFn: async (orderData: {
      payment_method: string;
      consignee_name: string;
      shipping_address: string;
      note: string;
      shipping_fee: number;
      total: number;
    }) => {
      const result = await checkout(
        orderData.payment_method,
        orderData.consignee_name,
        orderData.shipping_address,
        orderData.note,
        orderData.shipping_fee,
        orderData.total
      );

      // ✅ Nếu API trả về URL VNPAY, chuyển hướng ngay
      if (typeof result === "string" && result.startsWith("http")) {
        window.location.href = result;
      }

      return result; // Trả về đơn hàng nếu là COD
    },
    onError: (error: unknown) => {
      console.error("❌ Lỗi khi thanh toán:", error);
      toast.error("Thanh toán thất bại, vui lòng thử lại!");
    },
  });
};

export const getOrder = async () => {
  const response = await apiClient.get<IBackendRes<Order>>(`/api/v1/orders`);
  return response.data;
};

export const cancelOrder = async (orderId: number) => {
  const response = await apiClient.put<IBackendRes<Order>>(
    `/api/v1/orders/${orderId}/cancel`
  );
  return response.data;
};
export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: number) => cancelOrder(orderId),
    onSuccess: () => {
      toast.success("Đơn hàng đã được hủy thành công!");
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // Gọi lại API lấy danh sách đơn hàng
    },
    onError: (error: unknown) => {
      console.error("❌ Lỗi khi hủy đơn hàng:", error);
      toast.error("Hủy đơn hàng thất bại, vui lòng thử lại!");
    },
  });
};

export const UpdateOrderStatus = async (id: number, status: string) =>
  apiClient.put<IBackendRes<null>>(`/api/v1/orders/${id}/status`, { status });

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      UpdateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // Tự động cập nhật danh sách đơn hàng
    },
    onError: (error: unknown) => {
      console.error("Lỗi cập nhật trạng thái đơn hàng:", error);
    },
  });
};

export type PaymentResult = {
  status: "success" | "failed" | "invalid";
  order?: Order;
  message?: string;
};
export const fetchPaymentResult = async (
  queryParams: Record<string, string>
): Promise<PaymentResult> => {
  try {
    // Chuyển đổi queryParams thành chuỗi query
    const queryString = new URLSearchParams(queryParams).toString();

    const response = await apiClient.get<IBackendRes<PaymentResult>>(
      `/api/v1/vnpay/vnpay-return?${queryString}`
    );

    if (!response || !response.data) {
      throw new Error("Dữ liệu phản hồi từ server không hợp lệ");
    }

    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi gọi API thanh toán:", error);
    return {
      status: "invalid",
      message:
        error instanceof Error
          ? error.message
          : "Không thể lấy kết quả thanh toán",
    };
  }
};

export const usePaymentResult = (queryParams: Record<string, string>) => {
  const isValidQuery = !!queryParams.vnp_TxnRef && !!queryParams.vnp_Amount;

  return useQuery({
    queryKey: ["paymentResult", queryParams],
    queryFn: () => fetchPaymentResult(queryParams),
    enabled: isValidQuery, // Chỉ fetch khi có đủ dữ liệu
    retry: 2, // Thử lại tối đa 2 lần nếu lỗi
    staleTime: 1000 * 60 * 5, // Dữ liệu được cache trong 5 phút
  });
};
