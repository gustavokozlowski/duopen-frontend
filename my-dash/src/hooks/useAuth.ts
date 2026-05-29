import { useState, useMemo, useCallback } from "react";
import { apiClient } from "./useApi";

interface JwtPayload {
  sub?: string;
  email?: string;
  name?: string;
  exp?: number;
  [key: string]: unknown;
}

function decodePayload(token: string): JwtPayload {
  try {
    const raw = token.split(".")[1] ?? "";
    const padded = raw.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(padded)) as JwtPayload;
  } catch {
    return {};
  }
}

function isExpired(payload: JwtPayload): boolean {
  if (payload.exp === undefined) return false;
  return Date.now() / 1000 > payload.exp;
}

const TOKEN_KEY = "authToken";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );

  const payload = useMemo(() => (token ? decodePayload(token) : null), [token]);
  const isAuthenticated = token !== null && payload !== null && !isExpired(payload);

  const persist = useCallback((newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const res = await apiClient.post<AuthResponse>("/auth/login", credentials);
    persist(res.data.access_token);
  }, [persist]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  const refresh = useCallback(async () => {
    const res = await apiClient.post<AuthResponse>("/auth/refresh");
    persist(res.data.access_token);
  }, [persist]);

  return {
    token,
    user: payload,
    isAuthenticated,
    login,
    logout,
    refresh,
  };
}
