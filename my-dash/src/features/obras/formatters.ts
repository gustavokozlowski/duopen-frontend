export { formatBRL, formatPct } from "../dashboard/formatters";

/** "YYYY-MM-DD" → "DD/MM/YYYY" */
export function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [y, m, d] = parts;
  return `${d}/${m}/${y}`;
}
