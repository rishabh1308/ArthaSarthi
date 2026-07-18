"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Target,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { StatCard } from "@/components/ui/Card";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatDateTime, getCategoryColor, getGoalProgress } from "@/utils/formatters";

export function DashboardStats({ analysis, profile, assets }) {
  const income = analysis?.totalIncome ?? profile?.income ?? 0;
  const expenses = analysis?.totalExpense ?? profile?.expenses ?? 0;
  const savings = analysis?.savings ?? profile?.savings ?? 0;
  const netWorth = assets?.reduce((s, a) => s + (a.value || 0), 0) || savings;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Income"
        value={formatCurrency(income)}
        icon={TrendingUp}
        trend={{ positive: true, value: "This period" }}
        delay={0}
      />
      <StatCard
        title="Expenses"
        value={formatCurrency(expenses)}
        icon={TrendingDown}
        delay={0.05}
      />
      <StatCard
        title="Savings"
        value={formatCurrency(savings)}
        icon={Wallet}
        delay={0.1}
      />
      <StatCard
        title="Net Worth"
        value={formatCurrency(netWorth)}
        subtitle="Assets + savings"
        icon={Target}
        delay={0.15}
      />
    </div>
  );
}

export function AIRecommendation({ analysis, profile }) {
  const risk = analysis?.riskLevel || profile?.riskLevel || "MEDIUM";
  const savings = analysis?.savings ?? profile?.savings ?? 0;
  const expenses = analysis?.totalExpense ?? profile?.expenses ?? 0;

  let tip =
    "Set up your financial profile and add transactions to unlock personalized AI insights.";
  if (savings > 0 && expenses > 0) {
    const rate = Math.round((savings / (savings + expenses)) * 100);
    tip = `Your savings rate is around ${rate}%. Consider automating transfers to hit your goals faster. Risk profile: ${risk}.`;
  }

  return (
    <Card className="border-sky-light/40 bg-gradient-to-br from-sky-soft/30 to-teal-soft/20">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-deep to-teal-deep text-white">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-slate-ink">
            AI Insight
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-muted">{tip}</p>
          <Link
            href="/advisor"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-deep hover:underline"
          >
            Ask your advisor <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}

export function RecentTransactions({ transactions }) {
  const recent = [...(transactions || [])]
    .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
    .slice(0, 5);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-slate-ink">
          Recent Transactions
        </h3>
        <Link href="/transactions" className="text-sm font-medium text-sky-deep hover:underline">
          View all
        </Link>
      </div>
      {recent.length === 0 ? (
        <p className="text-sm text-slate-muted">No transactions yet.</p>
      ) : (
        <ul className="space-y-3">
          {recent.map((t) => (
            <motion.li
              key={t.transactionId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between rounded-xl bg-cream-100/80 px-4 py-3"
            >
              <div>
                <p className="font-medium text-slate-ink">
                  {t.description || t.category}
                </p>
                <p className="text-xs text-slate-light">
                  {formatDateTime(t.transactionDate)}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={
                    t.type === "CREDIT"
                      ? "font-semibold text-teal-deep"
                      : "font-semibold text-slate-ink"
                  }
                >
                  {t.type === "CREDIT" ? "+" : "-"}
                  {formatCurrency(t.amount)}
                </span>
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${getCategoryColor(t.category)}`}
                >
                  {t.category}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export function GoalProgressList({ goals }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-slate-ink">
          Goal Progress
        </h3>
        <Link href="/goals" className="text-sm font-medium text-sky-deep hover:underline">
          Manage
        </Link>
      </div>
      {!goals?.length ? (
        <p className="text-sm text-slate-muted">No goals yet. Create your first goal.</p>
      ) : (
        <ul className="space-y-4">
          {goals.slice(0, 3).map((g) => {
            const pct = getGoalProgress(g.currentAmount, g.targetAmount);
            return (
              <li key={g.id}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-ink">{g.goalName}</span>
                  <span className="text-slate-muted">{pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-sky-soft">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-sky-deep to-teal-deep"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
