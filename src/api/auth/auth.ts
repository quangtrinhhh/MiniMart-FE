import { apiClient } from "@/lib/apiClient";

/**
 * 🟢 Kiểu dữ liệu trả về khi xác minh OTP
 */
interface VerifyOTPResponse {
  statusCode: number;
  message: string;
  data: {
    isBeforeCheck: boolean;
  };
}

/**
 * 🟢 Kiểu dữ liệu trả về khi gửi lại OTP
 */
interface ResendOTPResponse {
  statusCode: number;
  message: string;
  data: {
    id: number;
  };
}

/**
 * 🟢 Xác minh OTP
 */
export const verifyOTP = async (
  id: number,
  code: string
): Promise<VerifyOTPResponse> => {
  const response = await apiClient.post<VerifyOTPResponse>(
    `/api/v1/auth/check-code`,
    { id, code }
  );
  return response;
};

/**
 * 🟢 Gửi lại mã OTP
 */
export const resendOTP = async (email: string): Promise<ResendOTPResponse> => {
  const response = await apiClient.post<ResendOTPResponse>(
    `/api/v1/auth/retry-active`,
    { email }
  );
  return response;
};
