"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/utils/formatters";

export function SpendingChart({ data, title = "Spending Trends" }) {
  const chartData = data?.length ? data : [{ month: "—", amount: 0 }];

  return (
    <Card className="h-[320px]">
      <h3 className="mb-4 font-display text-lg font-semibold text-slate-ink">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6BB8E8" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#6BB8E8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8F4FC" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748B" }}
            tickFormatter={(v) => formatCurrency(v, true)}
          />
          <Tooltip
            formatter={(v) => [formatCurrency(v), "Spent"]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #E8F4FC",
              boxShadow: "0 4px 24px rgba(59,154,217,0.12)",
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#3A9AD9"
            strokeWidth={2}
            fill="url(#spendGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
