"use client";
import { useDashboardStats } from "@/api/dashboard/dashboard.api";
import { DashboardStats } from "@/components/layouts/admin/DashboardStats";
import { RevenueChart } from "@/components/layouts/admin/RevenueChart";
import { useCheckSession } from "@/hooks/useCheckSession";

export default function DashboardPage() {
  useCheckSession();

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
