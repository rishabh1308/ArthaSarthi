export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://arthasarthi-backend-production.up.railway.app";

export const STORAGE_KEYS = {
  TOKEN: "arthasarthi_token",
  USER: "arthasarthi_user",
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  TRANSACTIONS: "/transactions",
  GOALS: "/goals",
  ADVISOR: "/advisor",
  PROFILE: "/profile",
  SETTINGS: "/settings",
};

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/transactions", label: "Transactions", icon: "ArrowLeftRight" },
  { href: "/goals", label: "Goals", icon: "Target" },
  { href: "/advisor", label: "AI Advisor", icon: "Sparkles" },
  { href: "/profile", label: "Profile", icon: "User" },
  { href: "/settings", label: "Settings", icon: "Settings" },
];

export const TRANSACTION_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Healthcare",
  "Education",
  "Investment",
  "Salary",
  "Freelance",
  "Other",
];

export const SUGGESTED_PROMPTS = [
  "How can I improve my savings rate?",
  "What's my ideal emergency fund size?",
  "Analyze my spending patterns",
  "Help me plan for retirement",
  "Should I invest more aggressively?",
  "How can I reach my financial goals faster?",
];

export const FEATURES = [
  {
    title: "AI Financial Advisor",
    description:
      "Get personalized guidance powered by LangGraph workflows and long-term memory.",
    icon: "Sparkles",
  },
  {
    title: "Smart Analytics",
    description:
      "Deep insights into income, expenses, savings, and financial health scores.",
    icon: "BarChart3",
  },
  {
    title: "Goal Tracking",
    description:
      "Set savings milestones and watch your progress with beautiful visualizations.",
    icon: "Target",
  },
  {
    title: "Asset Intelligence",
    description:
      "Automatic asset detection and allocation insights across your portfolio.",
    icon: "PieChart",
  },
  {
    title: "Transaction Hub",
    description:
      "Manage, filter, and analyze every transaction with category intelligence.",
    icon: "Wallet",
  },
  {
    title: "Persistent Memory",
    description:
      "Your AI remembers past conversations for truly continuous financial guidance.",
    icon: "Brain",
  },
];

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Product Designer, Bangalore",
    quote:
      "ArthaSarthi feels like having a CFO in my pocket. The AI advisor actually remembers my goals.",
    avatar: "PS",
  },
  {
    name: "Arjun Mehta",
    role: "Software Engineer, Mumbai",
    quote:
      "Finally a finance app that doesn't feel like a spreadsheet. Clean, calm, and genuinely smart.",
    avatar: "AM",
  },
  {
    name: "Sneha Reddy",
    role: "Startup Founder, Hyderabad",
    quote:
      "The analytics dashboard rivals tools I've paid thousands for. Absolutely stunning UX.",
    avatar: "SR",
  },
];
