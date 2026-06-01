/* IEOP · Agente IA (chat RAG) — composição */
const { useState } = React;

function SourceCard({ s }) {
  return (
    <div className="source-card">
      <div className="source-head">
        <span className="source-titulo">{s.titulo}</span>
        <span className="source-rel"><span className="source-relbar"><span className="source-relfill" style={{ width: Math.round(s.relevancia * 100) + "%" }} /></span>{Math.round(s.relevancia * 100)}%</span>
      </div>
      <div className="source-trecho">"{s.trecho}"</div>
      {s.obra && <div className="source-obra">↳ {s.obra}</div>}
    </div>
  );
}

function Message({ m }) {
  const isUser = m.role === "user";
  return (
    <div className={"msg " + m.role}>
      <div className="msg-avatar">{isUser ? "Você" : "IA"}</div>
      <div className="msg-bubble">
        <div className="msg-content" dangerouslySetInnerHTML={{ __html: m.content }} />
        {!isUser && (
          <div className="msg-actions">
            <button className="msg-copy">⎘ Copiar</button>
            <span className="msg-time">{m.time}</span>
          </div>
        )}
        {!isUser && m.sources && m.sources.length > 0 && (
          <div className="sources">
            <div className="sources-title">Fontes consultadas · {m.sources.length}</div>
            {m.sources.map((s) => <SourceCard key={s.id} s={s} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [input, setInput] = useState("");
  const { sessions, messages } = CHAT;
  return (
    <div className="dash-root">
      <Sidebar active="ia" />
      <div className="dash-main">
        <header className="dash-header">
          <div className="hd-left"><div className="hd-crumb">Macaé <span className="sep">/</span> Agente IA</div><div className="hd-title">Agente IA — RAG</div></div>
          <div className="hd-right"><div className="hd-updated"><span className="live" /> base: obras · contratos · fornecedores</div></div>
        </header>
        <main className="dash-content" style={{ paddingBottom: 24 }}>
          <div className="chat-container">
            <div className="chat-history">
              <div className="chat-history-head"><span className="chat-history-title">Histórico</span><button className="chat-history-clear">Limpar</button></div>
              {sessions.map((s, i) => <button key={i} className={"chat-history-item" + (i === 0 ? " active" : "")} title={s}>{s}</button>)}
            </div>
            <div className="chat-main">
              <div className="chat-messages">
                {messages.map((m) => <Message key={m.id} m={m} />)}
              </div>
              <div className="chat-input-wrap">
                <div className="chat-input-box">
                  <textarea className="chat-input" rows={1} placeholder="Pergunte sobre obras, contratos ou fornecedores…" value={input} onChange={(e) => setInput(e.target.value)} />
                  <button className="chat-send" aria-label="Enviar"><DashIcons.ArrowRight /></button>
                </div>
                <div className="chat-hint">As respostas são fundamentadas nos documentos oficiais do sistema · <kbd>Enter</kbd> envia</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
