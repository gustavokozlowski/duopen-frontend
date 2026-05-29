import type { ObraStatus } from "../dashboard/types";
import type { RiscoNivel } from "../../schemas/obras.schema";

export type { RiscoNivel };

export interface ObraMapPoint {
  id: string;
  nome: string;
  secretaria: string;
  status: ObraStatus;
  prob_atraso: number;         // 0–1
  execucao_percentual: number; // 0–100
  fornecedor: string;
  lat: number;
  lng: number;
  valor_contratado: number;
}

export interface MapFilter {
  risco: RiscoNivel | "todos";
  secretaria: string;          // "todas" or secretaria name
  status: ObraStatus | "todos";
}

export const RISCO_COLORS: Record<RiscoNivel, string> = {
  baixo: "#1D9E75",
  medio: "#BA7517",
  alto:  "#A32D2D",
};

export const RISCO_LABELS: Record<RiscoNivel, string> = {
  baixo: "Baixo risco",
  medio: "Médio risco",
  alto:  "Alto risco",
};

export const STATUS_LABELS: Record<ObraStatus, string> = {
  em_andamento:  "Em andamento",
  concluida:     "Concluída",
  paralisada:    "Paralisada",
  atrasada:      "Atrasada",
  nao_iniciada:  "Não iniciada",
};
