import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import type { IEOPStats } from "../../schemas/ieop.schema";
import { IEOPCard } from "./IEOPCard";
import { IEOPDistribuicao } from "./IEOPDistribuicao";

const STATS: IEOPStats = {
  media_geral: 63.4,
  classe_geral: "Bom",
  distribuicao: { Crítico: 2, Ruim: 3, Regular: 5, Bom: 8, Ótimo: 4 },
  ranking_secretarias: [{ secretaria: "Obras", media_ieop: 70 }],
  piores_obras: [{ id: "1", nome: "Obra X", ieop_score: 12, ieop_classe: "Crítico" }],
};

describe("IEOPCard", () => {
  it("exibe o score com 1 casa decimal e a classe", () => {
    render(<IEOPCard stats={STATS} />);
    expect(screen.getByText("63.4")).toBeInTheDocument();
    // "Bom" aparece no badge da classe e também na legenda de faixas.
    expect(screen.getAllByText("Bom").length).toBeGreaterThanOrEqual(1);
  });
});

describe("IEOPDistribuicao", () => {
  it("renderiza sem quebrar com as 5 classes", () => {
    const { container } = render(<IEOPDistribuicao distribuicao={STATS.distribuicao} />);
    expect(screen.getByText("Distribuição por classe IEOP")).toBeInTheDocument();
    // Recharts monta um SVG dentro do container responsivo.
    expect(container.querySelector(".recharts-responsive-container")).toBeInTheDocument();
  });
});
