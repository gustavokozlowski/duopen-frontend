import type { RiscoNivel } from "../mapa/types";

export type { RiscoNivel };

export interface FornecedorRanking {
  id: string;
  nome: string;
  cnpj: string;
  total_contratos: number;
  total_obras: number;
  valor_total: number;         // BRL
  taxa_aditivo: number;        // 0–1
  avg_prob_atraso: number;     // 0–1
  obras_em_andamento: number;
  obras_concluidas: number;
  [key: string]: unknown;
}

export interface FornecedoresFilter {
  search: string;
  somenteAlerta: boolean;      // taxa_aditivo > 0.30
  risco: RiscoNivel | "todos";
}

export const DEFAULT_FILTER: FornecedoresFilter = {
  search: "",
  somenteAlerta: false,
  risco: "todos",
};

export const ALERTA_THRESHOLD = 0.30;
