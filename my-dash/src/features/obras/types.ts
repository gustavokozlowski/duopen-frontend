import type { ObraStatus } from "../dashboard/types";
import type { RiscoNivel } from "../mapa/types";

export type { ObraStatus, RiscoNivel };

export interface ObraListItem {
  id: string;
  nome: string;
  numero_contrato: string;
  secretaria: string;
  bairro: string;
  status: ObraStatus;
  execucao_percentual: number;  // 0–100
  valor_contratado: number;     // BRL
  prob_atraso: number;          // 0–1
  previsao_termino: string;     // YYYY-MM-DD
  [key: string]: unknown;       // satisfaz Record<string, unknown> para Table<T>
}

export interface ObrasFilter {
  search: string;
  status: ObraStatus | "todos";
  secretaria: string;   // "todas" | nome
  bairro: string;       // "todos" | nome
  risco: RiscoNivel | "todos";
  periodoInicio: string; // YYYY-MM-DD | ""
  periodoFim: string;    // YYYY-MM-DD | ""
}

export const DEFAULT_FILTER: ObrasFilter = {
  search: "",
  status: "todos",
  secretaria: "todas",
  bairro: "todos",
  risco: "todos",
  periodoInicio: "",
  periodoFim: "",
};
