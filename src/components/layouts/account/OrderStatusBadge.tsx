import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/enum";

// Component hiển thị trạng thái đơn hàng
const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const getVariant = () => {
    switch (status) {
      case OrderStatus.PENDING:
        return "outline";
      case OrderStatus.CONFIRMED:
        return "secondary";
      case OrderStatus.PROCESSING:
        return "default";
      case OrderStatus.SHIPPED:
        return "default";
      case OrderStatus.DELIVERED:
        return "default";
      case OrderStatus.CANCELED:
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case OrderStatus.PENDING:
        return "Chờ xác nhận";
      case OrderStatus.CONFIRMED:
        return "Đã xác nhận";
      case OrderStatus.PROCESSING:
        return "Đang xử lý";
      case OrderStatus.SHIPPED:
        return "Đang giao hàng";
      case OrderStatus.DELIVERED:
        return "Đã giao hàng";
      case OrderStatus.CANCELED:
        return "Đã hủy";
      default:
        return (status as string).toUpperCase();
    }
  };

  return (
    <Badge
      variant={
        getVariant() as "outline" | "secondary" | "default" | "destructive"
      }
      className="font-medium"
    >
      {getStatusText()}
    </Badge>
  );
};

export default OrderStatusBadge;
