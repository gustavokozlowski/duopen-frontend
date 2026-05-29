import type { ObraStatus } from "../dashboard/types";
import type { RiscoNivel } from "../mapa/types";
// O tipo do filtro e o default vêm do schema Zod (z.infer) — fonte única
// compartilhada entre o formulário de filtro e a validação.
import {
  type ObrasFilterValues,
  type ObraListItem,
  DEFAULT_OBRAS_FILTER,
} from "../../schemas/obras.schema";

export type { ObraStatus, RiscoNivel };
export type ObrasFilter = ObrasFilterValues;
export const DEFAULT_FILTER = DEFAULT_OBRAS_FILTER;

// ObraListItem agora é inferido do schema Zod (validado em runtime no serviço).
export type { ObraListItem };
