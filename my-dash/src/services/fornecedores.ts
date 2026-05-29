import { apiClient } from "./api";
import type { FornecedorRanking } from "../features/fornecedores/types";
import type { FornecedorPerfil } from "../features/fornecedores/perfil/types";

export async function getFornecedores(): Promise<FornecedorRanking[]> {
  const { data } = await apiClient.get<FornecedorRanking[]>("/api/v1/fornecedores");
  return data;
}

export async function getFornecedorById(id: string): Promise<FornecedorPerfil> {
  const { data } = await apiClient.get<FornecedorPerfil>(`/api/v1/fornecedores/${id}`);
  return data;
}

export async function getFornecedorByCnpj(cnpj: string): Promise<FornecedorRanking | null> {
  const clean = cnpj.replace(/\D/g, "");
  try {
    const { data } = await apiClient.get<FornecedorRanking>(`/api/v1/fornecedores/cnpj/${clean}`);
    return data;
  } catch {
    return null;
  }
}
