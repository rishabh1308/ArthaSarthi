"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/formatters";

export function Card({ children, className, hover = true, delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "glass rounded-2xl p-6 shadow-soft",
        hover && "card-hover",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, delay = 0 }) {
  return (
    <Card delay={delay} className="relative overflow-hidden">
      <motion.div
        className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-sky-soft/40 blur-2xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-teal-soft/40 blur-2xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="relative z-10 flex items-start justify-between"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.1 }}
        >
          <p className="text-sm font-medium text-slate-muted">{title}</p>
          <p className="mt-2 font-display text-2xl font-bold text-slate-ink">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-light">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "mt-2 text-xs font-medium",
                trend.positive ? "text-teal-deep" : "text-rose-500"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </motion.div>
        {Icon && (
          <motion.div
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-soft/80 text-sky-deep"
            whileHover={{ rotate: 8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        )}
      </motion.div>
    </Card>
  );
}
