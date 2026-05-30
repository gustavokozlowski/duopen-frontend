import { apiClient } from "./api";
import { ieopStatsSchema, type IEOPStats } from "../schemas/ieop.schema";
import type { DashboardSummary, StatusCount, SecretariaCount, Period } from "../features/dashboard/types";

function periodParams(period?: Period): string {
  if (!period) return "";
  return `?${new URLSearchParams({ data_inicio: period.dataInicio, data_fim: period.dataFim })}`;
}

export async function getDashboard(period?: Period): Promise<DashboardSummary> {
  const { data } = await apiClient.get<DashboardSummary>(`/api/v1/dashboard${periodParams(period)}`);
  return data;
}

export interface Distribuicao {
  por_status: StatusCount[];
  por_secretaria: SecretariaCount[];
}

export async function getDistribuicao(period?: Period): Promise<Distribuicao> {
  const { data } = await apiClient.get<Distribuicao>(
    `/api/v1/dashboard/distribuicao${periodParams(period)}`
  );
  return data;
}

export async function getIEOPStats(): Promise<IEOPStats> {
  const { data } = await apiClient.get("/api/v1/dashboard/ieop");
  // Valida em runtime — protege a UI de respostas fora do contrato.
  return ieopStatsSchema.parse(data);
}
