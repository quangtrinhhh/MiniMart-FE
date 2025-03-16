"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVerifyOTP, useResendOTP } from "@/hooks/useAuth";
import OTPInput from "@/components/layouts/account/OTPInput";

const VerifyPage: React.FC = () => {
  const { id } = useParams() as { id: string };
  const email = "quangcute504@gmail.com";
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(60);

  const verifyOTPMutation = useVerifyOTP();
  const resendOTPMutation = useResendOTP();

  // Xử lý thay đổi OTP
  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  // Xử lý xác minh OTP
  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Vui lòng nhập đầy đủ mã OTP.");
      return;
    }
    setError("");
    verifyOTPMutation.mutate({ id, code: otpValue });
  };

  // Xử lý gửi lại mã OTP
  const handleResend = () => {
    resendOTPMutation.mutate(email);
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(60);
    setError("");
  };

  // Countdown thời gian chờ gửi lại OTP
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center py-10 bg-gray-100">
      <Card className="w-full max-w-sm p-6 shadow-md bg-white rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold">
            Xác minh tài khoản
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            Nhập mã OTP gồm 6 chữ số được gửi tới{" "}
            <span className="font-medium text-black">{email}</span>.
          </p>
        </CardHeader>
        <CardContent>
          <OTPInput otp={otp} handleChange={handleChange} />
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
          <Button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
            disabled={verifyOTPMutation.isPending}
          >
            {verifyOTPMutation.isPending ? "Đang xác minh..." : "Xác minh"}
          </Button>
          <p className="text-sm text-gray-500 mt-4 text-center">
            {timeLeft > 0 ? (
              `Gửi lại mã sau ${timeLeft}s`
            ) : (
              <Button
                variant="link"
                onClick={handleResend}
                className="text-blue-600"
                disabled={resendOTPMutation.isPending}
              >
                {resendOTPMutation.isPending ? "Đang gửi..." : "Gửi lại mã OTP"}
              </Button>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyPage;
