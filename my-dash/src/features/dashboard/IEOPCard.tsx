import { IEOPBadge } from "../../components/IEOPBadge";
import type { IEOPStats } from "../../schemas/ieop.schema";
import { getIEOPColor } from "./ieop";

const FAIXAS = ["Crítico", "Ruim", "Regular", "Bom", "Ótimo"] as const;

interface Props {
  stats: IEOPStats;
}

export function IEOPCard({ stats }: Props) {
  const cor = getIEOPColor(stats.media_geral);
  const largura = Math.min(100, Math.max(0, stats.media_geral));

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
          marginBottom: "var(--space-2)",
        }}
      >
        IEOP Médio — Macaé
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "var(--space-3)",
          marginBottom: "var(--space-3)",
        }}
      >
        <span style={{ fontSize: "var(--text-3xl)", fontWeight: 700, lineHeight: 1, color: cor }}>
          {stats.media_geral.toFixed(1)}
        </span>
        <IEOPBadge classe={stats.classe_geral} />
      </div>

      {/* Barra de progresso */}
      <div
        style={{
          width: "100%",
          height: 8,
          background: "var(--color-surface2)",
          borderRadius: "999px",
          overflow: "hidden",
          marginBottom: "var(--space-4)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${largura}%`,
            background: cor,
            borderRadius: "999px",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Legenda de faixas */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-1)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-muted)",
        }}
      >
        {FAIXAS.map((c) => (
          <span key={c} style={{ flex: 1, textAlign: "center" }}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
