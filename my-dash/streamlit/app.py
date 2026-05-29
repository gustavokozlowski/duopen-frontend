import os
import streamlit as st

st.set_page_config(
    page_title="DuoOpen Dashboard",
    page_icon="🎓",
    layout="wide",
)

API_URL = os.getenv("API_URL", "http://localhost:3000")
SUPABASE_URL = os.getenv("SUPABASE_URL", "")

st.title("DuoOpen Dashboard")
st.markdown("Selecione uma página no menu lateral para começar.")

col1, col2 = st.columns(2)
with col1:
    st.info(f"**API URL:** `{API_URL}`")
with col2:
    st.info(f"**Supabase:** `{SUPABASE_URL or 'não configurado'}`")
