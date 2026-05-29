const brlFmt = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 1,
});

const brlCompact = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatBRL(value: number): string {
  return (value >= 1_000_000 ? brlCompact : brlFmt).format(value);
}

export function formatPct(value: number): string {
  return `${value.toFixed(1)}%`;
}

/** prob is 0–1 */
export function formatProb(prob: number): string {
  return `${(prob * 100).toFixed(0)}%`;
}

/** "2025-01" → "jan/25" */
export function formatMes(mes: string): string {
  const [year, month] = mes.split("-");
  const m = new Date(Number(year), Number(month) - 1).toLocaleString("pt-BR", { month: "short" });
  return `${m}/${String(year).slice(2)}`;
}
