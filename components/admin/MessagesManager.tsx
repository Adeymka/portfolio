"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Trash2, Check, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export interface DbMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

type Filter = "all" | "unread" | "read";

export default function MessagesManager({
  initialMessages,
}: {
  initialMessages: DbMessage[];
}) {
  const [messages, setMessages] = useState<DbMessage[]>(initialMessages);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialMessages[0]?.id ?? null
  );
  const [filter, setFilter] = useState<Filter>("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const supabase = createClient();

  const filtered =
    filter === "all"
      ? messages
      : filter === "unread"
        ? messages.filter((m) => !m.is_read)
        : messages.filter((m) => m.is_read);

  const total = messages.length;
  const unread = messages.filter((m) => !m.is_read).length;
  const read = messages.filter((m) => m.is_read).length;

  const selected = messages.find((m) => m.id === selectedId);

  const refresh = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setMessages(data);
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (selectedId && !messages.find((m) => m.id === selectedId)) {
      setSelectedId(messages[0]?.id ?? null);
    }
  }, [messages, selectedId]);

  const markAsRead = async (id: string) => {
    try {
      await supabase.from("messages").update({ is_read: true }).eq("id", id);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const markAsUnread = async (id: string) => {
    try {
      await supabase.from("messages").update({ is_read: false }).eq("id", id);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: false } : m))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from("messages").delete().eq("id", id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedId === id) setSelectedId(filtered[0]?.id ?? null);
      setDeleteConfirm(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelect = (m: DbMessage) => {
    setSelectedId(m.id);
    if (!m.is_read) markAsRead(m.id);
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] min-h-[400px] gap-4">
      <div className="flex w-[360px] shrink-0 flex-col rounded-lg border border-fb-border bg-fb-card shadow-card">
        <div className="border-b border-fb-border p-3">
          <p className="text-xs text-fb-text-secondary">
            Total: {total} · Non lus: {unread} · Lus: {read}
          </p>
          <div className="mt-2 flex gap-1">
            {(["all", "unread", "read"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-fb-blue text-white"
                    : "bg-fb-gray text-fb-text-secondary hover:bg-fb-border"
                }`}
              >
                {f === "all" ? "Tous" : f === "unread" ? "Non lus" : "Lus"}
              </button>
            ))}
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <li className="p-4 text-center text-sm text-fb-text-secondary">
              Aucun message.
            </li>
          ) : (
            filtered.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(m)}
                  className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors ${
                    selectedId === m.id
                      ? "border-l-2 border-fb-blue bg-fb-blue/10"
                      : "hover:bg-fb-gray/50"
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fb-blue text-sm font-medium text-white">
                    {m.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm ${!m.is_read ? "font-semibold text-fb-text" : "text-fb-text"}`}
                    >
                      {m.name}
                    </p>
                    <p className="truncate text-xs text-fb-text-secondary">
                      {new Date(m.created_at).toLocaleDateString("fr-FR")}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-fb-text-secondary">
                      {m.subject || "Sans objet"}
                    </p>
                  </div>
                  {!m.is_read && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-fb-blue" />
                  )}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="flex-1 overflow-hidden rounded-lg border border-fb-border bg-fb-card shadow-card">
        {selected ? (
          <div className="flex h-full flex-col">
            <div className="border-b border-fb-border p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-syne text-lg font-bold text-fb-text">
                    {selected.subject || "Sans objet"}
                  </p>
                  <p className="mt-1 text-sm text-fb-text-secondary">
                    {selected.name} · {selected.email}
                  </p>
                  <p className="text-xs text-fb-text-secondary">
                    {new Date(selected.created_at).toLocaleString("fr-FR")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || "")}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-fb-border bg-fb-card px-3 py-2 text-sm font-medium text-fb-text hover:bg-fb-gray"
                  >
                    <Mail className="h-4 w-4" />
                    Répondre
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      selected.is_read
                        ? markAsUnread(selected.id)
                        : markAsRead(selected.id)
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-fb-border px-3 py-2 text-sm font-medium text-fb-text hover:bg-fb-gray"
                  >
                    {selected.is_read ? (
                      <>
                        <X className="h-4 w-4" />
                        Marquer non lu
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Marquer lu
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm(selected.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <p className="whitespace-pre-wrap text-sm text-fb-text">
                {selected.message}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-fb-text-secondary">
            <p>Sélectionnez un message.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-xl border border-fb-border bg-fb-card p-6 shadow-modal"
            >
              <h3 className="font-syne text-lg font-bold text-fb-text">
                Supprimer ce message ?
              </h3>
              <p className="mt-2 text-sm text-fb-text-secondary">
                Cette action est irréversible.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 rounded-lg border border-fb-border py-2 text-sm font-medium text-fb-text hover:bg-fb-gray"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
