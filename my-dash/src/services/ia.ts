/**
 * Serviço de IA: streaming SSE via fetch (suporta POST).
 * Usa async generator — cada chunk é um SSEEvent tipado.
 */

import { getAccessToken } from "../auth/tokenStore";
import type { SSEEvent } from "../features/chat/types";
import { BASE_URL } from "./api";

export type { SSEEvent };

export async function* postConsulta(
  pergunta: string,
  signal?: AbortSignal
): AsyncGenerator<SSEEvent> {
  const res = await fetch(`${BASE_URL}/api/v1/ia/consulta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      Authorization: `Bearer ${getAccessToken() ?? ""}`,
    },
    body: JSON.stringify({ pergunta }),
    signal,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} — ${res.statusText}`);
  }
  if (!res.body) throw new Error("Resposta sem corpo.");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const raw = line.replace(/^data:\s*/, "").trim();
        if (!raw || raw === "[DONE]") continue;

        try {
          yield JSON.parse(raw) as SSEEvent;
        } catch {
          // skip malformed chunk
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
