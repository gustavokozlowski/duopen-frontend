import "./index.css";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./auth/LoginPage";
import { RegisterPage } from "./auth/RegisterPage";
import { PrivateRoute } from "./auth/PrivateRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Dashboard } from "./pages/Dashboard";
import { MapaPage } from "./pages/MapaPage";
import { ObrasPage } from "./pages/ObrasPage";
import { ObraDetalhePage } from "./pages/ObraDetalhePage";
import { FornecedoresPage } from "./pages/FornecedoresPage";
import { FornecedorPerfilPage } from "./pages/FornecedorPerfilPage";
import { ChatPage } from "./pages/ChatPage";

export function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/obras" element={<ObrasPage />} />
          <Route path="/obras/:id" element={<ObraDetalhePage />} />
          <Route path="/fornecedores" element={<FornecedoresPage />} />
          <Route path="/fornecedores/:id" element={<FornecedorPerfilPage />} />
          <Route path="/ia" element={<ChatPage />} />
          <Route path="/mapa" element={<MapaPage />} />
          <Route path="/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
