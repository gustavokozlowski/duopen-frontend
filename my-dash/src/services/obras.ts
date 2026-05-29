import { apiClient } from "./api";
import { obraListItemSchema, type ObraListItem } from "../schemas/obras.schema";
import type { ObraDetalhe } from "../features/obras/detalhe/types";

export async function getObras(): Promise<ObraListItem[]> {
  const { data } = await apiClient.get("/api/v1/obras");
  // Valida o payload em runtime — protege a UI de respostas fora do contrato.
  return obraListItemSchema.array().parse(data);
}

export async function getObraById(id: string): Promise<ObraDetalhe> {
  const { data } = await apiClient.get<ObraDetalhe>(`/api/v1/obras/${id}`);
  return data;
}
