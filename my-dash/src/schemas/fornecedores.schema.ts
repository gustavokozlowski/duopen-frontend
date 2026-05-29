import { z } from "zod";
import { obraStatusSchema } from "./obras.schema";

// ── Ranking (/api/v1/fornecedores) ────────────────────────────────
export const fornecedorRankingSchema = z
  .object({
    id: z.string(),
    nome: z.string(),
    cnpj: z.string(),
    total_contratos: z.number(),
    total_obras: z.number(),
    valor_total: z.number(),
    taxa_aditivo: z.number(),
    avg_prob_atraso: z.number(),
    obras_em_andamento: z.number(),
    obras_concluidas: z.number(),
  })
  .catchall(z.unknown());

export type FornecedorRanking = z.infer<typeof fornecedorRankingSchema>;

// ── Perfil (/api/v1/fornecedores/:id) ─────────────────────────────
export const obraHistoricoSchema = z
  .object({
    id: z.string(),
    nome: z.string(),
    secretaria: z.string(),
    status: obraStatusSchema,
    valor_contratado: z.number(),
    execucao_percentual: z.number(),
    prob_atraso: z.number(),
    data_inicio: z.string(),
    previsao_termino: z.string(),
  })
  .catchall(z.unknown());

export const valorPorAnoSchema = z.object({
  ano: z.number(),
  valor: z.number(),
  n_obras: z.number(),
});

export const evolucaoRiscoSchema = z.object({
  periodo: z.string(), // "YYYY-MM"
  avg_prob_atraso: z.number(),
});

export const fornecedorPerfilSchema = z.object({
  id: z.string(),
  nome: z.string(),
  cnpj: z.string(),
  email: z.string().optional(),
  telefone: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  taxa_aditivo: z.number(),
  avg_prob_atraso: z.number(),
  total_contratos: z.number(),
  valor_total: z.number(),
  obras: obraHistoricoSchema.array(),
  valor_por_ano: valorPorAnoSchema.array(),
  evolucao_risco: evolucaoRiscoSchema.array(),
});

export type ObraHistorico = z.infer<typeof obraHistoricoSchema>;
export type ValorPorAno = z.infer<typeof valorPorAnoSchema>;
export type EvolucaoRisco = z.infer<typeof evolucaoRiscoSchema>;
export type FornecedorPerfil = z.infer<typeof fornecedorPerfilSchema>;
