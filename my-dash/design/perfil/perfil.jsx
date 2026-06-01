/* IEOP · Perfil do Fornecedor — composição */
const { useState, useMemo } = React;

function MiniLine({ data, w = 460, h = 150 }) {
  const padL = 30, padR = 12, padT = 12, padB = 24;
  const iw = w - padL - padR, ih = h - padT - padB;
  const vals = data.map((d) => d.avg_prob_atraso);
  const max = 1, min = 0;
  const x = (i) => padL + (i / (data.length - 1)) * iw;
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const path = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(d.avg_prob_atraso).toFixed(1)}`).join(" ");
  const area = `${path} L ${x(data.length - 1)} ${padT + ih} L ${x(0)} ${padT + ih} Z`;
  const last = vals[vals.length - 1];
  const col = last >= 0.7 ? "#A32D2D" : last >= 0.4 ? "#BA7517" : "#1D9E75";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%" }}>
      <defs><linearGradient id="reArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={col} stopOpacity="0.22" /><stop offset="1" stopColor={col} stopOpacity="0" /></linearGradient></defs>
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (<line key={i} x1={padL} y1={padT + ih - f * ih} x2={w - padR} y2={padT + ih - f * ih} stroke="#2a2f42" strokeWidth="1" strokeDasharray="3 3" />))}
      <line x1={padL} y1={y(0.7)} x2={w - padR} y2={y(0.7)} stroke="#6e1e1e" strokeWidth="1" strokeDasharray="4 3" />
      {data.map((d, i) => (<text key={i} x={x(i)} y={h - 7} fill="#555b72" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">{d.periodo.slice(5)}</text>))}
      <path d={area} fill="url(#reArea)" />
      <path d={path} fill="none" stroke={col} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d.avg_prob_atraso)} r="3" fill="#0f1117" stroke={col} strokeWidth="2" />))}
    </svg>
  );
}

function Header({ p }) {
  return (
    <div className="pf-header">
      <button className="pf-back"><DashIcons.ArrowLeft /> Fornecedores</button>
      <h1 className="pf-nome">{p.nome}</h1>
      <div className="pf-meta">
        <span className="pf-cnpj">{maskCnpj(p.cnpj)}</span>
        <span className="dot" /><span className="pf-loc">{[p.cidade, p.estado].filter(Boolean).join(" — ")}</span>
        <span className="dot" /><span className="pf-loc">{p.email}</span>
      </div>
      <div className="pf-metrics">
        <div className="pf-metric"><div className="pf-metric-label">Total de contratos</div><div className="pf-metric-value">{p.total_contratos}</div></div>
        <div className="pf-metric"><div className="pf-metric-label">Valor total contratado</div><div className="pf-metric-value">{brl(p.valor_total)}</div></div>
        <div className="pf-metric"><div className="pf-metric-label">Taxa de aditivo</div><div className="pf-metric-value" style={{ color: p.taxa_aditivo > 0.3 ? "#e07a7a" : "var(--color-text-primary)" }}>{(p.taxa_aditivo * 100).toFixed(1)}%{p.taxa_aditivo > 0.3 && <span className="alerta-badge">⚠ alerta</span>}</div></div>
        <div className="pf-metric"><div className="pf-metric-label">Risco médio</div><div className="pf-metric-value">{(p.avg_prob_atraso * 100).toFixed(1)}%<Badge variant={riskFrom(p.avg_prob_atraso).variant}>{riskFrom(p.avg_prob_atraso).label}</Badge></div></div>
      </div>
    </div>
  );
}

function ValorAnual({ data }) {
  const max = Math.max(...data.map((d) => d.valor));
  const total = data.reduce((s, d) => s + d.valor, 0);
  return (
    <div className="card">
      <div className="card-head"><span className="card-title">Valor contratado por ano</span></div>
      <div className="va-chart">
        {data.map((d) => (
          <div className="va-col" key={d.ano}>
            <span className="va-val">{brl(d.valor)}</span>
            <div className="va-barwrap"><div className="va-bar" style={{ height: (d.valor / max * 100) + "%" }} /></div>
            <span className="va-lbl">{d.ano}</span>
          </div>
        ))}
      </div>
      <div className="va-foot"><span>Total no período</span><span><b>{brl(total)}</b></span></div>
    </div>
  );
}

function RiscoEvolution({ data }) {
  const last = data[data.length - 1].avg_prob_atraso;
  const col = last >= 0.7 ? "#e07a7a" : last >= 0.4 ? "#d9a24e" : "#3FB984";
  return (
    <div className="card">
      <div className="card-head"><span className="card-title">Evolução do risco médio</span><span className="card-sub">prob. atraso · 8 meses</span></div>
      <div className="re-now"><span className="re-now-val" style={{ color: col }}>{Math.round(last * 100)}%</span><span className="re-now-lbl">risco atual · linha tracejada = limiar alto (70%)</span></div>
      <MiniLine data={data} />
    </div>
  );
}

const H_COLS = ["Obra", "Secretaria", "Status", "Execução", "Valor", "Risco", "Início"];
function Historico({ obras }) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "18px 20px 0" }}><span className="card-title">Histórico de obras</span> <span className="card-sub">({obras.length})</span></div>
      <div className="table-scroll" style={{ marginTop: 14 }}>
        <table className="obras-table" style={{ minWidth: 880 }}>
          <thead><tr>{H_COLS.map((h) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {obras.map((o) => {
              const st = STATUS[o.status]; const risk = riskFrom(o.prob_atraso);
              return (
                <tr key={o.id}>
                  <td><span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{o.nome}</span></td>
                  <td>{o.secretaria}</td>
                  <td><Badge variant={st.variant}>{st.label}</Badge></td>
                  <td><div className="exec"><div className="exec-track"><div className="exec-fill" style={{ width: o.execucao_percentual + "%", background: execColor(o.execucao_percentual) }} /></div><span className="exec-pct">{o.execucao_percentual}%</span></div></td>
                  <td><span className="cell-valor">{brl(o.valor_contratado)}</span></td>
                  <td><Badge variant={risk.variant}>{risk.label}</Badge></td>
                  <td>{fmtDate(o.data_inicio)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  const p = PERFIL;
  return (
    <div className="dash-root">
      <Sidebar active="forn" />
      <div className="dash-main">
        <header className="dash-header">
          <div className="hd-left"><div className="hd-crumb">Macaé <span className="sep">/</span> Fornecedores <span className="sep">/</span> Perfil</div><div className="hd-title">Perfil do fornecedor</div></div>
          <div className="hd-right"><button className="hd-iconBtn" aria-label="Buscar"><DashIcons.Search /></button><button className="hd-iconBtn" aria-label="Notificações"><DashIcons.Bell /></button></div>
        </header>
        <main className="dash-content">
          <Header p={p} />
          <div className="pf-grid2"><ValorAnual data={p.valor_por_ano} /><RiscoEvolution data={p.evolucao_risco} /></div>
          <Historico obras={p.obras} />
          <SerenaFooter />
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
