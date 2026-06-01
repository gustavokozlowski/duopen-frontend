/* IEOP · Mapa de obras — composição */
const { useState, useMemo } = React;

const RISCOS = [
  { key: "todos", label: "Todos os riscos", cor: "#8b90a8" },
  { key: "alto", label: "Alto risco", cor: "#A32D2D" },
  { key: "medio", label: "Médio risco", cor: "#BA7517" },
  { key: "baixo", label: "Baixo risco", cor: "#1D9E75" },
];

function Pin({ o }) {
  const cor = RISCO_COLOR[o.risco];
  const st = STATUS[o.status];
  return (
    <div className={"mapa-pin " + o.risco} style={{ left: o.x + "%", top: o.y + "%" }}>
      <div className="mapa-pin-dot" style={{ background: cor }} />
      <div className="mapa-pin-tip">
        <div className="mapa-tip-nome">{o.nome}</div>
        <div className="mapa-tip-row"><span>{st.label}</span><span className="v" style={{ color: cor }}>{Math.round(o.prob_atraso * 100)}%</span></div>
        <div className="mapa-tip-row" style={{ marginTop: 2 }}><span>{o.secretaria}</span></div>
      </div>
    </div>
  );
}

function App() {
  const [risco, setRisco] = useState("todos");
  const [secretaria, setSecretaria] = useState("todas");
  const [status, setStatus] = useState("todos");

  const secretarias = useMemo(() => [...new Set(MAPA.map((o) => o.secretaria))].sort(), []);
  const filtradas = useMemo(() => MAPA.filter((o) => {
    if (risco !== "todos" && o.risco !== risco) return false;
    if (secretaria !== "todas" && o.secretaria !== secretaria) return false;
    if (status !== "todos" && o.status !== status) return false;
    return true;
  }), [risco, secretaria, status]);

  const countByRisco = (k) => k === "todos" ? MAPA.length : MAPA.filter((o) => o.risco === k).length;

  return (
    <div className="dash-root">
      <Sidebar active="mapa" />
      <div className="dash-main">
        <header className="dash-header">
          <div className="hd-left"><div className="hd-crumb">Macaé <span className="sep">/</span> Mapa</div><div className="hd-title">Mapa de obras</div></div>
          <div className="hd-right"><button className="btn-export"><DashIcons.Download /> Exportar CSV <span className="count">({filtradas.length})</span></button></div>
        </header>
        <main className="dash-content" style={{ paddingBottom: 24 }}>
          <div className="mapa-wrap">
            <div className="mapa-toolbar">
              <div className="mapa-toolbar-left"><span className="mapa-title">Mapa interativo — Macaé</span><span className="mapa-subtitle">{filtradas.length} obra{filtradas.length !== 1 ? "s" : ""} exibida{filtradas.length !== 1 ? "s" : ""} · pin colorido por nível de risco</span></div>
            </div>
            <div className="mapa-body">
              <div className="mapa-filters">
                <div>
                  <div className="mf-group-label">Nível de risco</div>
                  <div className="mf-radio-group">
                    {RISCOS.map((r) => (
                      <div key={r.key} className={"mf-radio" + (risco === r.key ? " active" : "")} onClick={() => setRisco(r.key)}>
                        <span className="mf-radio-dot" style={{ background: r.cor }} />{r.label}<span className="mf-radio-count">{countByRisco(r.key)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mf-group-label">Secretaria</div>
                  <select className="mf-select" value={secretaria} onChange={(e) => setSecretaria(e.target.value)}><option value="todas">Todas as secretarias</option>{secretarias.map((s) => <option key={s} value={s}>{s}</option>)}</select>
                </div>
                <div>
                  <div className="mf-group-label">Status</div>
                  <select className="mf-select" value={status} onChange={(e) => setStatus(e.target.value)}><option value="todos">Todos os status</option>{Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select>
                </div>
                <div className="mf-legend">
                  <div className="mf-group-label">Legenda</div>
                  <div className="mf-legend-item"><span className="mf-radio-dot" style={{ background: "#A32D2D" }} /> Alto risco de atraso (≥70%)</div>
                  <div className="mf-legend-item"><span className="mf-radio-dot" style={{ background: "#BA7517" }} /> Médio risco (40–69%)</div>
                  <div className="mf-legend-item"><span className="mf-radio-dot" style={{ background: "#1D9E75" }} /> Baixo risco (&lt;40%)</div>
                </div>
              </div>

              <div className="mapa-canvas">
                <div className="mapa-canvas-grid" />
                <div className="mapa-coast" />
                <div className="mapa-road" style={{ top: "40%", left: "-5%", width: "90%", height: "8px", transform: "rotate(-5deg)" }} />
                <div className="mapa-road" style={{ top: "0", left: "48%", width: "7px", height: "100%", transform: "rotate(6deg)" }} />
                <div className="mapa-road" style={{ top: "66%", left: "-5%", width: "85%", height: "5px", transform: "rotate(4deg)" }} />
                <div className="mapa-road" style={{ top: "0", left: "24%", width: "5px", height: "100%", transform: "rotate(-4deg)" }} />
                <span className="mapa-label" style={{ left: "6%", top: "14%" }}>Centro</span>
                <span className="mapa-label" style={{ left: "60%", top: "12%" }}>Cabiúnas</span>
                <span className="mapa-label" style={{ left: "30%", top: "85%" }}>Lagomar</span>
                <span className="mapa-label" style={{ right: "4%", top: "50%" }}>Oceano Atlântico</span>

                <div className="mapa-count"><div className="mapa-count-n">{filtradas.length}</div><div className="mapa-count-l">obras no mapa</div></div>
                {filtradas.map((o) => <Pin key={o.id} o={o} />)}
                <div className="mapa-zoom"><button aria-label="Mais zoom">+</button><button aria-label="Menos zoom">−</button></div>
              </div>
            </div>
          </div>
          <SerenaFooter />
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
