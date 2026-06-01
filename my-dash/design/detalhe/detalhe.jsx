/* IEOP · Detalhe da Obra — shell + composição */
const { useState } = React;

/* helpers */
const STATUS = {
  em_andamento: { label: "Em andamento", variant: "info" },
  concluida: { label: "Concluída", variant: "success" },
  paralisada: { label: "Paralisada", variant: "warning" },
  atrasada: { label: "Atrasada", variant: "danger" },
  nao_iniciada: { label: "Não iniciada", variant: "neutral" },
  cancelada: { label: "Cancelada", variant: "danger" },
};
const IEOP_HEX = { "Ótimo": "#1D9E75", "Bom": "#3FB984", "Regular": "#BA7517", "Ruim": "#D2691E", "Crítico": "#A32D2D", "—": "#555b72" };
const IEOP_BG = { "Ótimo": "rgba(29,158,117,0.16)", "Bom": "rgba(63,185,132,0.16)", "Regular": "rgba(186,117,23,0.16)", "Ruim": "rgba(210,105,30,0.16)", "Crítico": "rgba(163,45,45,0.18)", "—": "rgba(85,91,114,0.15)" };
const IEOP_BD = { "Ótimo": "#1a6b50", "Bom": "#2f8a63", "Regular": "#7a4e0f", "Ruim": "#8a4513", "Crítico": "#6e1e1e", "—": "#2a2f42" };
function ieopColor(s) { if (s == null) return "#555b72"; if (s >= 80) return "#1D9E75"; if (s >= 60) return "#3FB984"; if (s >= 40) return "#BA7517"; if (s >= 20) return "#D2691E"; return "#A32D2D"; }
function riskFrom(p) { if (p >= 0.7) return { label: "Alto", variant: "danger" }; if (p >= 0.4) return { label: "Médio", variant: "warning" }; return { label: "Baixo", variant: "success" }; }
function execColor(p) { return p >= 70 ? "#1D9E75" : p >= 40 ? "#BA7517" : "#A32D2D"; }
function brl(v) { return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: v >= 1_000_000 ? 1 : 0, notation: v >= 1_000_000 ? "compact" : "standard" }).format(v).replace("mil", "mil").replace("milhões", "mi").replace("milhão", "mi"); }
function fmtDate(s) { if (!s) return "—"; const [y, m, d] = s.split("-"); return `${d}/${m}/${y}`; }
function fmtDateTime(iso) { try { return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }); } catch { return iso; } }
function maskCnpj(c) { const d = c.replace(/\D/g, ""); if (d.length !== 14) return c; return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8,12)}-${d.slice(12)}`; }
const ADITIVO_LABELS = { prazo: "Prazo", valor: "Valor", ambos: "Prazo e Valor" };

function Badge({ variant, children }) { return <span className={"badge " + variant}>{children}</span>; }

/* ── shell ── */
const NAV = {
  principal: [
    { key: "dash", label: "Dashboard", Icon: DashIcons.Dashboard },
    { key: "obras", label: "Obras", Icon: DashIcons.Obras, badge: "342", active: true },
    { key: "forn", label: "Fornecedores", Icon: DashIcons.Fornecedores },
    { key: "ia", label: "Agente IA", Icon: DashIcons.IA },
  ],
  relatorios: [
    { key: "mapa", label: "Mapa", Icon: DashIcons.Mapa },
    { key: "mapa3d", label: "Mapa 3D", Icon: DashIcons.Mapa3D },
  ],
};
function NavItem({ item }) { const { Icon } = item; return (<a className={"sb-item" + (item.active ? " active" : "")} href="#" onClick={(e) => e.preventDefault()}><Icon />{item.label}{item.badge && <span className="sb-badge">{item.badge}</span>}</a>); }
function Sidebar() {
  return (
    <aside className="dash-sidebar">
      <div className="sb-logo"><DashIcons.Logo s={36} /><div className="sb-logoText"><div className="sb-logoWord">IE<b>OP</b></div><div className="sb-logoSub">Macaé · RJ</div></div></div>
      <nav className="sb-nav">{NAV.principal.map((it) => <NavItem key={it.key} item={it} />)}<div className="sb-groupLabel">Relatórios</div>{NAV.relatorios.map((it) => <NavItem key={it.key} item={it} />)}</nav>
      <div className="sb-user"><div className="sb-avatar">GK</div><div className="sb-userInfo"><div className="sb-userName">Gustavo K.</div><div className="sb-userRole">Gestor</div></div><button className="sb-logout" aria-label="Sair"><DashIcons.Logout /></button></div>
    </aside>
  );
}
function SerenaFooter() {
  const Sparkle = ({ style }) => (<svg className="serena-spark" style={style} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0l2.4 7.2L21.6 9.6 14.4 12 12 19.2 9.6 12 2.4 9.6 9.6 7.2z" /></svg>);
  return (<footer className="serena-footer"><Sparkle style={{ left: "32%", top: "30%" }} /><Sparkle style={{ right: "33%", top: "40%", animationDelay: "1.1s" }} /><Sparkle style={{ left: "38%", bottom: "26%", animationDelay: "2.1s", width: 10, height: 10 }} /><div className="serena-line"><span className="serena-rule" /><span className="serena-by">crafted with care by</span><span className="serena-rule r" /></div><div className="serena-name">team Serena <span className="heart">✦</span></div><div className="serena-sub"><span className="dot" /> IEOP · Índice de Eficiência de Obras Públicas · {new Date().getFullYear()}</div></footer>);
}

/* ── Header ── */
function HeaderObra({ obra }) {
  const st = STATUS[obra.status];
  const risk = riskFrom(obra.predicao.prob_atraso);
  const classe = obra.ieop_classe ?? "—";
  return (
    <div className="det-header">
      <button className="det-back"><DashIcons.ArrowLeft /> Obras</button>
      <h1 className="det-nome">{obra.nome}</h1>
      <div className="det-meta">
        <Badge variant={st.variant}>{st.label}</Badge>
        <Badge variant={risk.variant}>Risco {risk.label}</Badge>
        {obra.ieop_score != null && (
          <span className="ieop-inline">
            <span className="sc" style={{ color: ieopColor(obra.ieop_score) }}>{obra.ieop_score.toFixed(2)}</span>
            <span className="ieop-badge" style={{ color: IEOP_HEX[classe], background: IEOP_BG[classe], borderColor: IEOP_BD[classe] }}>{classe}</span>
          </span>
        )}
        <span className="det-divider" />
        <span className="det-secretaria">{obra.secretaria}</span>
        <span className="det-divider" />
        <span className="det-contrato">{obra.numero_contrato}</span>
      </div>
    </div>
  );
}

/* ── Card Execução ── */
function CardExecucao({ obra }) {
  const total = obra.valor_contratado + obra.valor_aditivos;
  const pct = Math.min(obra.execucao_percentual, 100);
  return (
    <div className="card">
      <div className="card-title">Execução</div>
      <div className="exec-pct-row"><span className="exec-pct-value" style={{ color: execColor(pct) }}>{pct.toFixed(1)}%</span><span className="exec-pct-label">executado</span></div>
      <div className="det-bar"><div className="det-bar-fill" style={{ width: pct + "%", background: execColor(pct) }} /></div>
      <div className="val-table">
        <div className="val-row"><span className="val-label">Valor contratado</span><span className="val-amount">{brl(obra.valor_contratado)}</span></div>
        <div className="val-row"><span className="val-label">Aditivos</span><span className="val-amount">{brl(obra.valor_aditivos)}</span></div>
        <hr className="val-divider" />
        <div className="val-row total"><span className="val-label">Total</span><span className="val-amount">{brl(total)}</span></div>
      </div>
    </div>
  );
}

/* ── Card Datas ── */
function CardDatas({ obra }) {
  const d = obra.atraso_dias;
  const atraso = d > 0 ? <span className="atraso-pos">{d} {d === 1 ? "dia" : "dias"} de atraso</span> : d < 0 ? <span className="atraso-neg">{Math.abs(d)} dias adiantado</span> : <span className="atraso-zero">No prazo</span>;
  return (
    <div className="card">
      <div className="card-title">Datas</div>
      <div className="date-row"><span className="date-label">Início</span><span className="date-value">{fmtDate(obra.data_inicio)}</span></div>
      <div className="date-row"><span className="date-label">Previsão de término</span><span className="date-value">{fmtDate(obra.previsao_termino)}</span></div>
      <div className="date-row"><span className="date-label">Situação</span>{atraso}</div>
    </div>
  );
}

/* ── Radial ring gauge (sucinto + elegante) ── */
function Gauge({ value, label }) {
  const pct = Math.max(0, Math.min(1, value));
  const color = pct >= 0.7 ? "#A32D2D" : pct >= 0.4 ? "#BA7517" : "#1D9E75";
  const r = 42;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - pct);
  return (
    <div className="gauge-cell">
      <div className="gauge-ring">
        <svg viewBox="0 0 100 100" role="img" aria-label={`${label}: ${Math.round(pct * 100)}%`}>
          <circle className="gauge-ring-track" cx="50" cy="50" r={r} fill="none" strokeWidth="8" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={off}
            style={{ filter: `drop-shadow(0 0 5px ${color}66)`, transition: "stroke-dashoffset 600ms cubic-bezier(0.16,1,0.3,1)" }} />
        </svg>
        <div className="gauge-ring-center"><span className="gauge-ring-pct" style={{ color }}>{Math.round(pct * 100)}%</span></div>
      </div>
      <div className="gauge-cell-label">{label}</div>
    </div>
  );
}

/* ── Card Predição ML ── */
function CardPredicaoML({ predicao }) {
  return (
    <div className="card">
      <div className="card-title">Predição ML</div>
      <div className="gauges"><Gauge value={predicao.prob_atraso} label="Prob. atraso" /><Gauge value={predicao.prob_estouro} label="Prob. estouro" /></div>
      <div className="pred-updated">Atualizado em {fmtDateTime(predicao.ultima_atualizacao)}</div>
      {predicao.fatores_risco.length > 0 && (<>
        <div className="factors-title">Fatores de risco identificados</div>
        <ul className="factors-list">{predicao.fatores_risco.map((f, i) => (<li key={i} className="factor-item"><span className="factor-dot" />{f}</li>))}</ul>
      </>)}
    </div>
  );
}

/* ── Contratos (accordion) ── */
function ContratoSection({ contratos }) {
  const [open, setOpen] = useState(new Set(["c1"]));
  const toggle = (id) => setOpen((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  return (
    <div className="card">
      <div className="contrato-sec-head"><span className="contrato-sec-title">Contratos vinculados</span><span className="contrato-sec-count">{contratos.length} {contratos.length === 1 ? "contrato" : "contratos"}</span></div>
      {contratos.map((c) => {
        const isOpen = open.has(c.id);
        const totalAd = c.aditivos.reduce((s, a) => s + a.valor, 0);
        return (
          <div className="contrato" key={c.id}>
            <div className="contrato-head" onClick={() => toggle(c.id)} role="button" tabIndex={0}>
              <span className={"chevron" + (isOpen ? " open" : "")}>›</span>
              <span className="contrato-num">{c.numero}</span>
              <span className="contrato-objeto" title={c.objeto}>{c.objeto}</span>
              <span className="contrato-valor">{brl(c.valor_inicial + totalAd)}</span>
              <span className="contrato-aditivos-n">{c.aditivos.length} {c.aditivos.length === 1 ? "aditivo" : "aditivos"}</span>
            </div>
            {isOpen && (
              <div className="aditivos-body">
                {c.aditivos.length === 0 ? (<div className="aditivo-empty">Nenhum aditivo.</div>) : (<>
                  <div className="aditivo-head"><span>Número</span><span>Tipo</span><span>Motivo</span><span>Valor</span><span>Prazo</span><span>Data</span></div>
                  {c.aditivos.map((a) => (<div className="aditivo-row" key={a.id}><span className="aditivo-num">{a.numero}</span><span>{ADITIVO_LABELS[a.tipo]}</span><span className="aditivo-motivo" title={a.motivo}>{a.motivo}</span><span>{a.valor > 0 ? brl(a.valor) : "—"}</span><span>{a.prazo_dias > 0 ? `+${a.prazo_dias}d` : "—"}</span><span>{fmtDate(a.data)}</span></div>))}
                </>)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Card IEOP (sidebar) ── */
const COMPONENTES = [
  { label: "Custo", key: "ieop_custo" },
  { label: "Prazo", key: "ieop_atraso" },
  { label: "Recorrência", key: "ieop_recorrencia" },
  { label: "Execução", key: "ieop_execucao" },
];
function CardIEOP({ obra }) {
  const classe = obra.ieop_classe ?? "—";
  return (
    <div className="card">
      <div className="card-title">IEOP — Eficiência da obra</div>
      <div className="ieop-score-row">
        <span className="ieop-score-big" style={{ color: ieopColor(obra.ieop_score) }}>{obra.ieop_score.toFixed(2)}</span>
        <span className="ieop-badge" style={{ color: IEOP_HEX[classe], background: IEOP_BG[classe], borderColor: IEOP_BD[classe], padding: "4px 12px", fontSize: "0.78rem" }}>{classe}</span>
      </div>
      <div className="ieop-comps2">
        {COMPONENTES.map(({ label, key }) => {
          const v = obra[key];
          const w = v != null ? Math.min(100, Math.max(0, v)) : 0;
          return (<div className="ieop-row2" key={key}><span className="ieop-row2-label">{label}</span><div className="ieop-row2-track"><div className="ieop-row2-fill" style={{ width: w + "%", background: ieopColor(v) }} /></div><span className="ieop-row2-val">{v != null ? v.toFixed(0) : "—"}</span></div>);
        })}
      </div>
      {obra.ieop_calculado_em && <div className="ieop-updated">Calculado em {fmtDateTime(obra.ieop_calculado_em)}</div>}
    </div>
  );
}

/* ── Mini Mapa ── */
function MiniMapa({ obra }) {
  const risk = riskFrom(obra.predicao.prob_atraso);
  const pinColor = risk.variant === "danger" ? "#A32D2D" : risk.variant === "warning" ? "#BA7517" : "#1D9E75";
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div className="minimapa">
        <div className="minimapa-grid" />
        <div className="minimapa-road r1" /><div className="minimapa-road r2" /><div className="minimapa-road r3" />
        <div className="minimapa-pin"><div className="minimapa-pin-pulse" /><div className="minimapa-pin-dot" style={{ background: pinColor }} /></div>
        <div className="minimapa-addr"><span>{obra.endereco}</span><span className="minimapa-coords">{obra.lat.toFixed(4)}, {obra.lng.toFixed(4)}</span></div>
      </div>
    </div>
  );
}

/* ── Card Fornecedor ── */
function CardFornecedor({ fornecedor }) {
  return (
    <div className="card">
      <div className="card-title">Fornecedor</div>
      <div className="forn-nome">{fornecedor.nome}</div>
      <div className="forn-row"><span className="forn-label">CNPJ</span><span className="forn-value cnpj">{maskCnpj(fornecedor.cnpj)}</span></div>
      {fornecedor.email && <div className="forn-row"><span className="forn-label">E-mail</span><span className="forn-value">{fornecedor.email}</span></div>}
      {fornecedor.telefone && <div className="forn-row"><span className="forn-label">Telefone</span><span className="forn-value">{fornecedor.telefone}</span></div>}
      {(fornecedor.cidade || fornecedor.estado) && <div className="forn-row"><span className="forn-label">Sede</span><span className="forn-value">{[fornecedor.cidade, fornecedor.estado].filter(Boolean).join(" — ")}</span></div>}
      <a className="forn-link" href="#" onClick={(e) => e.preventDefault()}>Ver perfil completo <DashIcons.ArrowRight /></a>
    </div>
  );
}

function App() {
  const obra = OBRA_DETALHE;
  return (
    <div className="dash-root">
      <Sidebar />
      <div className="dash-main">
        <header className="dash-header">
          <div className="hd-left"><div className="hd-crumb">Macaé <span className="sep">/</span> Obras <span className="sep">/</span> Detalhe</div><div className="hd-title">Detalhe da obra</div></div>
          <div className="hd-right"><button className="hd-iconBtn" aria-label="Buscar"><DashIcons.Search /></button><button className="hd-iconBtn" aria-label="Notificações"><DashIcons.Bell /></button></div>
        </header>
        <main className="dash-content">
          <HeaderObra obra={obra} />
          <div className="det-grid3"><CardExecucao obra={obra} /><CardDatas obra={obra} /><CardPredicaoML predicao={obra.predicao} /></div>
          <div className="det-grid-bottom">
            <ContratoSection contratos={obra.contratos} />
            <div className="det-sidebar"><CardIEOP obra={obra} /><MiniMapa obra={obra} /><CardFornecedor fornecedor={obra.fornecedor} /></div>
          </div>
          <SerenaFooter />
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
