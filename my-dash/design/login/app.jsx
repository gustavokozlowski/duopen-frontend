/* Composes the three login concepts on a comparison canvas. */

function App() {
  const W = 1280, H = 800;
  return (
    <DesignCanvas>
      <DCSection
        id="login"
        title="IEOP · Login — 3 direções"
        subtitle="Mesmos tokens do projeto (tema escuro, verde/âmbar/vermelho, Inter + JetBrains Mono). Abra qualquer um em tela cheia (foco)."
      >
        <DCArtboard id="a" label="A · Painel Vivo" width={W} height={H}>
          <ConceptA />
        </DCArtboard>
        <DCArtboard id="b" label="B · Índice Editorial" width={W} height={H}>
          <ConceptB />
        </DCArtboard>
        <DCArtboard id="c" label="C · Console Gov-data" width={W} height={H}>
          <ConceptC />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
