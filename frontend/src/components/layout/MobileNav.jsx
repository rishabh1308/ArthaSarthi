"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { getIcon } from "@/lib/icons";
import { cn } from "@/utils/formatters";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-sky-soft/50 bg-white/90 backdrop-blur-xl lg:hidden">
      <div className="flex justify-around px-2 py-2">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const Icon = getIcon(item.icon);
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-3 py-2 text-[10px] font-medium",
                active ? "text-sky-deep" : "text-slate-muted"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="truncate max-w-[56px]">{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
