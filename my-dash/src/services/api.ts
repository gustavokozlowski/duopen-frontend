/**
 * Instância axios centralizada.
 * - Injeta access_token em toda requisição
 * - 401: tenta refresh silencioso com fila de retries
 * - 500+: dispara CustomEvent "api:error" para o ToastContainer
 */

import axios from "axios";
import { clearAccessToken, getAccessToken, setAccessToken } from "../auth/tokenStore";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export const BASE_URL =
  (typeof process !== "undefined" && process.env["BUN_PUBLIC_API_URL"]) || "/proxy";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ── Request: inject access token ─────────────────────────────────
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response: 401 refresh + 500 toast ────────────────────────────
let refreshing = false;
type QueueEntry = { resolve: (token: string) => void; reject: (err: unknown) => void };
let queue: QueueEntry[] = [];

function drainQueue(err: unknown, token: string | null) {
  queue.forEach(({ resolve, reject }) => (err ? reject(err) : resolve(token!)));
  queue = [];
}

// Separate instance to avoid interceptor loop during refresh
const rawAxios = axios.create({ baseURL: BASE_URL, withCredentials: true });

apiClient.interceptors.response.use(
  (res) => res,
  async (err: unknown) => {
    if (!axios.isAxiosError(err)) return Promise.reject(err);

    const original = err.config;
    const status = err.response?.status;

    // ── 401: silent refresh ───────────────────────────────────────
    if (status === 401 && original && !original._retry) {
      if (refreshing) {
        return new Promise<string>((resolve, reject) => queue.push({ resolve, reject })).then(
          (token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return apiClient(original);
          }
        );
      }

      original._retry = true;
      refreshing = true;

      try {
        const { data } = await rawAxios.post<{ access_token: string }>("/api/v1/auth/refresh");
        setAccessToken(data.access_token);
        drainQueue(null, data.access_token);
        original.headers.Authorization = `Bearer ${data.access_token}`;
        return apiClient(original);
      } catch (refreshErr) {
        clearAccessToken();
        drainQueue(refreshErr, null);
        window.dispatchEvent(new Event("auth:logout"));
        return Promise.reject(refreshErr);
      } finally {
        refreshing = false;
      }
    }

    // ── 500+: dispatch toast event ────────────────────────────────
    if (status !== undefined && status >= 500) {
      window.dispatchEvent(
        new CustomEvent("api:error", {
          detail: { status, url: original?.url ?? "", method: original?.method ?? "" },
        })
      );
    }

    return Promise.reject(err);
  }
);
