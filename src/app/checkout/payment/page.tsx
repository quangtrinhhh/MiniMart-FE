import PaymentResultClient from "@/components/layouts/checkout/PaymentResultClient";
import { Suspense } from "react";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Đang tải trang kết quả thanh toán...</div>}>
      <PaymentResultClient />
    </Suspense>
  );
}
