"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/ulils/currency";
import { Users, ShoppingCart, DollarSign } from "lucide-react";

interface DashboardStatsProps {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalUsers,
  totalOrders,
  totalRevenue,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Tổng số người dùng */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg">Tổng số người dùng</CardTitle>
          <Users className="w-6 h-6 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
        </CardContent>
      </Card>

      {/* Tổng số đơn hàng */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg">Tổng đơn hàng</CardTitle>
          <ShoppingCart className="w-6 h-6 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalOrders.toLocaleString()}</p>
        </CardContent>
      </Card>

      {/* Tổng doanh thu */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg">Tổng doanh thu</CardTitle>
          <DollarSign className="w-6 h-6 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
        </CardContent>
      </Card>
    </div>
  );
};
