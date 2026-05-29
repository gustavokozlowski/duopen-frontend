import { useApi } from "../../hooks/useApi";
import type { DashboardSummary, Obra, Period } from "./types";

const REFETCH_MS = 5 * 60 * 1000; // 5 minutes

function toParams(period: Period): string {
  return new URLSearchParams({
    data_inicio: period.dataInicio,
    data_fim: period.dataFim,
  }).toString();
}

export function useDashboardSummary(period: Period) {
  return useApi<DashboardSummary>(
    `/api/v1/dashboard?${toParams(period)}`,
    { refetchInterval: REFETCH_MS }
  );
}

export function useTopAlerts(period: Period) {
  return useApi<Obra[]>(
    `/api/v1/obras?${toParams(period)}&sort=-prob_atraso&limit=5`,
    { refetchInterval: REFETCH_MS }
  );
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
