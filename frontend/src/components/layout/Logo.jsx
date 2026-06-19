import Link from "next/link";

export function Logo({ size = "md", href = "/" }) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link href={href} className="group flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-deep to-teal-deep shadow-soft transition-transform group-hover:scale-105">
        <span className="font-display text-sm font-bold text-white">AS</span>
      </div>
      <span className={`font-display font-bold tracking-tight ${sizes[size]}`}>
        <span className="text-slate-ink">Artha</span>
        <span className="gradient-text">Sarthi</span>
      </span>
    </Link>
  );
}
