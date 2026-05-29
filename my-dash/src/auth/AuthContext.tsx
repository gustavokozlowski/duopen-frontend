import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { apiClient } from "../hooks/useApi";
import { clearAccessToken, setAccessToken } from "./tokenStore";

// ── Types ─────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

// ── Context ───────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const setUnauthenticated = useCallback(() => {
    clearAccessToken();
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const setAuthenticated = useCallback((user: AuthUser, token: string) => {
    setAccessToken(token);
    setState({ user, isAuthenticated: true, isLoading: false });
  }, []);

  // Verify existing session via refresh_token cookie on mount
  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const { data } = await apiClient.post<LoginResponse>("/api/v1/auth/refresh");
        if (!cancelled) setAuthenticated(data.user, data.access_token);
      } catch {
        if (!cancelled) setUnauthenticated();
      }
    }

    checkSession();

    // Interceptor signals logout when refresh fails mid-session
    const onAuthLogout = () => setUnauthenticated();
    window.addEventListener("auth:logout", onAuthLogout);

    return () => {
      cancelled = true;
      window.removeEventListener("auth:logout", onAuthLogout);
    };
  }, [setAuthenticated, setUnauthenticated]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { data } = await apiClient.post<LoginResponse>("/api/v1/auth/login", {
        email,
        password,
      });
      setAuthenticated(data.user, data.access_token);
    },
    [setAuthenticated]
  );

  const logout = useCallback(async () => {
    try {
      await apiClient.post("/api/v1/auth/logout");
    } catch {
      // Clear local state even if the server request fails
    }
    setUnauthenticated();
  }, [setUnauthenticated]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside <AuthProvider>");
  return ctx;
}
