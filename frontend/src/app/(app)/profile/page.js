"use client";

import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/context/AuthContext";
import { useProfile, useSaveProfile } from "@/hooks/useFinanceData";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Modal";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { getRiskColor } from "@/utils/formatters";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { userId, user } = useAuth();
  const { data: profile, isLoading, isError } = useProfile(userId);
  const saveMutation = useSaveProfile(userId);

  const [form, setForm] = useState({
    income: "",
    expenses: "",
    savings: "",
    riskLevel: "MEDIUM",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        income: profile.income ?? "",
        expenses: profile.expenses ?? "",
        savings: profile.savings ?? "",
        riskLevel: profile.riskLevel || "MEDIUM",
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Set your user ID in Settings first");
      return;
    }
    try {
      await saveMutation.mutateAsync({
        data: {
          income: Number(form.income),
          expenses: Number(form.expenses),
          savings: Number(form.savings),
          riskLevel: form.riskLevel,
        },
        exists: Boolean(profile) && !isError,
      });
      toast.success("Profile saved");
    } catch (err) {
      toast.error(err.message || "Failed to save profile");
    }
  };

  return (
    <AppShell title="Financial Profile" subtitle="Income, expenses, and risk preferences">
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <Card className="max-w-xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-deep to-teal-deep font-display text-xl font-bold text-white">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-slate-ink">
                {user?.name || "User"}
              </p>
              <p className="text-sm text-slate-muted">{user?.email}</p>
              {profile?.riskLevel && (
                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${getRiskColor(profile.riskLevel)}`}
                >
                  Risk: {profile.riskLevel}
                </span>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Monthly income (₹)"
              type="number"
              required
              value={form.income}
              onChange={(e) => setForm({ ...form, income: e.target.value })}
            />
            <Input
              label="Monthly expenses (₹)"
              type="number"
              required
              value={form.expenses}
              onChange={(e) => setForm({ ...form, expenses: e.target.value })}
            />
            <Input
              label="Current savings (₹)"
              type="number"
              value={form.savings}
              onChange={(e) => setForm({ ...form, savings: e.target.value })}
            />
            <Select
              label="Risk profile"
              value={form.riskLevel}
              onChange={(e) => setForm({ ...form, riskLevel: e.target.value })}
            >
              <option value="LOW">Low — Conservative</option>
              <option value="MEDIUM">Medium — Balanced</option>
              <option value="HIGH">High — Aggressive</option>
            </Select>
            <Button type="submit" loading={saveMutation.isPending} className="w-full">
              {profile && !isError ? "Update profile" : "Create profile"}
            </Button>
          </form>
        </Card>
      )}
    </AppShell>
  );
}
