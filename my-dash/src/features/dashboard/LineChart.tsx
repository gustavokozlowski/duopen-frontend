import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartSkeleton } from "./Skeleton";
import { formatMes } from "./formatters";
import type { EvolucaoMes } from "./types";

const TOOLTIP_STYLE = {
  contentStyle: { background: "#161b27", border: "1px solid #2a2f42", borderRadius: "8px", color: "#e8eaf0", fontSize: 13 },
  itemStyle: { color: "#8b90a8" },
  labelStyle: { color: "#e8eaf0", fontWeight: 600 },
  cursor: { stroke: "#2a2f42" },
};

const AXIS = { fill: "#8b90a8", fontSize: 12 };
const GRID = { stroke: "#2a2f42", strokeDasharray: "4 4" };

interface LineChartProps {
  data: EvolucaoMes[] | undefined;
  isLoading: boolean;
}

export function LineChart({ data, isLoading }: LineChartProps) {
  if (isLoading || !data) return <ChartSkeleton title="Evolução mensal" />;

  const formatted = data.map((d) => ({ ...d, mes: formatMes(d.mes) }));

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)" }}>
      <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
        Evolução mensal — obras iniciadas vs concluídas
      </p>
      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ReLineChart data={formatted} margin={{ left: 0, right: 16, top: 4, bottom: 4 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="mes" tick={AXIS} axisLine={false} tickLine={false} />
            <YAxis tick={AXIS} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip {...TOOLTIP_STYLE} />
            <Legend
              formatter={(value) => (
                <span style={{ color: "#8b90a8", fontSize: 12 }}>{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="iniciadas"
              name="Iniciadas"
              stroke="#1D9E75"
              strokeWidth={2}
              dot={{ fill: "#1D9E75", r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="concluidas"
              name="Concluídas"
              stroke="#BA7517"
              strokeWidth={2}
              dot={{ fill: "#BA7517", r: 3 }}
              activeDot={{ r: 5 }}
            />
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
