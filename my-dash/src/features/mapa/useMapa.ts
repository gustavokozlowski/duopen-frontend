import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../services/api";
import { obraMapPointSchema } from "../../schemas/mapa.schema";

const REFETCH_MS = 5 * 60 * 1000;

export function useMapaObras() {
  return useQuery({
    queryKey: ["/api/v1/mapa"],
    queryFn: async () =>
      obraMapPointSchema.array().parse((await apiClient.get("/api/v1/mapa")).data),
    refetchInterval: REFETCH_MS,
    staleTime: REFETCH_MS,
  });
}
