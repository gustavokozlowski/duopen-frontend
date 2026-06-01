/* IEOP · Detalhe da Obra — dados ricos (espelha obraDetalhe.schema)
   Obra: Pavimentação da Estrada de Cabiúnas (Macaé) */

window.OBRA_DETALHE = {
  id: "2",
  nome: "Pavimentação da Estrada de Cabiúnas",
  numero_contrato: "CT-2023-0941",
  secretaria: "Sec. Mun. de Obras",
  bairro: "Cabiúnas",
  endereco: "Cabiúnas, Macaé — RJ",
  status: "em_andamento",
  execucao_percentual: 52,
  valor_contratado: 12_400_000,
  valor_aditivos: 1_850_000,
  data_inicio: "2023-09-15",
  previsao_termino: "2026-07-30",
  atraso_dias: 47,
  lat: -22.3711,
  lng: -41.7897,

  // IEOP (componentes C / P / R / E)
  ieop_score: 44.1,
  ieop_classe: "Regular",
  ieop_custo: 58,        // C
  ieop_atraso: 31,       // P (Prazo)
  ieop_recorrencia: 49,  // R
  ieop_execucao: 52,     // E
  ieop_calculado_em: "2026-01-15T14:32:00",

  predicao: {
    prob_atraso: 0.81,
    prob_estouro: 0.64,
    ultima_atualizacao: "2026-01-20T09:15:00",
    fatores_risco: [
      "Histórico de atraso do fornecedor em obras anteriores",
      "Aditivo de prazo recente (+90 dias)",
      "Execução abaixo da curva física planejada",
      "Período chuvoso recorrente na região",
    ],
  },

  contratos: [
    {
      id: "c1",
      numero: "CT-2023-0941",
      objeto: "Pavimentação asfáltica e drenagem da Estrada de Cabiúnas (8,4 km)",
      valor_inicial: 12_400_000,
      data_inicio: "2023-09-15",
      data_termino: "2026-07-30",
      aditivos: [
        { id: "a1", numero: "AD-001", tipo: "prazo", valor: 0,         prazo_dias: 90, data: "2024-11-10", motivo: "Prorrogação por período chuvoso intenso" },
        { id: "a2", numero: "AD-002", tipo: "ambos", valor: 1_850_000, prazo_dias: 60, data: "2025-06-22", motivo: "Reforço de drenagem em trecho crítico" },
      ],
    },
    {
      id: "c2",
      numero: "CT-2024-0118",
      objeto: "Sinalização viária e contenção de encostas",
      valor_inicial: 2_100_000,
      data_inicio: "2024-03-01",
      data_termino: "2026-05-15",
      aditivos: [],
    },
  ],

  fornecedor: {
    id: "f1",
    nome: "Construtora Litoral Norte Ltda.",
    cnpj: "12345678000190",
    email: "contato@litoralnorte.com.br",
    telefone: "(22) 2763-4500",
    cidade: "Macaé",
    estado: "RJ",
  },
};
