import { apiClient } from "./api";
import type { ObraMapPoint } from "../features/mapa/types";
import type { ObraStatus } from "../features/dashboard/types";
import type { RiscoNivel } from "../features/mapa/types";

export interface GeoJSONFilter {
  secretaria?: string;
  status?: ObraStatus;
  risco?: RiscoNivel;
}

export async function getGeoJSON(filter?: GeoJSONFilter): Promise<ObraMapPoint[]> {
  const params = new URLSearchParams();
  if (filter?.secretaria) params.set("secretaria", filter.secretaria);
  if (filter?.status) params.set("status", filter.status);
  if (filter?.risco) params.set("risco", filter.risco);

  const qs = params.size > 0 ? `?${params}` : "";
  const { data } = await apiClient.get<ObraMapPoint[]>(`/api/v1/mapa${qs}`);
  return data;
}
