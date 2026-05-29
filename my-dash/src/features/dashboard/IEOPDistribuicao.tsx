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
import { IEOP_COLORS } from "./ieop";
import type { IEOPStats } from "../../schemas/ieop.schema";

const CLASSES = ["Crítico", "Ruim", "Regular", "Bom", "Ótimo"] as const;

const TOOLTIP_STYLE = {
  contentStyle: {
    background: "#161b27",
    border: "1px solid #2a2f42",
    borderRadius: "8px",
    color: "#e8eaf0",
    fontSize: 13,
  },
  itemStyle: { color: "#8b90a8" },
  labelStyle: { color: "#e8eaf0", fontWeight: 600 },
};

interface Props {
  distribuicao: IEOPStats["distribuicao"];
}

export function IEOPDistribuicao({ distribuicao }: Props) {
  const data = CLASSES.map((classe) => ({
    classe,
    quantidade: distribuicao[classe] ?? 0,
    cor: (IEOP_COLORS[classe] ?? IEOP_COLORS["—"]!).hex,
  }));

  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-6)",
      }}
    >
      <p
        style={{
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          color: "var(--color-text-secondary)",
          marginBottom: "var(--space-4)",
        }}
      >
        Distribuição por classe IEOP
      </p>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f42" />
            <XAxis dataKey="classe" tick={{ fontSize: 11, fill: "#8b90a8" }} stroke="#2a2f42" />
            <YAxis tick={{ fontSize: 11, fill: "#8b90a8" }} stroke="#2a2f42" allowDecimals={false} />
            <Tooltip
              {...TOOLTIP_STYLE}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              formatter={(value: number) => [`${value} obras`, "Quantidade"]}
            />
            <Bar dataKey="quantidade" radius={[4, 4, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.cor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
