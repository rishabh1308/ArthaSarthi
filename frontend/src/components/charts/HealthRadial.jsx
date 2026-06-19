"use client";

import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/Card";
import { getHealthLabel } from "@/utils/formatters";

export function HealthRadial({ score, title = "Financial Health" }) {
  const data = [{ name: "Health", value: score, fill: "#5BBFB5" }];
  const { label, color } = getHealthLabel(score);

  return (
    <Card className="flex flex-col items-center justify-center">
      <h3 className="mb-2 font-display text-lg font-semibold text-slate-ink">
        {title}
      </h3>
      <div className="relative h-48 w-48">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={12}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar background clockWise dataKey="value" cornerRadius={8} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold text-slate-ink">
            {score}
          </span>
          <span className={`text-sm font-medium ${color}`}>{label}</span>
        </div>
      </div>
    </Card>
  );
}
