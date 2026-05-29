import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";

const BASE_URL =
  (typeof process !== "undefined" && process.env["BUN_PUBLIC_API_URL"]) ||
  "/proxy";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(err);
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
interface MutationArgs<TBody = unknown> {
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string;
  invalidates?: string[];
}

export function useApiMutation<TData = unknown, TBody = unknown>(
  { method = "POST", endpoint, invalidates = [] }: MutationArgs<TBody>,
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
