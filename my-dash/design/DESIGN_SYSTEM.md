# IEOP · Design System — Conceitos do Layout

Documentação da linguagem visual do redesign do **IEOP — Índice de Eficiência de Obras Públicas** (Município de Macaé / RJ).
Serve como **base** para implementação no repositório `duopen-frontend` (React + TypeScript + CSS Modules) e para manter consistência em telas futuras.

> Os arquivos `.html` deste pacote são **referências de design** (protótipos em HTML/React inline). A implementação real deve recriá-los com os componentes `.tsx` + CSS Modules do projeto, usando os valores exatos abaixo. Os tokens aqui **são os mesmos** de `src/styles/tokens.css` — é adaptação, não reescrita.

---

## 1. Conceito central — "Painel Vivo"

O redesign trata o **IEOP como protagonista**: um índice de 0–100 que classifica cada obra pública. A linguagem visual:

- **Dramatiza o dado** — o índice ganha medidores (gauges), as obras viram pontos coloridos por classe, a distribuição vira gráfico-assinatura.
- **Separa cor de marca de cor semântica** — o verde da marca estrutura a navegação; as cores semânticas (verde/âmbar/vermelho/azul) comunicam o *significado* do dado.
- **Tema escuro, denso e técnico** — superfícies quase-pretas, números em fonte monoespaçada, hierarquia clara. "Sala de controle", não "site institucional".

---

## 2. Cores (tokens)

Idênticas a `src/styles/tokens.css`. Use sempre os tokens, nunca hex solto.

### Semânticas
| Token | Hex | Uso |
|---|---|---|
| `--color-success` | `#1D9E75` | sucesso, "Concluída", execução ≥70% |
| `--color-success-bg` / `-border` | `#0d2b21` / `#1a6b50` | fundo/borda de badges verdes |
| `--color-warning` | `#BA7517` | atenção, "Paralisada", execução 40–69% |
| `--color-warning-bg` / `-border` | `#2b1e06` / `#7a4e0f` | — |
| `--color-danger` | `#A32D2D` | crítico, "Atrasada/Cancelada", execução <40% |
| `--color-danger-bg` / `-border` | `#2b0d0d` / `#6e1e1e` | — |
| `--color-info` | `#3b82f6` | **"Em andamento"** (azul) |
| `--color-info-bg` / `-border` | `#0d1b2e` / `#1e4b8a` | — |

> ⚠️ **Atenção de implementação:** o badge "Em andamento" usa `--color-info*`. Garanta que esses tokens estejam definidos no `:root` — sem eles o badge renderiza sem fundo.

### Superfícies e texto
| Token | Hex |
|---|---|
| `--color-bg` | `#0f1117` |
| `--color-surface` | `#161b27` |
| `--color-surface2` | `#1e2436` |
| `--color-border` | `#2a2f42` |
| `--color-text-primary` | `#e8eaf0` |
| `--color-text-secondary` | `#8b90a8` |
| `--color-text-muted` | `#555b72` |

### Paleta IEOP (5 classes) — `features/dashboard/ieop.ts`
Classe por score: **Ótimo** ≥80 · **Bom** ≥60 · **Regular** ≥40 · **Ruim** ≥20 · **Crítico** <20.

| Classe | Hex |
|---|---|
| Ótimo | `#1D9E75` |
| Bom | `#3FB984` |
| Regular | `#BA7517` |
| Ruim | `#D2691E` |
| Crítico | `#A32D2D` |

Cada classe tem versões `bg` (translúcida ~16%) e `border` para os badges (ver `IEOP_COLORS`).

### Marca
- Emblema/gradiente: `linear-gradient(135deg, #2FBE90, #168A63)`.
- Texto shimmer do rodapé: `linear-gradient(100deg, #168A63, #2FBE90, #aeffdc, #2FBE90, #168A63)`.

---

## 3. Tipografia

- **Sans:** `Inter` (400/500/600/700/800) — textos, títulos, labels.
- **Mono:** `JetBrains Mono` (400/500/600/700) — **todo dado numérico**: scores, valores (R$), %, datas, contratos, CNPJ, coordenadas.

Regra de ouro: **número é mono**. Isso dá o tom "instrumento de medição" e alinha colunas.

