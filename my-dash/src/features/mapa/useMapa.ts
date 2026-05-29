import { useApi } from "../../hooks/useApi";
import type { ObraMapPoint } from "./types";

const REFETCH_MS = 5 * 60 * 1000;

export function useMapaObras() {
  return useApi<ObraMapPoint[]>("/api/v1/mapa", {
    refetchInterval: REFETCH_MS,
  });
}
