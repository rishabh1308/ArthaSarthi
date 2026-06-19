"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/context/AuthContext";
import { useDashboardData } from "@/hooks/useFinanceData";
import {
  DashboardStats,
  AIRecommendation,
  RecentTransactions,
  GoalProgressList,
} from "@/components/dashboard/DashboardWidgets";
import { SpendingChart } from "@/components/charts/SpendingChart";
import { AssetPieChart } from "@/components/charts/AssetPieChart";
import { HealthRadial } from "@/components/charts/HealthRadial";
import { CardSkeleton, ChartSkeleton } from "@/components/ui/Skeleton";
import {
  generateSparklineData,
  calculateHealthScore,
} from "@/utils/formatters";

export default function DashboardPage() {
  const { userId } = useAuth();
  const { analysis, profile, transactions, goals, assets, isLoading } =
    useDashboardData(userId);

  const income = analysis?.totalIncome ?? profile?.income ?? 0;
  const expenses = analysis?.totalExpense ?? profile?.expenses ?? 0;
  const savings = analysis?.savings ?? profile?.savings ?? 0;
  const healthScore = calculateHealthScore(income, expenses, savings);
  const sparkData = generateSparklineData(transactions);

  return (
    <AppShell
      title="Dashboard"
      subtitle="Your financial overview at a glance"
    >
      {isLoading ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
          <ChartSkeleton />
        </div>
      ) : (
        <div className="space-y-8">
          <DashboardStats analysis={analysis} profile={profile} assets={assets} />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <SpendingChart data={sparkData} />
              <AIRecommendation analysis={analysis} profile={profile} />
            </div>
            <div className="space-y-6">
              <HealthRadial score={healthScore} />
              <AssetPieChart assets={assets} />
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <RecentTransactions transactions={transactions} />
            <GoalProgressList goals={goals} />
          </div>
        </div>
      )}
    </AppShell>
  );
}
