/* IEOP Dashboard — page composition (Município de Macaé) */
const { useState } = React;

const NAV = {
  principal: [
    { key: "dash", label: "Dashboard", Icon: DashIcons.Dashboard, badge: null, active: true },
    { key: "obras", label: "Obras", Icon: DashIcons.Obras, badge: "342" },
    { key: "forn", label: "Fornecedores", Icon: DashIcons.Fornecedores, badge: null },
    { key: "ia", label: "Agente IA", Icon: DashIcons.IA, badge: null },
  ],
  relatorios: [
    { key: "mapa", label: "Mapa", Icon: DashIcons.Mapa, badge: null },
    { key: "mapa3d", label: "Mapa 3D", Icon: DashIcons.Mapa3D, badge: null },
  ],
};

function brl(v) {
  if (v >= 1_000_000) return "R$ " + (v / 1_000_000).toFixed(1).replace(".", ",") + " mi";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
}

function NavItem({ item }) {
  const { Icon } = item;
  return (
    <a className={"sb-item" + (item.active ? " active" : "")} href="#" onClick={(e) => e.preventDefault()}>
      <Icon />
      {item.label}
      {item.badge && <span className="sb-badge">{item.badge}</span>}
    </a>
  );
}

function Sidebar() {
  return (
    <aside className="dash-sidebar">
      <div className="sb-logo">
        <DashIcons.Logo s={36} />
        <div className="sb-logoText">
          <div className="sb-logoWord">IE<b>OP</b></div>
          <div className="sb-logoSub">Macaé · RJ</div>
        </div>
      </div>
      <nav className="sb-nav">
        {NAV.principal.map((it) => <NavItem key={it.key} item={it} />)}
        <div className="sb-groupLabel">Relatórios</div>
        {NAV.relatorios.map((it) => <NavItem key={it.key} item={it} />)}
      </nav>
      <div className="sb-user">
        <div className="sb-avatar">GK</div>
        <div className="sb-userInfo">
          <div className="sb-userName">Gustavo K.</div>
          <div className="sb-userRole">Gestor</div>
        </div>
        <button className="sb-logout" aria-label="Sair"><DashIcons.Logout /></button>
      </div>
    </aside>
  );
}

function Header() {
  const [period, setPeriod] = useState("30");
  const periods = [{ k: "30", l: "30 dias" }, { k: "90", l: "90 dias" }, { k: "365", l: "12 meses" }];
  return (
    <header className="dash-header">
      <div className="hd-left">
        <div className="hd-crumb">Macaé <span className="sep">/</span> Painel analítico</div>
        <div className="hd-title">Dashboard</div>
      </div>
      <div className="hd-right">
        <div className="hd-updated"><span className="live" /> atualizado há 2 min</div>
        <div className="hd-period">
          {periods.map((p) => (
            <button key={p.k} className={"hd-periodBtn" + (period === p.k ? " active" : "")} onClick={() => setPeriod(p.k)}>{p.l}</button>
          ))}
        </div>
        <button className="hd-iconBtn" aria-label="Buscar"><DashIcons.Search /></button>
        <button className="hd-iconBtn" aria-label="Notificações"><DashIcons.Bell /></button>
      </div>
    </header>
  );
}

const FAIXAS = [
  { nome: "Crítico", cor: "#A32D2D" },
  { nome: "Ruim", cor: "#D2691E" },
  { nome: "Regular", cor: "#BA7517" },
  { nome: "Bom", cor: "#3FB984" },
  { nome: "Ótimo", cor: "#1D9E75" },
];

