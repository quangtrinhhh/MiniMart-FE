import { formatCurrency } from "@/ulils/currency";

interface OrderSummaryProps {
  subtotal: number;
  shippingFee: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shippingFee,
  total,
}) => {
  return (
    <div className="pt-5 mt-5 text-[#717171] font-medium border-t flex flex-col gap-5 text-sm">
      <div className="flex justify-between items-center">
        <span>Tạm tính</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Phí vận chuyển</span>
        <span>{formatCurrency(shippingFee)}</span>
      </div>
      <div className="flex justify-between items-center pt-5 border-t text-lg font-semibold">
        <span>Tổng cộng</span>
        <span className="text-[#2A9DCF]">{formatCurrency(total)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
