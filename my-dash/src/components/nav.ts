import type { ReactNode } from "react";
import { canUseRAG } from "../auth/permissions";
import type { Perfil } from "../schemas/auth.schema";

export interface NavItem {
  path: string;
  label: string;
  icon?: ReactNode;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

// Navegação canônica do app. O item do Agente IA (RAG) só aparece para
// perfis com permissão (admin/gestor) — readonly não vê.
export function buildNav(perfil: Perfil | undefined): NavGroup[] {
  const principal: NavItem[] = [
    { path: "/", label: "Dashboard", icon: "◈" },
    { path: "/obras", label: "Obras", icon: "◉" },
    { path: "/fornecedores", label: "Fornecedores", icon: "◎" },
  ];

  if (canUseRAG(perfil)) {
    principal.push({ path: "/ia", label: "Agente IA", icon: "✦" });
  }

  return [
    { items: principal },
    {
      label: "Relatórios",
      items: [
        { path: "/metricas", label: "Métricas", icon: "▦" },
        { path: "/mapa", label: "Mapa", icon: "◌" },
      ],
    },
  ];
}
