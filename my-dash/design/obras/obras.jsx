/* IEOP · Obras — lista (shell + filtros + tabela ordenável + paginação) */
const { useState, useMemo } = React;

/* ── helpers (espelham obras.schema / ieop.ts / mapaUtils) ── */
const STATUS = {
  em_andamento: { label: "Em andamento", variant: "info" },
  concluida:    { label: "Concluída",    variant: "success" },
  paralisada:   { label: "Paralisada",   variant: "warning" },
  atrasada:     { label: "Atrasada",     variant: "danger" },
  nao_iniciada: { label: "Não iniciada", variant: "neutral" },
  cancelada:    { label: "Cancelada",    variant: "danger" },
};
const IEOP_HEX = { "Ótimo": "#1D9E75", "Bom": "#3FB984", "Regular": "#BA7517", "Ruim": "#D2691E", "Crítico": "#A32D2D", "—": "#555b72" };
const IEOP_BG  = { "Ótimo": "rgba(29,158,117,0.16)", "Bom": "rgba(63,185,132,0.16)", "Regular": "rgba(186,117,23,0.16)", "Ruim": "rgba(210,105,30,0.16)", "Crítico": "rgba(163,45,45,0.18)", "—": "rgba(85,91,114,0.15)" };
const IEOP_BD  = { "Ótimo": "#1a6b50", "Bom": "#2f8a63", "Regular": "#7a4e0f", "Ruim": "#8a4513", "Crítico": "#6e1e1e", "—": "#2a2f42" };

function ieopClasse(score) {
  if (score == null) return "—";
  if (score >= 80) return "Ótimo";
  if (score >= 60) return "Bom";
  if (score >= 40) return "Regular";
  if (score >= 20) return "Ruim";
  return "Crítico";
}
function riskFrom(prob) {
  if (prob >= 0.7) return { label: "Alto", variant: "danger" };
  if (prob >= 0.4) return { label: "Médio", variant: "warning" };
  return { label: "Baixo", variant: "success" };
}
function execColor(p) { return p >= 70 ? "#1D9E75" : p >= 40 ? "#BA7517" : "#A32D2D"; }
function brl(v) {
  if (v >= 1_000_000) return "R$ " + (v / 1_000_000).toFixed(1).replace(".", ",") + " mi";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
}
function fmtDate(s) {
  if (!s) return "—";
  const [y, m, d] = s.split("-");
  return `${d}/${m}/${y.slice(2)}`;
}

/* ── shell: sidebar ── */
const NAV_OBRAS = {
  principal: [
    { key: "dash", label: "Dashboard", Icon: DashIcons.Dashboard, badge: null },
    { key: "obras", label: "Obras", Icon: DashIcons.Obras, badge: "342", active: true },
    { key: "forn", label: "Fornecedores", Icon: DashIcons.Fornecedores, badge: null },
    { key: "ia", label: "Agente IA", Icon: DashIcons.IA, badge: null },
  ],
  relatorios: [
    { key: "mapa", label: "Mapa", Icon: DashIcons.Mapa, badge: null },
    { key: "mapa3d", label: "Mapa 3D", Icon: DashIcons.Mapa3D, badge: null },
  ],
};
function NavItem({ item }) {
  const { Icon } = item;
  return (
    <a className={"sb-item" + (item.active ? " active" : "")} href="#" onClick={(e) => e.preventDefault()}>
      <Icon />{item.label}{item.badge && <span className="sb-badge">{item.badge}</span>}
    </a>
  );
}
function Sidebar() {
  return (
    <aside className="dash-sidebar">
      <div className="sb-logo">
        <DashIcons.Logo s={36} />
        <div className="sb-logoText"><div className="sb-logoWord">IE<b>OP</b></div><div className="sb-logoSub">Macaé · RJ</div></div>
      </div>
      <nav className="sb-nav">
        {NAV_OBRAS.principal.map((it) => <NavItem key={it.key} item={it} />)}
        <div className="sb-groupLabel">Relatórios</div>
        {NAV_OBRAS.relatorios.map((it) => <NavItem key={it.key} item={it} />)}
      </nav>
      <div className="sb-user">
        <div className="sb-avatar">GK</div>
        <div className="sb-userInfo"><div className="sb-userName">Gustavo K.</div><div className="sb-userRole">Gestor</div></div>
        <button className="sb-logout" aria-label="Sair"><DashIcons.Logout /></button>
      </div>
    </aside>
  );
}

