"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Modal({ isOpen, onClose, title, children, size = "md" }) {
  const sizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-ink/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`glass-strong w-full ${sizes[size]} rounded-2xl p-6 shadow-card`}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-slate-ink">{title}</h2>
                <button onClick={onClose} className="rounded-lg p-2 hover:bg-sky-soft/50">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Input({ label, error, ...props }) {
  return (
    <div>
      {label && <label className="mb-2 block text-sm font-medium text-slate-ink">{label}</label>}
      <input className="input-field" {...props} />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

export function Select({ label, error, children, ...props }) {
  return (
    <div>
      {label && <label className="mb-2 block text-sm font-medium text-slate-ink">{label}</label>}
      <select className="input-field" {...props}>
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}
