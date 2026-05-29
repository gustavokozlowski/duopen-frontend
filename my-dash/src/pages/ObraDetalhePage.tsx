import { useParams } from "react-router-dom";
import { PageLayout, type NavItem } from "../components/PageLayout";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useObraDetalhe } from "../features/obras/detalhe/useObraDetalhe";
import { HeaderObra } from "../features/obras/detalhe/HeaderObra";
import { CardExecucao } from "../features/obras/detalhe/CardExecucao";
import { CardDatas } from "../features/obras/detalhe/CardDatas";
import { CardPredicaoML } from "../features/obras/detalhe/CardPredicaoML";
import { ContratoSection } from "../features/obras/detalhe/ContratoSection";
import { MiniMapa } from "../features/obras/detalhe/MiniMapa";
import { CardFornecedor } from "../features/obras/detalhe/CardFornecedor";
import { DetailSkeleton } from "../features/obras/detalhe/DetailSkeleton";

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

const GRID3: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "var(--space-6)",
  marginBottom: "var(--space-6)",
};

const GRID_BOTTOM: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "var(--space-6)",
};

const SIDEBAR: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-6)",
};

export function ObraDetalhePage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: obra, isLoading, error } = useObraDetalhe(id);

  return (
    <PageLayout nav={NAV} pageTitle="Detalhe da obra">
      <ErrorBoundary>
        {isLoading || !obra ? (
          <DetailSkeleton />
        ) : error ? (
          <div style={{
            padding: "var(--space-8)", color: "var(--color-danger)",
            background: "var(--color-danger-bg)", border: "1px solid var(--color-danger-border)",
            borderRadius: "var(--radius-lg)", fontSize: "var(--text-sm)",
          }}>
            Não foi possível carregar os dados desta obra.
          </div>
        ) : (
          <>
            <HeaderObra obra={obra} />

            <div style={GRID3}>
              <CardExecucao obra={obra} />
              <CardDatas obra={obra} />
              <CardPredicaoML predicao={obra.predicao} />
            </div>

            <div style={GRID_BOTTOM}>
              <ContratoSection contratos={obra.contratos} />

              <div style={SIDEBAR}>
                <MiniMapa
                  lat={obra.lat}
                  lng={obra.lng}
                  prob_atraso={obra.predicao.prob_atraso}
                  endereco={obra.endereco}
                />
                <CardFornecedor fornecedor={obra.fornecedor} />
              </div>
            </div>
          </>
        )}
      </ErrorBoundary>
    </PageLayout>
  );
}
