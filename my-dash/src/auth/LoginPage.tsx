import { type FormEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import styles from "./LoginPage.module.css";

function resolveErrorMessage(err: unknown): string {
  if (err instanceof Error && "response" in err) {
    const status = (err as { response?: { status?: number } }).response?.status;
    if (status === 401 || status === 403) return "E-mail ou senha incorretos.";
    if (status === 429) return "Muitas tentativas. Aguarde alguns minutos.";
    if (status != null && status >= 500) return "Erro no servidor. Tente novamente.";
  }
  if (err instanceof TypeError) return "Não foi possível conectar ao servidor.";
  return "Erro inesperado. Tente novamente.";
}

export function LoginPage() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasError = errorMsg !== null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg(resolveErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <p className={styles.logo}>
            IE<span>OP</span>
          </p>
          <p className={styles.subtitle}>Índice de Eficiência de Obras Públicas · RJ</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {hasError && (
            <div className={styles.errorBanner} role="alert">
              <span aria-hidden>⚠</span>
              {errorMsg}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className={`${styles.input} ${hasError ? styles.error : ""}`}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <input
              id="password"
              type="password"
              className={`${styles.input} ${hasError ? styles.error : ""}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={isSubmitting}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting && <span className={styles.spinner} aria-hidden />}
            {isSubmitting ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