function SerenaFooter() {
  const Sparkle = ({ style }) => (
    <svg className="serena-spark" style={style} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0l2.4 7.2L21.6 9.6 14.4 12 12 19.2 9.6 12 2.4 9.6 9.6 7.2z" /></svg>
  );
  return (
    <footer className="serena-footer">
      <Sparkle style={{ left: "32%", top: "30%", animationDelay: "0s" }} />
      <Sparkle style={{ right: "33%", top: "40%", animationDelay: "1.1s" }} />
      <Sparkle style={{ left: "38%", bottom: "26%", animationDelay: "2.1s", width: 10, height: 10 }} />
      <div className="serena-line"><span className="serena-rule" /><span className="serena-by">crafted with care by</span><span className="serena-rule r" /></div>
      <div className="serena-name">team Serena <span className="heart">✦</span></div>
      <div className="serena-sub"><span className="dot" /> IEOP · Índice de Eficiência de Obras Públicas · {new Date().getFullYear()}</div>
    </footer>
  );
}

/* ── columns ── */
const COLS = [
  { key: "nome", header: "Obra / Contrato", sortable: true },
  { key: "secretaria", header: "Secretaria", sortable: true },
  { key: "bairro", header: "Bairro", sortable: true },
  { key: "status", header: "Status", sortable: true },
  { key: "execucao_percentual", header: "Execução", sortable: true },
  { key: "valor_contratado", header: "Valor", sortable: true },
  { key: "prob_atraso", header: "Risco", sortable: true },
  { key: "ieop_score", header: "IEOP", sortable: true },
  { key: "previsao_termino", header: "Previsão", sortable: true },
];

const DEFAULT_FILTER = { search: "", status: "todos", secretaria: "todas", bairro: "todos", risco: "todos" };

