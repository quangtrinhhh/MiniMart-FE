"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVerifyOTP, useResendOTP } from "@/hooks/useAuth";
import OTPInput from "@/components/layouts/account/OTPInput";
import { CheckCircle, AlertCircle } from "lucide-react";

const VerifyPage: React.FC = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("user_email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Optional: Redirect hoặc báo lỗi nếu không tìm thấy email
    }
  }, []);
  const { id } = useParams() as { id: string };

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const verifyOTPMutation = useVerifyOTP();
  const resendOTPMutation = useResendOTP();

  // Handle OTP change
  const handleChange = (otpValues: string[]) => {
    setOtp(otpValues);
  };

  // Handle OTP verification
  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Vui lòng nhập đầy đủ mã OTP.");
      return;
    }
    setError("");
    verifyOTPMutation.mutate(
      { id: Number(id), code: otpValue },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (error) => {
          setOtp(["", "", "", "", "", ""]);
          setError(
            error.message || "Mã OTP không chính xác. Vui lòng thử lại."
          );
        },
      }
    );
  };

  // Handle resend OTP
  const handleResend = () => {
    resendOTPMutation.mutate(email, {
      onSuccess: () => {
        setOtp(["", "", "", "", "", ""]);
        setTimeLeft(60);
        setError("");
      },
    });
  };

  // Countdown timer for OTP resend
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md shadow-lg border-0 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
        <CardHeader className="text-center pt-8 pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Xác minh tài khoản
          </CardTitle>
          <p className="text-gray-500 mt-2">
            Nhập mã OTP gồm 6 chữ số được gửi tới{" "}
            <span className="font-medium text-blue-600">{email}</span>
          </p>
        </CardHeader>
        <CardContent className="px-6 pb-8">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Xác minh thành công!
              </h3>
              <p className="text-gray-500">
                Tài khoản của bạn đã được xác minh thành công.
              </p>
              <Button
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Tiếp tục
              </Button>
            </div>
          ) : (
            <>
              <OTPInput length={6} value={otp} onChange={handleChange} />

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm mt-3 justify-center">
                  <AlertCircle className="h-4 w-4" />
                  <p>{error}</p>
                </div>
              )}

              <Button
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={handleSubmit}
                disabled={verifyOTPMutation.isPending}
              >
                {verifyOTPMutation.isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang xác minh...</span>
                  </div>
                ) : (
                  "Xác minh"
                )}
              </Button>

              <div className="text-center mt-6">
                {timeLeft > 0 ? (
                  <p className="text-sm text-gray-500">
                    Gửi lại mã sau{" "}
                    <span className="font-medium text-blue-600">
                      {timeLeft}s
                    </span>
                  </p>
                ) : (
                  <Button
                    variant="link"
                    onClick={handleResend}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    disabled={resendOTPMutation.isPending}
                  >
                    {resendOTPMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang gửi...</span>
                      </div>
                    ) : (
                      "Gửi lại mã OTP"
                    )}
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyPage;
