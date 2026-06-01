import { useState } from "react";
import { Footer } from "../components/Footer";
import { PageLayout } from "../components/PageLayout";
import { AlertCard } from "../features/dashboard/AlertCard";
import { DonutChart } from "../features/dashboard/DonutChart";
import { HBarChart } from "../features/dashboard/HBarChart";
import { IEOPCard } from "../features/dashboard/IEOPCard";
import { IEOPDistribuicao } from "../features/dashboard/IEOPDistribuicao";
import { LineChart } from "../features/dashboard/LineChart";
import { MetricCards } from "../features/dashboard/MetricCards";
import { PeriodFilter } from "../features/dashboard/PeriodFilter";
import { ChartSkeleton } from "../features/dashboard/Skeleton";
import {
  defaultPeriod,
  useDashboardSummary,
  useIEOPStats,
  useTopAlerts,
} from "../features/dashboard/useDashboard";
import styles from "./Dashboard.module.css";

export function Dashboard() {
  const [period, setPeriod] = useState(defaultPeriod);

  const summary = useDashboardSummary(period);
  const alerts = useTopAlerts(period);
  const ieop = useIEOPStats();

  return (
    <PageLayout
      pageTitle="Dashboard"
      breadcrumb="Macaé / Painel analítico"
      headerRight={
        <>
          <span className={styles.live}>
            <span className={styles.liveDot} /> ao vivo
          </span>
          <PeriodFilter value={period} onChange={setPeriod} />
        </>
      }
    >
      {/* ── Herói IEOP: indicador principal ── */}
      <section className={styles.gridHero} aria-label="Índice de Eficiência da Obra Pública">
        {ieop.isLoading ? (
          <>
            <ChartSkeleton title="Índice de Eficiência — Macaé" />
            <ChartSkeleton title="Distribuição por classe IEOP" />
          </>
        ) : ieop.data ? (
          <>
            <IEOPCard stats={ieop.data} />
            <IEOPDistribuicao distribuicao={ieop.data.distribuicao} />
          </>
        ) : (
          <div
            role="status"
            style={{
              gridColumn: "1 / -1",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-6)",
              fontSize: "var(--text-sm)",
              color: "var(--color-text-muted)",
            }}
          >
            Índice IEOP indisponível no momento.
          </div>
        )}
      </section>

      {/* ── Métricas globais ── */}
      <section className={styles.gridMetrics} aria-label="Métricas globais">
        <MetricCards data={summary.data} isLoading={summary.isLoading} />
      </section>

      {/* ── Alertas (Top 5 risco) + Rosca (status) ── */}
      <section className={styles.gridTwo} aria-label="Alertas e distribuição">
        <AlertCard data={alerts.data} isLoading={alerts.isLoading} />
        <DonutChart data={summary.data?.por_status} isLoading={summary.isLoading} />
      </section>

      {/* ── Barras por secretaria + Evolução mensal ── */}
      <section className={styles.gridCharts} aria-label="Análises">
        <HBarChart data={summary.data?.por_secretaria} isLoading={summary.isLoading} />
        <LineChart data={summary.data?.evolucao_mensal} isLoading={summary.isLoading} />
      </section>

      <Footer />
    </PageLayout>
  );
}
