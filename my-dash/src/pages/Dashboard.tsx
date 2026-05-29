import { useState } from "react";
import { useAuthContext } from "../auth/AuthContext";
import { PageLayout, type NavItem } from "../components/PageLayout";
import { PeriodFilter } from "../features/dashboard/PeriodFilter";
import { MetricCards } from "../features/dashboard/MetricCards";
import { AlertCard } from "../features/dashboard/AlertCard";
import { DonutChart } from "../features/dashboard/DonutChart";
import { HBarChart } from "../features/dashboard/HBarChart";
import { LineChart } from "../features/dashboard/LineChart";
import { defaultPeriod, useDashboardSummary, useTopAlerts } from "../features/dashboard/useDashboard";

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

const GRID_4 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "var(--space-6)",
} as const;

const GRID_2 = {
  display: "grid",
  gridTemplateColumns: "minmax(280px, 1fr) minmax(0, 1.6fr)",
  gap: "var(--space-6)",
  alignItems: "start",
} as const;

const GRID_FULL = {
  display: "grid",
  gap: "var(--space-6)",
} as const;

export function Dashboard() {
  const { user, logout } = useAuthContext();
  const [period, setPeriod] = useState(defaultPeriod);

  const summary = useDashboardSummary(period);
  const alerts = useTopAlerts(period);

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
      {/* ── Filtro de período ── */}
      <PeriodFilter value={period} onChange={setPeriod} />

      {/* ── Métricas globais ── */}
      <section style={{ ...GRID_4, marginBottom: "var(--space-6)" }} aria-label="Métricas globais">
        <MetricCards data={summary.data} isLoading={summary.isLoading} />
      </section>

      {/* ── Alertas + Rosca ── */}
      <section style={{ ...GRID_2, marginBottom: "var(--space-6)" }} aria-label="Alertas e distribuição">
        <AlertCard data={alerts.data} isLoading={alerts.isLoading} />
        <DonutChart data={summary.data?.por_status} isLoading={summary.isLoading} />
      </section>

      {/* ── Barras + Linha ── */}
      <section style={{ ...GRID_FULL, gridTemplateColumns: "1fr 1fr" }} aria-label="Análises">
        <HBarChart data={summary.data?.por_secretaria} isLoading={summary.isLoading} />
        <LineChart data={summary.data?.evolucao_mensal} isLoading={summary.isLoading} />
      </section>
    </PageLayout>
  );
}
