"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getOrder,
  useCancelOrder,
  useUpdateOrderStatus,
} from "@/api/order/order.api";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ChevronDown,
  ChevronUp,
  Filter,
  Home,
  Package,
  RefreshCw,
  Search,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/types/enum";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { toast } from "react-toastify";
import OrderActionButtons from "@/components/layouts/admin/OrderActionButtons";
import { Order } from "@/types/backend";
import { formatCurrency } from "@/ulils/currency";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Status utilities
const getStatusVariant = (
  status: OrderStatus
): "outline" | "default" | "secondary" | "destructive" | null | undefined => {
  switch (status) {
    case OrderStatus.PENDING:
      return "outline";
    case OrderStatus.PROCESSING:
      return "secondary";
    case OrderStatus.CONFIRMED:
      return "default";
    case OrderStatus.SHIPPED:
      return "secondary";
    case OrderStatus.DELIVERED:
      return "default"; // Adjust to a valid variant
    case OrderStatus.CANCELED:
      return "destructive";
    default:
      return null;
  }
};

const formatOrderStatus = (status: OrderStatus): string => {
  const statusMap: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: "Chờ xác nhận",
    [OrderStatus.PROCESSING]: "Đang xử lý",
    [OrderStatus.CONFIRMED]: "Đã xác nhận",
    [OrderStatus.SHIPPED]: "Đang giao hàng",
    [OrderStatus.DELIVERED]: "Đã giao hàng",
    [OrderStatus.CANCELED]: "Đã hủy",
  };

  return (
    statusMap[status] ||
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  );
};

// Breadcrumb Component
const BreadcrumbAdmin: React.FC = () => {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Button variant="link" className="h-auto p-0" asChild>
        <Link href="/admin">
          <Home className="h-4 w-4 mr-1" />
          Admin
        </Link>
      </Button>
      <span>/</span>
      <Button variant="link" className="h-auto p-0 font-medium text-foreground">
        <Link href="/admin/orders">
          <ShoppingCart className="h-4 w-4 mr-1" />
          Đơn hàng
        </Link>
      </Button>
    </nav>
  );
};