function HeroIEOP() {
  const { ieop } = MACAE;
  const activeFaixa = "Bom";
  return (
    <div className="card hero-ieop">
      <div className="card-head">
        <span className="card-title">Índice de Eficiência — Macaé</span>
        <span className="card-sub">média municipal · 342 obras</span>
      </div>
      <div className="ieop-top">
        <IEOPGauge value={ieop.media_geral} color="#3FB984" label={ieop.classe_geral} />
        <div className="ieop-meta">
          <div className="ieop-metaTitle">Classe geral: {ieop.classe_geral}</div>
          <div className="ieop-metaSub">O IEOP combina quatro componentes — custo, atraso, recorrência e execução — num índice de 0 a 100 por obra.</div>
          <div className="ieop-faixas">
            {FAIXAS.map((f) => (
              <div key={f.nome} className={"ieop-faixa" + (f.nome === activeFaixa ? " on" : "")}>
                <div className="ieop-faixaBar" style={{ background: f.cor }} />
                <div className="ieop-faixaLbl">{f.nome}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ieop-comps">
        {ieop.componentes.map((c) => (
          <div className="comp" key={c.sig}>
            <div className="comp-head">
              <span className="comp-name"><span className="comp-sig">{c.sig}</span>{c.nome}</span>
              <span className="comp-val" style={{ color: c.cor }}>{c.valor}</span>
            </div>
            <div className="comp-track"><div className="comp-fill" style={{ width: c.valor + "%", background: c.cor }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClassDist() {
  const { ieop } = MACAE;
  const entries = FAIXAS.map((f) => ({ ...f, count: ieop.distribuicao[f.nome] ?? 0 }));
  const max = Math.max(...entries.map((e) => e.count));
  const total = entries.reduce((s, e) => s + e.count, 0);
  return (
    <div className="card">
      <div className="card-head">
        <span className="card-title">Distribuição por classe IEOP</span>
      </div>
      <div className="classdist">
        {entries.map((e) => (
          <div className="cd-col" key={e.nome}>
            <span className="cd-count" style={{ color: e.cor }}>{e.count}</span>
            <div className="cd-barWrap">
              <div className="cd-bar" style={{ height: (e.count / max * 100) + "%", background: e.cor }} />
            </div>
            <span className="cd-lbl">{e.nome}</span>
          </div>
        ))}
      </div>
      <div className="classdist-foot">
        <span>Obras classificadas</span>
        <span><b>{total}</b> de 342</span>
      </div>
    </div>
  );
}

function MetricCard({ icon, iconBg, iconColor, value, label, delta, dir }) {
  const Arrow = dir === "up" ? DashIcons.ArrowUp : DashIcons.ArrowDown;
  return (
    <div className="card metric">
      <div className="metric-top">
        <div className="metric-icon" style={{ background: iconBg, color: iconColor }}>{icon}</div>
        {delta && (
          <span className={"metric-delta " + dir}>
            <Arrow />{delta}
          </span>
        )}
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
    </div>
  );
}

function Metrics() {
  const { summary } = MACAE;
  return (
    <section className="grid-metrics">
      <MetricCard icon={<DashIcons.Building />} iconBg="rgba(138,144,168,0.12)" iconColor="#8b90a8"
        value={summary.total_obras.toLocaleString("pt-BR")} label="Total de obras" delta="3,2%" dir="up" />
      <MetricCard icon={<DashIcons.Activity />} iconBg="var(--color-success-bg)" iconColor="#3FB984"
        value={summary.obras_em_andamento.toLocaleString("pt-BR")} label="Em andamento" delta="5,1%" dir="up" />
      <MetricCard icon={<DashIcons.Money />} iconBg="var(--color-warning-bg)" iconColor="#BA7517"
        value={brl(summary.valor_total_contratado)} label="Valor contratado" delta="1,4%" dir="up" />
      <MetricCard icon={<DashIcons.Gauge />} iconBg="var(--color-warning-bg)" iconColor="#D2691E"
        value={summary.media_execucao.toFixed(1).replace(".", ",") + "%"} label="Média de execução" delta="0,8%" dir="down" />
    </section>
  );
}

function probClass(p) { return p >= 0.7 ? "high" : p >= 0.4 ? "medium" : "low"; }

function Alerts() {
  return (
    <div className="card">
      <div className="card-head">
        <span className="card-title">Risco de atraso</span>
        <span className="card-sub">Top 5 obras</span>
      </div>
      <div className="alert-list">
        {MACAE.alertas.map((o, i) => (
          <div className="alert-item" key={o.id}>
            <span className="alert-rank">{i + 1}</span>
            <div className="alert-info">
              <div className="alert-name" title={o.nome}>{o.nome}</div>
              <div className="alert-sec">{o.secretaria}</div>
            </div>
            <span className={"alert-prob " + probClass(o.prob_atraso)}>{Math.round(o.prob_atraso * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusCard() {
  return (
    <div className="card">
      <div className="card-head">
        <span className="card-title">Obras por status</span>
      </div>
      <StatusDonut data={MACAE.summary.por_status} />
    </div>
  );
}

function SecretariaCard() {
  const { por_secretaria } = MACAE.summary;
  const max = Math.max(...por_secretaria.map((s) => s.total));
  return (
    <div className="card">
      <div className="card-head">
        <span className="card-title">Obras por secretaria</span>
        <span className="card-sub">6 principais</span>
      </div>
      <div className="hbars">
        {por_secretaria.map((s) => (
          <div className="hbar" key={s.secretaria}>
            <div className="hbar-head">
              <span className="hbar-name">{s.secretaria}</span>
              <span className="hbar-val">{s.total}</span>
            </div>
            <div className="hbar-track"><div className="hbar-fill" style={{ width: (s.total / max * 100) + "%" }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvolutionCard() {
  return (
    <div className="card">
      <div className="card-head">
        <span className="card-title">Evolução mensal</span>
        <span className="card-sub">iniciadas vs. concluídas</span>
      </div>
      <div className="lc-legend">
        <span className="lc-leg"><i style={{ background: "#3FB984" }} /> Iniciadas</span>
        <span className="lc-leg"><i style={{ background: "#8b90a8" }} /> Concluídas</span>
      </div>
      <LineChart data={MACAE.summary.evolucao_mensal} />
    </div>
  );
}

function SerenaFooter() {
  const Sparkle = ({ style }) => (
    <svg className="serena-spark" style={style} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0l2.4 7.2L21.6 9.6 14.4 12 12 19.2 9.6 12 2.4 9.6 9.6 7.2z" />
    </svg>
  );
  return (
    <footer className="serena-footer">
      <Sparkle style={{ left: "30%", top: "30%", animationDelay: "0s" }} />
      <Sparkle style={{ right: "31%", top: "40%", animationDelay: "1.1s" }} />
      <Sparkle style={{ left: "37%", bottom: "26%", animationDelay: "2.1s", width: 10, height: 10 }} />
      <Sparkle style={{ right: "36%", top: "22%", animationDelay: "1.6s", width: 10, height: 10 }} />
      <div className="serena-line">
        <span className="serena-rule" />
        <span className="serena-by">crafted with care by</span>
        <span className="serena-rule r" />
      </div>
      <div className="serena-name">team Serena <span className="heart">✦</span></div>
      <div className="serena-sub"><span className="dot" /> IEOP · Índice de Eficiência de Obras Públicas · {new Date().getFullYear()}</div>
    </footer>
  );
}

function App() {
  return (
    <div className="dash-root">
      <Sidebar />
      <div className="dash-main">
        <Header />
        <main className="dash-content">
          <section className="grid-hero">
            <HeroIEOP />
            <ClassDist />
          </section>
          <Metrics />
          <section className="grid-two">
            <Alerts />
            <StatusCard />
          </section>
          <section className="grid-analise">
            <SecretariaCard />
            <EvolutionCard />
          </section>
          <SerenaFooter />
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