function Filters({ filter, setFilter, secretarias, bairros }) {
  const set = (k, v) => setFilter((f) => ({ ...f, [k]: v }));
  return (
    <div className="filters">
      <div className="filters-row">
        <div className="search-wrap">
          <DashIcons.Search />
          <input className="search-input" type="search" placeholder="Buscar por nome ou nº do contrato…"
            value={filter.search} onChange={(e) => set("search", e.target.value)} />
        </div>
        <button className="reset-btn" onClick={() => setFilter(DEFAULT_FILTER)}>Limpar filtros</button>
      </div>
      <div className="filters-row">
        <select className="filter-select" value={filter.status} onChange={(e) => set("status", e.target.value)} aria-label="Status">
          <option value="todos">Todos os status</option>
          {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select className="filter-select" value={filter.secretaria} onChange={(e) => set("secretaria", e.target.value)} aria-label="Secretaria">
          <option value="todas">Todas as secretarias</option>
          {secretarias.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="filter-select" value={filter.bairro} onChange={(e) => set("bairro", e.target.value)} aria-label="Bairro">
          <option value="todos">Todos os bairros</option>
          {bairros.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <select className="filter-select" value={filter.risco} onChange={(e) => set("risco", e.target.value)} aria-label="Risco">
          <option value="todos">Todos os riscos</option>
          <option value="alto">Alto</option>
          <option value="medio">Médio</option>
          <option value="baixo">Baixo</option>
        </select>
        <input className="date-input" type="date" aria-label="De" />
        <span className="date-sep">→</span>
        <input className="date-input" type="date" aria-label="Até" />
      </div>
    </div>
  );
}

function Badge({ variant, children }) { return <span className={"badge " + variant}>{children}</span>; }

function Row({ o }) {
  const st = STATUS[o.status];
  const risk = riskFrom(o.prob_atraso);
  const classe = ieopClasse(o.ieop_score);
  return (
    <tr>
      <td>
        <div className="cell-obra-name">{o.nome}</div>
        <div className="cell-obra-ct">{o.numero_contrato}</div>
      </td>
      <td>{o.secretaria}</td>
      <td>{o.bairro}</td>
      <td><Badge variant={st.variant}>{st.label}</Badge></td>
      <td>
        <div className="exec">
          <div className="exec-track"><div className="exec-fill" style={{ width: o.execucao_percentual + "%", background: execColor(o.execucao_percentual) }} /></div>
          <span className="exec-pct">{o.execucao_percentual}%</span>
        </div>
      </td>
      <td><span className="cell-valor">{brl(o.valor_contratado)}</span></td>
      <td><Badge variant={risk.variant}>{risk.label}</Badge></td>
      <td>
        <div className="ieop-cell">
          <span className="ieop-score" style={{ color: IEOP_HEX[classe] }}>{o.ieop_score != null ? o.ieop_score.toFixed(1) : "—"}</span>
          <span className="ieop-badge" style={{ color: IEOP_HEX[classe], background: IEOP_BG[classe], borderColor: IEOP_BD[classe] }}>{classe}</span>
        </div>
      </td>
      <td>{fmtDate(o.previsao_termino)}</td>
    </tr>
  );
}

function ObrasTable({ rows }) {
  const [sort, setSort] = useState({ key: "prob_atraso", dir: "desc" });
  const [page, setPage] = useState(0);
  const pageSize = 12;

  const sorted = useMemo(() => {
    const arr = [...rows];
    const { key, dir } = sort;
    arr.sort((a, b) => {
      let av = a[key], bv = b[key];
      if (av == null) av = -Infinity; if (bv == null) bv = -Infinity;
      if (typeof av === "string") return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      return dir === "asc" ? av - bv : bv - av;
    });
    return arr;
  }, [rows, sort]);

  const pages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const cur = Math.min(page, pages - 1);
  const slice = sorted.slice(cur * pageSize, cur * pageSize + pageSize);

  const onSort = (key) => { setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" })); setPage(0); };
  const arrow = (key) => sort.key === key ? (sort.dir === "asc" ? "▲" : "▼") : "↕";

  return (
    <div className="table-card">
      <div className="table-scroll">
        <table className="obras-table">
          <thead>
            <tr>
              {COLS.map((c) => (
                <th key={c.key} className={c.sortable ? "sortable" : ""} onClick={() => c.sortable && onSort(c.key)}>
                  <span className="th-inner">{c.header}{c.sortable && <span className={"sort-arrow" + (sort.key === c.key ? "" : " idle")}>{arrow(c.key)}</span>}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 ? (
              <tr><td colSpan={COLS.length} style={{ textAlign: "center", padding: "40px", color: "var(--color-text-muted)" }}>Nenhuma obra encontrada com os filtros aplicados.</td></tr>
            ) : slice.map((o) => <Row key={o.id} o={o} />)}
          </tbody>
        </table>
      </div>
      <div className="table-foot">
        <span className="table-info">Mostrando <b>{slice.length}</b> de <b>{sorted.length}</b> obras</span>
        <div className="pager">
          <button className="pager-btn" disabled={cur === 0} onClick={() => setPage(cur - 1)}>‹</button>
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} className={"pager-btn" + (i === cur ? " active" : "")} onClick={() => setPage(i)}>{i + 1}</button>
          ))}
          <button className="pager-btn" disabled={cur >= pages - 1} onClick={() => setPage(cur + 1)}>›</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const secretarias = useMemo(() => [...new Set(OBRAS.map((o) => o.secretaria))].sort(), []);
  const bairros = useMemo(() => [...new Set(OBRAS.map((o) => o.bairro))].sort(), []);

  const filtradas = useMemo(() => OBRAS.filter((o) => {
    const q = filter.search.trim().toLowerCase();
    if (q && !(o.nome.toLowerCase().includes(q) || o.numero_contrato.toLowerCase().includes(q))) return false;
    if (filter.status !== "todos" && o.status !== filter.status) return false;
    if (filter.secretaria !== "todas" && o.secretaria !== filter.secretaria) return false;
    if (filter.bairro !== "todos" && o.bairro !== filter.bairro) return false;
    if (filter.risco !== "todos" && riskFrom(o.prob_atraso).label.toLowerCase().replace("é", "e") !== filter.risco) return false;
    return true;
  }), [filter]);

  return (
    <div className="dash-root">
      <Sidebar />
      <div className="dash-main">
        <header className="dash-header">
          <div className="hd-left">
            <div className="hd-crumb">Macaé <span className="sep">/</span> Obras</div>
            <div className="hd-title">Obras</div>
          </div>
          <div className="hd-right">
            <div className="hd-updated"><span className="live" /> {OBRAS.length} obras no município</div>
            <button className="btn-export"><DashIcons.Download /> Exportar CSV <span className="count">({filtradas.length})</span></button>
          </div>
        </header>
        <main className="dash-content">
          <Filters filter={filter} setFilter={setFilter} secretarias={secretarias} bairros={bairros} />
          <ObrasTable rows={filtradas} />
          <SerenaFooter />
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
