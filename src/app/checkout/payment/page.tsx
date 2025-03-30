"use client";

import { usePaymentResult } from "@/app/api/order/order.api";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Printer } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/ulils/currency";

const PaymentResultPage = () => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const { data, isLoading, error } = usePaymentResult(queryParams);

  if (isLoading)
    return (
      <p className="flex items-center justify-center  bg-[#E6E8EA] h-screen ">
        Đang kiểm tra thanh toán...
      </p>
    );
  if (error || data?.status === "invalid")
    return <p className="text-red-500">❌ Giao dịch không hợp lệ!</p>;

  return (
    <div className="h-screen flex justify-center items-center  bg-[#E6E8EA] rounded-lg shadow-md">
      <div className="max-w-7xl w-full">
        <Link
          href="/"
          className="text-[#2a9dcc] cursor-pointer text-3xl font-semibold"
        >
          EGA Mini Mart
        </Link>
        <div className="flex items-center space-x-3">
          <CheckCircle className="text-green-500" size={32} />
          <h2 className="text-xl font-bold">Cảm ơn bạn đã đặt hàng</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Một email xác nhận đã được gửi tới {data?.order?.consignee_name}.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-[#dadada]">
            <div className="flex justify-between p-5">
              <div className="">
                <h2 className="font-bold">Thông tin mua hàng</h2>
                <span>{data?.order?.consignee_name}</span>
                <span>{data?.order?.user.email}</span>
                <span>{data?.order?.user.phone_number}</span>
              </div>
              <div className="">
                <h2 className="font-bold">Địa chỉ nhận hàng</h2>
                <span>{data?.order?.shipping_address}</span>
                <span>{data?.order?.user.phone_number}</span>
                <span>{data?.order?.note}</span>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Mã đơn hàng: #{data?.order?.id}</p>
              <p>Trạng thái: {data?.order?.status}</p>
              <p>
                Phí vận chuyển:{" "}
                {formatCurrency(Number(data?.order?.shipping_fee))}
              </p>
              <p className="font-bold text-lg">
                Tổng cộng:{" "}
                {formatCurrency(
                  Number(data?.order?.total) + Number(data?.order?.shipping_fee)
                )}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-between mt-6">
          <Button onClick={() => (window.location.href = "/")}>
            Tiếp tục mua hàng
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="mr-2" size={16} /> In hóa đơn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentResultPage;
