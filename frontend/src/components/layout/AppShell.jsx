"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { UserIdBanner } from "@/components/ui/EmptyState";
import { useAuth } from "@/context/AuthContext";

export function AppShell({ children, title, subtitle }) {
  const { loading } = useRequireAuth();
  const { user, userId, setUserId } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-hero-gradient">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-sky/30 border-t-sky-deep" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient pb-24 lg:pb-8">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="min-w-0 flex-1">
          {(title || subtitle) && (
            <header className="mb-8">
              {title && (
                <h1 className="font-display text-2xl font-bold text-slate-ink sm:text-3xl">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-slate-muted">
                  {subtitle}
                  {user?.name && (
                    <span className="text-sky-deep"> · {user.name}</span>
                  )}
                </p>
              )}
            </header>
          )}
          <UserIdBanner userId={userId} onSave={setUserId} />
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
