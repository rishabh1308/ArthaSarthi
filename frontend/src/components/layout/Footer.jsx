import Link from "next/link";
import { Logo } from "./Logo";
import { ROUTES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-sky-soft/50 bg-cream-100/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-slate-muted">
              Your AI-powered financial advisor. Smart money management for the
              modern Indian professional.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-slate-ink">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-muted">
              <li><a href="#features" className="hover:text-sky-deep">Features</a></li>
              <li><a href="#ai" className="hover:text-sky-deep">AI Advisor</a></li>
              <li><Link href={ROUTES.REGISTER} className="hover:text-sky-deep">Get Started</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-slate-ink">Account</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-muted">
              <li><Link href={ROUTES.LOGIN} className="hover:text-sky-deep">Login</Link></li>
              <li><Link href={ROUTES.REGISTER} className="hover:text-sky-deep">Register</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-sky-soft/30 pt-8 text-center text-sm text-slate-light">
          © {new Date().getFullYear()} ArthaSarthi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
