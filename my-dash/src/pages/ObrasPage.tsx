import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout, type NavItem } from "../components/PageLayout";
import { Badge } from "../components/Badge";
import { Table, type Column } from "../components/Table";
import { ObrasFilters } from "../features/obras/ObrasFilters";
import { ExecutionBar } from "../features/obras/ExecutionBar";
import { RiskBadge } from "../features/obras/RiskBadge";
import { useObras } from "../features/obras/useObras";
import { filterObras, getDistinct, exportObrasCsv } from "../features/obras/obrasUtils";
import { formatBRL, formatDate } from "../features/obras/formatters";
import { DEFAULT_FILTER } from "../features/obras/types";
import type { ObrasFilter, ObraListItem, ObraStatus } from "../features/obras/types";
import { STATUS_LABELS } from "../features/mapa/types";
import type { BadgeVariant } from "../components/Badge";

const STATUS_VARIANT: Record<ObraStatus, BadgeVariant> = {
  em_andamento: "success",
  concluida:    "neutral",
  paralisada:   "warning",
  atrasada:     "danger",
  nao_iniciada: "neutral",
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

const COLUMNS: Column<ObraListItem>[] = [
  {
    key: "nome",
    header: "Obra / Contrato",
    sortable: true,
    render: (_, row) => (
      <div>
        <div style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{String(row.nome)}</div>
        <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", marginTop: 2 }}>
          {String(row.numero_contrato)}
        </div>
      </div>
    ),
  },
  { key: "secretaria", header: "Secretaria", sortable: true },
  { key: "bairro", header: "Bairro", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (v) => (
      <Badge
        label={STATUS_LABELS[v as ObraStatus]}
        variant={STATUS_VARIANT[v as ObraStatus] ?? "neutral"}
        dot={false}
      />
    ),
  },
  {
    key: "execucao_percentual",
    header: "Execução",
    sortable: true,
    render: (v) => <ExecutionBar value={Number(v)} />,
  },
  {
    key: "valor_contratado",
    header: "Valor",
    sortable: true,
    render: (v) => (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)" }}>
        {formatBRL(Number(v))}
      </span>
    ),
  },
  {
    key: "prob_atraso",
    header: "Risco",
    sortable: true,
    render: (v) => <RiskBadge prob={Number(v)} />,
  },
  {
    key: "previsao_termino",
    header: "Previsão término",
    sortable: true,
    render: (v) => formatDate(String(v)),
  },
];

export function ObrasPage() {
  const navigate = useNavigate();
  const { data: obras = [], isLoading } = useObras();
  const [filter, setFilter] = useState<ObrasFilter>(DEFAULT_FILTER);

  const secretarias = useMemo(() => getDistinct(obras, "secretaria"), [obras]);
  const bairros = useMemo(() => getDistinct(obras, "bairro"), [obras]);
  const filtradas = useMemo(() => filterObras(obras, filter), [obras, filter]);

  return (
    <PageLayout
      nav={NAV}
      pageTitle="Obras"
      headerRight={
        <button
          onClick={() => exportObrasCsv(filtradas)}
          disabled={filtradas.length === 0}
          style={{
            display: "flex", alignItems: "center", gap: "var(--space-2)",
            padding: "var(--space-2) var(--space-4)",
            background: "var(--color-surface)", border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)", color: "var(--color-text-secondary)",
            fontSize: "var(--text-sm)", fontWeight: 500, cursor: "pointer",
          }}
          aria-label="Exportar obras filtradas como CSV"
        >
          ↓ Exportar CSV
          <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>
            ({filtradas.length})
          </span>
        </button>
      }
    >
      <ObrasFilters
        filter={filter}
        onChange={setFilter}
        secretarias={secretarias}
        bairros={bairros}
      />

      <Table<ObraListItem>
        columns={COLUMNS}
        data={filtradas}
        pageSize={15}
        searchable={false}
        emptyMessage={isLoading ? "Carregando obras…" : "Nenhuma obra encontrada com os filtros aplicados."}
        onRowClick={(row) => navigate(`/obras/${String(row.id)}`)}
      />
    </PageLayout>
  );
}
