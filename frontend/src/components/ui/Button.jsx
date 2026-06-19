"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/formatters";

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  ...props
}) {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost:
      "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-muted transition-colors hover:bg-sky-soft/50",
    danger:
      "inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-rose-600",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "",
    lg: "px-8 py-4 text-base",
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={cn(
        variants[variant],
        sizes[size],
        (disabled || loading) && "pointer-events-none opacity-60",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
