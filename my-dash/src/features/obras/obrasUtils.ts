import { getRiscoNivel } from "../mapa/mapaUtils";
import type { ObraListItem, ObrasFilter } from "./types";

export function filterObras(obras: ObraListItem[], filter: ObrasFilter): ObraListItem[] {
  return obras.filter((o) => {
    if (filter.search) {
      const q = filter.search.toLowerCase();
      if (!o.nome.toLowerCase().includes(q) && !o.numero_contrato.toLowerCase().includes(q))
        return false;
    }
    if (filter.status !== "todos" && o.status !== filter.status) return false;
    if (filter.secretaria !== "todas" && o.secretaria !== filter.secretaria) return false;
    if (filter.bairro !== "todos" && o.bairro !== filter.bairro) return false;
    if (filter.risco !== "todos" && getRiscoNivel(o.prob_atraso) !== filter.risco) return false;
    if (filter.periodoInicio && o.previsao_termino < filter.periodoInicio) return false;
    if (filter.periodoFim && o.previsao_termino > filter.periodoFim) return false;
    return true;
  });
}

export function getDistinct(obras: ObraListItem[], field: keyof ObraListItem): string[] {
  return [...new Set(obras.map((o) => String(o[field] ?? "")))].filter(Boolean).sort();
}

function escapeField(v: string | number): string {
  const s = String(v);
  return s.includes(",") || s.includes('"') || s.includes("\n")
    ? `"${s.replace(/"/g, '""')}"`
    : s;
}

export function exportObrasCsv(obras: ObraListItem[]): void {
  const headers = [
    "Nome", "Contrato", "Secretaria", "Bairro", "Status",
    "Execução %", "Valor (R$)", "Risco", "Previsão Término",
  ];
  const rows = obras.map((o) => [
    o.nome, o.numero_contrato, o.secretaria, o.bairro, o.status,
    o.execucao_percentual.toFixed(1),
    o.valor_contratado.toFixed(2),
    getRiscoNivel(o.prob_atraso),
    o.previsao_termino,
  ]);
  const csv = [headers, ...rows].map((r) => r.map(escapeField).join(",")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `obras_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
