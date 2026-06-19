"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function EmptyState({
  icon: Icon = AlertCircle,
  title = "Nothing here yet",
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-sky-light/60 bg-sky-soft/20 px-8 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-soft text-sky-deep">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="font-display text-lg font-semibold text-slate-ink">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-slate-muted">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function UserIdBanner({ userId, onSave }) {
  const [value, setValue] = useState("");
  const [editing, setEditing] = useState(!userId);

  useEffect(() => {
    if (userId) setValue(String(userId));
  }, [userId]);

  if (!editing && userId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-xl border border-amber-200 bg-amber-50/80 p-4"
    >
      <p className="text-sm font-medium text-amber-900">
        Link your account ID to sync with backend.
      </p>
      <div className="mt-3 flex gap-2">
        <input
          type="number"
          className="input-field max-w-xs"
          placeholder="e.g. 1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="button"
          className="btn-primary shrink-0"
          onClick={() => {
            if (value) {
              onSave(Number(value));
              setEditing(false);
            }
          }}
        >
          Save ID
        </button>
      </div>
    </motion.div>
  );
}
