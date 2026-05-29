import { z } from "zod";
import { obraStatusSchema } from "./obras.schema";

export const aditivoTipoSchema = z.enum(["prazo", "valor", "ambos"]);

export const aditivoSchema = z.object({
  id: z.string(),
  numero: z.string(),
  tipo: aditivoTipoSchema,
  valor: z.number(),
  prazo_dias: z.number(),
  data: z.string(),
  motivo: z.string(),
});

export const contratoVinculadoSchema = z.object({
  id: z.string(),
  numero: z.string(),
  objeto: z.string(),
  valor_inicial: z.number(),
  data_inicio: z.string(),
  data_termino: z.string(),
  aditivos: aditivoSchema.array(),
});

export const fornecedorSchema = z.object({
  id: z.string(),
  nome: z.string(),
  cnpj: z.string(),
  email: z.string().optional(),
  telefone: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
});

export const predicaoMLSchema = z.object({
  prob_atraso: z.number(),
  prob_estouro: z.number(),
  ultima_atualizacao: z.string(),
  fatores_risco: z.string().array(),
});

export const obraDetalheSchema = z.object({
  id: z.string(),
  nome: z.string(),
  numero_contrato: z.string(),
  secretaria: z.string(),
  bairro: z.string(),
  endereco: z.string(),
  status: obraStatusSchema,
  execucao_percentual: z.number(),
  valor_contratado: z.number(),
  valor_aditivos: z.number(),
  data_inicio: z.string(),
  previsao_termino: z.string(),
  atraso_dias: z.number(),
  lat: z.number(),
  lng: z.number(),
  predicao: predicaoMLSchema,
  contratos: contratoVinculadoSchema.array(),
  fornecedor: fornecedorSchema,
});

export type Aditivo = z.infer<typeof aditivoSchema>;
export type ContratoVinculado = z.infer<typeof contratoVinculadoSchema>;
export type Fornecedor = z.infer<typeof fornecedorSchema>;
export type PredicaoML = z.infer<typeof predicaoMLSchema>;
export type ObraDetalhe = z.infer<typeof obraDetalheSchema>;
