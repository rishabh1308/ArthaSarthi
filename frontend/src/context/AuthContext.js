"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "@/services/authService";
import {
  clearAuthData,
  decodeTokenEmail,
  getStoredToken,
  getStoredUser,
  setAuthData,
  updateStoredUser,
} from "@/utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getStoredToken();
    const storedUser = getStoredUser();

    if (storedToken) {
      setToken(storedToken);
      const email = decodeTokenEmail(storedToken);
      setUser({
        ...storedUser,
        email: storedUser?.email || email,
      });
    }
    setLoading(false);
  }, []);

  const persistSession = useCallback((authToken, userData) => {
    setAuthData(authToken, userData);
    setToken(authToken);
    setUser(userData);
  }, []);

  const login = useCallback(
    async (credentials) => {
      const result = await loginUser(credentials);
      if (!result.success) {
        toast.error(result.error);
        return false;
      }

      const authToken = result.data.token;
      const email = decodeTokenEmail(authToken) || credentials.email;
      const stored = getStoredUser();

      persistSession(authToken, {
        email,
        name: stored?.name || email?.split("@")[0],
        userId: stored?.userId || null,
      });

      toast.success("Welcome back!");
      router.push("/dashboard");
      return true;
    },
    [persistSession, router]
  );

  const register = useCallback(
    async (userData) => {
      const result = await registerUser(userData);
      if (!result.success) {
        toast.error(result.error);
        return false;
      }

      const authToken = result.data.auth?.token;
      const registeredUser = result.data.user;

      persistSession(authToken, {
        email: userData.email,
        name: userData.name,
        age: userData.age,
        userId: registeredUser?.id || null,
      });

      toast.success("Account created successfully!");
      router.push("/dashboard");
      return true;
    },
    [persistSession, router]
  );

  const logout = useCallback(() => {
    clearAuthData();
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/login");
  }, [router]);

  const setUserId = useCallback((userId) => {
    const updated = updateStoredUser({ userId: Number(userId) });
    setUser((prev) => ({ ...prev, userId: updated.userId }));
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      userId: user?.userId,
      login,
      register,
      logout,
      setUserId,
    }),
    [user, token, loading, login, register, logout, setUserId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
