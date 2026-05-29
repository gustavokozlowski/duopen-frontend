import { Card } from "../../components/Card";
import { CardSkeleton } from "./Skeleton";
import { formatBRL, formatPct } from "./formatters";
import type { DashboardSummary } from "./types";

interface MetricCardsProps {
  data: DashboardSummary | undefined;
  isLoading: boolean;
}

export function MetricCards({ data, isLoading }: MetricCardsProps) {
  if (isLoading || !data) {
    return (
      <>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </>
    );
  }

  return (
    <>
      <Card
        title="Total de obras"
        value={data.total_obras.toLocaleString("pt-BR")}
        icon="◈"
      />
      <Card
        title="Em andamento"
        value={data.obras_em_andamento.toLocaleString("pt-BR")}
        icon="◉"
        variant="success"
      />
      <Card
        title="Valor contratado"
        value={formatBRL(data.valor_total_contratado)}
        icon="R$"
        variant="warning"
      />
      <Card
        title="Média de execução"
        value={formatPct(data.media_execucao)}
        icon="▦"
        variant={data.media_execucao >= 70 ? "success" : data.media_execucao >= 40 ? "warning" : "danger"}
      />
    </>
  );
}
