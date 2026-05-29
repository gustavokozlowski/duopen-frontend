# IEOP — Índice de Eficiência de Obras Públicas (RJ)

Dashboard analítico de eficiência de obras públicas no estado do Rio de Janeiro,
com dados do Portal de Dados Abertos ([dados.gov.br](https://dados.gov.br)).
O **IEOP** é um indicador quantitativo que avalia a eficiência de obras públicas
considerando **custo por metro quadrado**, **percentual de atraso** e **recorrência de obras**.

Duas interfaces no mesmo workspace:

| Pasta | Stack | Porta padrão |
|-------|-------|--------------|
| `src/` | React 19 + Bun | 3000 |
| `streamlit/` | Python + Streamlit | 8501 |

---

## Configuração de ambiente

```bash
cp .env.example .env
# edite .env com seus valores reais
```

| Variável | Descrição |
|----------|-----------|
| `BUN_PUBLIC_API_URL` | URL do backend (exposta ao React no browser) |
| `API_URL` | URL do backend (usada pelo Streamlit no servidor) |
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_ANON_KEY` | Chave anônima do Supabase |

---

## React + Bun

### Pré-requisitos

- [Bun](https://bun.sh) >= 1.3

### Instalação e dev

```bash
bun install
bun dev
```

Acesse [http://localhost:3000](http://localhost:3000). Hot-reload ativado.

O servidor Bun também atua como **proxy reverso**: requisições para `/proxy/*` são encaminhadas para `BUN_PUBLIC_API_URL`, evitando CORS em desenvolvimento.

### Build de produção

```bash
bun run build
bun start
```

---

## Streamlit

### Pré-requisitos

- Python >= 3.10

### Instalação e dev

```bash
cd streamlit
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
streamlit run app.py
```

Acesse [http://localhost:8501](http://localhost:8501).

### Páginas disponíveis

- **Métricas** — gráficos de desempenho semanal
- **Mapa** — distribuição geográfica de usuários
