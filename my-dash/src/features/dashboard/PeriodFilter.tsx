import styles from "./PeriodFilter.module.css";
import type { Period } from "./types";

interface PeriodFilterProps {
  value: Period;
  onChange: (period: Period) => void;
}

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  return (
    <div className={styles.wrapper} role="search" aria-label="Filtro de período">
      <span className={styles.label}>Período:</span>

      <div className={styles.group}>
        <input
          type="date"
          className={styles.dateInput}
          value={value.dataInicio}
          max={value.dataFim}
          aria-label="Data inicial"
          onChange={(e) => onChange({ ...value, dataInicio: e.target.value })}
        />
        <span className={styles.sep}>→</span>
        <input
          type="date"
          className={styles.dateInput}
          value={value.dataFim}
          min={value.dataInicio}
          max={new Date().toISOString().slice(0, 10)}
          aria-label="Data final"
          onChange={(e) => onChange({ ...value, dataFim: e.target.value })}
        />
      </div>
    </div>
  );
}
