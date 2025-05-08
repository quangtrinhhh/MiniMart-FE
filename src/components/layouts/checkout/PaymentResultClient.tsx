"use client";

import { usePaymentResult } from "@/api/order/order.api";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Printer } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/ulils/currency";
import CardProductCheckout from "@/components/layouts/checkout/CardProductCheckout";
import { useEffect } from "react";

const PaymentResultClient = () => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const { data, isLoading, error } = usePaymentResult(queryParams);
  console.log("data: ", data);

  const router = useRouter();
  useEffect(() => {
    // Nếu có lỗi hoặc thanh toán thất bại, điều hướng về trang checkout
    if (error || data?.status === "failed") {
      router.push("/checkout");
    }
  }, [data, error, router]);

  if (isLoading)
    return (
      <p className="flex items-center justify-center  bg-[#E6E8EA] h-screen ">
        Đang kiểm tra thanh toán...
      </p>
    );
  if (error || data?.status === "invalid") {
    router.push("/checkout");
  }

  return (
    <div className="h-screen  bg-[#E6E8EA] rounded-lg shadow-md">
      <div className="max-w-7xl m-auto w-full pt-10">
        <div className="w-full flex gap-4">
          <div className="w-2/3">
            <Link
              href="/"
              className="text-[#2a9dcc] cursor-pointer text-3xl font-semibold"
            >
              EGA Mini Mart
            </Link>
            <div className="flex items-center justify-start space-x-3 my-5">
              <CheckCircle className="text-green-500" size={90} />
              <div className="flex flex-col">
                <h2 className="text-xl font-bold">Cảm ơn bạn đã đặt hàng</h2>
                <p className="text-gray-600 mb-4">
                  Một email xác nhận đã được gửi tới{" "}
                  {data?.order?.consignee_name}.
                </p>
              </div>
            </div>

            <div className="border border-[#dadada]">
              <div className="flex justify-between p-5">
                <div className="">
                  <h2 className="font-bold">Thông tin mua hàng</h2>
                  <span>{data?.order?.consignee_name}</span>
                  <span>{data?.order?.user.email}</span>
                  <span>{data?.order?.user.phone_number}</span>
                </div>
                <div className="flex flex-col">
                  <div className="">
                    <h2 className="font-bold">Địa chỉ nhận hàng</h2>
                    <span>{data?.order?.shipping_address}</span>
                    <span>{data?.order?.user.phone_number}</span>
                  </div>
                  <div className="mt-5 flex flex-col">
                    <strong>Nội dung</strong>
                    <span>{data?.order?.note}</span>
                  </div>
                </div>
              </div>
              <div className="p-5 flex justify-between">
                <div className="">
                  <h2 className="font-bold">Phương thức thanh toán</h2>
                  <span>{data?.order?.payment_method}</span>
                </div>
                <div className="">
                  <h2 className="font-bold">Phương thức vận chuyển</h2>
                  <span>Giao tận nơi</span>
                </div>
              </div>
            </div>
          </div>
          <Card className="">
            <CardHeader className="border-b">
              <CardTitle>Đơn hàng #{data?.order?.id}</CardTitle>
            </CardHeader>
            <CardContent className="pb-3 min-h-52 overflow-x-auto">
              {data?.order?.orderItems
                ?.filter((item) => item)
                .map((item) => (
                  <CardProductCheckout
                    key={item.id}
                    img={item.image ?? "/default-image.jpg"}
                    name={item.name ?? "Unknown Product"}
                    price={Number(item.price) || 0}
                    quantity={item.quantity ?? 1}
                    variant={item.variant?.name ?? ""}
                  />
                ))}
            </CardContent>
            <CardFooter className="border-t flex flex-col">
              <div className="flex justify-between w-full pt-3">
                <strong>Tạm tính:</strong>
                <span>{formatCurrency(Number(data?.order?.total))}</span>
              </div>
              <div className="flex justify-between w-full py-3">
                <strong>Phí vận chuyển</strong>
                <span>{formatCurrency(Number(data?.order?.shipping_fee))}</span>
              </div>
              <div className="flex justify-between w-full pt-5 border-t">
                <strong>Tổng công:</strong>
                <span className="font-bold text-[#2A9DCC]">
                  {formatCurrency(
                    Number(data?.order?.shipping_fee) +
                      Number(data?.order?.total)
                  )}
                </span>
              </div>
            </CardFooter>
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

export default PaymentResultClient;
