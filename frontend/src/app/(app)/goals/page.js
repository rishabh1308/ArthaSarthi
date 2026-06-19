"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/context/AuthContext";
import { useGoals } from "@/hooks/useFinanceData";
import { GoalCards } from "@/components/goals/GoalCards";
import { CardSkeleton } from "@/components/ui/Skeleton";

export default function GoalsPage() {
  const { userId } = useAuth();
  const { data: goals, isLoading } = useGoals(userId);

  return (
    <AppShell title="Savings Goals" subtitle="Plan milestones and track progress">
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <GoalCards goals={goals} userId={userId} />
      )}
    </AppShell>
  );
}
