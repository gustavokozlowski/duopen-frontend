import { useParams } from "react-router-dom";
import { PageLayout, type NavItem } from "../components/PageLayout";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useFornecedorPerfil } from "../features/fornecedores/perfil/useFornecedorPerfil";
import { PerfilHeader } from "../features/fornecedores/perfil/PerfilHeader";
import { ValorAnualChart } from "../features/fornecedores/perfil/ValorAnualChart";
import { RiscoEvolutionChart } from "../features/fornecedores/perfil/RiscoEvolutionChart";
import { ObraHistoricoTable } from "../features/fornecedores/perfil/ObraHistoricoTable";
import { PerfilSkeleton } from "../features/fornecedores/perfil/PerfilSkeleton";

const NAV = [
  {
    items: [
      { path: "/", label: "Dashboard", icon: "◈" },
      { path: "/obras", label: "Obras", icon: "◉" },
      { path: "/fornecedores", label: "Fornecedores", icon: "◎" },
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

const GRID2: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "var(--space-6)",
  marginBottom: "var(--space-6)",
};

export function FornecedorPerfilPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data: perfil, isLoading, error } = useFornecedorPerfil(id);

  return (
    <PageLayout nav={NAV} pageTitle="Perfil do fornecedor">
      <ErrorBoundary>
        {isLoading || !perfil ? (
          <PerfilSkeleton />
        ) : error ? (
          <div style={{
            padding: "var(--space-8)", color: "var(--color-danger)",
            background: "var(--color-danger-bg)", border: "1px solid var(--color-danger-border)",
            borderRadius: "var(--radius-lg)", fontSize: "var(--text-sm)",
          }}>
            Não foi possível carregar o perfil deste fornecedor.
          </div>
        ) : (
          <>
            <PerfilHeader perfil={perfil} />

            <div style={GRID2}>
              <ValorAnualChart data={perfil.valor_por_ano} />
              <RiscoEvolutionChart data={perfil.evolucao_risco} />
            </div>

            <ObraHistoricoTable obras={perfil.obras} />
          </>
        )}
      </ErrorBoundary>
    </PageLayout>
  );
}
