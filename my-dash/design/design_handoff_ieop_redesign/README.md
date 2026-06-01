# Handoff: IEOP — Redesign (Login · Cadastro · Dashboard · Rodapé)

## Visão geral
Redesign visual do **IEOP — Índice de Eficiência de Obras Públicas (Município de Macaé / RJ)**.
Define uma linguagem visual única — **"Painel Vivo"** — e a aplica em três telas
(`/login`, `/register`, `/` Dashboard), além de um favicon de marca e um rodapé assinado
"team Serena".

O alvo é o repositório **`duopen-frontend` (my-dash/)** — React + TypeScript, CSS Modules,
React Router, React Query, Recharts. Os tokens usados aqui são **os mesmos** de
`src/styles/tokens.css`, então a adaptação é incremental, não uma reescrita.

---

## Sobre os arquivos deste pacote
Os arquivos em `design_files/` são **referências de design feitas em HTML/React (Babel inline)** —
protótipos que mostram a aparência e o comportamento pretendidos, **não código de produção
para copiar diretamente**.

A tarefa é **recriar estes designs no ambiente já existente do `duopen-frontend`**:
componentes `.tsx` + CSS Modules, usando os padrões, libs (Recharts, React Router) e a
arquitetura de pastas que o projeto já tem. Use os valores exatos (cores, tipografia,
espaçamentos) documentados abaixo.

## Fidelidade
**Alta fidelidade (hi-fi).** Cores, tipografia, espaçamentos e interações são finais.
Recrie a UI fielmente usando as libs e o design system que o codebase já possui.

---

## Telas

### 1. Login → `src/auth/LoginPage.tsx` (+ `authForm.module.css`)
Mock: `design_files/login/` (apenas o **Conceito A — "Painel Vivo"**; os conceitos B e C
foram descartados pelo time).

- **Propósito:** autenticação. Mantém os campos atuais (e-mail, senha) e o fluxo existente
  (react-hook-form + zod, `loginSchema`).
- **Layout:** split em duas colunas, viewport cheio (`100vh`).
  - **Esquerda (~58%) — painel vivo:** fundo `radial-gradient(120% 120% at 18% 12%, #1a2233 0%, #0f1117 58%)`,
    grid sutil mascarado, e um "glow" verde que deriva lentamente. Conteúdo (de cima p/ baixo):
    1. Tagline pequena "Índice de Eficiência de Obras Públicas" (`#555b72`, 0.72rem).
    2. Bloco herói: eyebrow mono "ESTADO DO RIO DE JANEIRO" + headline 2.05rem/700
       "Cada obra pública, *medida* e classificada." (palavra "medida" em `#1D9E75`).
    3. Medidor circular (gauge) 150px com a média IEOP (ex.: 73,4 / "Bom") + legenda das 5 classes.
    4. "Obras" como pontos coloridos por classe, flutuando (animação `float`, 7s).
    5. Ticker inferior com 3 stats (obras monitoradas, IEOP médio, em risco crítico).
  - **Direita (~42%) — formulário:** `background: var(--color-surface)`, centralizado, max-width ~380px.
    1. **Lockup de marca no topo da box** (emblema + "IEOP" + "Eficiência de Obras Públicas · RJ"),
       com divisória inferior (`1px solid var(--color-border)`).
    2. Título "Acesse o painel" + subtítulo.
    3. Campos e-mail / senha (com ícone à esquerda).
    4. **Botão de mostrar/ocultar senha** (ícone de olho à direita do campo — ver Interações).
    5. Botão primário "Entrar →" (verde, full-width).
    6. Indicador "conexão segura · dados.gov.br" com ponto pulsante.
    7. Rodapé "Não tem conta? Solicite acesso".

### 2. Cadastro → `src/auth/RegisterPage.tsx`
Mock: `design_files/IEOP Cadastro.html` + `design_files/cadastro/`.

- **Propósito:** criar conta. Mantém os campos reais do `registerSchema`:
  `nome, email, perfil, password, confirm`.
- **Layout:** mesmo split do login. Esquerda reusa o painel vivo (headline trocada para
  "Faça parte do *controle* das obras públicas."). Direita = formulário de cadastro, max-width 400px.
