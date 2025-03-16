import { useMutation } from "@tanstack/react-query";
import { resendOTP, verifyOTP } from "@/app/api/auth/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// 🟢 Hook xác minh OTP
export const useVerifyOTP = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ id, code }: { id: number; code: string }) => {
      return await verifyOTP(id, code);
    },
    onSuccess: () => {
      toast.success("Xác minh thành công! Đang chuyển hướng...");
      router.push("/account/login");
    },
    onError: (error) => {
      toast.error(error?.message || "Xác minh thất bại, vui lòng thử lại.");
    },
  });
};

// 🟢 Hook gửi lại OTP
export const useResendOTP = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return await resendOTP(email);
    },
    onSuccess: (response: { message: string }) => {
      toast.success(response.message || "Mã OTP đã được gửi lại!");
    },
    onError: () => {
      toast.error("Không thể gửi lại mã OTP, vui lòng thử lại.");
    },
  });
};
