"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getOrder,
  useCancelOrder,
  useUpdateOrderStatus,
} from "@/app/api/order/order.api";
import BreadcrumbAdmin from "@/components/layouts/admin/breadcrumb..admin";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types/backend";
import RenderActionButtons from "@/components/layouts/admin/RenderActionButtons";

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

const ListOrderPage: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrder,
    staleTime: 5000,
  });
  const { mutate: cancelOrder, isPending: isCanceling } = useCancelOrder();
  const { mutate: updateOrderStatus, isPending: isUpdating } =
    useUpdateOrderStatus();

  const orders: Order[] = Array.isArray(data) ? data : [];
  const [expandedRowKey, setExpandedRowKey] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedRowKey((prev) => (prev === id ? null : id));
  };

  const handleUpdateOrderStatus = (id: number, status: OrderStatus) => {
    updateOrderStatus({ id, status });
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-2xl font-bold">Quản lý đơn hàng</h3>
        <BreadcrumbAdmin />
      </div>
      <Card className="p-3 sm:p-5 shadow-md rounded-lg overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              {[
                "ID",
                "Ngày tạo",
                "Địa chỉ giao hàng",
                "Giá trị đơn hàng",
                "Phương thức thanh toán",
                "Trạng thái",
              ].map((header) => (
                <TableHead key={header} className="text-xs sm:text-sm truncate">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <TableRow
                  onClick={() => toggleExpand(order.id)}
                  className="cursor-pointer hover:bg-gray-50 transition text-xs sm:text-sm"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="truncate max-w-[150px]">
                    {order.shipping_address}
                  </TableCell>
                  <TableCell>₫{Number(order.total).toLocaleString()}</TableCell>
                  <TableCell>{order.payment_method.toUpperCase()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
                {expandedRowKey === order.id && (
                  <TableRow className="bg-gray-50">
                    <TableCell colSpan={7} className="p-4">
                      <h3 className="font-semibold text-sm sm:text-lg mb-2">
                        Chi tiết đơn hàng
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <strong>Người nhận:</strong> {order.consignee_name}
                        </div>
                        <div>
                          <strong>Địa chỉ giao hàng:</strong>{" "}
                          {order.shipping_address}
                        </div>
                      </div>
                      <div className="overflow-x-auto mt-2">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-200 text-xs sm:text-sm">
                              {["Sản phẩm", "Biến thể", "Số lượng", "Giá"].map(
                                (header) => (
                                  <TableHead key={header}>{header}</TableHead>
                                )
                              )}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.orderItems?.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                  {item.variant?.name || "-"}
                                </TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                  ₫{Number(item.price).toLocaleString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <RenderActionButtons
                          order={order}
                          updateOrderStatus={handleUpdateOrderStatus}
                          cancelOrder={cancelOrder}
                          isUpdating={isUpdating}
                          isCanceling={isCanceling}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ListOrderPage;

const getStatusVariant = (
  status: OrderStatus
): "outline" | "default" | "secondary" | "destructive" => {
  const variants: Record<
    OrderStatus,
    "outline" | "default" | "secondary" | "destructive"
  > = {
    [OrderStatus.PENDING]: "outline",
    [OrderStatus.PROCESSING]: "default",
    [OrderStatus.SHIPPED]: "secondary",
    [OrderStatus.DELIVERED]: "default",
    [OrderStatus.CANCELED]: "destructive",
  };
  return variants[status] || "outline";
};
