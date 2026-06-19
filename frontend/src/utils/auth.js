import { jwtDecode } from "jwt-decode";
import { STORAGE_KEYS } from "@/lib/constants";

export function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAuthData(token, user) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function clearAuthData() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}

export function decodeTokenEmail(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.sub || decoded.email || null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getStoredToken());
}

export function updateStoredUser(updates) {
  const current = getStoredUser() || {};
  const updated = { ...current, ...updates };
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
  return updated;
}
