import { apiClient } from "./api";
import {
  fornecedorRankingSchema,
  fornecedorPerfilSchema,
  type FornecedorRanking,
  type FornecedorPerfil,
} from "../schemas/fornecedores.schema";

export async function getFornecedores(): Promise<FornecedorRanking[]> {
  const { data } = await apiClient.get("/api/v1/fornecedores");
  return fornecedorRankingSchema.array().parse(data);
}

export async function getFornecedorById(id: string): Promise<FornecedorPerfil> {
  const { data } = await apiClient.get(`/api/v1/fornecedores/${id}`);
  return fornecedorPerfilSchema.parse(data);
}

export async function getFornecedorByCnpj(cnpj: string): Promise<FornecedorRanking | null> {
  const clean = cnpj.replace(/\D/g, "");
  try {
    const { data } = await apiClient.get(`/api/v1/fornecedores/cnpj/${clean}`);
    return fornecedorRankingSchema.parse(data);
  } catch {
    return null;
  }
}