- **Componentes específicos:**
  - **Nome** (ícone usuário) e **E-mail institucional** (ícone envelope).
  - **Perfil de acesso = 3 cards selecionáveis** (NÃO um `<select>`), em grid de 3 colunas.
    Cada card: ícone + nome + descrição curta. Valores reais (de `auth.schema.ts` + `permissions.ts`):
    - `admin` — "Administrador" — "Acesso total · re-treino ML" (ícone coroa)
    - `gestor` — "Gestor" — "Dashboard e consultas IA" (ícone escudo) — **default selecionado**
    - `readonly` — "Somente leitura" — "Apenas visualização" (ícone olho)
    - Card ativo: `border-color: var(--color-success)`, `background: var(--color-success-bg)`,
      `box-shadow: 0 0 0 3px rgba(29,158,117,0.12)`, ícone tingido de verde, check no canto sup. direito.
  - **Senha** e **Confirmar senha** lado a lado (grid 2 colunas), ambos com toggle de olho.
  - **Medidor de força da senha** (4 barras) + texto "Força da senha: <nível>".
    Score 0–4 por comprimento (≥6, ≥10), maiúsc+minúsc, dígito+símbolo. Cores: Fraca `#A32D2D`,
    Razoável `#BA7517`, Boa `#3FB984`, Forte `#1D9E75`. Se `confirm !== password` → texto vermelho
    "As senhas não coincidem" e borda `--color-danger-border` no campo confirmar.
  - Botão "Criar conta →". Rodapé "Já tem conta? Entrar" + linha de Termos/Privacidade.

### 3. Dashboard → `src/pages/Dashboard.tsx` + `src/components/PageLayout.tsx` + `src/features/dashboard/*`
Mock: `design_files/IEOP Dashboard.html` + `design_files/dashboard/`.

- **Propósito:** painel analítico municipal (Macaé). Mesmos dados/queries atuais
  (`useDashboardSummary`, `useIEOPStats`, `useTopAlerts`).
- **Sidebar (`PageLayout`)** — largura 250px:
  - Logo: emblema de marca + "IEOP" + "Macaé · RJ".
  - **Ícones SVG reais** (substituir os glifos unicode `◈ ◉ ◎ ✦ ◌ ◍` em `nav.ts`):
    Dashboard (grid), Obras (capacete), Fornecedores (maleta), Agente IA (sparkle),
    Mapa (pin), Mapa 3D (cubo). SVGs prontos em `design_files/dashboard/icons.jsx`.
  - Item ativo: `background: var(--color-success-bg)`, texto branco, ícone verde, **barra
    indicadora verde de 3px** à esquerda (`::before`). Mantém o filtro por perfil (readonly não vê IA).
  - Badge opcional de contagem à direita do item (ex.: Obras "342").
  - **Rodapé de usuário**: avatar (gradiente verde, iniciais), nome, perfil, botão sair.
- **Header (64px, sticky, blur):** breadcrumb "Macaé / Painel analítico" + título "Dashboard";
  à direita: status "atualizado há 2 min" (ponto pulsante), filtro de período segmentado
  (30 dias / 90 dias / 12 meses), botões de busca e notificações.
- **Conteúdo (grid, gap 20px):**
  1. **Herói IEOP (grid 1.5fr / 1fr):**
     - Card "Índice de Eficiência — Macaé": **gauge circular** (média 67,2 / classe "Bom"),
       faixas Crítico→Ótimo (a faixa ativa destacada), e os **4 componentes C·P·R·E**
       (Custo, Atraso, Recorrência, Execução) como mini-barras 0–100.
     - Card "Distribuição por classe IEOP": 5 barras verticais (Crítico, Ruim, Regular, Bom, Ótimo).
       *(No codebase isto já existe como `IEOPDistribuicao` usando Recharts — pode manter Recharts.)*
  2. **Métricas (4 cards):** Total de obras, Em andamento, Valor contratado, Média de execução —
     ícone, valor (mono), label e delta (▲/▼ %). Espelha `MetricCards.tsx`.
  3. **Grid 1fr/1fr:** "Risco de atraso — Top 5" (lista com rank, nome, secretaria, badge de %)
     + "Obras por status" (donut + legenda, 6 status).
  4. **Grid 1.3fr/1fr:** "Obras por secretaria" (barras horizontais) + "Evolução mensal"
     (linha: iniciadas sólida verde vs. concluídas tracejada cinza, com área).

