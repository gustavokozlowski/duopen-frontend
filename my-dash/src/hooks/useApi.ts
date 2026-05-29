import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { getAccessToken, setAccessToken, clearAccessToken } from "../auth/tokenStore";

// Extend axios config to track retried requests
declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const BASE_URL =
  (typeof process !== "undefined" && process.env["BUN_PUBLIC_API_URL"]) ||
  "/proxy";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // sends httpOnly refresh_token cookie automatically
});

// ── Request: attach access token ─────────────────────────────────
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response: handle 401 with silent refresh + retry queue ───────
let refreshing = false;
type QueueEntry = { resolve: (token: string) => void; reject: (err: unknown) => void };
let queue: QueueEntry[] = [];

function drainQueue(err: unknown, token: string | null) {
  queue.forEach(({ resolve, reject }) => (err ? reject(err) : resolve(token!)));
  queue = [];
}

// Uses a raw axios instance (not apiClient) to avoid triggering the interceptor again
const rawAxios = axios.create({ baseURL: BASE_URL, withCredentials: true });

apiClient.interceptors.response.use(
  (res) => res,
  async (err: unknown) => {
    if (!axios.isAxiosError(err)) return Promise.reject(err);

    const original = err.config;
    if (!original || err.response?.status !== 401 || original._retry) {
      return Promise.reject(err);
    }

    if (refreshing) {
      return new Promise<string>((resolve, reject) => {
        queue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`;
        return apiClient(original);
      });
    }

    original._retry = true;
    refreshing = true;

    try {
      const { data } = await rawAxios.post<{ access_token: string }>(
        "/api/v1/auth/refresh"
      );
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
);

// ── GET ──────────────────────────────────────────────────────────
export function useApi<T>(
  endpoint: string,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
) {
  return useQuery<T, Error>({
    queryKey: [endpoint],
    queryFn: () => apiClient.get<T>(endpoint).then((r) => r.data),
    staleTime: 30_000,
    ...options,
  });
}

// ── POST / PUT / PATCH / DELETE ──────────────────────────────────
interface MutationArgs {
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string;
  invalidates?: string[];
}

export function useApiMutation<TData = unknown, TBody = unknown>(
  { method = "POST", endpoint, invalidates = [] }: MutationArgs,
  options?: UseMutationOptions<TData, Error, TBody>
) {
  const qc = useQueryClient();

  return useMutation<TData, Error, TBody>({
    mutationFn: (body) =>
      apiClient.request<TData>({ method, url: endpoint, data: body }).then((r) => r.data),
    onSuccess: (...args) => {
      invalidates.forEach((key) => qc.invalidateQueries({ queryKey: [key] }));
      options?.onSuccess?.(...args);
    },
    ...options,
  });
}
