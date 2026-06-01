import pandas as pd
import plotly.express as px
import streamlit as st

st.set_page_config(page_title="Métricas", layout="wide")
st.title("Métricas de Aprendizado")

# Dados de exemplo — substituir por chamada à API
df = pd.DataFrame(
    {
        "dia": ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        "acertos": [12, 18, 15, 22, 19, 25, 20],
        "erros": [5, 3, 7, 2, 4, 1, 3],
    }
)

col1, col2, col3 = st.columns(3)
col1.metric("Total de acertos", df["acertos"].sum())
col2.metric("Total de erros", df["erros"].sum())
col3.metric(
    "Taxa de acerto", f"{df['acertos'].sum() / (df['acertos'].sum() + df['erros'].sum()):.0%}"
)

fig = px.bar(df, x="dia", y=["acertos", "erros"], barmode="group", title="Desempenho semanal")
st.plotly_chart(fig, use_container_width=True)
