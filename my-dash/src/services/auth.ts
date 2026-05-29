import axios from "axios";
import { apiClient, BASE_URL } from "./api";

// ── Contratos do backend (FastAPI) ───────────────────────────────
// POST /register → 201 UserResponse (sem token)
// POST /login    → TokenResponse
// POST /refresh  → TokenResponse (refresh_token no body)
// GET  /me       → UserResponse (Bearer)

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface UserResponse {
  id: string;
  email: string;
  nome: string;
}

export interface RegisterPayload {
  nome: string;
  email: string;
  password: string;
}

// Cliente sem interceptors — usado no refresh para evitar recursão de 401.
const rawClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function registerUser(payload: RegisterPayload): Promise<UserResponse> {
  const { data } = await apiClient.post<UserResponse>("/api/v1/auth/register", payload);
  return data;
}

export async function loginUser(email: string, password: string): Promise<TokenResponse> {
  const { data } = await apiClient.post<TokenResponse>("/api/v1/auth/login", { email, password });
  return data;
}

export async function refreshTokens(refreshToken: string): Promise<TokenResponse> {
  const { data } = await rawClient.post<TokenResponse>("/api/v1/auth/refresh", {
    refresh_token: refreshToken,
  });
  return data;
}

export async function getMe(): Promise<UserResponse> {
  const { data } = await apiClient.get<UserResponse>("/api/v1/auth/me");
  return data;
}
