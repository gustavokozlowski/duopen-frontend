import { useState } from "react";
import { useAuthContext } from "../auth/AuthContext";
import { PageLayout } from "../components/PageLayout";
import { PeriodFilter } from "../features/dashboard/PeriodFilter";
import { MetricCards } from "../features/dashboard/MetricCards";
import { AlertCard } from "../features/dashboard/AlertCard";
import { DonutChart } from "../features/dashboard/DonutChart";
import { HBarChart } from "../features/dashboard/HBarChart";
import { LineChart } from "../features/dashboard/LineChart";
import { defaultPeriod, useDashboardSummary, useTopAlerts } from "../features/dashboard/useDashboard";
import styles from "./Dashboard.module.css";


export function Dashboard() {
  const { user, logout } = useAuthContext();
  const [period, setPeriod] = useState(defaultPeriod);

  const summary = useDashboardSummary(period);
  const alerts = useTopAlerts(period);

  return (
    <PageLayout
      pageTitle="Dashboard"
      headerRight={
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <span style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
            {user?.nome ?? user?.email}
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
      <section className={styles.gridMetrics} aria-label="Métricas globais">
        <MetricCards data={summary.data} isLoading={summary.isLoading} />
      </section>

      {/* ── Alertas + Rosca ── */}
      <section className={styles.gridTwo} aria-label="Alertas e distribuição">
        <AlertCard data={alerts.data} isLoading={alerts.isLoading} />
        <DonutChart data={summary.data?.por_status} isLoading={summary.isLoading} />
      </section>

      {/* ── Barras + Linha ── */}
      <section className={styles.gridCharts} aria-label="Análises">
        <HBarChart data={summary.data?.por_secretaria} isLoading={summary.isLoading} />
        <LineChart data={summary.data?.evolucao_mensal} isLoading={summary.isLoading} />
      </section>
    </PageLayout>
  );
}
