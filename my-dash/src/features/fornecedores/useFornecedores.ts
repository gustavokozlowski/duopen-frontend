import { useApi } from "../../hooks/useApi";
import type { FornecedorRanking } from "./types";

export function useFornecedores() {
  return useApi<FornecedorRanking[]>("/api/v1/fornecedores");
}
