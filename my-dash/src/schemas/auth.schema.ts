import { z } from "zod";

// Login — validação mínima (o backend valida credenciais).
export const loginSchema = z.object({
  email: z.string().min(1, "Informe seu e-mail").email("E-mail inválido"),
  password: z.string().min(1, "Informe sua senha"),
});

export type LoginForm = z.infer<typeof loginSchema>;

// Cadastro — nome, e-mail, senha (mín. 6) e confirmação.
export const registerSchema = z
  .object({
    nome: z.string().trim().min(2, "Informe seu nome"),
    email: z.string().min(1, "Informe seu e-mail").email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "As senhas não coincidem",
    path: ["confirm"],
  });

export type RegisterForm = z.infer<typeof registerSchema>;
