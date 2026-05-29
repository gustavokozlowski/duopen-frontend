import { useAuthContext } from "../auth/AuthContext";
import { Badge } from "../components/Badge";
import { Card } from "../components/Card";
import { Table, type Column } from "../components/Table";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageLayout, type NavItem } from "../components/PageLayout";

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
  { key: "progresso", header: "Progresso", sortable: true, render: (v) => `${String(v)}%` },
  {
    key: "status",
    header: "Status",
    render: (v) => <Badge variant={v as "success" | "warning" | "danger"} />,
  },
];

export function Dashboard() {
  const { user, logout } = useAuthContext();

  return (
    <PageLayout
      nav={NAV}
      pageTitle="Dashboard"
      headerRight={
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
            {user?.name ?? user?.email}
          </span>
          <button
            onClick={logout}
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-muted)",
              background: "none",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "var(--space-1) var(--space-3)",
              cursor: "pointer",
            }}
          >
            Sair
          </button>
        </div>
      }
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "var(--space-6)",
          marginBottom: "var(--space-8)",
        }}
      >
        <Card title="Alunos ativos" value="1.284" icon="◉" variant="success" trend={12} trendLabel="vs. mês anterior" />
        <Card title="Cursos em andamento" value="342" icon="◎" trend={-4} trendLabel="vs. mês anterior" />
        <Card title="Taxa de conclusão" value="68%" icon="▦" variant="warning" trend={3} trendLabel="vs. mês anterior" />
        <Card title="Alertas de risco" value="27" icon="⚠" variant="danger" trend={-15} trendLabel="vs. mês anterior" />
      </div>

      <Table columns={COLUMNS} data={SAMPLE_DATA} pageSize={5} searchable />
    </PageLayout>
  );
}