| Papel | Tamanho | Peso |
|---|---|---|
| Título de página (header) | 1.05rem | 700 |
| H1 de tela (nome da obra/fornecedor) | 1.55rem | 700 |
| Valor-herói (IEOP, métrica) | 1.85–2.3rem | 700 (mono) |
| Título de card | 0.82rem | 600 (secondary) |
| Corpo / célula de tabela | 0.82–0.875rem | 400–500 |
| Label / eyebrow | 0.66–0.72rem | 600, `letter-spacing` 0.04–0.12em, uppercase |

---

## 4. Espaçamento, raios e sombras

- **Escala de spacing:** 4 / 8 / 12 / 16 / 20 / 24px (tokens `--space-*`).
- **Gap padrão de grid:** `20px`.
- **Padding de card:** `20px`.
- **Raios:** `--radius-sm: 4px` · `md: 8px` · `lg: 12px` (cards) · `xl: 16px` · `999px` (pílulas/badges).
- **Sombras:** `--shadow-md: 0 4px 12px rgba(0,0,0,0.5)` para flutuantes (tooltips, dropdowns).
- **Transições:** 120–160ms `ease` para hover; `cubic-bezier(0.16,1,0.3,1)` para entradas.

---

## 5. Layout — shell da aplicação

Todas as telas internas usam o mesmo shell (ver `dashboard/dashboard.css` + `shared/shell.jsx` → mapeia para `PageLayout.tsx`):

- **Sidebar (250px, fixa):** logo (emblema + "IEOP" + "Macaé · RJ") → nav agrupada (Principal / Relatórios) → rodapé de usuário (avatar, nome, perfil, sair).
  - **Item ativo:** fundo `--color-success-bg`, texto branco, ícone verde, **barra verde de 3px** à esquerda (`::before`). Separa "navegação" de "dado".
  - **Ícones SVG reais** (stroke = currentColor) substituem os glifos unicode (`◈ ◉ ◎`). Equivalentes em `lucide-react`.
  - Filtro por perfil: `readonly` não vê "Agente IA".
- **Header (64px, sticky, blur):** breadcrumb + título à esquerda; à direita período/ações/busca/notificações conforme a tela.
- **Conteúdo:** `padding: 24px 28px`; seções empilhadas com `gap: 20px`.

---

## 6. Componentes

### Badge de status (`Badge` + variants)
Pílula (`border-radius: 999px`), `0.72rem`/600. Variants → status:
- `info` (azul) = **Em andamento**
- `success` (verde) = Concluída
- `warning` (âmbar) = Paralisada
- `danger` (vermelho) = Atrasada / Cancelada
- `neutral` (cinza) = Não iniciada

### Badge IEOP
Pílula colorida pela classe (texto + bg translúcido + borda), acompanhada do score em mono. Ver `IEOPBadge.tsx`.

### Badge de risco
Derivado de `prob_atraso`: **Alto** ≥0.7 (danger) · **Médio** ≥0.4 (warning) · **Baixo** (success).

### Barra de execução
Trilho `--color-surface2` + preenchimento colorido por faixa (≥70 verde, ≥40 âmbar, <40 vermelho) + `%` em mono.

### Card
`background: --color-surface`, `border: 1px solid --color-border`, `radius-lg`, `padding 20px`. Título em `--color-text-secondary`.

### Gauge / medidores
- **Anel radial** (Predição ML, IEOP): círculo SVG com trilho + arco colorido, `stroke-linecap: round`, glow sutil (`drop-shadow`), valor no centro em mono. *(Preferir anel ao semicírculo.)*
- **Anel cônico** (IEOP do Dashboard): `conic-gradient(cor 0 X%, surface2 …)` com poço central.

### Tabela
Cabeçalho sticky, `th` uppercase `0.7rem` muted, ordenável (▲▼). Linhas com hover `--color-surface2`, clicáveis. Paginação no rodapé. Colunas de número à direita, em mono.

### Filtros
Painel `card` com busca (ícone à esquerda, foco verde), selects estilizados (seta SVG), toggle switch (verde quando ativo), e botão "Limpar filtros" fantasma.

### Chat (RAG)
Bolhas usuário (azul/info) vs. IA (surface2 + avatar gradiente). Respostas destacam números em verde-mono. **Cards de fonte** com título verde, trecho citado e barra de relevância %.

---

## 7. Gráficos (sem lib externa nos protótipos)

