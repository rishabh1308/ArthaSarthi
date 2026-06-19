"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Check,
  BarChart3,
  Target,
  PieChart,
  Wallet,
  Brain,
} from "lucide-react";
import { FEATURES, TESTIMONIALS } from "@/lib/constants";
import { LandingAnalyticsCharts } from "@/components/landing/LandingAnalyticsCharts";

const iconMap = {
  Sparkles,
  BarChart3,
  Target,
  PieChart,
  Wallet,
  Brain,
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-sky-soft/60 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-80 w-80 rounded-full bg-teal-soft/50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-light/60 bg-white/80 px-4 py-1.5 text-sm font-medium text-sky-deep shadow-soft">
            <Sparkles className="h-4 w-4" />
            AI-Powered Personal Finance
          </span>

          <h1 className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-ink sm:text-6xl lg:text-7xl">
            Your AI Powered
            <br />
            <span className="gradient-text">Financial Advisor</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-muted sm:text-xl">
            ArthaSarthi combines intelligent analytics, goal tracking, and a
            conversational AI advisor with long-term memory — built for modern
            Indian professionals.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register" className="btn-primary text-base px-8 py-4">
              Start Free <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/login" className="btn-secondary text-base px-8 py-4">
              Sign in
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-16 max-w-5xl px-2 sm:px-0"
        >
          <div className="glass-strong rounded-3xl p-3 shadow-glow sm:p-4">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-cream-50 to-sky-soft/30 p-5 sm:p-6">
              <DashboardPreview />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  const stats = [
    { label: "Income", value: "₹85,000", color: "text-teal-deep" },
    { label: "Expenses", value: "₹52,000", color: "text-slate-ink" },
    { label: "Savings", value: "₹33,000", color: "text-sky-deep" },
    { label: "Net Worth", value: "₹12.4L", color: "text-slate-ink" },
  ];

  return (
    <div className="space-y-4 text-left">
      {/* Stat cards — equal width, aligned row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            className="flex min-h-[72px] flex-col justify-center rounded-xl bg-white/90 px-4 py-3 shadow-soft"
          >
            <p className="text-xs font-medium text-slate-muted">{s.label}</p>
            <p className={`mt-0.5 font-display text-lg font-bold sm:text-xl ${s.color}`}>
              {s.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Chart + secondary metrics — balanced bottom row */}
      <div className="grid gap-3 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="relative col-span-2 flex h-36 items-end overflow-hidden rounded-xl bg-gradient-to-r from-sky-soft/60 via-sky-light/40 to-teal-soft/50 px-4 pb-4"
        >
          {/* Fake chart bars for visual polish */}
          <div className="flex h-full w-full items-end gap-2 pb-1">
            {[40, 65, 45, 80, 55, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-sky/40"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <span className="absolute left-4 top-3 text-xs font-medium text-slate-muted">
            Spending Trends
          </span>
        </motion.div>

        <div className="flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-1 flex-col justify-center rounded-xl bg-white/90 px-4 py-3 shadow-soft"
          >
            <p className="text-xs font-medium text-slate-muted">Health Score</p>
            <p className="font-display text-2xl font-bold text-teal-deep">87</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.95 }}
            className="flex flex-1 flex-col justify-center rounded-xl bg-white/90 px-4 py-3 shadow-soft"
          >
            <p className="text-xs font-medium text-slate-muted">Monthly Savings</p>
            <p className="font-display text-2xl font-bold text-sky-deep">₹42K</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-slate-ink sm:text-4xl">
            Everything you need to master money
          </h2>
          <p className="mt-4 text-slate-muted">
            Premium fintech tools designed for clarity, not clutter.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = iconMap[f.icon] || Sparkles;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass card-hover rounded-2xl p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-soft text-sky-deep">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-slate-ink">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-slate-muted">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AIShowcase() {
  return (
    <section id="ai" className="py-24 bg-sky-soft/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-ink sm:text-4xl">
              Conversational finance, with memory
            </h2>
            <p className="mt-4 text-slate-muted">
              Chat naturally with your AI advisor. It remembers your goals,
              profile, and past conversations via ChromaDB vector memory.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "LangGraph-powered reasoning workflows",
                "Personalized recommendations from your data",
                "Suggested prompts for instant insights",
                "Beautiful ChatGPT-style interface",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-ink">
                  <Check className="h-5 w-5 shrink-0 text-teal-deep" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/register" className="btn-primary mt-8 inline-flex">
              Try AI Advisor <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-6 shadow-card"
          >
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-ink px-4 py-3 text-sm text-white ml-8">
                How can I improve my savings rate?
              </div>
              <div className="rounded-2xl bg-white/90 px-4 py-3 text-sm text-slate-ink border border-sky-soft/50 mr-8">
                Based on your income of ₹50,000 and expenses of ₹30,000, you&apos;re
                saving 40% — excellent! Consider automating ₹5,000 to an emergency
                fund first, then increasing goal contributions.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function AnalyticsShowcase() {
  return (
    <section id="analytics" className="py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-slate-ink sm:text-4xl">
          Analytics that feel premium
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-muted">
          Spending trends, asset allocation, health scores, and goal progress —
          all in one calm, beautiful dashboard.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          <LandingAnalyticsCharts />
        </motion.div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-cream-100/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-slate-ink">
          Loved by forward-thinking professionals
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-soft font-display font-bold text-sky-deep">
                {t.avatar}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-muted">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-4 font-semibold text-slate-ink">{t.name}</p>
              <p className="text-xs text-slate-light">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl bg-gradient-to-br from-sky-soft/40 to-teal-soft/30 p-12 shadow-glow"
        >
          <h2 className="font-display text-3xl font-bold text-slate-ink">
            Ready to transform your finances?
          </h2>
          <p className="mt-4 text-slate-muted">
            Join ArthaSarthi and let AI guide your financial future.
          </p>
          <Link href="/register" className="btn-primary mt-8 inline-flex text-base px-10 py-4">
            Get Started Free
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
