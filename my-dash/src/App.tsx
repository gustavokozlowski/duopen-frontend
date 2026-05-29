import "./index.css";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./auth/LoginPage";
import { PrivateRoute } from "./auth/PrivateRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Dashboard } from "./pages/Dashboard";
import { MapaPage } from "./pages/MapaPage";

export function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mapa" element={<MapaPage />} />
          <Route path="/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
