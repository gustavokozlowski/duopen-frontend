import type { ObraStatus } from "../../dashboard/types";

export type { ObraStatus };

export interface ObraHistorico {
  id: string;
  nome: string;
  secretaria: string;
  status: ObraStatus;
  valor_contratado: number;
  execucao_percentual: number;
  prob_atraso: number;
  data_inicio: string;
  previsao_termino: string;
  [key: string]: unknown;
}

export interface ValorPorAno {
  ano: number;
  valor: number;
  n_obras: number;
}

export interface EvolucaoRisco {
  periodo: string;      // "YYYY-MM"
  avg_prob_atraso: number;
}

export interface FornecedorPerfil {
  id: string;
  nome: string;
  cnpj: string;
  email?: string;
  telefone?: string;
  cidade?: string;
  estado?: string;
  taxa_aditivo: number;
  avg_prob_atraso: number;
  total_contratos: number;
  valor_total: number;
  obras: ObraHistorico[];
  valor_por_ano: ValorPorAno[];
  evolucao_risco: EvolucaoRisco[];
}
