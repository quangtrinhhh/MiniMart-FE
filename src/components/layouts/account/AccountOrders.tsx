import { getOrder, useCancelOrder } from "@/app/api/order/order.api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Fragment, useState } from "react";
import { Order } from "@/types/backend";
import { OrderStatus } from "@/app/(admin)/dashboard/orders/list/page";

const AccountOrders: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrder(),
    staleTime: 5000,
  });
  const { mutate } = useCancelOrder();

  const orders: Order[] = Array.isArray(data) ? data : [];
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

  const handleCancelOrder = (id: number) => {
    mutate(id);
  };

  const toggleExpand = (id: number) => {
    setExpandedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Đơn hàng của bạn</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Địa chỉ giao hàng</TableHead>
            <TableHead>Giá trị đơn hàng</TableHead>
            <TableHead>Phương thức thanh toán</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <Fragment key={order.id}>
              <TableRow
                key={order.id}
                onClick={() => toggleExpand(order.id)}
                className="cursor-pointer"
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleString()}
                </TableCell>
                <TableCell>{order.shipping_address}</TableCell>
                <TableCell>₫{Number(order.total).toLocaleString()}</TableCell>
                <TableCell>{order.payment_method.toUpperCase()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === OrderStatus.PENDING
                        ? "outline"
                        : order.status === OrderStatus.PROCESSING
                        ? "default"
                        : "destructive"
                    }
                  >
                    {order.status.toUpperCase()}
                  </Badge>
                </TableCell>

                <TableCell>
                  {order.status === OrderStatus.PENDING && (
                    <Button
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation(); // Ngăn sự kiện click lan ra TableRow
                        handleCancelOrder(order.id);
                      }}
                    >
                      Hủy đơn
                    </Button>
                  )}
                </TableCell>
              </TableRow>
              {expandedRowKeys.includes(order.id) && (
                <TableRow>
                  <TableCell colSpan={8}>
                    <h3 className="font-semibold">Chi tiết đơn hàng</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sản phẩm</TableHead>
                          <TableHead>Biến thể</TableHead>
                          <TableHead>Số lượng</TableHead>
                          <TableHead>Giá</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.orderItems?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.variant?.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                              ₫{Number(item.price).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountOrders;
