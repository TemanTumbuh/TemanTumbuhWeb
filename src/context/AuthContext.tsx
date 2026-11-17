"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import type { User, AuthContextType } from "@/types/feed.types";
import * as authService from "@/services/authService";
import { normalizeUser } from "@/lib/normalize/user";
import { refreshAccessToken } from "@/lib/auth/refresh";
import {
  clearSession,
  getRefreshToken,
  REFRESH_TOKEN_KEY,
  setSession,
} from "@/lib/auth/tokenStore";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type SessionStatus = "restoring" | "ready";

/**
 * Sesi login dari backend.
 *
 * Access token hanya di memori, jadi setiap kali halaman dimuat sesi
 * dipulihkan dari refresh token: `POST /auth/refresh` → `GET /auth/me`.
 * Selama itu `isReady` false. Server & render client pertama sama-sama
 * "restoring" dengan user null, jadi tidak ada hydration mismatch.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [status, setStatus] = useState<SessionStatus>("restoring");

  // Pulihkan sesi saat aplikasi dimuat.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Melempar bila tidak ada refresh token / token sudah dicabut.
        await refreshAccessToken();
        const dto = await authService.me();
        if (!cancelled) setCurrentUser(normalizeUser(dto));
      } catch {
        // Tidak ada sesi, atau server tidak terjangkau. refreshAccessToken
        // sendiri yang menghapus token bila ditolak server; saat server mati
        // token dibiarkan supaya sesi pulih di muatan berikutnya.
        if (!cancelled) setCurrentUser(null);
      } finally {
        if (!cancelled) setStatus("ready");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Logout di tab lain menghapus refresh token di localStorage → ikut keluar.
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === REFRESH_TOKEN_KEY && !e.newValue) {
        setCurrentUser(null);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authService.login(email, password);
    setSession(result);
    const user = normalizeUser(result.user);
    setCurrentUser(user);
    return user;
  }, []);

  const register = useCallback(
    async (input: Parameters<AuthContextType["register"]>[0]) => {
      const result = await authService.register(input);
      setSession(result);
      const user = normalizeUser(result.user);
      setCurrentUser(user);
      return user;
    },
    [],
  );

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken();
    // Sesi lokal dihapus dulu supaya UI langsung keluar, walau server lambat.
    clearSession();
    setCurrentUser(null);
    if (refreshToken) {
      try {
        await authService.logout(refreshToken);
      } catch {
        /* best-effort: token tetap kedaluwarsa sendiri di server */
      }
    }
  }, []);

  const updateUser = useCallback((patch: Partial<User>) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        isReady: status === "ready",
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
