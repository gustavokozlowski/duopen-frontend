/* IEOP · Shell compartilhado — Sidebar, Footer, Badge e helpers.
   Depende de window.DashIcons. Exporta tudo para window. */
const { useState: _useState, useMemo: _useMemo } = React;

/* ── helpers ── */
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

function riskFrom(p) { if (p >= 0.7) return { label: "Alto", variant: "danger" }; if (p >= 0.4) return { label: "Médio", variant: "warning" }; return { label: "Baixo", variant: "success" }; }
const RISCO_COLOR = { alto: "#A32D2D", medio: "#BA7517", baixo: "#1D9E75" };
function execColor(p) { return p >= 70 ? "#1D9E75" : p >= 40 ? "#BA7517" : "#A32D2D"; }
function brl(v) {
  if (v >= 1_000_000) return "R$ " + (v / 1_000_000).toFixed(1).replace(".", ",") + " mi";
  if (v >= 1_000) return "R$ " + (v / 1_000).toFixed(0) + " mil";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
}
function fmtDate(s) { if (!s) return "—"; const [y, m, d] = s.split("-"); return `${d}/${m}/${y.slice(2)}`; }
function maskCnpj(c) { const d = String(c).replace(/\D/g, ""); if (d.length !== 14) return c; return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8,12)}-${d.slice(12)}`; }

function Badge({ variant, children }) { return <span className={"badge " + variant}>{children}</span>; }

/* ── Sidebar ── */
const NAV = {
  principal: [
    { key: "dash", label: "Dashboard", Icon: DashIcons.Dashboard },
    { key: "obras", label: "Obras", Icon: DashIcons.Obras, badge: "342" },
    { key: "forn", label: "Fornecedores", Icon: DashIcons.Fornecedores },
    { key: "ia", label: "Agente IA", Icon: DashIcons.IA },
  ],
  relatorios: [
    { key: "mapa", label: "Mapa", Icon: DashIcons.Mapa },
    { key: "mapa3d", label: "Mapa 3D", Icon: DashIcons.Mapa3D },
  ],
};
function Sidebar({ active }) {
  const Item = ({ it }) => {
    const { Icon } = it;
    return (<a className={"sb-item" + (it.key === active ? " active" : "")} href="#" onClick={(e) => e.preventDefault()}><Icon />{it.label}{it.badge && <span className="sb-badge">{it.badge}</span>}</a>);
  };
  return (
    <aside className="dash-sidebar">
      <div className="sb-logo"><DashIcons.Logo s={36} /><div className="sb-logoText"><div className="sb-logoWord">IE<b>OP</b></div><div className="sb-logoSub">Macaé · RJ</div></div></div>
      <nav className="sb-nav">{NAV.principal.map((it) => <Item key={it.key} it={it} />)}<div className="sb-groupLabel">Relatórios</div>{NAV.relatorios.map((it) => <Item key={it.key} it={it} />)}</nav>
      <div className="sb-user"><div className="sb-avatar">GK</div><div className="sb-userInfo"><div className="sb-userName">Gustavo K.</div><div className="sb-userRole">Gestor</div></div><button className="sb-logout" aria-label="Sair"><DashIcons.Logout /></button></div>
    </aside>
  );
}

function SerenaFooter() {
  const Sparkle = ({ style }) => (<svg className="serena-spark" style={style} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0l2.4 7.2L21.6 9.6 14.4 12 12 19.2 9.6 12 2.4 9.6 9.6 7.2z" /></svg>);
  return (<footer className="serena-footer"><Sparkle style={{ left: "32%", top: "30%" }} /><Sparkle style={{ right: "33%", top: "40%", animationDelay: "1.1s" }} /><Sparkle style={{ left: "38%", bottom: "26%", animationDelay: "2.1s", width: 10, height: 10 }} /><div className="serena-line"><span className="serena-rule" /><span className="serena-by">crafted with care by</span><span className="serena-rule r" /></div><div className="serena-name">team Serena <span className="heart">✦</span></div><div className="serena-sub"><span className="dot" /> IEOP · Índice de Eficiência de Obras Públicas · {new Date().getFullYear()}</div></footer>);
}

Object.assign(window, { STATUS, IEOP_HEX, IEOP_BG, IEOP_BD, riskFrom, RISCO_COLOR, execColor, brl, fmtDate, maskCnpj, Badge, Sidebar, SerenaFooter });
