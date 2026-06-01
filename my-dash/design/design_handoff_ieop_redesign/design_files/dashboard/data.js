/* IEOP Dashboard — dados mock realistas (Município de Macaé)
   Estruturas espelham os schemas do backend (dashboard / ieop / obras). */

window.MACAE = {
  municipio: "Macaé",

  // dashboardSummary
  summary: {
    total_obras: 342,
    obras_em_andamento: 137,
    valor_total_contratado: 487_300_000,
    media_execucao: 58.4,
    por_status: [
      { status: "em_andamento", label: "Em andamento", total: 137, cor: "#3FB984" },
      { status: "concluida",    label: "Concluída",    total: 96,  cor: "#1D9E75" },
      { status: "atrasada",     label: "Atrasada",     total: 39,  cor: "#D2691E" },
      { status: "nao_iniciada", label: "Não iniciada", total: 31,  cor: "#555b72" },
      { status: "paralisada",   label: "Paralisada",   total: 28,  cor: "#BA7517" },
      { status: "cancelada",    label: "Cancelada",    total: 11,  cor: "#A32D2D" },
    ],
    por_secretaria: [
      { secretaria: "Sec. Mun. de Obras", total: 98 },
      { secretaria: "Sec. Mun. de Saúde", total: 64 },
      { secretaria: "Sec. Mun. de Educação", total: 57 },
      { secretaria: "Sec. Mun. de Infraestrutura", total: 43 },
      { secretaria: "Sec. Mun. de Meio Ambiente", total: 31 },
      { secretaria: "Sec. Mun. de Esportes", total: 24 },
    ],
    evolucao_mensal: [
      { mes: "jan/25", iniciadas: 12, concluidas: 8 },
      { mes: "fev/25", iniciadas: 18, concluidas: 11 },
      { mes: "mar/25", iniciadas: 9,  concluidas: 14 },
      { mes: "abr/25", iniciadas: 22, concluidas: 10 },
      { mes: "mai/25", iniciadas: 15, concluidas: 16 },
      { mes: "jun/25", iniciadas: 27, concluidas: 12 },
      { mes: "jul/25", iniciadas: 19, concluidas: 20 },
      { mes: "ago/25", iniciadas: 24, concluidas: 17 },
    ],
  },

  // IEOPStats
  ieop: {
    media_geral: 67.2,
    classe_geral: "Bom",
    distribuicao: { "Crítico": 18, "Ruim": 41, "Regular": 94, "Bom": 132, "Ótimo": 57 },
    componentes: [
      { sig: "C", nome: "Custo",       valor: 71, cor: "#3FB984" },
      { sig: "P", nome: "Atraso",      valor: 62, cor: "#3FB984" },
      { sig: "R", nome: "Recorrência", valor: 78, cor: "#1D9E75" },
      { sig: "E", nome: "Execução",    valor: 58, cor: "#BA7517" },
    ],
  },

  // Top alertas (prob_atraso desc)
  alertas: [
    { id: "1", nome: "Reforma da UBS do Parque Aeroporto", secretaria: "Sec. Mun. de Saúde", prob_atraso: 0.88 },
    { id: "2", nome: "Pavimentação da Estrada de Cabiúnas", secretaria: "Sec. Mun. de Obras", prob_atraso: 0.81 },
    { id: "3", nome: "Ampliação da Escola Mun. Luiz Reid", secretaria: "Sec. Mun. de Educação", prob_atraso: 0.74 },
    { id: "4", nome: "Drenagem do Bairro Malvinas", secretaria: "Sec. Mun. de Infraestrutura", prob_atraso: 0.69 },
    { id: "5", nome: "Construção da Praça de Imbetiba", secretaria: "Sec. Mun. de Obras", prob_atraso: 0.63 },
  ],

  // IEOP 5-class palette (ieop.ts)
  classes: [
    { nome: "Crítico", cor: "#A32D2D" },
    { nome: "Ruim",    cor: "#D2691E" },
    { nome: "Regular", cor: "#BA7517" },
    { nome: "Bom",     cor: "#3FB984" },
    { nome: "Ótimo",   cor: "#1D9E75" },
  ],
};
