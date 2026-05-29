import type { ObraStatus } from "../dashboard/types";
import type { RiscoNivel } from "../mapa/types";
// O tipo do filtro e o default vêm do schema Zod (z.infer) — fonte única
// compartilhada entre o formulário de filtro e a validação.
import {
  type ObrasFilterValues,
  DEFAULT_OBRAS_FILTER,
} from "../../schemas/obras.schema";

export type { ObraStatus, RiscoNivel };
export type ObrasFilter = ObrasFilterValues;
export const DEFAULT_FILTER = DEFAULT_OBRAS_FILTER;

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
