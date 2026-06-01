/* IEOP · Fornecedores — ranking (lista + filtros + tabela ordenável) */
const { useState, useMemo } = React;

const F_COLS = [
  { key: "cnpj", header: "CNPJ", sortable: false },
  { key: "nome", header: "Razão Social", sortable: true },
  { key: "total_contratos", header: "Contratos", sortable: true },
  { key: "valor_total", header: "Valor Total", sortable: true },
  { key: "taxa_aditivo", header: "Taxa Aditivo", sortable: true },
  { key: "avg_prob_atraso", header: "Risco Médio", sortable: true },
  { key: "total_obras", header: "Total Obras", sortable: true },
];

const ALERTA = 0.3;

function FRow({ f }) {
  const taxaPct = f.taxa_aditivo * 100;
  const taxaColor = taxaPct > 30 ? "#e07a7a" : taxaPct > 15 ? "#d9a24e" : "#3FB984";
  const risk = riskFrom(f.avg_prob_atraso);
  return (
    <tr>
      <td><span style={{ fontFamily: "var(--font-mono)", fontSize: "0.74rem", color: "var(--color-text-muted)" }}>{maskCnpj(f.cnpj)}</span></td>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{f.nome}</span>
          {f.taxa_aditivo > ALERTA && <span className="alerta-badge" title="Taxa de aditivo elevada">⚠ Aditivos {Math.round(taxaPct)}%</span>}
        </div>
      </td>
      <td><span style={{ fontFamily: "var(--font-mono)" }}>{f.total_contratos}</span></td>
      <td><span className="cell-valor">{brl(f.valor_total)}</span></td>
      <td><span style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: taxaColor }}>{taxaPct.toFixed(1)}%</span></td>
      <td><Badge variant={risk.variant}>{risk.label}</Badge></td>
      <td><span style={{ fontFamily: "var(--font-mono)" }}>{f.total_obras}</span></td>
    </tr>
  );
}

function FornecedoresTable({ rows }) {
  const [sort, setSort] = useState({ key: "valor_total", dir: "desc" });
  const sorted = useMemo(() => {
    const arr = [...rows]; const { key, dir } = sort;
    arr.sort((a, b) => { let av = a[key], bv = b[key]; if (typeof av === "string") return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av); return dir === "asc" ? av - bv : bv - av; });
    return arr;
  }, [rows, sort]);
  const onSort = (k) => setSort((s) => ({ key: k, dir: s.key === k && s.dir === "asc" ? "desc" : "asc" }));
  const arrow = (k) => sort.key === k ? (sort.dir === "asc" ? "▲" : "▼") : "↕";
  return (
    <div className="table-card">
      <div className="table-scroll">
        <table className="obras-table" style={{ minWidth: 920 }}>
          <thead><tr>{F_COLS.map((c) => (<th key={c.key} className={c.sortable ? "sortable" : ""} onClick={() => c.sortable && onSort(c.key)}><span className="th-inner">{c.header}{c.sortable && <span className={"sort-arrow" + (sort.key === c.key ? "" : " idle")}>{arrow(c.key)}</span>}</span></th>))}</tr></thead>
          <tbody>{sorted.map((f) => <FRow key={f.id} f={f} />)}</tbody>
        </table>
      </div>
      <div className="table-foot"><span className="table-info">Mostrando <b>{sorted.length}</b> fornecedores</span></div>
    </div>
  );
}

const DEFAULT_FF = { search: "", somenteAlerta: false, risco: "todos" };

function App() {
  const [filter, setFilter] = useState(DEFAULT_FF);
  const set = (k, v) => setFilter((f) => ({ ...f, [k]: v }));
  const filtrados = useMemo(() => FORNECEDORES.filter((f) => {
    const q = filter.search.trim().toLowerCase();
    if (q && !(f.nome.toLowerCase().includes(q) || f.cnpj.includes(q.replace(/\D/g, "")))) return false;
    if (filter.somenteAlerta && f.taxa_aditivo <= ALERTA) return false;
    if (filter.risco !== "todos" && riskFrom(f.avg_prob_atraso).label.toLowerCase().replace("é", "e") !== filter.risco) return false;
    return true;
  }), [filter]);

  return (
    <div className="dash-root">
      <Sidebar active="forn" />
      <div className="dash-main">
        <header className="dash-header">
          <div className="hd-left"><div className="hd-crumb">Macaé <span className="sep">/</span> Fornecedores</div><div className="hd-title">Fornecedores</div></div>
          <div className="hd-right"><div className="hd-updated"><span className="live" /> {FORNECEDORES.length} fornecedores</div><button className="btn-export"><DashIcons.Download /> Exportar CSV <span className="count">({filtrados.length})</span></button></div>
        </header>
        <main className="dash-content">
          <div className="filters">
            <div className="filters-row">
              <div className="search-wrap"><DashIcons.Search /><input className="search-input" type="search" placeholder="Buscar por razão social ou CNPJ…" value={filter.search} onChange={(e) => set("search", e.target.value)} /></div>
              <label className="toggle-chip">
                <input type="checkbox" checked={filter.somenteAlerta} onChange={(e) => set("somenteAlerta", e.target.checked)} />
                <span className="toggle-track"><span className="toggle-knob" /></span>
                Só com alerta de aditivo
              </label>
              <select className="filter-select" value={filter.risco} onChange={(e) => set("risco", e.target.value)} aria-label="Risco">
                <option value="todos">Todos os riscos</option><option value="alto">Alto</option><option value="medio">Médio</option><option value="baixo">Baixo</option>
              </select>
            </div>
          </div>
          <FornecedoresTable rows={filtrados} />
          <SerenaFooter />
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
