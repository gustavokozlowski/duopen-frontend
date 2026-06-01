import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartSkeleton } from "./Skeleton";
import type { StatusCount } from "./types";

const STATUS_COLORS: Record<string, string> = {
  em_andamento: "#3b82f6",
  concluida:    "#1D9E75",
  paralisada:   "#BA7517",
  atrasada:     "#A32D2D",
  nao_iniciada: "#6b7280",
  cancelada:    "#7f1d1d",
};

const STATUS_LABELS: Record<string, string> = {
  em_andamento: "Em andamento",
  concluida:    "Concluída",
  paralisada:   "Paralisada",
  atrasada:     "Atrasada",
  nao_iniciada: "Não iniciada",
  cancelada:    "Cancelada",
};

const TOOLTIP_STYLE = {
  contentStyle: { background: "#161b27", border: "1px solid #2a2f42", borderRadius: "8px", color: "#e8eaf0", fontSize: 13 },
  itemStyle: { color: "#8b90a8" },
  labelStyle: { color: "#e8eaf0", fontWeight: 600 },
};

interface DonutChartProps {
  data: StatusCount[] | undefined;
  isLoading: boolean;
}

export function DonutChart({ data, isLoading }: DonutChartProps) {
  if (isLoading || !data) return <ChartSkeleton title="Distribuição por status" />;

  const formatted = data.map((d) => ({
    name: STATUS_LABELS[d.status] ?? d.status,
    value: d.total,
    color: STATUS_COLORS[d.status] ?? "#555b72",
  }));

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)" }}>
      <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
        Distribuição por status
      </p>
      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formatted}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
            >
              {formatted.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip {...TOOLTIP_STYLE} />
            <Legend
              formatter={(value) => (
                <span style={{ color: "#8b90a8", fontSize: 12 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
