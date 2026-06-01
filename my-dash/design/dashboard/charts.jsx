/* IEOP Dashboard — chart components (SVG/CSS, no external lib) */

/* IEOP circular gauge — conic ring + inner well */
function IEOPGauge({ value, color, label }) {
  const frac = Math.min(100, Math.max(0, value)) / 100;
  const deg = frac * 360;
  return (
    <div
      className="gauge"
      style={{ background: `conic-gradient(${color} 0 ${deg}deg, var(--color-surface2) ${deg}deg 360deg)` }}
    >
      <div className="gauge-val">
        <div className="gauge-num" style={{ color }}>
          {value.toFixed(1).replace(".", ",")}
        </div>
        <div className="gauge-label">{label}</div>
      </div>
    </div>
  );
}

/* Status donut — conic segments + hole */
function StatusDonut({ data }) {
  const total = data.reduce((s, d) => s + d.total, 0);
  let acc = 0;
  const stops = data.map((d) => {
    const start = (acc / total) * 360;
    acc += d.total;
    const end = (acc / total) * 360;
    return `${d.cor} ${start}deg ${end}deg`;
  });
  return (
    <div className="donut-wrap">
      <div className="donut" style={{ background: `conic-gradient(${stops.join(", ")})` }}>
        <div className="donut-center">
          <div className="donut-total mono">{total}</div>
          <div className="donut-totalLbl">obras</div>
        </div>
      </div>
      <div className="donut-legend">
        {data.map((d) => (
          <div className="dl-item" key={d.status}>
            <span className="dl-dot" style={{ background: d.cor }} />
            <span className="dl-name">{d.label}</span>
            <span className="dl-val">{d.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Evolution line chart — iniciadas vs concluidas */
function LineChart({ data, w = 460, h = 180 }) {
  const padL = 28, padR = 12, padT = 12, padB = 26;
  const iw = w - padL - padR, ih = h - padT - padB;
  const max = Math.max(...data.flatMap((d) => [d.iniciadas, d.concluidas])) * 1.15;
  const x = (i) => padL + (i / (data.length - 1)) * iw;
  const y = (v) => padT + ih - (v / max) * ih;

  const path = (key) => data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(d[key]).toFixed(1)}`).join(" ");
  const area = (key) => `${path(key)} L ${x(data.length - 1)} ${padT + ih} L ${x(0)} ${padT + ih} Z`;

  const gridY = [0, 0.25, 0.5, 0.75, 1].map((f) => padT + ih - f * ih);

  return (
    <svg className="linechart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="lcArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3FB984" stopOpacity="0.22" />
          <stop offset="1" stopColor="#3FB984" stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridY.map((gy, i) => (
        <line key={i} x1={padL} y1={gy} x2={w - padR} y2={gy} stroke="#2a2f42" strokeWidth="1" strokeDasharray="3 3" />
      ))}
      {data.map((d, i) => (
        <text key={i} x={x(i)} y={h - 8} fill="#555b72" fontSize="9.5" textAnchor="middle" fontFamily="JetBrains Mono">{d.mes.slice(0, 3)}</text>
      ))}
      <path d={area("iniciadas")} fill="url(#lcArea)" />
      <path d={path("iniciadas")} fill="none" stroke="#3FB984" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={path("concluidas")} fill="none" stroke="#8b90a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 4" />
      {data.map((d, i) => (<circle key={"a" + i} cx={x(i)} cy={y(d.iniciadas)} r="3" fill="#0f1117" stroke="#3FB984" strokeWidth="2" />))}
      {data.map((d, i) => (<circle key={"b" + i} cx={x(i)} cy={y(d.concluidas)} r="2.5" fill="#0f1117" stroke="#8b90a8" strokeWidth="1.8" />))}
    </svg>
  );
}

Object.assign(window, { IEOPGauge, StatusDonut, LineChart });
