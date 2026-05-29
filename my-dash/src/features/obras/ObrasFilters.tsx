import type { ObrasFilter, ObraStatus, RiscoNivel } from "./types";
import { DEFAULT_FILTER } from "./types";
import { STATUS_LABELS } from "../mapa/types";
import { RISCO_LABELS } from "../mapa/types";
import styles from "./ObrasFilters.module.css";

interface ObrasFiltersProps {
  filter: ObrasFilter;
  onChange: (f: ObrasFilter) => void;
  secretarias: string[];
  bairros: string[];
}

export function ObrasFilters({ filter, onChange, secretarias, bairros }: ObrasFiltersProps) {
  const set = <K extends keyof ObrasFilter>(key: K, value: ObrasFilter[K]) =>
    onChange({ ...filter, [key]: value });

  return (
    <div className={styles.panel} role="search" aria-label="Filtros de obras">
      {/* Row 1: search */}
      <div className={styles.row}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon} aria-hidden>⌕</span>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Buscar por nome ou nº do contrato…"
            value={filter.search}
            onChange={(e) => set("search", e.target.value)}
            aria-label="Buscar obras"
          />
        </div>

        <button
          className={styles.resetBtn}
          onClick={() => onChange(DEFAULT_FILTER)}
          aria-label="Limpar todos os filtros"
        >
          Limpar filtros
        </button>
      </div>

      {/* Row 2: selects + period */}
      <div className={styles.row}>
        <select
          className={styles.select}
          value={filter.status}
          onChange={(e) => set("status", e.target.value as ObraStatus | "todos")}
          aria-label="Filtrar por status"
        >
          <option value="todos">Todos os status</option>
          {(Object.entries(STATUS_LABELS) as [ObraStatus, string][]).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        <select
          className={styles.select}
          value={filter.secretaria}
          onChange={(e) => set("secretaria", e.target.value)}
          aria-label="Filtrar por secretaria"
        >
          <option value="todas">Todas as secretarias</option>
          {secretarias.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          className={styles.select}
          value={filter.bairro}
          onChange={(e) => set("bairro", e.target.value)}
          aria-label="Filtrar por bairro"
        >
          <option value="todos">Todos os bairros</option>
          {bairros.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>

        <select
          className={styles.select}
          value={filter.risco}
          onChange={(e) => set("risco", e.target.value as RiscoNivel | "todos")}
          aria-label="Filtrar por nível de risco"
        >
          <option value="todos">Todos os riscos</option>
          {(Object.entries(RISCO_LABELS) as [RiscoNivel, string][]).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        <input
          type="date"
          className={styles.dateInput}
          value={filter.periodoInicio}
          max={filter.periodoFim || undefined}
          aria-label="Previsão término a partir de"
          onChange={(e) => set("periodoInicio", e.target.value)}
        />
        <span className={styles.sep}>→</span>
        <input
          type="date"
          className={styles.dateInput}
          value={filter.periodoFim}
          min={filter.periodoInicio || undefined}
          aria-label="Previsão término até"
          onChange={(e) => set("periodoFim", e.target.value)}
        />
      </div>
    </div>
  );
}
