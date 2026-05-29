import { apiClient } from "./api";
import type { ObraListItem } from "../features/obras/types";
import type { ObraDetalhe } from "../features/obras/detalhe/types";

export async function getObras(): Promise<ObraListItem[]> {
  const { data } = await apiClient.get<ObraListItem[]>("/api/v1/obras");
  return data;
}

export async function getObraById(id: string): Promise<ObraDetalhe> {
  const { data } = await apiClient.get<ObraDetalhe>(`/api/v1/obras/${id}`);
  return data;
}
