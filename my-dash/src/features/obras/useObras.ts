import { useApi } from "../../hooks/useApi";
import type { ObraListItem } from "./types";

export function useObras() {
  return useApi<ObraListItem[]>("/api/v1/obras");
}
