// Tipos inferidos do schema Zod (validados em runtime no hook do perfil).
import type {
  ObraHistorico,
  ValorPorAno,
  EvolucaoRisco,
  FornecedorPerfil,
} from "../../../schemas/fornecedores.schema";
import type { ObraStatus } from "../../dashboard/types";

export type { ObraStatus };
export type { ObraHistorico, ValorPorAno, EvolucaoRisco, FornecedorPerfil };
