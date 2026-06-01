/* Concept C — Console Gov-data : precise instrument-panel login */

function ConceptC() {
  return (
    <div className="scene">
      <div className="c-root">
        <div className="c-grid" />
        <div className="c-vignette" />
        <span className="c-reg tl" /><span className="c-reg tr" />
        <span className="c-reg bl" /><span className="c-reg br" />

        <div className="c-console">
          <div className="c-titlebar">
            <div className="c-tbLeft">
              <span className="c-led" />
              <span className="c-tbTitle">// <b>IEOP</b> · controle de acesso</span>
            </div>
            <span className="c-tbMeta">v2.4 · RJ</span>
          </div>

          <div className="c-body">
            <div className="c-brand">
              <div className="c-mark"><ChartIcon s={20} /></div>
              <div>
                <div className="c-brandTxt">IE<b>OP</b></div>
              </div>
            </div>
            <div className="c-sub">índice de eficiência de obras públicas · rj</div>

            <form className="c-form" onSubmit={(e) => e.preventDefault()}>
              <div className="c-field">
                <label className="c-label">identificador</label>
                <div className="c-inputWrap">
                  <input className="c-input" type="email" placeholder="usuario@email.gov.br" />
                </div>
              </div>
              <div className="c-field">
                <label className="c-label">chave de acesso</label>
                <div className="c-inputWrap">
                  <input className="c-input" type="password" placeholder="••••••••••••" />
                </div>
              </div>
              <button className="c-btn" type="submit">
                Autenticar <ArrowIcon s={15} />
              </button>
            </form>
          </div>

          <div className="c-statusbar">
            <span><span className="ok">●</span> sessão TLS · refresh httpOnly</span>
            <span>aguardando entrada<span className="c-cursor" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ConceptC = ConceptC;
