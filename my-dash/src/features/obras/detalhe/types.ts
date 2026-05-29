// Tipos inferidos do schema Zod (validados em runtime no serviço getObraById).
import type {
  Aditivo,
  ContratoVinculado,
  Fornecedor,
  PredicaoML,
  ObraDetalhe,
} from "../../../schemas/obraDetalhe.schema";
import type { ObraStatus } from "../../dashboard/types";

export type { ObraStatus };
export type { Aditivo, ContratoVinculado, Fornecedor, PredicaoML, ObraDetalhe };

export const ADITIVO_TIPO_LABELS: Record<Aditivo["tipo"], string> = {
  prazo: "Prazo",
  valor: "Valor",
  ambos: "Prazo e Valor",
};
