"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { BarChart } from "@/components/ui/BarChart";

const dailyData = [
  { day: "Thứ 2", revenue: 12000000 },
  { day: "Thứ 3", revenue: 15000000 },
  { day: "Thứ 4", revenue: 18000000 },
  { day: "Thứ 5", revenue: 22000000 },
  { day: "Thứ 6", revenue: 25000000 },
  { day: "Thứ 7", revenue: 27000000 },
  { day: "Chủ Nhật", revenue: 30000000 },
];

const weeklyData = [
  { date: "Tuần 1", revenue: 12000000 },
  { date: "Tuần 2", revenue: 15000000 },
  { date: "Tuần 3", revenue: 18000000 },
  { date: "Tuần 4", revenue: 22000000 },
];

const monthlyData = [
  { date: "Tháng 1", revenue: 50000000 },
  { date: "Tháng 2", revenue: 60000000 },
  { date: "Tháng 3", revenue: 70000000 },
  { date: "Tháng 4", revenue: 80000000 },
];

const yearlyData = [
  { date: "2021", revenue: 500000000 },
  { date: "2022", revenue: 700000000 },
  { date: "2023", revenue: 850000000 },
];

export const RevenueChart = () => {
  const [timeRange, setTimeRange] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("daily");

  const data =
    timeRange === "daily"
      ? dailyData
      : timeRange === "weekly"
      ? weeklyData
      : timeRange === "monthly"
      ? monthlyData
      : yearlyData;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Doanh thu</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              {timeRange === "daily"
                ? "Ngày"
                : timeRange === "weekly"
                ? "Tuần"
                : timeRange === "monthly"
                ? "Tháng"
                : "Năm"}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTimeRange("daily")}>
              Ngày
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange("weekly")}>
              Tuần
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange("monthly")}>
              Tháng
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange("yearly")}>
              Năm
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <BarChart
          data={data}
          xField={timeRange === "daily" ? "day" : "date"}
          yField="revenue"
          className="h-[300px]"
        />
      </CardContent>
    </Card>
  );
};
