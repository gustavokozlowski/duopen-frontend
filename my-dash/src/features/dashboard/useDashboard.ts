import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../services/api";
import { dashboardSummarySchema, obraSchema } from "../../schemas/dashboard.schema";
import type { Period } from "./types";

const REFETCH_MS = 5 * 60 * 1000; // 5 minutes

function toParams(period: Period): string {
  return new URLSearchParams({
    data_inicio: period.dataInicio,
    data_fim: period.dataFim,
  }).toString();
}

export function useDashboardSummary(period: Period) {
  const url = `/api/v1/dashboard?${toParams(period)}`;
  return useQuery({
    queryKey: [url],
    queryFn: async () => dashboardSummarySchema.parse((await apiClient.get(url)).data),
    refetchInterval: REFETCH_MS,
    staleTime: REFETCH_MS,
  });
}

export function useTopAlerts(period: Period) {
  const url = `/api/v1/obras?${toParams(period)}&sort=-prob_atraso&limit=5`;
  return useQuery({
    queryKey: [url],
    queryFn: async () => obraSchema.array().parse((await apiClient.get(url)).data),
    refetchInterval: REFETCH_MS,
    staleTime: REFETCH_MS,
  });
}

export function defaultPeriod(): Period {
  const fim = new Date();
  const inicio = new Date(fim);
  inicio.setDate(inicio.getDate() - 30);
  return {
    dataInicio: inicio.toISOString().slice(0, 10),
    dataFim: fim.toISOString().slice(0, 10),
  };
}
