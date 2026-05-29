import { z } from "zod";
import { obraStatusSchema } from "./obras.schema";

// Ponto georreferenciado de obra retornado por /api/v1/mapa
export const obraMapPointSchema = z.object({
  id: z.string(),
  nome: z.string(),
  secretaria: z.string(),
  status: obraStatusSchema,
  prob_atraso: z.number(),
  execucao_percentual: z.number(),
  fornecedor: z.string(),
  lat: z.number(),
  lng: z.number(),
  valor_contratado: z.number(),
});

export type ObraMapPoint = z.infer<typeof obraMapPointSchema>;