// Main Component
const OrderManagementPage: React.FC = () => {
  // State
  const [expandedRowKey, setExpandedRowKey] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Queries
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrder,
    staleTime: 5000,
  });

  const { mutate: cancelOrder, isPending: isCanceling } = useCancelOrder();
  const { mutate: updateOrderStatus, isPending: isUpdating } =
    useUpdateOrderStatus();

  // Handlers
  const handleCancelOrder = (id: number) => {
    cancelOrder(id, {
      onSuccess: () => {
        toast.success("Cập nhật trạng thái đơn hàng thành công!");
        refetch();
      },
      onError: () => {
        toast.error("Hủy đơn hàng thất bại, vui lòng thử lại!");
      },
    });
  };

  const handleUpdateOrderStatus = (id: number, status: OrderStatus) => {
    updateOrderStatus(
      { id, status },
      {
        onSuccess: () => {
          toast.success("Cập nhật trạng thái đơn hàng thành công!");
          refetch();
        },
        onError: () => {
          toast.error("Hủy đơn hàng thất bại, vui lòng thử lại!");
        },
      }
    );
  };

  const toggleExpand = (id: number) => {
    setExpandedRowKey((prev) => (prev === id ? null : id));
  };

  // Derived state
  const orders = useMemo(
    () => (Array.isArray(data) ? data : []) as Order[],
    [data]
  );

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        searchTerm === "" ||
        order.consignee_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.shipping_address
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // Pagination
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Quản lý đơn hàng
          </h1>
          <p className="text-muted-foreground mt-1">
            Xem và quản lý tất cả đơn hàng của khách hàng
          </p>
        </div>
        <BreadcrumbAdmin />
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm theo tên, địa chỉ hoặc ID..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                {Object.values(OrderStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {formatOrderStatus(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="w-full h-16" />
              ))}
            </div>
          ) : isError ? (
            <div className="p-8 text-center">
              <p className="text-destructive mb-4">
                Không thể tải dữ liệu đơn hàng
              </p>
              <Button onClick={() => refetch()}>Thử lại</Button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Không tìm thấy đơn hàng</h3>
              <p className="text-muted-foreground mt-1">
                {searchTerm || statusFilter !== "all"
                  ? "Thử thay đổi bộ lọc để xem nhiều đơn hàng hơn"
                  : "Chưa có đơn hàng nào được tạo"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead className="w-[180px]">Ngày tạo</TableHead>
                  <TableHead>Người nhận</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Địa chỉ
                  </TableHead>
                  <TableHead className="text-right">Tổng tiền</TableHead>
                  <TableHead className="w-[150px]">Trạng thái</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order, index) => (
                  <React.Fragment key={index}>
                    <TableRow
                      className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                        expandedRowKey === order.id ? "bg-muted/30" : ""
                      }`}
                      onClick={() => toggleExpand(order.id)}
                    >
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString(
                          "vi-VN",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </TableCell>
                      <TableCell>{order.consignee_name}</TableCell>
                      <TableCell className="hidden md:table-cell truncate max-w-[250px]">
                        {order.shipping_address}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(
                          Number(order.total) + Number(order.shipping_fee)
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusVariant(order.status)}
                          className="whitespace-nowrap"
                        >
                          {formatOrderStatus(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {expandedRowKey === order.id ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </TableCell>
                    </TableRow>
                    {expandedRowKey === order.id && (
                      <TableRow className="bg-muted/10 hover:bg-muted/10">
                        <TableCell colSpan={7} className="p-0">
                          <div className="p-4 space-y-4">
                            {/* Order Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <h3 className="font-semibold text-sm">
                                  Thông tin đơn hàng
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="text-muted-foreground">
                                    Mã đơn hàng:
                                  </div>
                                  <div className="font-medium">#{order.id}</div>
                                  <div className="text-muted-foreground">
                                    Ngày đặt hàng:
                                  </div>
                                  <div>
                                    {new Date(
                                      order.created_at
                                    ).toLocaleDateString("vi-VN", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                  <div className="text-muted-foreground">
                                    Phương thức thanh toán:
                                  </div>
                                  <div className="uppercase">
                                    {order.payment_method}
                                  </div>
                                  <div className="text-muted-foreground">
                                    Trạng thái:
                                  </div>
                                  <div>
                                    <Badge
                                      variant={getStatusVariant(order.status)}
                                    >
                                      {formatOrderStatus(order.status)}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <h3 className="font-semibold text-sm">
                                  Thông tin giao hàng
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="text-muted-foreground">
                                    Người nhận:
                                  </div>
                                  <div className="font-medium">
                                    {order.consignee_name}
                                  </div>
                                  <div className="text-muted-foreground">
                                    Địa chỉ:
                                  </div>
                                  <div className="break-words">
                                    {order.shipping_address}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Separator />

                            {/* Order Items */}
                            <div className="space-y-2">
                              <h3 className="font-semibold text-sm">
                                Chi tiết sản phẩm
                              </h3>
                              <div className="rounded-md border">
                                <Table>
                                  <TableHeader>
                                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                                      <TableHead>Sản phẩm</TableHead>
                                      <TableHead className="hidden sm:table-cell">
                                        Biến thể
                                      </TableHead>
                                      <TableHead className="text-center">
                                        Số lượng
                                      </TableHead>
                                      <TableHead className="text-right">
                                        Đơn giá
                                      </TableHead>
                                      <TableHead className="text-right">
                                        Thành tiền
                                      </TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {order.orderItems?.map((item) => (
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
                                        <TableCell className="hidden sm:table-cell">
                                          {item.variant?.name || "-"}
                                        </TableCell>
                                        <TableCell className="text-center">
                                          {item.quantity}
                                        </TableCell>
                                        <TableCell className="text-right">
                                          ₫
                                          {Number(item.price).toLocaleString(
                                            "vi-VN"
                                          )}
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                          ₫
                                          {(
                                            Number(item.price) * item.quantity
                                          ).toLocaleString("vi-VN")}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                    <TableRow>
                                      <TableCell colSpan={3}></TableCell>
                                      <TableCell className="text-right font-medium">
                                        Tổng cộng:
                                      </TableCell>
                                      <TableCell className="text-right font-bold">
                                        {formatCurrency(
                                          Number(order.total) +
                                            Number(order.shipping_fee)
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end mt-4">
                              <OrderActionButtons
                                order={order}
                                updateOrderStatus={handleUpdateOrderStatus}
                                cancelOrder={handleCancelOrder}
                                isUpdating={isUpdating}
                                isCanceling={isCanceling}
                              />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && !isError && filteredOrders.length > 0 && (
          <div className="p-4 border-t">
            <Pagination>
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // Show first page, last page, and pages around current page
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    // Show ellipsis
                    if (page === 2 || page === totalPages - 1) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  }
                )}
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
          </div>
        )}
      </Card>
    </div>
  );
};

export default OrderManagementPage;
