"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/utils/formatters";

export function CategoryChart({ data, title = "Spending by Category" }) {
  const chartData = data?.length ? data.slice(0, 8) : [{ name: "—", value: 0 }];

  return (
    <Card className="h-[300px]">
      <h3 className="mb-4 font-display text-lg font-semibold text-slate-ink">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 8 }}>
          <XAxis type="number" tickFormatter={(v) => formatCurrency(v, true)} />
          <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v) => formatCurrency(v)} />
          <Bar dataKey="value" fill="#6BB8E8" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
