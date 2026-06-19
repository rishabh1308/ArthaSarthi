"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Filter } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal, Input, Select } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { TRANSACTION_CATEGORIES } from "@/lib/constants";
import {
  formatCurrency,
  formatDateTime,
  getCategoryColor,
  debounce,
} from "@/utils/formatters";
import { useCreateTransaction } from "@/hooks/useFinanceData";
import toast from "react-hot-toast";

export function TransactionTable({ transactions, userId }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [sort, setSort] = useState("date-desc");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    type: "EXPENSE",
    category: "Food",
    description: "",
  });

  const createMutation = useCreateTransaction(userId);

  const filtered = useMemo(() => {
    let list = [...(transactions || [])];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.description?.toLowerCase().includes(q) ||
          t.category?.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== "ALL") {
      list = list.filter((t) => t.type === typeFilter);
    }
    list.sort((a, b) => {
      if (sort === "amount-desc") return b.amount - a.amount;
      if (sort === "amount-asc") return a.amount - b.amount;
      return new Date(b.transactionDate) - new Date(a.transactionDate);
    });
    return list;
  }, [transactions, search, typeFilter, sort]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        amount: Number(form.amount),
        type: form.type,
        category: form.category,
        description: form.description,
      });
      toast.success("Transaction added");
      setModalOpen(false);
      setForm({ amount: "", type: "EXPENSE", category: "Food", description: "" });
    } catch (err) {
      toast.error(err.message || "Failed to add transaction");
    }
  };

  const debouncedSearch = debounce((v) => setSearch(v), 300);

  return (
    <>
      <Card>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-light" />
            <input
              className="input-field pl-10"
              placeholder="Search transactions..."
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              className="input-field w-auto py-2 text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="ALL">All types</option>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
            <select
              className="input-field w-auto py-2 text-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="date-desc">Newest first</option>
              <option value="amount-desc">Highest amount</option>
              <option value="amount-asc">Lowest amount</option>
            </select>
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Filter}
            title="No transactions found"
            description="Add your first transaction or adjust filters."
            action={
              <Button onClick={() => setModalOpen(true)}>
                <Plus className="h-4 w-4" /> Add transaction
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-sky-soft/60 text-slate-muted">
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <motion.tr
                    key={t.transactionId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-sky-soft/30 hover:bg-sky-soft/20"
                  >
                    <td className="py-4 font-medium text-slate-ink">
                      {t.description || "—"}
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getCategoryColor(t.category)}`}
                      >
                        {t.category}
                      </span>
                    </td>
                    <td className="py-4 text-slate-muted">{t.type}</td>
                    <td className="py-4 text-slate-light">
                      {formatDateTime(t.transactionDate)}
                    </td>
                    <td
                      className={`py-4 text-right font-semibold ${
                        t.type === "INCOME" ? "text-teal-deep" : "text-slate-ink"
                      }`}
                    >
                      {t.type === "INCOME" ? "+" : "-"}
                      {formatCurrency(t.amount)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Transaction">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            label="Amount"
            type="number"
            required
            min={1}
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <Select
            label="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </Select>
          <Select
            label="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {TRANSACTION_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Input
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Button type="submit" loading={createMutation.isPending} className="w-full">
            Save transaction
          </Button>
        </form>
      </Modal>
    </>
  );
}
