import type { IEOPStats } from "../../schemas/ieop.schema";
import styles from "./IEOPDistribuicao.module.css";
import { IEOP_COLORS } from "./ieop";

// Classes da pior para a melhor (espelha o protótipo).
const CLASSES = ["Crítico", "Ruim", "Regular", "Bom", "Ótimo"] as const;

interface Props {
  distribuicao: IEOPStats["distribuicao"];
  /** Total de obras do município (para o rodapé "N de TOTAL"). */
  totalObras?: number;
}

export function IEOPDistribuicao({ distribuicao, totalObras }: Props) {
  const entries = CLASSES.map((classe) => ({
    classe,
    count: distribuicao[classe] ?? 0,
    cor: (IEOP_COLORS[classe] ?? IEOP_COLORS["—"]!).hex,
  }));
  const max = Math.max(1, ...entries.map((e) => e.count));
  const classificadas = entries.reduce((s, e) => s + e.count, 0);
  // Só mostra "N de TOTAL" quando o total é coerente (>= classificadas).
  // O endpoint de IEOP pode classificar um conjunto diferente do total
  // municipal — nesse caso exibimos apenas a contagem, sem "de X".
  const showTotal = totalObras != null && totalObras >= classificadas;

  return (
    <div className={styles.card}>
      <p className={styles.title}>Distribuição por classe IEOP</p>

      <div className={styles.chart}>
        {entries.map((e) => (
          <div key={e.classe} className={styles.col}>
            <span className={styles.count} style={{ color: e.cor }}>
              {e.count}
            </span>
            <div className={styles.barWrap}>
              <div
                className={styles.bar}
                style={{ height: `${(e.count / max) * 100}%`, background: e.cor }}
              />
            </div>
            <span className={styles.lbl}>{e.classe}</span>
          </div>
        ))}
      </div>

      <div className={styles.foot}>
        <span>Obras classificadas</span>
        <span>
          {showTotal ? (
            <>
              <b>{classificadas}</b> de {totalObras}
            </>
          ) : (
            <b>{classificadas}</b>
          )}
        </span>
      </div>
    </div>
  );
}
