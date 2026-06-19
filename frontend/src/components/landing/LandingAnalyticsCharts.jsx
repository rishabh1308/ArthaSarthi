"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const SPENDING_DATA = [
  { month: "Jan", amount: 2800 },
  { month: "Feb", amount: 3100 },
  { month: "Mar", amount: 2900 },
  { month: "Apr", amount: 3300 },
  { month: "May", amount: 3000 },
  { month: "Jun", amount: 3620 },
];

const ASSET_DATA = [
  { name: "Stocks", value: 60, color: "#3A9AD9" },
  { name: "Bonds", value: 25, color: "#5BBFB5" },
  { name: "Real Estate", value: 10, color: "#8B5CF6" },
  { name: "Cash", value: 5, color: "#FBBF24" },
];

function ShowcaseCard({ title, children }) {
  return (
    <div className="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl bg-white/90 shadow-card">
      <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-sky-soft/30 to-cream-50 p-5 pt-6">
        {children}
      </div>
      <p className="border-t border-sky-soft/40 py-3 text-center text-sm font-medium text-slate-muted">
        {title}
      </p>
    </div>
  );
}

function SpendingTrendsPreview() {
  return (
    <ShowcaseCard title="Spending Trends">
      <div className="relative h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={SPENDING_DATA}
            margin={{ top: 28, right: 8, left: -8, bottom: 0 }}
          >
            <defs>
              <linearGradient id="landingSpendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6BB8E8" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#6BB8E8" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94A3B8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#94A3B8" }}
              tickFormatter={(v) => `$${v >= 1000 ? `${v / 1000}K` : v}`}
              domain={[0, 4000]}
              ticks={[0, 1000, 2000, 3000, 4000]}
              width={32}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#3A9AD9"
              strokeWidth={2.5}
              fill="url(#landingSpendGrad)"
              dot={{ r: 4, fill: "#3A9AD9", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
        {/* Tooltip pill on Jun data point */}
        <div className="pointer-events-none absolute right-[12%] top-[18%] rounded-full bg-sky-deep px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-soft sm:right-[14%]">
          $3,620
        </div>
      </div>
    </ShowcaseCard>
  );
}

function AssetPiePreview() {
  const total = "₹2,45,840";

  return (
    <ShowcaseCard title="Asset Pie">
      <div className="flex w-full items-center justify-center gap-3 sm:gap-4">
        <div className="relative h-36 w-36 shrink-0 sm:h-40 sm:w-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ASSET_DATA}
                cx="50%"
                cy="50%"
                innerRadius="58%"
                outerRadius="88%"
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {ASSET_DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-sm font-bold text-slate-ink sm:text-base">
              {total}
            </span>
            <span className="text-[10px] text-slate-light sm:text-xs">Total Assets</span>
          </div>
        </div>
        <ul className="space-y-2 text-left text-xs sm:text-sm">
          {ASSET_DATA.map((item) => (
            <li key={item.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-muted">{item.name}</span>
              <span className="font-semibold text-slate-ink">{item.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </ShowcaseCard>
  );
}

function HealthGaugePreview({ score = 82 }) {
  const cx = 100;
  const cy = 95;
  const r = 72;
  const needleAngle = Math.PI * (1 - score / 100);
  const needleX = cx + r * 0.72 * Math.cos(needleAngle);
  const needleY = cy - r * 0.72 * Math.sin(needleAngle);

  return (
    <ShowcaseCard title="Health Score">
      <div className="relative h-44 w-full max-w-[220px]">
        <svg viewBox="0 0 200 120" className="h-full w-full">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="65%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
          </defs>
          {/* Background track */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="#E8F4FC"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Colored arc */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Scale labels */}
          <text x={cx - r - 2} y={cy + 16} fontSize="10" fill="#94A3B8" textAnchor="middle">
            0
          </text>
          <text x={cx} y={cy - r - 6} fontSize="10" fill="#94A3B8" textAnchor="middle">
            50
          </text>
          <text x={cx + r + 2} y={cy + 16} fontSize="10" fill="#94A3B8" textAnchor="middle">
            100
          </text>
          {/* Needle */}
          <line
            x1={cx}
            y1={cy}
            x2={needleX}
            y2={needleY}
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r="5" fill="#1E293B" />
        </svg>
        <div className="absolute inset-x-0 bottom-6 flex flex-col items-center">
          <span className="font-display text-3xl font-bold text-slate-ink">{score}</span>
          <span className="text-sm font-semibold text-emerald-600">Excellent</span>
        </div>
      </div>
    </ShowcaseCard>
  );
}

export function LandingAnalyticsCharts() {
  return (
    <>
      <SpendingTrendsPreview />
      <AssetPiePreview />
      <HealthGaugePreview />
    </>
  );
}
