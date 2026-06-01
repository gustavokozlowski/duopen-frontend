import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartSkeleton } from "./Skeleton";
import { normalizeSecretaria, truncate } from "./formatters";
import type { SecretariaCount } from "./types";

const TOOLTIP_STYLE = {
  contentStyle: { background: "#161b27", border: "1px solid #2a2f42", borderRadius: "8px", color: "#e8eaf0", fontSize: 13 },
  itemStyle: { color: "#8b90a8" },
  labelStyle: { color: "#e8eaf0", fontWeight: 600 },
  cursor: { fill: "rgba(255,255,255,0.04)" },
};

const AXIS = { fill: "#8b90a8", fontSize: 12 };
const GRID = { stroke: "#2a2f42", strokeDasharray: "4 4" };

// Tick do eixo Y: rótulo normalizado + truncado, com o nome completo
// disponível no hover nativo (<title>) e no tooltip do gráfico.
interface TickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}

function SecretariaTick({ x = 0, y = 0, payload }: TickProps) {
  const full = payload?.value ?? "";
  return (
    <text x={x} y={y} dy={4} textAnchor="end" fill={AXIS.fill} fontSize={AXIS.fontSize}>
      <title>{full}</title>
      {truncate(normalizeSecretaria(full))}
    </text>
  );
}

interface HBarChartProps {
  data: SecretariaCount[] | undefined;
  isLoading: boolean;
}

export function HBarChart({ data, isLoading }: HBarChartProps) {
  if (isLoading || !data) return <ChartSkeleton title="Obras por secretaria" />;

  const sorted = [...data].sort((a, b) => b.total - a.total).slice(0, 10);
  const max = sorted[0]?.total ?? 1;

  return (
    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)" }}>
      <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
        Obras por secretaria
      </p>
      <div style={{ height: sorted.length * 36 + 40 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sorted} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
            <CartesianGrid horizontal={false} {...GRID} />
            <XAxis type="number" tick={AXIS} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="secretaria"
              width={140}
              tick={<SecretariaTick />}
              interval={0}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip {...TOOLTIP_STYLE} />
            <Bar dataKey="total" name="Obras" radius={[0, 4, 4, 0]} maxBarSize={20}>
              {sorted.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.total === max ? "#1D9E75" : "#1a5c46"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
