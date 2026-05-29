import { useApi } from "../../../hooks/useApi";
import type { ObraDetalhe } from "./types";

export function useObraDetalhe(id: string) {
  return useApi<ObraDetalhe>(`/api/v1/obras/${id}`, { enabled: Boolean(id) });
}
