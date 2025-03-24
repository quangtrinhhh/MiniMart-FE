"use client";
import { useDashboardStats } from "@/app/api/dashboard/dashboard.api";
import { DashboardStats } from "@/components/layouts/admin/DashboardStats";
import { RevenueChart } from "@/components/layouts/admin/RevenueChart";

export default function DashboardPage() {
  const { totalUsers, totalOrders, totalRevenue } = useDashboardStats();
  return (
    <div className="flex flex-col gap-5">
      <DashboardStats
        totalUsers={totalUsers}
        totalOrders={totalOrders}
        totalRevenue={totalRevenue}
      />
      <RevenueChart />
    </div>
  );
}
