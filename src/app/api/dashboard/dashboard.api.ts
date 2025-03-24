import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

interface stats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
}

export const getDashboardStats = async () =>
  apiClient.get<IBackendRes<stats>>(`/api/v1/dashboard/stats`);

export const useDashboardStats = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 5, // Cache trong 5 phút
  });

  return {
    totalUsers: data?.data?.totalUsers ?? 0,
    totalOrders: data?.data?.totalOrders ?? 0,
    totalRevenue: data?.data?.totalRevenue ?? 0,
    ...rest,
  };
};
