/* Concept A — Painel Vivo : split screen, the IEOP rendered "alive" */

const A_DOTS = [
  { x: 12, y: 22, c: "var(--ieop-otimo)", d: 0 },
  { x: 24, y: 64, c: "var(--ieop-bom)", d: 1.1 },
  { x: 38, y: 34, c: "var(--ieop-otimo)", d: 2.0 },
  { x: 46, y: 72, c: "var(--ieop-regular)", d: 0.6 },
  { x: 58, y: 26, c: "var(--ieop-bom)", d: 1.6 },
  { x: 64, y: 58, c: "var(--ieop-ruim)", d: 2.4 },
  { x: 72, y: 38, c: "var(--ieop-otimo)", d: 0.9 },
  { x: 80, y: 70, c: "var(--ieop-critico)", d: 1.4 },
  { x: 86, y: 30, c: "var(--ieop-bom)", d: 2.2 },
  { x: 32, y: 84, c: "var(--ieop-regular)", d: 1.9 },
  { x: 54, y: 88, c: "var(--ieop-otimo)", d: 0.4 },
  { x: 18, y: 46, c: "var(--ieop-ruim)", d: 2.6 },
];

const A_LEGEND = [
  { c: "var(--ieop-otimo)", n: "Ótimo", v: "412" },
  { c: "var(--ieop-bom)", n: "Bom", v: "638" },
  { c: "var(--ieop-regular)", n: "Regular", v: "291" },
  { c: "var(--ieop-ruim)", n: "Ruim", v: "147" },
  { c: "var(--ieop-critico)", n: "Crítico", v: "73" },
];

function ConceptA() {
  const [showPw, setShowPw] = React.useState(false);
  return (
    <div className="scene">
      <div className="a-root">
        {/* ── Left living stage ── */}
        <div className="a-stage">
          <div className="a-glow" />
          <div className="a-field">
            {A_DOTS.map((d, i) => (
              <span
                key={i}
                className="a-obra"
                style={{
                  left: d.x + "%", top: d.y + "%",
                  background: d.c, color: d.c,
                  animationDelay: d.d + "s",
                }}
              />
            ))}
          </div>

          <div className="a-brandRow">
            <div className="a-tagline">Índice de Eficiência de Obras Públicas</div>
          </div>

          <div className="a-hero">
            <div>
              <div className="a-eyebrow">Estado do Rio de Janeiro</div>
              <h1 className="a-headline">Cada obra pública, <em>medida</em> e classificada.</h1>
            </div>
            <div className="a-gaugeRow">
              <div className="a-gauge">
                <div className="a-gaugeVal">
                  <div className="a-gaugeNum">73,4</div>
                  <div className="a-gaugeLabel">Bom</div>
                </div>
              </div>
              <div className="a-legend">
                {A_LEGEND.map((l) => (
                  <div className="a-legendItem" key={l.n}>
                    <span className="a-dot" style={{ background: l.c }} />
                    {l.n} <b>{l.v}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="a-ticker">
            <div className="a-stat">
              <span className="a-statNum">1.561</span>
              <span className="a-statLbl">obras monitoradas</span>
            </div>
            <div className="a-stat">
              <span className="a-statNum" style={{ color: "var(--ieop-bom)" }}>68,9</span>
              <span className="a-statLbl">IEOP médio do estado</span>
            </div>
            <div className="a-stat">
              <span className="a-statNum" style={{ color: "var(--color-danger)" }}>220</span>
              <span className="a-statLbl">em risco crítico</span>
            </div>
          </div>
        </div>

        {/* ── Right form ── */}
        <div className="a-panel">
          <div className="a-lock">
            <IEOPLogo s={38} />
            <div className="a-lockText">
              <div className="a-lockWord">IE<b>OP</b></div>
              <div className="a-lockSub">Eficiência de Obras Públicas · RJ</div>
            </div>
          </div>
          <div className="a-formHead">
            <div className="a-formTitle">Acesse o painel</div>
            <div className="a-formSub">Entre com suas credenciais institucionais.</div>
          </div>
          <form className="a-form" onSubmit={(e) => e.preventDefault()}>
            <div className="a-field2">
              <label className="fieldLabel">E-mail</label>
              <div className="inputWrap">
                <MailIcon />
                <input className="txtInput" type="email" placeholder="seu@email.gov.br" />
              </div>
            </div>
            <div className="a-field2">
              <div className="a-rowBetween">
                <label className="fieldLabel">Senha</label>
                <a className="a-link" href="#">Esqueci a senha</a>
              </div>
              <div className="inputWrap">
                <LockIcon />
                <input
                  className="txtInput hasToggle"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="pwToggle"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPw}
                  title={showPw ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPw ? <EyeOffIcon s={18} /> : <EyeIcon s={18} />}
                </button>
              </div>
            </div>
            <button className="btnPrimary" type="submit">
              Entrar <ArrowIcon />
            </button>
          </form>
          <div className="a-secure">
            <span className="pulse" /> conexão segura · dados.gov.br
          </div>
          <div className="a-foot">
            Não tem conta? <a href="#">Solicite acesso</a>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ConceptA = ConceptA;
