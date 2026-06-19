"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/utils/formatters";

const COLORS = ["#6BB8E8", "#5BBFB5", "#A8D4F0", "#3A9AD9", "#3A9E94", "#B8DFF5"];

export function AssetPieChart({ assets, title = "Asset Allocation" }) {
  const data =
    assets?.length > 0
      ? assets.map((a) => ({ name: a.type, value: a.value }))
      : [{ name: "No assets", value: 1 }];

  return (
    <Card className="h-[320px]">
      <h3 className="mb-4 font-display text-lg font-semibold text-slate-ink">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => formatCurrency(v)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
