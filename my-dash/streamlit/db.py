"""Módulo compartilhado: conexão Supabase + geradores de dados de amostra."""

from __future__ import annotations

import os
from pathlib import Path

import numpy as np
import pandas as pd
import streamlit as st
from dotenv import load_dotenv

# Carrega o .env da raiz do projeto (my-dash/.env), independente do CWD/terminal.
# Não sobrescreve variáveis já definidas no ambiente real.
load_dotenv(Path(__file__).resolve().parent.parent / ".env", override=False)

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY", "")

_SECRETARIAS = [
    "Obras e Infraestrutura",
    "Saúde",
    "Educação",
    "Urbanismo",
    "Meio Ambiente",
    "Transporte",
]

_STATUS = ["em_andamento", "atrasada", "paralisada", "concluida", "nao_iniciada"]

STATUS_LABELS = {
    "em_andamento": "Em andamento",
    "concluida": "Concluída",
    "paralisada": "Paralisada",
    "atrasada": "Atrasada",
    "nao_iniciada": "Não iniciada",
}

# ── Plotly theme ──────────────────────────────────────────────────────────────

PLOTLY_LAYOUT = dict(
    template="plotly_dark",
    paper_bgcolor="#1e2436",
    plot_bgcolor="#161b27",
    font=dict(family="Inter, system-ui, sans-serif", color="#e8eaf0", size=13),
    colorway=["#1D9E75", "#BA7517", "#A32D2D", "#3b82f6", "#8b5cf6", "#f59e0b"],
    margin=dict(t=40, l=8, r=8, b=8),
)

RISK_COLORSCALE = [
    [0.00, "#1D9E75"],
    [0.40, "#BA7517"],
    [0.70, "#A32D2D"],
    [1.00, "#6b0000"],
]

# ── Supabase client ───────────────────────────────────────────────────────────


@st.cache_resource
def _client():
    if not SUPABASE_URL or not SUPABASE_KEY:
        return None
    try:
        from supabase import create_client  # noqa: PLC0415

        return create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception:
        return None


def is_configured() -> bool:
    return bool(SUPABASE_URL and SUPABASE_KEY)


@st.cache_data(ttl=300)
def fetch(table: str, columns: str = "*", limit: int = 10_000) -> pd.DataFrame:
    """Busca uma tabela do Supabase e retorna DataFrame. Retorna vazio se não configurado."""
    client = _client()
    if client is None:
        return pd.DataFrame()
    try:
        res = client.table(table).select(columns).limit(limit).execute()
        return pd.DataFrame(res.data or [])
    except Exception as exc:
        st.warning(f"Supabase — erro em `{table}`: {exc}")
        return pd.DataFrame()


def notice_sample() -> None:
    """Exibe banner informando que dados são de amostra."""
    st.info(
        "ℹ️ **Dados de exemplo.** "
        "Configure `SUPABASE_URL` e `SUPABASE_ANON_KEY` no `.env` para dados reais.",
        icon="ℹ️",
    )


# ── Geradores de dados de amostra ─────────────────────────────────────────────


def sample_predicoes(n: int = 300, seed: int = 42) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    meses = pd.date_range("2024-01", periods=14, freq="MS")

    fornecedores = [f"Construtora {chr(65 + i)}{rng.integers(1, 99)}" for i in range(30)]
    forn_ids = [f"forn-{i:03d}" for i in range(30)]

    idx_forn = rng.integers(0, 30, n)
    prob_atraso = rng.beta(2, 4, n).round(4)

    return pd.DataFrame(
        {
            "obra_id": [f"obra-{i:04d}" for i in range(n)],
            "nome": [f"Obra #{i:04d} — {rng.choice(_SECRETARIAS)}" for i in range(n)],
            "secretaria": rng.choice(_SECRETARIAS, n),
            "bairro": rng.choice(
                ["Centro", "Imbetiba", "Lagoa", "Glória", "Novo Horizonte", "Cabiúnas", "Imboassica"], n
            ),
            "status": rng.choice(_STATUS, n, p=[0.40, 0.22, 0.10, 0.20, 0.08]),
            "prob_atraso": prob_atraso,
            "prob_estouro": np.clip(prob_atraso + rng.normal(0, 0.1, n), 0, 1).round(4),
            "execucao_real": rng.uniform(0, 100, n).round(1),
            "execucao_prevista": np.clip(
                rng.uniform(0, 100, n) + rng.normal(0, 10, n), 0, 100
            ).round(1),
            "valor_contratado": rng.uniform(200_000, 15_000_000, n).round(0),
            "data_predicao": rng.choice(meses.strftime("%Y-%m"), n),
            "fornecedor_id": [forn_ids[i] for i in idx_forn],
            "fornecedor_nome": [fornecedores[i] for i in idx_forn],
        }
    )


def sample_features(seed: int = 42) -> pd.DataFrame:
    features = [
        ("atraso_historico_fornecedor", "Histórico de atrasos do fornecedor"),
        ("complexidade_obra", "Índice de complexidade técnica"),
        ("valor_contratado_log", "Log do valor contratado (R$)"),
        ("n_aditivos_anteriores", "Nº de aditivos em obras anteriores"),
        ("dias_desde_inicio", "Dias corridos desde o início"),
        ("chuva_acumulada_30d", "Chuva acumulada últimos 30 dias"),
        ("execucao_percentual", "Percentual de execução atual"),
        ("orcamento_desvio_pct", "Desvio percentual do orçamento"),
        ("secretaria_encoded", "Secretaria responsável (encoded)"),
        ("tipo_obra_encoded", "Tipo de obra (encoded)"),
        ("n_funcionarios", "Nº de funcionários alocados"),
        ("dias_para_termino", "Dias restantes até previsão de término"),
        ("fornecedor_obras_ativas", "Obras ativas simultâneas do fornecedor"),
        ("bairro_risco_index", "Índice de risco do bairro"),
        ("equipe_fiscalizacao", "Tamanho da equipe de fiscalização"),
    ]
    rng = np.random.default_rng(seed)
    names, descs = zip(*features)
    imp = rng.dirichlet(np.array([6, 5, 4, 4, 3, 2, 3, 2, 1.5, 1.5, 1, 1, 2, 1, 1]))
    return (
        pd.DataFrame({"feature_name": names, "descricao": descs, "importance": imp.round(5)})
        .sort_values("importance", ascending=False)
        .reset_index(drop=True)
    )
