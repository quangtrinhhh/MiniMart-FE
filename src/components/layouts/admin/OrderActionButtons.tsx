import { Button } from "@/components/ui/button";
import { Order } from "@/types/backend";
import { OrderStatus } from "@/types/enum";
import { Loader2 } from "lucide-react";

// Action Buttons Component
const OrderActionButtons: React.FC<{
  order: Order;
  updateOrderStatus: (id: number, status: OrderStatus) => void;
  cancelOrder: (id: number) => void;
  isUpdating: boolean;
  isCanceling: boolean;
}> = ({ order, updateOrderStatus, cancelOrder, isUpdating, isCanceling }) => {
  const getNextActions = (
    currentStatus: OrderStatus
  ): { status: OrderStatus; label: string }[] => {
    switch (currentStatus) {
      case OrderStatus.PENDING:
        return [
          { status: OrderStatus.CONFIRMED, label: "Xác nhận đơn hàng" },
          { status: OrderStatus.CANCELED, label: "Hủy đơn hàng" },
        ];
      case OrderStatus.CONFIRMED:
        return [
          { status: OrderStatus.PROCESSING, label: "Bắt đầu xử lý" },
          { status: OrderStatus.CANCELED, label: "Hủy đơn hàng" },
        ];
      case OrderStatus.PROCESSING:
        return [
          { status: OrderStatus.SHIPPED, label: "Bắt đầu giao hàng" },
          { status: OrderStatus.CANCELED, label: "Hủy đơn hàng" },
        ];
      case OrderStatus.SHIPPED:
        return [{ status: OrderStatus.DELIVERED, label: "Xác nhận đã giao" }];
      default:
        return [];
    }
  };

  const actions = getNextActions(order.status);

  if (actions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <Button
          key={action.status}
          size="sm"
          variant={
            action.status === OrderStatus.CANCELED ? "destructive" : "default"
          }
          onClick={() =>
            action.status === OrderStatus.CANCELED
              ? cancelOrder(order.id)
              : updateOrderStatus(order.id, action.status)
          }
          disabled={isUpdating || isCanceling}
        >
          {(isUpdating || isCanceling) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default OrderActionButtons;
