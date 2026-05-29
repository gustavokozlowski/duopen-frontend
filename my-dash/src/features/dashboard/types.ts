// Fonte única: enums e tipos de resposta vivem nos schemas Zod.
import type { ObraStatus } from "../../schemas/obras.schema";
import type {
  StatusCount,
  SecretariaCount,
  EvolucaoMes,
  DashboardSummary,
  Obra,
} from "../../schemas/dashboard.schema";

export type { ObraStatus };
export type { StatusCount, SecretariaCount, EvolucaoMes, DashboardSummary, Obra };

// Period é estado de UI (filtro), não resposta da API.
export interface Period {
  dataInicio: string; // YYYY-MM-DD
  dataFim: string;
}
