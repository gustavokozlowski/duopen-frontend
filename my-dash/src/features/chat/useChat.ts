import { useCallback, useRef, useState } from "react";
import { getAccessToken } from "../../auth/tokenStore";
import type { Message, Source, SSEEvent } from "./types";

const BASE_URL =
  (typeof process !== "undefined" && process.env["BUN_PUBLIC_API_URL"]) || "/proxy";

let counter = 0;
function genId() {
  return `msg-${Date.now()}-${++counter}`;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef(new AbortController());

  // Granular updaters avoid full-array rebuilds on every chunk
  const appendContent = useCallback((id: string, text: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, content: m.content + text } : m))
    );
  }, []);

  const setSources = useCallback((id: string, sources: Source[]) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, sources } : m))
    );
  }, []);

  const finishStreaming = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isStreaming: false } : m))
    );
  }, []);

  const sendMessage = useCallback(
    async (pergunta: string) => {
      if (isLoading || !pergunta.trim()) return;

      const userMsgId = genId();
      const assistantMsgId = genId();

      setMessages((prev) => [
        ...prev,
        { id: userMsgId, role: "user", content: pergunta, timestamp: new Date() },
        { id: assistantMsgId, role: "assistant", content: "", isStreaming: true, timestamp: new Date() },
      ]);
      setIsLoading(true);
      setError(null);
      abortRef.current = new AbortController();

      try {
        const res = await fetch(`${BASE_URL}/api/v1/ia/consulta`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            Authorization: `Bearer ${getAccessToken() ?? ""}`,
          },
          body: JSON.stringify({ pergunta }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} — ${res.statusText}`);
        }
        if (!res.body) throw new Error("Resposta sem corpo.");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

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
              const event = JSON.parse(raw) as SSEEvent;
              if (event.type === "content" && "text" in event) {
                appendContent(assistantMsgId, event.text);
              } else if (event.type === "sources" && "sources" in event) {
                setSources(assistantMsgId, event.sources);
              } else if (event.type === "error" && "message" in event) {
                throw new Error(event.message);
              }
            } catch {
              // Ignore malformed chunks — stream continues
            }
          }
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const msg = err instanceof Error ? err.message : "Erro desconhecido";
        setError(msg);
        // Remove the empty assistant placeholder on error
        setMessages((prev) => prev.filter((m) => m.id !== assistantMsgId));
      } finally {
        finishStreaming(assistantMsgId);
        setIsLoading(false);
      }
    },
    [isLoading, appendContent, setSources, finishStreaming]
  );

  const abort = useCallback(() => {
    abortRef.current.abort();
    setIsLoading(false);
    setMessages((prev) =>
      prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m))
    );
  }, []);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const userMessages = messages.filter((m) => m.role === "user");

  return { messages, userMessages, isLoading, error, sendMessage, abort, clearHistory };
}