### Rodapé "team Serena" (componente compartilhado — sugerido em `src/components/Footer.tsx`)
- Faixa centralizada: filetes + "CRAFTED WITH CARE BY" (mono, tracking largo) → nome
  **"team Serena ✦"** em gradiente verde animado (shimmer) com glow/drop-shadow e halo
  pulsante atrás → linha "IEOP · Índice de Eficiência de Obras Públicas · <ano>".
- CSS completo na seção `.serena-footer` de `design_files/dashboard/dashboard.css`.

---

## Interações & comportamento
- **Toggle de senha:** botão tipo "button" sobreposto à direita do input; alterna
  `type` password↔text; ícone olho ↔ olho-cortado; `aria-label`/`aria-pressed` atualizados;
  foco visível. Input ganha `padding-right` p/ não sobrepor o texto.
- **Cards de perfil:** clique seleciona (radio-like, exclusivo). Estado controla `perfil` no form.
- **Força da senha:** recalcula a cada tecla; barras e rótulo refletem o score.
- **Filtro de período (header):** segmentado, item ativo com fundo elevado. Liga em `setPeriod`.
- **Animações:** glow do painel (`drift` 18s), pontos de obra (`float` 7s), pulso "ao vivo"
  (2.4s), shimmer do rodapé (4.2s), halo do rodapé (`breathe` 5.5s), sparkles (`twinkle` 3.2s).
  Todas decorativas — degradáveis sem prejuízo funcional.

## Design tokens (idênticos a `src/styles/tokens.css`)
- **Semânticas:** success `#1D9E75` (bg `#0d2b21`, border `#1a6b50`),
  warning `#BA7517` (bg `#2b1e06`, border `#7a4e0f`), danger `#A32D2D` (bg `#2b0d0d`, border `#6e1e1e`).
- **Superfícies:** bg `#0f1117`, surface `#161b27`, surface2 `#1e2436`, border `#2a2f42`.
- **Texto:** primary `#e8eaf0`, secondary `#8b90a8`, muted `#555b72`.
- **Paleta IEOP (5 classes):** Ótimo `#1D9E75`, Bom `#3FB984`, Regular `#BA7517`,
  Ruim `#D2691E`, Crítico `#A32D2D` (igual a `features/dashboard/ieop.ts`).
- **Marca (emblema/gradiente):** `linear-gradient(135deg, #2FBE90, #168A63)`.
- **Tipografia:** Inter (sans) + JetBrains Mono (números, contratos, rótulos técnicos).
- **Raios:** sm 4 / md 8 / lg 12 / xl 16px. **Grid gap padrão:** 20px.

## Assets
- **`favicon.svg`** (em `design_files/favicon.svg`) — emblema de marca: tile verde gradiente +
  linha de tendência ascendente com ponto no pico. Colocar em `public/` e referenciar no `index.html`.
- **Ícones de navegação e UI:** SVGs inline (stroke = currentColor) em
  `design_files/dashboard/icons.jsx` e `design_files/login/icons.jsx`. Reimplementar como
  componentes `.tsx` ou usar uma lib de ícones equivalente (ex.: lucide-react — os traços batem).
- Fontes: Google Fonts (Inter, JetBrains Mono) — já no projeto.

## Arquivos deste pacote
```
design_files/
  IEOP Login Redesign.html      ← canvas com os 3 conceitos (usar só o A)
  IEOP Cadastro.html            ← tela de cadastro (Conceito A)
  IEOP Dashboard.html           ← dashboard de Macaé
  favicon.svg                   ← favicon de marca
  login/        (concepts.css, icons.jsx, concept-a.jsx, …)
  cadastro/     (cadastro.css, cadastro.jsx)
  dashboard/    (dashboard.css, dashboard.jsx, charts.jsx, icons.jsx, data.js)
```
> Observação: os dados em `dashboard/data.js` são **mock realista de Macaé** só para o
> protótipo. No app, manter as queries reais (`services/dashboard.ts`).
