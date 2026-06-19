"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/hooks/useFinanceData";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { CategoryChart } from "@/components/charts/CategoryChart";
import { groupTransactionsByCategory } from "@/utils/formatters";
import { TableSkeleton } from "@/components/ui/Skeleton";

export default function TransactionsPage() {
  const { userId } = useAuth();
  const { data: transactions, isLoading } = useTransactions(userId);
  const categoryData = groupTransactionsByCategory(transactions);

  return (
    <AppShell title="Transactions" subtitle="Track and analyze every rupee">
      <div className="mb-8">
        <CategoryChart data={categoryData} />
      </div>
      {isLoading ? <TableSkeleton rows={6} /> : (
        <TransactionTable transactions={transactions} userId={userId} />
      )}
    </AppShell>
  );
}
