import { useApi } from "../../../hooks/useApi";
import type { FornecedorPerfil } from "./types";

export function useFornecedorPerfil(id: string) {
  return useApi<FornecedorPerfil>(`/api/v1/fornecedores/${id}`, { enabled: Boolean(id) });
}
