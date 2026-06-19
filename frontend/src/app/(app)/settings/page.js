"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Modal";
import { LogOut, Bell, Moon, Sun, User } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { user, userId, logout, setUserId } = useAuth();
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [idInput, setIdInput] = useState(userId ? String(userId) : "");

  const handleSaveId = () => {
    if (idInput) {
      setUserId(Number(idInput));
      toast.success("User ID saved");
    }
  };

  return (
    <AppShell title="Settings" subtitle="Account and preferences">
      <div className="mx-auto max-w-xl space-y-6">
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <User className="h-5 w-5 text-sky-deep" />
            <h3 className="font-display font-semibold text-slate-ink">Account</h3>
          </div>
          <div className="space-y-3 text-sm">
            <p>
              <span className="text-slate-muted">Email:</span>{" "}
              <span className="font-medium">{user?.email}</span>
            </p>
            <p>
              <span className="text-slate-muted">Name:</span>{" "}
              <span className="font-medium">{user?.name || "—"}</span>
            </p>
          </div>
          <div className="mt-6">
            <Input
              label="User ID (for API)"
              type="number"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              placeholder="Required if you signed up before user ID was stored"
            />
            <Button className="mt-3" onClick={handleSaveId}>
              Save User ID
            </Button>
            <p className="mt-2 text-xs text-slate-light">
              New registrations save this automatically. Existing users can find
              their ID in the database or set it here once.
            </p>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-sky-deep" />
            <h3 className="font-display font-semibold text-slate-ink">
              Notifications
            </h3>
          </div>
          <label className="flex cursor-pointer items-center justify-between">
            <span className="text-sm text-slate-muted">Email alerts</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="h-5 w-5 rounded border-sky-light text-sky-deep"
            />
          </label>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            {theme === "light" ? (
              <Sun className="h-5 w-5 text-sky-deep" />
            ) : (
              <Moon className="h-5 w-5 text-sky-deep" />
            )}
            <h3 className="font-display font-semibold text-slate-ink">Theme</h3>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`rounded-xl px-4 py-2 text-sm font-medium ${
                theme === "light"
                  ? "bg-sky-deep text-white"
                  : "bg-sky-soft/50 text-slate-muted"
              }`}
            >
              Light
            </button>
            <button
              type="button"
              onClick={() => {
                setTheme("dark");
                toast("Dark mode coming soon", { icon: "🌙" });
              }}
              className={`rounded-xl px-4 py-2 text-sm font-medium ${
                theme === "dark"
                  ? "bg-sky-deep text-white"
                  : "bg-sky-soft/50 text-slate-muted"
              }`}
            >
              Dark
            </button>
          </div>
        </Card>

        <Button variant="danger" onClick={logout} className="w-full">
          <LogOut className="h-4 w-4" /> Log out
        </Button>
      </div>
    </AppShell>
  );
}
