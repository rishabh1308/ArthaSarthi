"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Target } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal, Input, Select } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCurrency, getGoalProgress } from "@/utils/formatters";
import { useCreateGoal } from "@/hooks/useFinanceData";
import toast from "react-hot-toast";
import { extractError } from "@/lib/api";

export function GoalCards({ goals, userId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    goalName: "",
    targetAmount: "",
    currentAmount: "0",
    targetYears: "1",
    priority: "MEDIUM",
  });

  const createMutation = useCreateGoal(userId);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        goalName: form.goalName,
        targetAmount: Number(form.targetAmount),
        currentAmount: Number(form.currentAmount) || 0,
        targetYears: Number(form.targetYears),
        priority: form.priority,
      });
      toast.success("Goal created!");
      setModalOpen(false);
      setForm({
        goalName: "",
        targetAmount: "",
        currentAmount: "0",
        targetYears: "1",
        priority: "MEDIUM",
      });
    } catch (err) {
      toast.error(extractError(err));
    }
  };

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> New Goal
        </Button>
      </div>

      {!goals?.length ? (
        <EmptyState
          icon={Target}
          title="No savings goals yet"
          description="Set a target and track your progress with animated milestones."
          action={
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" /> Create goal
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, i) => {
            const pct = getGoalProgress(goal.currentAmount, goal.targetAmount);
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-soft/30 blur-2xl" />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <h3 className="font-display text-lg font-semibold text-slate-ink">
                        {goal.goalName}
                      </h3>
                      <span className="rounded-full bg-sky-soft px-2 py-1 text-xs font-medium text-sky-deep">
                        {goal.priority}
                      </span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-slate-ink">
                      {formatCurrency(goal.currentAmount)}
                      <span className="text-sm font-normal text-slate-muted">
                        {" "}
                        / {formatCurrency(goal.targetAmount)}
                      </span>
                    </p>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-sky-soft">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-sky-deep to-teal-deep"
                      />
                    </div>
                    <p className="mt-2 text-sm text-slate-muted">
                      {pct}% complete · {goal.targetYears} year target · {goal.status}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Goal">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Goal name"
            required
            placeholder="Buy a car"
            value={form.goalName}
            onChange={(e) => setForm({ ...form, goalName: e.target.value })}
          />
          <Input
            label="Target amount"
            type="number"
            required
            value={form.targetAmount}
            onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
          />
          <Input
            label="Current saved"
            type="number"
            value={form.currentAmount}
            onChange={(e) => setForm({ ...form, currentAmount: e.target.value })}
          />
          <Input
            label="Target years"
            type="number"
            min={1}
            value={form.targetYears}
            onChange={(e) => setForm({ ...form, targetYears: e.target.value })}
          />
          <Select
            label="Priority"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </Select>
          <Button type="submit" loading={createMutation.isPending} className="w-full">
            Create goal
          </Button>
        </form>
      </Modal>
    </>
  );
}
