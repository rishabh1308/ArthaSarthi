"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ROUTES } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#ai", label: "AI Advisor" },
    { href: "#analytics", label: "Analytics" },
    { href: "#testimonials", label: "Reviews" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/40 bg-cream-50/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-muted transition-colors hover:text-sky-deep"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href={ROUTES.LOGIN} className="btn-secondary text-sm">
            Sign in
          </Link>
          <Link href={ROUTES.REGISTER} className="btn-primary text-sm">
            Get Started
          </Link>
        </div>

        <button
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-sky-soft/50 bg-cream-50/95 md:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-muted"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link href={ROUTES.LOGIN} className="btn-secondary">
                Sign in
              </Link>
              <Link href={ROUTES.REGISTER} className="btn-primary">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
