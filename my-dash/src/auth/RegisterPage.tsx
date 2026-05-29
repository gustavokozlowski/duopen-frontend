import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "./AuthContext";
import { registerSchema, type RegisterForm } from "../schemas/auth.schema";
import styles from "./authForm.module.css";

// Ícones inline (stroke = currentColor)
const svgBase = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function UserPlusIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...svgBase} aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...svgBase} aria-hidden>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
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
    if (status === 409) return "Este e-mail já está cadastrado.";
    if (status === 422 || status === 400) return "Dados inválidos. Verifique os campos.";
    if (status === 429) return "Muitas tentativas. Aguarde alguns minutos.";
    if (status != null && status >= 500) return "Erro no servidor. Tente novamente.";
  }
  if (err instanceof TypeError) return "Não foi possível conectar ao servidor.";
  return "Erro inesperado. Tente novamente.";
}

export function RegisterPage() {
  const { register: registerUser } = useAuthContext();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { nome: "", email: "", password: "", confirm: "" },
  });

  async function onSubmit(values: RegisterForm) {
    setServerError(null);
    try {
      await registerUser(values.nome.trim(), values.email.trim(), values.password);
      navigate("/", { replace: true });
    } catch (err) {
      setServerError(resolveErrorMessage(err));
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <UserPlusIcon />
          </div>
          <p className={styles.logo}>
            Criar <span>conta</span>
          </p>
          <p className={styles.subtitle}>IEOP · Índice de Eficiência de Obras Públicas</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          {serverError && (
            <div className={styles.errorBanner} role="alert">
              <span aria-hidden>⚠</span>
              {serverError}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="nome" className={styles.label}>
              Nome
            </label>
            <div className={`${styles.inputWrap} ${errors.nome ? styles.errorWrap : ""}`}>
              <span className={styles.inputIcon}>
                <UserIcon />
              </span>
              <input
                id="nome"
                type="text"
                className={`${styles.input} ${errors.nome ? styles.error : ""}`}
                placeholder="Seu nome completo"
                autoComplete="name"
                aria-invalid={Boolean(errors.nome)}
                disabled={isSubmitting}
                {...register("nome")}
              />
            </div>
            {errors.nome && <span className={styles.fieldError}>{errors.nome.message}</span>}
          </div>

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
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                disabled={isSubmitting}
                {...register("password")}
              />
            </div>
            {errors.password && (
              <span className={styles.fieldError}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="confirm" className={styles.label}>
              Confirmar senha
            </label>
            <div className={`${styles.inputWrap} ${errors.confirm ? styles.errorWrap : ""}`}>
              <span className={styles.inputIcon}>
                <LockIcon />
              </span>
              <input
                id="confirm"
                type="password"
                className={`${styles.input} ${errors.confirm ? styles.error : ""}`}
                placeholder="Repita a senha"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirm)}
                disabled={isSubmitting}
                {...register("confirm")}
              />
            </div>
            {errors.confirm && (
              <span className={styles.fieldError}>{errors.confirm.message}</span>
            )}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className={styles.spinner} aria-hidden />
                Criando conta…
              </>
            ) : (
              <>
                Criar conta
                <span className={styles.btnArrow}>
                  <ArrowIcon />
                </span>
              </>
            )}
          </button>
        </form>

        <p className={styles.footer}>
          Já tem conta?{" "}
          <Link to="/login" className={styles.footerLink}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
