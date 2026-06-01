import pandas as pd
import streamlit as st

st.set_page_config(page_title="Mapa de Usuários", layout="wide")
st.title("Distribuição Geográfica de Usuários")

# Dados de exemplo — substituir por query ao Supabase
df = pd.DataFrame(
    {
        "lat": [-23.5505, -15.7801, -30.0346, -3.7172, -19.9167],
        "lon": [-46.6333, -47.9292, -51.2177, -38.5434, -43.9345],
        "cidade": ["São Paulo", "Brasília", "Porto Alegre", "Fortaleza", "Belo Horizonte"],
        "usuarios": [320, 180, 140, 110, 200],
    }
)

st.map(df, size="usuarios")
st.dataframe(df, use_container_width=True)
