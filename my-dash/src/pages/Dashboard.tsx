import { useMemo, useState } from "react";
import { Footer } from "../components/Footer";
import { BellIcon, SearchIcon } from "../components/icons";
import { PageLayout } from "../components/PageLayout";
import { AlertCard } from "../features/dashboard/AlertCard";
import { DonutChart } from "../features/dashboard/DonutChart";
import { HBarChart } from "../features/dashboard/HBarChart";
import { IEOPCard, type IEOPComponente } from "../features/dashboard/IEOPCard";
import { IEOPDistribuicao } from "../features/dashboard/IEOPDistribuicao";
import { LineChart } from "../features/dashboard/LineChart";
import { MetricCards } from "../features/dashboard/MetricCards";
import { PeriodToggle } from "../features/dashboard/PeriodToggle";
import { ChartSkeleton } from "../features/dashboard/Skeleton";
import {
  defaultPeriod,
  useDashboardSummary,
  useIEOPStats,
  useTopAlerts,
} from "../features/dashboard/useDashboard";
import { useObras } from "../features/obras/useObras";
import styles from "./Dashboard.module.css";

// Definição dos 4 componentes do IEOP (custo, atraso, recorrência, execução).
const COMP_DEFS = [
  { sig: "C", nome: "Custo", key: "ieop_custo" },
  { sig: "P", nome: "Atraso", key: "ieop_atraso" },
  { sig: "R", nome: "Recorrência", key: "ieop_recorrencia" },
  { sig: "E", nome: "Execução", key: "ieop_execucao" },
] as const;

export function Dashboard() {
  const [period, setPeriod] = useState(defaultPeriod);

  const summary = useDashboardSummary(period);
  const alerts = useTopAlerts(period);
  const ieop = useIEOPStats();
  const obras = useObras();

  // Média municipal real de cada componente C·P·R·E, calculada a partir da
  // lista de obras (cada obra carrega ieop_custo/atraso/recorrencia/execucao).
  // Só exibimos os 4 quando todos têm dados — nada é fabricado.
  const componentes = useMemo<IEOPComponente[] | undefined>(() => {
    const lista = obras.data ?? [];
    if (lista.length === 0) return undefined;
    const out: IEOPComponente[] = [];
    for (const def of COMP_DEFS) {
      const vals = lista.map((o) => o[def.key]).filter((v): v is number => typeof v === "number");
      if (vals.length === 0) return undefined;
      out.push({
        sig: def.sig,
        nome: def.nome,
        valor: vals.reduce((s, v) => s + v, 0) / vals.length,
      });
    }
    return out;
  }, [obras.data]);

  const ieopSubtitle =
    summary.data != null ? `média municipal · ${summary.data.total_obras} obras` : undefined;

  return (
    <PageLayout
      pageTitle="Dashboard"
      breadcrumb="Macaé / Painel analítico"
      headerRight={
        <>
          <span className={styles.live}>
            <span className={styles.liveDot} /> ao vivo
          </span>
          <PeriodToggle onChange={setPeriod} />
          <button type="button" className={styles.iconBtn} aria-label="Buscar">
            <SearchIcon />
          </button>
          <button type="button" className={styles.iconBtn} aria-label="Notificações">
            <BellIcon />
          </button>
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
            <IEOPCard stats={ieop.data} subtitle={ieopSubtitle} componentes={componentes} />
            <IEOPDistribuicao
              distribuicao={ieop.data.distribuicao}
              totalObras={summary.data?.total_obras}
            />
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