No protótipo são SVG/CSS à mão; **no app, manter Recharts** onde já existe (ex.: `IEOPDistribuicao`). Padrões visuais a respeitar:
- Grades tracejadas `#2a2f42`; eixos/labels `0.7rem` muted, mono.
- Linha de série principal: verde `#3FB984`, 2.2px, `round`; série secundária: cinza tracejado.
- Área sob a linha: gradiente da cor → transparente (~22% → 0).
- Barras: cantos superiores arredondados; cor semântica conforme o dado.
- Limiar de referência (ex.: risco 70%): linha tracejada vermelha.

---

## 8. Rodapé "team Serena"

Assinatura compartilhada (componente sugerido `Footer.tsx`): "CRAFTED WITH CARE BY" + **"team Serena ✦"** em gradiente verde com **shimmer** animado, glow/drop-shadow e halo pulsante. CSS na seção `.serena-footer` de `dashboard.css`. Decorativo e sóbrio — não compete com o dado.

---

## 9. Movimento

Animações **decorativas e degradáveis** (a UI funciona sem elas):
- Glow do painel de login (`drift` 18s), obras flutuando (`float` 7s).
- Pulso "ao vivo" no header (2.4s), pulso do pin de alto risco no mapa.
- Shimmer do rodapé (4.2s), halo (`breathe` 5.5s), sparkles (`twinkle` 3.2s).
- Anéis e barras animam o preenchimento na entrada (`cubic-bezier(0.16,1,0.3,1)`).

---

## 10. Acessibilidade / hit targets

- Toggle de senha, foco visível (outline verde), `aria-label`/`aria-pressed`.
- Alvos de toque ≥ 36px; contraste de texto adequado ao tema escuro.
- Status comunicado por **texto + cor** (nunca só cor).

---

## 11. Mapeamento telas → código

| Tela (protótipo) | Componente real | Pasta de design |
|---|---|---|
| Login | `auth/LoginPage.tsx` + `authForm.module.css` | `login/` |
| Cadastro | `auth/RegisterPage.tsx` | `cadastro/` |
| Dashboard | `pages/Dashboard.tsx` + `features/dashboard/*` | `dashboard/` |
| Obras | `pages/ObrasPage.tsx` + `components/Table` | `obras/` |
| Detalhe da Obra | `pages/ObraDetalhePage.tsx` + `features/obras/detalhe/*` | `detalhe/` |
| Fornecedores | `pages/FornecedoresPage.tsx` | `fornecedores/` |
| Perfil do Fornecedor | `pages/FornecedorPerfilPage.tsx` | `perfil/` |
| Agente IA | `pages/ChatPage.tsx` + `features/chat/*` | `chat/` |
| Mapa | `pages/MapaPage.tsx` + `features/mapa/*` (Leaflet) | `mapa/` |
| Shell (sidebar/header) | `components/PageLayout.tsx` + `nav.ts` | `shared/`, `dashboard/` |

> **Dados:** os arquivos `*/data.js` são **mock realista de Macaé** só para os protótipos. No app, manter as queries reais (`services/*`, React Query) e os schemas Zod.

> **Favicon:** `favicon.svg` (emblema da marca). Colocar em `public/` e referenciar no `index.html`.

---

## 12. Arquivos

```
IEOP — Índice.html            ← hub: abre todas as telas
favicon.svg                   ← emblema de marca

IEOP Login Redesign.html      · login/        (concepts.css, icons.jsx, concept-a/b/c.jsx, app.jsx)
IEOP Cadastro.html            · cadastro/      (cadastro.css, cadastro.jsx)
IEOP Dashboard.html           · dashboard/     (dashboard.css, dashboard.jsx, charts.jsx, icons.jsx, data.js)
IEOP Obras.html               · obras/         (obras.css, obras.jsx, data.js)
IEOP Detalhe da Obra.html     · detalhe/       (detalhe.css, detalhe.jsx, data.js)
IEOP Fornecedores.html        · fornecedores/  (fornecedores.jsx, data.js)
IEOP Fornecedor Perfil.html   · perfil/        (perfil.css, perfil.jsx, data.js)
IEOP Agente IA.html           · chat/          (chat.css, chat.jsx, data.js)
IEOP Mapa.html                · mapa/          (mapa.css, mapa.jsx, data.js)
shared/shell.jsx              ← sidebar, rodapé, badges e helpers compartilhados
```

*crafted with care by **team Serena ✦***
