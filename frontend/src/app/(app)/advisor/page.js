"use client";

import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useFinanceData";
import { AdvisorChat } from "@/components/ai/AdvisorChat";

export default function AdvisorPage() {
  const { userId } = useAuth();
  const { data: profile } = useProfile(userId);

  return (
    <AppShell
      title="AI Advisor"
      subtitle="Your personal financial intelligence assistant"
    >
      <AdvisorChat userId={userId} profile={profile} />
    </AppShell>
  );
}
