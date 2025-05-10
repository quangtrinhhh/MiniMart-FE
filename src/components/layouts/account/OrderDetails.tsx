import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/ulils/currency";
import { Order } from "@/types/backend";
import Image from "next/image";

// Component hiển thị chi tiết đơn hàng
const OrderDetails = ({ order }: { order: Order }) => {
  const totalOrder = Number(order.total) + Number(order.shipping_fee);
  return (
    <Card className="mt-2 mb-4 border-dashed">
      <CardHeader className="py-3">
        <CardTitle className="text-base font-medium">
          Chi tiết đơn hàng #{order.id}
        </CardTitle>
        <CardDescription>
          Ngày đặt:{" "}
          {new Date(order.created_at).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-medium mb-1">Địa chỉ giao hàng</h4>
            <p className="text-sm text-muted-foreground">
              {order.shipping_address}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Người nhận</h4>
            <p className="text-sm text-muted-foreground">
              {order.consignee_name}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Ghi chú</h4>
            <p className="text-sm text-muted-foreground">
              {order.note || "không có"}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Phương thức thanh toán</h4>
            <p className="text-sm text-muted-foreground">
              {order.payment_method === "cod"
                ? "Thanh toán khi nhận hàng (COD)"
                : order.payment_method === "bank_transfer"
                ? "Chuyển khoản ngân hàng"
                : order.payment_method.toUpperCase()}
            </p>
          </div>
        </div>

        <h4 className="font-medium mb-2">Sản phẩm</h4>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Biến thể</TableHead>
                <TableHead className="text-right">Số lượng</TableHead>
                <TableHead className="text-right">Giá</TableHead>
                <TableHead className="text-right">Tổng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Image
                      alt=""
                      src={item.image}
                      width={40}
                      height={40}
                    ></Image>
                    {item.name}
                  </TableCell>
                  <TableCell>{item.variant?.name || "-"}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(Number(item.price))}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(Number(item.price) * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t py-3">
        <div className="text-sm text-muted-foreground">
          Tổng số sản phẩm:{" "}
          {order.orderItems?.reduce((sum, item) => sum + item.quantity, 0) || 0}
        </div>
        <div className="font-medium">
          Tổng tiền: {formatCurrency(Number(totalOrder))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderDetails;
