import "./index.css";
import { Badge } from "./components/Badge";
import { Card } from "./components/Card";
import { Table, type Column } from "./components/Table";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { PageLayout, type NavItem } from "./components/PageLayout";

const NAV = [
  {
    items: [
      { path: "/", label: "Dashboard", icon: "◈" },
      { path: "/usuarios", label: "Usuários", icon: "◉" },
      { path: "/cursos", label: "Cursos", icon: "◎" },
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

interface SampleRow extends Record<string, unknown> {
  nome: string;
  curso: string;
  progresso: number;
  status: string;
}

const SAMPLE_DATA: SampleRow[] = [
  { nome: "Ana Lima", curso: "Inglês A1", progresso: 87, status: "success" },
  { nome: "Bruno Costa", curso: "Espanhol B1", progresso: 45, status: "warning" },
  { nome: "Carla Dias", curso: "Inglês B2", progresso: 12, status: "danger" },
  { nome: "Diego Melo", curso: "Francês A2", progresso: 100, status: "success" },
  { nome: "Eduarda Faria", curso: "Inglês A1", progresso: 60, status: "warning" },
];

const COLUMNS: Column<SampleRow>[] = [
  { key: "nome", header: "Nome", sortable: true },
  { key: "curso", header: "Curso", sortable: true },
  {
    key: "progresso",
    header: "Progresso",
    sortable: true,
    render: (v) => `${String(v)}%`,
  },
  {
    key: "status",
    header: "Status",
    render: (v) => (
      <Badge
        variant={v as "success" | "warning" | "danger"}
      />
    ),
  },
];

export function App() {
  return (
    <ErrorBoundary>
      <PageLayout nav={NAV} pageTitle="Dashboard">
        {/* Cards de métricas */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-6)", marginBottom: "var(--space-8)" }}>
          <Card title="Alunos ativos" value="1.284" icon="◉" variant="success" trend={12} trendLabel="vs. mês anterior" />
          <Card title="Cursos em andamento" value="342" icon="◎" trend={-4} trendLabel="vs. mês anterior" />
          <Card title="Taxa de conclusão" value="68%" icon="▦" variant="warning" trend={3} trendLabel="vs. mês anterior" />
          <Card title="Alertas de risco" value="27" icon="⚠" variant="danger" trend={-15} trendLabel="vs. mês anterior" />
        </div>

        {/* Spinner de exemplo */}
        <div style={{ display: "flex", gap: "var(--space-6)", marginBottom: "var(--space-8)", alignItems: "center" }}>
          <LoadingSpinner size="sm" />
          <LoadingSpinner size="md" />
          <LoadingSpinner size="lg" />
          <Badge variant="success" />
          <Badge variant="warning" />
          <Badge variant="danger" />
          <Badge variant="neutral" label="Pendente" />
        </div>

        {/* Tabela */}
        <Table
          columns={COLUMNS}
          data={SAMPLE_DATA}
          pageSize={5}
          searchable
        />
      </PageLayout>
    </ErrorBoundary>
  );
}

export default App;
