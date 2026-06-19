"use client";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from "@/lib/queryClient";

export function Providers({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#FAF8F5",
              color: "#1E293B",
              border: "1px solid #E8F4FC",
              borderRadius: "12px",
              boxShadow: "0 4px 24px rgba(59,154,217,0.12)",
            },
            success: { iconTheme: { primary: "#5BBFB5", secondary: "#fff" } },
            error: { iconTheme: { primary: "#f43f5e", secondary: "#fff" } },
          }}
        />
      </AuthProvider>
    </QueryProvider>
  );
}
