"use client";

import type React from "react";

import { getOrder, useCancelOrder } from "@/api/order/order.api";
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
import { Fragment, useState } from "react";
import type { Order } from "@/types/backend";
import { OrderStatus } from "@/types/enum";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Package,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useMobile } from "@/lib/use-mobile";
import OrderDetails from "./OrderDetails";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatCurrency } from "@/ulils/currency";

// Component chính
const AccountOrders: React.FC = () => {
  const isMobile = useMobile();
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [cancelOrderId, setCancelOrderId] = useState<number | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const itemsPerPage = 5;

  // Fetch orders data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrder(),
    staleTime: 5000,
  });

  // Cancel order mutation
  const { mutate, isPending: isCanceling } = useCancelOrder();

  const orders: Order[] = Array.isArray(data) ? data : [];

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      order.id.toString().includes(searchTerm) ||
      order.shipping_address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle expanded row
  const toggleExpand = (id: number) => {
    setExpandedRowKeys((prev) =>
      prev.includes(id) ? prev.filter((key) => key !== id) : [...prev, id]
    );
  };

  // Handle cancel order
  const handleCancelOrder = (id: number) => {
    setCancelOrderId(id);
    setShowCancelDialog(true);
  };

  const confirmCancelOrder = () => {
    if (cancelOrderId) {
      mutate(cancelOrderId);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-semibold mb-6">Đơn hàng của bạn</h1>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render error state
  if (isError) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-6">Đơn hàng của bạn</h1>
        <Card className="bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <AlertCircle className="h-10 w-10 text-destructive mb-4" />
            <h3 className="text-lg font-medium mb-2">Không thể tải dữ liệu</h3>
            <p className="text-muted-foreground text-center mb-4">
              Đã xảy ra lỗi khi tải danh sách đơn hàng của bạn.
            </p>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Thử lại
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render empty state
  if (orders.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-6">Đơn hàng của bạn</h1>
        <Card className="bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Package className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Chưa có đơn hàng nào</h3>
            <p className="text-muted-foreground text-center">
              Bạn chưa có đơn hàng nào. Hãy tiếp tục mua sắm để tạo đơn hàng
              mới.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Đơn hàng của bạn</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo ID hoặc địa chỉ..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value={OrderStatus.PENDING}>Chờ xác nhận</SelectItem>
            <SelectItem value={OrderStatus.CONFIRMED}>Đã xác nhận</SelectItem>
            <SelectItem value={OrderStatus.PROCESSING}>Đang xử lý</SelectItem>
            <SelectItem value={OrderStatus.SHIPPED}>Đang giao hàng</SelectItem>
            <SelectItem value={OrderStatus.DELIVERED}>Đã giao hàng</SelectItem>
            <SelectItem value={OrderStatus.CANCELED}>Đã hủy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders table */}
      {filteredOrders.length === 0 ? (
        <Card className="bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Filter className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Không tìm thấy đơn hàng
            </h3>
            <p className="text-muted-foreground text-center">
              Không có đơn hàng nào phù hợp với bộ lọc hiện tại.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
            >
              Xóa bộ lọc
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {isMobile ? (
            // Mobile view - card layout
            <div className="space-y-4">
              {paginatedOrders.map((order, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="py-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">
                        Đơn hàng #{order.id}
                      </CardTitle>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <CardDescription>
                      {new Date(order.created_at).toLocaleDateString("vi-VN")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Địa chỉ:</span>
                        <span className="text-right">
                          {order.shipping_address}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Thanh toán:
                        </span>
                        <span>{order.payment_method.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Tổng tiền:</span>
                        <span>
                          {formatCurrency(
                            Number(order.total) + Number(order.shipping_fee)
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between py-3 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleExpand(order.id)}
                      className="text-xs"
                    >
                      {expandedRowKeys.includes(order.id) ? (
                        <>
                          <ChevronUp className="h-3 w-3 mr-1" />
                          Ẩn chi tiết
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3 mr-1" />
                          Xem chi tiết
                        </>
                      )}
                    </Button>
                    {order.status === OrderStatus.PENDING && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelOrder(order.id)}
                        className="text-xs"
                      >
                        Hủy đơn
                      </Button>
                    )}
                  </CardFooter>
                  {expandedRowKeys.includes(order.id) && (
                    <div className="px-4 pb-4">
                      <OrderDetails order={order} />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            // Desktop view - table layout
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead className="w-[150px]">Ngày tạo</TableHead>
                    <TableHead>Địa chỉ giao hàng</TableHead>
                    <TableHead className="text-right">Giá trị</TableHead>
                    <TableHead>Thanh toán</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order, index) => (
                    <Fragment key={index}>
                      <TableRow className="group">
                        <TableCell className="font-medium">
                          #{order.id}
                        </TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleDateString(
                            "vi-VN"
                          )}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {order.shipping_address}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(
                            Number(order.total) + Number(order.shipping_fee)
                          )}
                        </TableCell>
                        <TableCell>
                          {order.payment_method === "cod"
                            ? "COD"
                            : order.payment_method === "bank_transfer"
                            ? "Chuyển khoản"
                            : order.payment_method.toUpperCase()}
                        </TableCell>
                        <TableCell>
                          <OrderStatusBadge status={order.status} />
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpand(order.id)}
                          >
                            {expandedRowKeys.includes(order.id) ? (
                              <>
                                <ChevronUp className="h-4 w-4 mr-1" />
                                Ẩn
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                Chi tiết
                              </>
                            )}
                          </Button>
                          {order.status === OrderStatus.PENDING && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
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
                          <TableCell colSpan={7} className="p-0 border-b-0">
                            <div className="p-4 bg-muted/30">
                              <OrderDetails order={order} />
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => {
                  // Show first page, last page, and pages around current page
                  if (
                    i === 0 ||
                    i === totalPages - 1 ||
                    (i >= currentPage - 2 && i <= currentPage + 0)
                  ) {
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(i + 1);
                          }}
                          isActive={currentPage === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }

                  // Show ellipsis
                  if (i === 1 && currentPage > 3) {
                    return (
                      <PaginationItem key={i}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  if (i === totalPages - 2 && currentPage < totalPages - 2) {
                    return (
                      <PaginationItem key={i}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      {/* Cancel Order Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Xác nhận hủy đơn hàng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể
              hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              disabled={isCanceling}
            >
              Hủy bỏ
            </Button>
            <Button
              variant="destructive"
              onClick={confirmCancelOrder}
              disabled={isCanceling}
            >
              {isCanceling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý
                </>
              ) : (
                "Xác nhận hủy đơn"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountOrders;
