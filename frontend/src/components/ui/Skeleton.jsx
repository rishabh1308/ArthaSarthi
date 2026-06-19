"use client";

import { motion } from "framer-motion";

export function Skeleton({ className = "h-4 w-full" }) {
  return <div className={`skeleton ${className}`} />;
}

export function CardSkeleton() {
  return (
    <motion.div
      className="glass rounded-2xl p-6 shadow-soft"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Skeleton className="mb-4 h-4 w-24" />
      <Skeleton className="mb-2 h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </motion.div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-20" />
        </motion.div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 shadow-soft">
      <Skeleton className="mb-6 h-5 w-40" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}
