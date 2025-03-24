"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: { [key: string]: string | number }[];
  xField: string;
  yField: string;
  className?: string;
}

export const BarChart = ({
  data,
  xField,
  yField,
  className,
}: BarChartProps) => {
  // Hàm định dạng số tiền theo dạng gọn
  const formatCurrency = (value: number) => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <XAxis dataKey={xField} />
          <YAxis tickFormatter={formatCurrency} />
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("vi-VN").format(Number(value)) + " VNĐ"
            }
          />
          <Bar dataKey={yField} fill="#4F46E5" radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
