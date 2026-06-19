"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Modal";
import { Logo } from "@/components/layout/Logo";

export function LoginForm() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(form);
    setLoading(false);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your ArthaSarthi account"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          required
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button type="submit" loading={loading} className="w-full">
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-muted">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-sky-deep hover:underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}

export function RegisterForm() {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await register({
      ...form,
      age: Number(form.age),
    });
    setLoading(false);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your AI-powered financial journey"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          required
          placeholder="Rishabh"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Age"
          type="number"
          required
          min={18}
          placeholder="21"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          required
          minLength={6}
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button type="submit" loading={loading} className="w-full">
          Create account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-sky-deep hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-gradient px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong w-full max-w-md rounded-3xl p-8 shadow-card"
      >
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <h1 className="text-center font-display text-2xl font-bold text-slate-ink">
          {title}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-muted">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </motion.div>
    </div>
  );
}
