import type { ObraStatus } from "../../dashboard/types";

export type { ObraStatus };

export interface Aditivo {
  id: string;
  numero: string;
  tipo: "prazo" | "valor" | "ambos";
  valor: number;       // BRL (0 if prazo only)
  prazo_dias: number;  // days (0 if valor only)
  data: string;        // YYYY-MM-DD
  motivo: string;
}

export interface ContratoVinculado {
  id: string;
  numero: string;
  objeto: string;
  valor_inicial: number;
  data_inicio: string;
  data_termino: string;
  aditivos: Aditivo[];
}

export interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  email?: string;
  telefone?: string;
  cidade?: string;
  estado?: string;
}

export interface PredicaoML {
  prob_atraso: number;         // 0–1
  prob_estouro: number;        // 0–1
  ultima_atualizacao: string;  // ISO datetime
  fatores_risco: string[];
}

export interface ObraDetalhe {
  id: string;
  nome: string;
  numero_contrato: string;
  secretaria: string;
  bairro: string;
  endereco: string;
  status: ObraStatus;
  execucao_percentual: number; // 0–100
  valor_contratado: number;
  valor_aditivos: number;      // sum of all aditivo values
  data_inicio: string;
  previsao_termino: string;
  atraso_dias: number;         // positive = late, negative = early
  lat: number;
  lng: number;
  predicao: PredicaoML;
  contratos: ContratoVinculado[];
  fornecedor: Fornecedor;
}

export const ADITIVO_TIPO_LABELS: Record<Aditivo["tipo"], string> = {
  prazo: "Prazo",
  valor: "Valor",
  ambos: "Prazo e Valor",
};
