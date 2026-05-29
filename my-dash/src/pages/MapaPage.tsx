import { useMemo, useState } from "react";
import { PageLayout, type NavItem } from "../components/PageLayout";
import { MacaeMap } from "../features/mapa/MacaeMap";
import { MapFilters } from "../features/mapa/MapFilters";
import { useMapaObras } from "../features/mapa/useMapa";
import { filterObras, exportToCsv, getUniqueSecretarias } from "../features/mapa/mapaUtils";
import type { MapFilter } from "../features/mapa/types";
import styles from "../features/mapa/MapaPage.module.css";

const DEFAULT_FILTER: MapFilter = {
  risco: "todos",
  secretaria: "todas",
  status: "todos",
};

const NAV = [
  {
    items: [
      { path: "/", label: "Dashboard", icon: "◈" },
      { path: "/obras", label: "Obras", icon: "◉" },
      { path: "/secretarias", label: "Secretarias", icon: "◎" },
    ] satisfies NavItem[],
  },
  {
    label: "Relatórios",
    items: [
      { path: "/metricas", label: "Métricas", icon: "▦" },
      { path: "/mapa", label: "Mapa", icon: "◌" },
    ] satisfies NavItem[],
  },
];

export function MapaPage() {
  const { data: obras = [], isLoading } = useMapaObras();
  const [filter, setFilter] = useState<MapFilter>(DEFAULT_FILTER);

  const secretarias = useMemo(() => getUniqueSecretarias(obras), [obras]);
  const obrasFiltradas = useMemo(() => filterObras(obras, filter), [obras, filter]);

  return (
    <PageLayout nav={NAV} pageTitle="Mapa de obras">
      <div className={styles.wrapper}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <span className={styles.pageTitle}>Mapa interativo — Macaé</span>
            <span className={styles.pageSubtitle}>
              {isLoading ? "Carregando…" : `${obrasFiltradas.length} obra${obrasFiltradas.length !== 1 ? "s" : ""} exibida${obrasFiltradas.length !== 1 ? "s" : ""}`}
            </span>
          </div>

          <button
            className={styles.exportBtn}
            onClick={() => exportToCsv(obrasFiltradas)}
            disabled={obrasFiltradas.length === 0}
            aria-label="Exportar obras filtradas como CSV"
          >
            ↓ Exportar CSV
          </button>
        </div>

        <div className={styles.body}>
          <MapFilters
            filter={filter}
            onChange={setFilter}
            secretarias={secretarias}
            totalFiltradas={obrasFiltradas.length}
            totalGeral={obras.length}
          />
          <MacaeMap obras={obrasFiltradas} isLoading={isLoading} />
        </div>
      </div>
    </PageLayout>
  );
}
