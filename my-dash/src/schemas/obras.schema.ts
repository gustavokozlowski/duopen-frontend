import { z } from "zod";

// ── Enums espelham exatamente os valores que a API retorna ────────
// Fonte única de verdade: reutilizados tanto na validação dos
// formulários de filtro quanto nos tipos das respostas da API.

export const obraStatusSchema = z.enum([
  "em_andamento",
  "concluida",
  "paralisada",
  "atrasada",
  "nao_iniciada",
]);
export type ObraStatus = z.infer<typeof obraStatusSchema>;

export const riscoNivelSchema = z.enum(["baixo", "medio", "alto"]);
export type RiscoNivel = z.infer<typeof riscoNivelSchema>;

// ── Formulário de filtro de obras ─────────────────────────────────
// "todos"/"todas" = sem filtro. O tipo do formulário sai daqui via z.infer.

export const obrasFilterSchema = z.object({
  search: z.string(),
  status: z.union([obraStatusSchema, z.literal("todos")]),
  secretaria: z.string(),
  bairro: z.string(),
  risco: z.union([riscoNivelSchema, z.literal("todos")]),
  periodoInicio: z.string(),
  periodoFim: z.string(),
});

export type ObrasFilterValues = z.infer<typeof obrasFilterSchema>;

export const DEFAULT_OBRAS_FILTER: ObrasFilterValues = {
  search: "",
  status: "todos",
  secretaria: "todas",
  bairro: "todos",
  risco: "todos",
  periodoInicio: "",
  periodoFim: "",
};
