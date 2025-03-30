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

interface Coupon {
  id: number;
  code: string;
  type: string;
  value: number;
  status: string;
  startDate: string;
  endDate: string;
}

const fakeCoupons: Coupon[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  code: `COUPON${i + 1}`,
  type: i % 2 === 0 ? "Fixed Discount" : "Percentage Discount",
  value: ((i % 5) + 1) * 10,
  status: i % 3 === 0 ? "Active" : "Expired",
  startDate: "2025-04-01",
  endDate: "2025-04-30",
}));

const ListCouponPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredCoupons = fakeCoupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  const displayedCoupons = filteredCoupons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.type}</TableCell>
                <TableCell>{coupon.value}</TableCell>
                <TableCell>{coupon.status}</TableCell>
                <TableCell>{coupon.startDate}</TableCell>
                <TableCell>{coupon.endDate}</TableCell>
                <TableCell>
                  <Button variant="outline">Sửa</Button>
                  <Button variant="destructive" className="ml-2">
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
