/* IEOP · Agente IA — conversa de exemplo (com fontes RAG) */
window.CHAT = {
  sessions: [
    "Quais obras têm aditivos acima de 20%?",
    "Fornecedores com maior taxa de risco?",
    "Obras paralisadas em 2024",
  ],
  messages: [
    {
      id: "m1", role: "user", time: "14:21",
      content: "Quais obras têm aditivos acima de 20% do valor contratado?",
    },
    {
      id: "m2", role: "assistant", time: "14:21",
      content: "Encontrei <b>3 obras</b> com aditivos acima de 20% do valor original. A mais crítica é a <b>Pavimentação da Estrada de Cabiúnas</b> (CT-2023-0941), com <span class=\"num\">+14,9%</span> em prazo e <span class=\"num\">+R$ 1,85 mi</span> em valor — somando dois aditivos. As outras duas são a Estação de Tratamento de Esgoto — Barra (<span class=\"num\">+23%</span>) e a Drenagem do Bairro Malvinas (<span class=\"num\">+31%</span>). Recomendo priorizar a revisão da obra de Cabiúnas, que também tem alta probabilidade de atraso (81%).",
      sources: [
        { id: "s1", titulo: "Contrato nº CT-2023-0941", trecho: "2º Termo Aditivo — reforço de drenagem em trecho crítico, acréscimo de R$ 1.850.000,00 e prorrogação de 60 dias.", obra: "Pavimentação da Estrada de Cabiúnas", relevancia: 0.94 },
        { id: "s2", titulo: "Contrato nº CT-2022-0410", trecho: "Aditivo de valor correspondente a 23% do montante inicial, motivado por revisão de projeto executivo.", obra: "ETE — Barra de Macaé", relevancia: 0.82 },
        { id: "s3", titulo: "Relatório de fiscalização 04/2025", trecho: "Obra de drenagem no Malvinas acumula aditivos de 31%, acima do limite recomendado pela CGM.", obra: "Drenagem do Bairro Malvinas", relevancia: 0.77 },
      ],
    },
  ],
};
