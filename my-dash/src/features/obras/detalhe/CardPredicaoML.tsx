import type { PredicaoML } from "./types";
import styles from "./CardPredicaoML.module.css";

function gaugeColor(prob: number): string {
  if (prob >= 0.7) return "#A32D2D";
  if (prob >= 0.4) return "#BA7517";
  return "#1D9E75";
}

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

// Semi-circle SVG gauge using pathLength trick
function GaugeChart({ value, label }: { value: number; label: string }) {
  const pct = Math.max(0, Math.min(1, value));
  const color = gaugeColor(pct);
  const path = "M 8 68 A 52 52 0 0 1 112 68";

  return (
    <div className={styles.gaugeWrapper}>
      <svg viewBox="0 0 120 76" width="100%" role="img" aria-label={`${label}: ${Math.round(pct * 100)}%`}>
        <path d={path} fill="none" stroke="#2a2f42" strokeWidth="10" strokeLinecap="round" />
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - pct}
        />
        <text
          x="60" y="56"
          textAnchor="middle"
          fill="#e8eaf0"
          fontSize="20"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
        >
          {Math.round(pct * 100)}%
        </text>
      </svg>
      <p className={styles.gaugeLabel}>{label}</p>
    </div>
  );
}

interface CardPredicaoMLProps {
  predicao: PredicaoML;
}

export function CardPredicaoML({ predicao }: CardPredicaoMLProps) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>Predição ML</p>

      <div className={styles.gauges}>
        <GaugeChart value={predicao.prob_atraso} label="Prob. atraso" />
        <GaugeChart value={predicao.prob_estouro} label="Prob. estouro" />
      </div>

      <p className={styles.updated}>
        Atualizado em {formatDateTime(predicao.ultima_atualizacao)}
      </p>

      {predicao.fatores_risco.length > 0 && (
        <>
          <p className={styles.factorsTitle}>Fatores de risco identificados</p>
          <ul className={styles.factorsList}>
            {predicao.fatores_risco.map((f, i) => (
              <li key={i} className={styles.factorItem}>
                <span className={styles.factorDot} aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
