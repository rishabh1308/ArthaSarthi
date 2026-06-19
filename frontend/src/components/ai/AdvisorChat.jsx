"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Send, Bot, Sparkles, User } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAdvice, getAdviceHistory } from "@/services/financeService";
import { SUGGESTED_PROMPTS } from "@/lib/constants";
import { formatDateTime } from "@/utils/formatters";
import toast from "react-hot-toast";

function TypingIndicator() {
  return (
    <div className="flex gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-sky"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function ChatBubble({ message, isUser }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          isUser
            ? "bg-slate-ink text-white"
            : "bg-gradient-to-br from-sky-deep to-teal-deep text-white"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-slate-ink text-white"
            : "glass border border-sky-soft/50 text-slate-ink"
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:text-slate-ink">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
        {message.timestamp && (
          <p
            className={`mt-2 text-[10px] ${
              isUser ? "text-white/60" : "text-slate-light"
            }`}
          >
            {formatDateTime(message.timestamp)}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function AdvisorChat({ userId, profile }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const { data: history } = useQuery({
    queryKey: ["advice-history", userId],
    queryFn: () => getAdviceHistory(userId),
    enabled: Boolean(userId),
  });

  useEffect(() => {
    if (history?.length && messages.length === 0) {
      const mapped = [];
      history.slice(0, 20).reverse().forEach((h) => {
        if (h.query) {
          mapped.push({
            id: `q-${h.id}`,
            role: "user",
            content: h.query,
            timestamp: h.createdAt,
          });
        }
        if (h.response) {
          mapped.push({
            id: `r-${h.id}`,
            role: "assistant",
            content: h.response,
            timestamp: h.createdAt,
          });
        }
      });
      setMessages(mapped);
    }
  }, [history, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const adviceMutation = useMutation({
    mutationFn: (query) =>
      getAdvice(userId, query, {
        income: profile?.income,
        expenses: profile?.expenses,
        savings: profile?.savings,
      }),
    onSuccess: (response, query) => {
      const text =
        typeof response === "string"
          ? response
          : response?.message || JSON.stringify(response);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: text.startsWith("ERROR:") ? text.replace("ERROR:", "⚠️") : text,
          timestamp: new Date().toISOString(),
        },
      ]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to get advice");
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "I couldn't reach the AI service. Please try again in a moment.",
          timestamp: new Date().toISOString(),
        },
      ]);
    },
  });

  const sendMessage = (text) => {
    const query = (text || input).trim();
    if (!query || !userId) {
      if (!userId) toast.error("Please set your user ID in Settings first");
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        role: "user",
        content: query,
        timestamp: new Date().toISOString(),
      },
    ]);
    setInput("");
    adviceMutation.mutate(query);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] min-h-[500px] flex-col glass rounded-3xl shadow-card overflow-hidden">
      <div className="border-b border-sky-soft/50 bg-gradient-to-r from-sky-soft/40 to-teal-soft/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-deep to-teal-deep text-white shadow-glow">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-slate-ink">
              ArthaSarthi AI Advisor
            </h2>
            <p className="text-xs text-slate-muted">
              Powered by LangGraph · Remembers your financial context
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin sm:px-6">
        {messages.length === 0 && (
          <div className="mb-8 text-center">
            <p className="text-sm text-slate-muted">
              Ask anything about your finances. Try a suggested prompt:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-sky-light/60 bg-white/80 px-4 py-2 text-xs font-medium text-slate-muted transition-all hover:border-sky hover:bg-sky-soft/50 hover:text-sky-deep"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg}
                isUser={msg.role === "user"}
              />
            ))}
          </AnimatePresence>
          {adviceMutation.isPending && (
            <div className="flex gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-deep to-teal-deep text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div className="glass rounded-2xl border border-sky-soft/50">
                <TypingIndicator />
              </div>
            </div>
          )}
        </div>
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-sky-soft/50 bg-cream-50/90 p-4 backdrop-blur-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="mx-auto flex max-w-3xl gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about savings, investments, goals..."
            className="input-field flex-1 rounded-2xl py-4"
            disabled={adviceMutation.isPending}
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || adviceMutation.isPending}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-deep to-sky text-white shadow-soft disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
