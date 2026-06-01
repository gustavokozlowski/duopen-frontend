import { IEOPBadge } from "../../components/IEOPBadge";
import type { IEOPStats } from "../../schemas/ieop.schema";
import styles from "./IEOPCard.module.css";
import { colorForClasse, getIEOPColor } from "./ieop";

// Faixas exibidas da pior para a melhor (espelha o protótipo).
const FAIXAS = [
  { classe: "Crítico", cor: "var(--ieop-critico)" },
  { classe: "Ruim", cor: "var(--ieop-ruim)" },
  { classe: "Regular", cor: "var(--ieop-regular)" },
  { classe: "Bom", cor: "var(--ieop-bom)" },
  { classe: "Ótimo", cor: "var(--ieop-otimo)" },
] as const;

interface Props {
  stats: IEOPStats;
}

export function IEOPCard({ stats }: Props) {
  const cor = getIEOPColor(stats.media_geral);
  const pct = Math.min(100, Math.max(0, stats.media_geral));
  const corClasse = colorForClasse(stats.classe_geral).hex;

  return (
    <div className={styles.card}>
      <p className={styles.title}>Índice de Eficiência — Macaé</p>

      <div className={styles.top}>
        <div
          className={styles.gauge}
          style={{
            background: `conic-gradient(${cor} 0 ${pct}%, var(--color-surface2) ${pct}% 100%)`,
          }}
        >
          <div className={styles.gaugeVal}>
            <div className={styles.gaugeNum} style={{ color: cor }}>
              {stats.media_geral.toFixed(1)}
            </div>
            <div className={styles.gaugeLabel}>de 100</div>
          </div>
        </div>

        <div className={styles.meta}>
          <div
            className={styles.metaTitle}
            style={{ display: "flex", gap: 10, alignItems: "center" }}
          >
            Classificação geral <IEOPBadge classe={stats.classe_geral} />
          </div>
          <p className={styles.metaSub}>
            Média ponderada do índice de eficiência das obras públicas monitoradas no município.
          </p>
          <div className={styles.faixas}>
            {FAIXAS.map((f) => {
              const on = f.classe === stats.classe_geral;
              return (
                <div key={f.classe} className={`${styles.faixa} ${on ? styles.on : ""}`}>
                  <div className={styles.faixaBar} style={{ background: on ? corClasse : f.cor }} />
                  <div className={styles.faixaLbl}>{f.classe}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
