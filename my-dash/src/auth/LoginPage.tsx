import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { type LoginForm, loginSchema } from "../schemas/auth.schema";
import { useAuthContext } from "./AuthContext";
import styles from "./authForm.module.css";

// Ícones inline (stroke = currentColor), consistentes com o tema escuro.
const svgBase = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ChartIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...svgBase} aria-hidden>
      <path d="M3 3v18h18" />
      <path d="m7 14 3-3 3 3 5-5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...svgBase} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...svgBase} aria-hidden>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...svgBase} aria-hidden>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

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

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginForm) {
    setServerError(null);
    try {
      await login(values.email, values.password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(resolveErrorMessage(err));
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <ChartIcon />
          </div>
          <p className={styles.logo}>
            IE<span>OP</span>
          </p>
          <p className={styles.subtitle}>Índice de Eficiência de Obras Públicas · RJ</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          {serverError && (
            <div className={styles.errorBanner} role="alert">
              <span aria-hidden>⚠</span>
              {serverError}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <div className={`${styles.inputWrap} ${errors.email ? styles.errorWrap : ""}`}>
              <span className={styles.inputIcon}>
                <MailIcon />
              </span>
              <input
                id="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.error : ""}`}
                placeholder="seu@email.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                disabled={isSubmitting}
                {...register("email")}
              />
            </div>
            {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <div className={`${styles.inputWrap} ${errors.password ? styles.errorWrap : ""}`}>
              <span className={styles.inputIcon}>
                <LockIcon />
              </span>
              <input
                id="password"
                type="password"
                className={`${styles.input} ${errors.password ? styles.error : ""}`}
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                disabled={isSubmitting}
                {...register("password")}
              />
            </div>
            {errors.password && (
              <span className={styles.fieldError}>{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className={styles.spinner} aria-hidden />
                Entrando…
              </>
            ) : (
              <>
                Entrar
                <span className={styles.btnArrow}>
                  <ArrowIcon />
                </span>
              </>
            )}
          </button>
        </form>

        <p className={styles.footer}>
          Não tem conta?{" "}
          <Link to="/register" className={styles.footerLink}>
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
