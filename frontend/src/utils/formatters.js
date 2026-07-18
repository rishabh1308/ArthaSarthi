export function formatCurrency(amount, compact = false) {
  const value = Number(amount) || 0;

  if (compact && Math.abs(value) >= 100000) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    "month": "short",
    year: "numeric",
  });
}

export function formatDateTime(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function calculateHealthScore(income, expenses, savings) {
  const inc = Number(income) || 0;
  const exp = Number(expenses) || 0;
  const sav = Number(savings) || 0;

  if (inc <= 0) return 50;

  const savingsRate = ((inc - exp) / inc) * 100;
  const savingsRatio = sav / inc;

  let score = 40;
  score += Math.min(savingsRate * 0.5, 30);
  score += Math.min(savingsRatio * 100, 30);

  return Math.min(Math.max(Math.round(score), 0), 100);
}

export function getHealthLabel(score) {
  if (score >= 80) return { label: "Excellent", color: "text-teal-deep" };
  if (score >= 60) return { label: "Good", color: "text-sky-deep" };
  if (score >= 40) return { label: "Fair", color: "text-amber-600" };
  return { label: "Needs Attention", color: "text-rose-500" };
}

export function getCategoryColor(category) {
  const colors = {
    Food: "bg-orange-100 text-orange-700",
    Transport: "bg-blue-100 text-blue-700",
    Shopping: "bg-pink-100 text-pink-700",
    Entertainment: "bg-purple-100 text-purple-700",
    Bills: "bg-slate-100 text-slate-700",
    Healthcare: "bg-red-100 text-red-700",
    Education: "bg-indigo-100 text-indigo-700",
    Investment: "bg-teal-100 text-teal-700",
    Salary: "bg-emerald-100 text-emerald-700",
    Freelance: "bg-cyan-100 text-cyan-700",
    Other: "bg-gray-100 text-gray-700",
  };
  return colors[category] || colors.Other;
}

export function getRiskColor(risk) {
  const map = {
    LOW: "text-teal-deep bg-teal-soft",
    MEDIUM: "text-amber-700 bg-amber-50",
    HIGH: "text-rose-700 bg-rose-50",
  };
  return map[risk] || map.MEDIUM;
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function getGoalProgress(current, target) {
  if (!target || target <= 0) return 0;
  return Math.min(Math.round(((current || 0) / target) * 100), 100);
}

export function generateSparklineData(transactions) {
  const months = {};
  transactions?.forEach((t) => {
    if (t.type === "DEBIT" && t.transactionDate) {
      const key = t.transactionDate.slice(0, 7);
      months[key] = (months[key] || 0) + (t.amount || 0);
    }
  });

  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, amount]) => ({
      month: month.slice(5),
      amount,
    }));
}

export function groupTransactionsByCategory(transactions) {
  const groups = {};
  transactions?.forEach((t) => {
    if (t.type === "DEBIT") {
      const cat = t.category || "Other";
      groups[cat] = (groups[cat] || 0) + (t.amount || 0);
    }
  });

  return Object.entries(groups)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}
