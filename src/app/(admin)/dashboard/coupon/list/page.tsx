"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { CouponFormValues } from "@/types/backend";
import { useDeleteCoupon, useGetAllCoupons } from "@/api/coupons/useCoupon";
import Link from "next/link";
import { formatCurrency } from "@/ulils/currency";

const ListCouponPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { data } = useGetAllCoupons(currentPage, itemsPerPage);
  const { mutate: deleteCoupon } = useDeleteCoupon();
  const filteredCoupons = (data?.data ?? []).filter(
    (coupon: CouponFormValues) =>
      coupon.coupon_code.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  const displayedCoupons = filteredCoupons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const onDeleteCoupon = (id: number) => {
    deleteCoupon(id);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Tìm kiếm mã giảm giá..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button>Thêm Mã Giảm Giá</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Mã</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Giá trị</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày bắt đầu</TableHead>
              <TableHead>Ngày kết thúc</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedCoupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>{coupon.id}</TableCell>
                <TableCell>{coupon.coupon_code}</TableCell>
                <TableCell>{coupon.coupon_type}</TableCell>
                <TableCell>{formatCurrency(coupon.coupon_value)}</TableCell>
                <TableCell>{coupon.coupon_status}</TableCell>
                <TableCell>{coupon.coupon_start_date}</TableCell>
                <TableCell>{coupon.coupon_end_date}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/coupon/edit/${coupon.id}`}>
                    <Button variant="outline">Sửa</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="ml-2"
                    onClick={() => onDeleteCoupon(coupon.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trang trước
          </Button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Trang sau
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListCouponPage;
