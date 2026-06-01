/* IEOP · Cadastro — Painel Vivo (Concept A) applied to the register screen */

const R_DOTS = [
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

const R_LEGEND = [
  { c: "var(--ieop-otimo)", n: "Ótimo", v: "412" },
  { c: "var(--ieop-bom)", n: "Bom", v: "638" },
  { c: "var(--ieop-regular)", n: "Regular", v: "291" },
  { c: "var(--ieop-ruim)", n: "Ruim", v: "147" },
  { c: "var(--ieop-critico)", n: "Crítico", v: "73" },
];

/* perfis reais do backend (auth.schema.ts + permissions.ts) */
const PERFIS = [
  { id: "admin", name: "Administrador", desc: "Acesso total · re-treino ML", Icon: () => <CrownIcon s={17} /> },
  { id: "gestor", name: "Gestor", desc: "Dashboard e consultas IA", Icon: () => <ShieldIcon s={17} /> },
  { id: "readonly", name: "Somente leitura", desc: "Apenas visualização", Icon: () => <ViewIcon s={17} /> },
];

const STRENGTH = [
  { label: "—", color: "var(--color-border)" },
  { label: "Fraca", color: "var(--ieop-critico)" },
  { label: "Razoável", color: "var(--ieop-regular)" },
  { label: "Boa", color: "var(--ieop-bom)" },
  { label: "Forte", color: "var(--ieop-otimo)" },
];

function scorePassword(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}

function ConceptACadastro() {
  const [perfil, setPerfil] = React.useState("gestor");
  const [pw, setPw] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const score = scorePassword(pw);
  const mismatch = confirm.length > 0 && confirm !== pw;

  return (
    <div className="scene">
      <div className="a-root">
        {/* ── Left living stage ── */}
        <div className="a-stage">
          <div className="a-glow" />
          <div className="a-field">
            {R_DOTS.map((d, i) => (
              <span
                key={i}
                className="a-obra"
                style={{ left: d.x + "%", top: d.y + "%", background: d.c, color: d.c, animationDelay: d.d + "s" }}
              />
            ))}
          </div>

          <div className="a-brandRow">
            <div className="a-tagline">Índice de Eficiência de Obras Públicas</div>
          </div>

          <div className="a-hero">
            <div>
              <div className="a-eyebrow">Estado do Rio de Janeiro</div>
              <h1 className="a-headline r-stage-copy">Faça parte do <em>controle</em> das obras públicas.</h1>
            </div>
            <div className="a-gaugeRow">
              <div className="a-gauge">
                <div className="a-gaugeVal">
                  <div className="a-gaugeNum">73,4</div>
                  <div className="a-gaugeLabel">Bom</div>
                </div>
              </div>
              <div className="a-legend">
                {R_LEGEND.map((l) => (
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

        {/* ── Right register form ── */}
        <div className="a-panel r-panel">
          <div className="r-inner">
            <div className="r-lock">
              <IEOPLogo s={38} />
              <div className="r-lockText">
                <div className="r-lockWord">IE<b>OP</b></div>
                <div className="r-lockSub">Eficiência de Obras Públicas · RJ</div>
              </div>
            </div>

            <div className="r-head">
              <div className="r-title">Criar conta</div>
              <div className="r-sub">Solicite seu acesso ao painel analítico.</div>
            </div>

            <form className="r-form" onSubmit={(e) => e.preventDefault()}>
              <div className="r-field">
                <label className="fieldLabel">Nome completo</label>
                <div className="inputWrap">
                  <UserIcon />
                  <input className="txtInput" type="text" placeholder="Seu nome completo" autoComplete="name" />
                </div>
              </div>

              <div className="r-field">
                <label className="fieldLabel">E-mail institucional</label>
                <div className="inputWrap">
                  <MailIcon />
                  <input className="txtInput" type="email" placeholder="seu@email.gov.br" autoComplete="email" />
                </div>
              </div>

              <div className="r-field">
                <div className="r-perfilLabel">Perfil de acesso</div>
                <div className="r-perfilGrid">
                  {PERFIS.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      className={"r-perfil" + (perfil === p.id ? " active" : "")}
                      onClick={() => setPerfil(p.id)}
                      aria-pressed={perfil === p.id}
                    >
                      <span className="r-perfilCheck"><CheckIcon s={11} /></span>
                      <span className="r-perfilIcon"><p.Icon /></span>
                      <span className="r-perfilName">{p.name}</span>
                      <span className="r-perfilDesc">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="r-twoCol">
                <div className="r-field">
                  <label className="fieldLabel">Senha</label>
                  <div className="inputWrap">
                    <LockIcon />
                    <input
                      className="txtInput hasToggle"
                      type={showPw ? "text" : "password"}
                      placeholder="Mín. 6 caracteres"
                      autoComplete="new-password"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                    />
                    <button
                      type="button" className="pwToggle"
                      onClick={() => setShowPw((v) => !v)}
                      aria-label={showPw ? "Ocultar senha" : "Mostrar senha"}
                      aria-pressed={showPw}
                    >
                      {showPw ? <EyeOffIcon s={18} /> : <EyeIcon s={18} />}
                    </button>
                  </div>
                </div>

                <div className="r-field">
                  <label className="fieldLabel">Confirmar senha</label>
                  <div className="inputWrap">
                    <LockIcon />
                    <input
                      className={"txtInput hasToggle" + (mismatch ? " invalid r-input" : "")}
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repita a senha"
                      autoComplete="new-password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                    <button
                      type="button" className="pwToggle"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
                      aria-pressed={showConfirm}
                    >
                      {showConfirm ? <EyeOffIcon s={18} /> : <EyeIcon s={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* strength meter */}
              <div className="r-strength">
                <div className="r-strengthBars">
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="r-strengthBar"
                      style={{ background: i <= score ? STRENGTH[score].color : "var(--color-border)" }}
                    />
                  ))}
                </div>
                <div className="r-strengthText">
                  {mismatch ? (
                    <span style={{ color: "var(--color-danger)" }}>As senhas não coincidem</span>
                  ) : (
                    <>Força da senha: <b style={{ color: score ? STRENGTH[score].color : "var(--color-text-muted)" }}>{STRENGTH[score].label}</b></>
                  )}
                </div>
              </div>

              <button className="btnPrimary" type="submit">
                Criar conta <ArrowIcon />
              </button>
            </form>

            <div className="r-foot">
              Já tem conta? <a href="#">Entrar</a>
            </div>
            <div className="r-terms">
              Ao criar a conta, você concorda com os <a href="#">Termos de Uso</a> e a <a href="#">Política de Privacidade</a> do portal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ConceptACadastro />);
