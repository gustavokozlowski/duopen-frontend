export interface Period {
  dataInicio: string; // YYYY-MM-DD
  dataFim: string;
}

export type ObraStatus =
  | "em_andamento"
  | "concluida"
  | "paralisada"
  | "atrasada"
  | "nao_iniciada";

export interface StatusCount {
  status: ObraStatus | string;
  total: number;
}

export interface SecretariaCount {
  secretaria: string;
  total: number;
}

export interface EvolucaoMes {
  mes: string;       // e.g. "2025-01"
  iniciadas: number;
  concluidas: number;
}

export interface DashboardSummary {
  total_obras: number;
  obras_em_andamento: number;
  valor_total_contratado: number; // BRL
  media_execucao: number;         // 0–100
  por_status: StatusCount[];
  por_secretaria: SecretariaCount[];
  evolucao_mensal: EvolucaoMes[];
}

export interface Obra {
  id: string;
  nome: string;
  secretaria: string;
  status: ObraStatus;
  prob_atraso: number;         // 0–1
  valor_contratado: number;    // BRL
  execucao_percentual: number; // 0–100
}
