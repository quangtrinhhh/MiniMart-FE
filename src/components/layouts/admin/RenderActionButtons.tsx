"use client";

import { Button } from "@/components/ui/button";
import { Order } from "@/types/backend";
import { OrderStatus } from "@/types/enum";

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
      nextStatus: OrderStatus.CONFIRMED,
      label: "Xác nhận đơn hàng",
      variant: "outline",
    },
    {
      currentStatus: OrderStatus.CONFIRMED,
      nextStatus: OrderStatus.PROCESSING,
      label: "Bắt đầu xử lý",
      variant: "default",
    },
    {
      currentStatus: OrderStatus.PROCESSING,
      nextStatus: OrderStatus.SHIPPED,
      label: "Xuất kho & vận chuyển",
      variant: "secondary",
    },
    {
      currentStatus: OrderStatus.SHIPPED,
      nextStatus: OrderStatus.DELIVERED,
      label: "Xác nhận đã giao hàng",
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
          onClick={() => {
            if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
              cancelOrder(order.id);
            }
          }}
          disabled={isCanceling}
        >
          {isCanceling ? "Đang hủy..." : "Hủy đơn"}
        </Button>
      )}
    </div>
  );
};

export default RenderActionButtons;
