"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";
import { getIcon } from "@/lib/icons";
import { Logo } from "./Logo";
import { cn } from "@/utils/formatters";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-6">
        <div className="glass rounded-2xl p-4 shadow-soft">
          <Logo href="/dashboard" size="sm" />
          <nav className="mt-8 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = getIcon(item.icon);
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      active
                        ? "bg-gradient-to-r from-sky-deep to-sky text-white shadow-soft"
                        : "text-slate-muted hover:bg-sky-soft/50 hover:text-slate-ink"
                    )}
                    whileHover={{ x: active ? 0 : 4 }}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
