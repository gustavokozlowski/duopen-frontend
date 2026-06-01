/* Concept B — Índice Editorial : public-report cover meets login */

const B_COMPS = [
  { sig: "C", name: "Custo" },
  { sig: "P", name: "Atraso" },
  { sig: "R", name: "Recorrência" },
  { sig: "E", name: "Execução" },
];

const B_DIST = [
  { c: "var(--ieop-otimo)", n: "Ótimo", v: 412, w: 26 },
  { c: "var(--ieop-bom)", n: "Bom", v: 638, w: 41 },
  { c: "var(--ieop-regular)", n: "Regular", v: 291, w: 18 },
  { c: "var(--ieop-ruim)", n: "Ruim", v: 147, w: 9 },
  { c: "var(--ieop-critico)", n: "Crítico", v: 73, w: 6 },
];

function ConceptB() {
  return (
    <div className="scene">
      <div className="b-root">
        {/* ── Editorial left ── */}
        <div className="b-left">
          <div className="b-mastTop">
            <div className="b-brand">
              <div className="b-brandMark"><ChartIcon s={19} /></div>
              <div className="b-brandTxt">IE<b>OP</b></div>
            </div>
            <div className="b-gov">Gov · RJ — 2026</div>
          </div>

          <div className="b-center">
            <div className="b-kicker">Índice de Eficiência de Obras Públicas</div>
            <h1 className="b-title">
              Transparência<br />que se mede.
              <span>Um número de 0 a 100 para cada obra do estado.</span>
            </h1>

            <div className="b-comps">
              {B_COMPS.map((c) => (
                <div className="b-comp" key={c.sig}>
                  <div className="b-compTop">
                    <span className="b-compSig">{c.sig}</span>
                  </div>
                  <div className="b-compName">{c.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="b-distWrap">
            <div className="b-distHead">
              <span className="b-distTitle">Distribuição das 1.561 obras por classe</span>
              <span className="b-distTotal">100%</span>
            </div>
            <div className="b-bar">
              {B_DIST.map((d, i) => (
                <div
                  key={d.n}
                  className="b-seg"
                  style={{ width: d.w + "%", background: d.c, animationDelay: 120 + i * 90 + "ms" }}
                />
              ))}
            </div>
            <div className="b-legend2">
              {B_DIST.map((d) => (
                <div className="b-leg" key={d.n}>
                  <i style={{ background: d.c }} /> {d.n} <b>{d.v}</b>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Form right ── */}
        <div className="b-right">
          <div className="b-card">
            <div className="b-formTitle">Entrar</div>
            <div className="b-formSub">Acesso para gestores e equipes técnicas.</div>
            <form className="b-form" onSubmit={(e) => e.preventDefault()}>
              <div className="b-field">
                <label className="fieldLabel">E-mail</label>
                <div className="inputWrap">
                  <MailIcon />
                  <input className="txtInput" type="email" placeholder="seu@email.gov.br" />
                </div>
              </div>
              <div className="b-field">
                <div className="b-rowBetween">
                  <label className="fieldLabel">Senha</label>
                  <a className="b-link" href="#">Esqueci</a>
                </div>
                <div className="inputWrap">
                  <LockIcon />
                  <input className="txtInput" type="password" placeholder="••••••••" />
                </div>
              </div>
              <button className="btnPrimary" type="submit">
                Entrar <ArrowIcon />
              </button>
            </form>
            <div className="b-foot">
              Não tem conta? <a href="#">Cadastre-se</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ConceptB = ConceptB;
