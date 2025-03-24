"use client";

import { OrderStatus } from "@/app/(admin)/dashboard/orders/list/page";
import { Button } from "@/components/ui/button";
import { Order } from "@/types/backend";

type RenderActionButtonsProps = {
  order: Order;
  updateOrderStatus: (id: number, status: OrderStatus) => void;
  cancelOrder: (id: number) => void;
  isUpdating: boolean;
  isCanceling: boolean;
};

const RenderActionButtons: React.FC<RenderActionButtonsProps> = ({
  order,
  updateOrderStatus,
  cancelOrder,
  isUpdating,
  isCanceling,
}) => {
  const actions: {
    currentStatus: OrderStatus;
    nextStatus: OrderStatus;
    label: string;
    variant:
      | "link"
      | "secondary"
      | "default"
      | "outline"
      | "destructive"
      | "ghost";
  }[] = [
    {
      currentStatus: OrderStatus.PENDING,
      nextStatus: OrderStatus.PROCESSING,
      label: "Xác nhận đơn hàng",
      variant: "outline",
    },
    {
      currentStatus: OrderStatus.PROCESSING,
      nextStatus: OrderStatus.SHIPPED,
      label: "Gửi hàng",
      variant: "secondary",
    },
    {
      currentStatus: OrderStatus.SHIPPED,
      nextStatus: OrderStatus.DELIVERED,
      label: "Đã giao hàng",
      variant: "default",
    },
  ];

  return (
    <div className="flex gap-2">
      {actions.map(({ currentStatus, nextStatus, label, variant }) =>
        order.status === currentStatus ? (
          <Button
            key={nextStatus}
            variant={variant}
            onClick={() => updateOrderStatus(order.id, nextStatus)}
            disabled={isUpdating}
          >
            {isUpdating ? "Đang xử lý..." : label}
          </Button>
        ) : null
      )}
      {![OrderStatus.DELIVERED, OrderStatus.CANCELED].includes(
        order.status
      ) && (
        <Button
          variant="destructive"
          onClick={() => cancelOrder(order.id)}
          disabled={isCanceling}
        >
          {isCanceling ? "Đang hủy..." : "Hủy đơn"}
        </Button>
      )}
    </div>
  );
};

export default RenderActionButtons;
