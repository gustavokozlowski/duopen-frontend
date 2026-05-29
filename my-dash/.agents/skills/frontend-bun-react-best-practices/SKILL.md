---
name: frontend-bun-react-best-practices
description: "Melhores praticas para frontend com React + TypeScript usando Bun. Use para TDD, design patterns, clean code/architecture, design systems e conventional commits."
argument-hint: "Descreva a tarefa, area da UI e impacto esperado"
---

# Frontend Best Practices (React + TS + Bun)

## Quando usar
- Planejar e implementar features de UI com React/TypeScript
- Refatorar arquitetura, design system, ou padroes de componentes
- Preparar trabalho com TDD e qualidade de codigo
- Padronizar mensagens de commit com Conventional Commits

## Entrada esperada
- Objetivo da mudanca e criterios de aceite
- Area(s) afetada(s): UI, API, estilos, build, etc.
- Restricoes: prazo, compatibilidade, sem mudar stack de testes, etc.

## Procedimento
1. **Contexto e objetivos**
   - Reescreva o objetivo em 1-2 frases e liste criterios de aceite mensuraveis.
   - Identifique impacto em UX, performance, acessibilidade e API.

2. **Mapa de impacto**
   - Liste arquivos provaveis e pontos de entrada.
   - Consulte [AGENTS.md](../../../AGENTS.md) para comandos e convencoes do projeto.

3. **Arquitetura e design patterns**
   - Defina fronteiras de componentes (container vs presentational, hooks reutilizaveis).
   - Escolha padrao quando houver estado complexo (ex.: reducer, state machine) e justifique.
   - Para novos fluxos, mantenha o acoplamento minimo entre UI e dados.

4. **Design system**
   - Reuse tokens/estilos existentes antes de criar novos.
   - Se precisar de novo padrao visual, documente o motivo e o alcance.

5. **TDD (quando aplicavel)**
   - Escreva um teste falhando que cubra o criterio principal.
   - Implemente o minimo para passar; refatore com foco em clareza.
   - Stack recomendada: Vitest + React Testing Library.
   - Se ainda nao houver framework definido, alinhe antes de adicionar.

6. **Implementacao (clean code)**
   - Nomeie funcoes e componentes pelo comportamento, nao pela tecnologia.
   - Evite efeitos colaterais escondidos; prefira funcoes puras quando possivel.
   - Garanta tipagem explicita onde melhora a leitura do contrato.

7. **Qualidade e revisao**
   - Rode `bun dev` para validar fluxo; `bun build` quando mudar build/HTML.
   - Verifique erros de TypeScript e regressao visual basica.

8. **Commit (Conventional Commits)**
   - Use tipos: feat, fix, refactor, docs, chore, test, style, perf.
   - Descreva o impacto do usuario; use escopo quando relevante.

## Decisoes comuns
- **Novo componente vs hook**: extraia hook quando ha logica reutilizavel sem UI.
- **Estado local vs compartilhado**: mantenha local ate haver uso real em mais de um ponto.
- **CSS global**: preferir estilos existentes; adicione novos com parcimonia.

## Saidas esperadas
- Mudanca implementada com criterios de aceite atendidos
- Codigo legivel, tipado, e com impacto conhecido
- Commits padronizados

## Checklist pre-commit
- Fluxo principal validado no navegador (smoke test)
- Sem erros de TypeScript no editor
- `bun build` quando alterar HTML/build

## Exemplos de commits
- feat(ui): adiciona card de resumo no dashboard
- fix(api): trata erro 500 no carregamento inicial
- refactor(state): simplifica reducer de filtros
- test(ui): cobre fluxo de busca com RTL
- docs(readme): atualiza instrucoes de dev

## Referencias do projeto
- [README.md](../../../README.md)
- [package.json](../../../package.json)
- [bunfig.toml](../../../bunfig.toml)
- [src/index.ts](../../../src/index.ts)
- [src/frontend.tsx](../../../src/frontend.tsx)
- [src/index.css](../../../src/index.css)
