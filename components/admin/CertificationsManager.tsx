"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Loader2, Award } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export interface DbCertification {
  id: string;
  title: string;
  issuer: string | null;
  url: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
}

export default function CertificationsManager({
  initialCertifications,
}: {
  initialCertifications: DbCertification[];
}) {
  const [certs, setCerts] = useState<DbCertification[]>(initialCertifications);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<DbCertification | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const refresh = useCallback(async () => {
    const { data } = await supabase
      .from("certifications")
      .select("*")
      .order("display_order", { ascending: true })
      .order("title", { ascending: true });
    if (data) setCerts(data as DbCertification[]);
  }, [supabase]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    try {
      await supabase.from("certifications").delete().eq("id", id);
      setCerts((prev) => prev.filter((c) => c.id !== id));
      setDeleteConfirm(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleActive = async (id: string, is_active: boolean) => {
    try {
      await supabase.from("certifications").update({ is_active }).eq("id", id);
      setCerts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, is_active } : c))
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-fb-border bg-fb-card p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-syne text-lg font-bold text-fb-text">
            Certifications
          </h2>
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-fb-border px-3 py-1.5 text-sm font-medium text-fb-text hover:bg-fb-gray"
          >
            <Plus className="h-4 w-4" /> Ajouter
          </button>
        </div>
        <ul className="space-y-3">
          {certs.length === 0 ? (
            <li className="text-sm text-fb-text-secondary">
              Aucune certification. Ajoutez-en depuis Admin → Certifications.
            </li>
          ) : (
            certs.map((cert) => (
              <li
                key={cert.id}
                className="flex items-center gap-4 rounded-lg border border-fb-border bg-fb-gray/30 p-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fb-blue/10 text-fb-blue">
                  <Award className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-fb-text">{cert.title}</p>
                  {cert.issuer && (
                    <p className="text-sm text-fb-text-secondary">
                      {cert.issuer}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleActive(cert.id, !cert.is_active)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    cert.is_active ? "bg-fb-blue" : "bg-fb-gray"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      cert.is_active ? "left-6" : "left-1"
                    }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(cert);
                    setShowForm(true);
                  }}
                  className="rounded p-1.5 text-fb-text-secondary hover:bg-fb-gray hover:text-fb-text"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(cert.id)}
                  className="rounded p-1.5 text-fb-text-secondary hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      <AnimatePresence>
        {showForm && (
          <CertificationFormModal
            cert={editing}
            onClose={() => {
              setShowForm(false);
              setEditing(null);
            }}
            onSaved={() => {
              setShowForm(false);
              setEditing(null);
              refresh();
            }}
            saving={saving}
            setSaving={setSaving}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm && (
          <ConfirmModal
            title="Supprimer cette certification ?"
            message="Cette action est irréversible."
            onConfirm={() => handleDelete(deleteConfirm)}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl border border-fb-border bg-fb-card p-6 shadow-modal"
      >
        <h3 className="font-syne text-lg font-bold text-fb-text">{title}</h3>
        <p className="mt-2 text-sm text-fb-text-secondary">{message}</p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-fb-border py-2 text-sm font-medium text-fb-text hover:bg-fb-gray"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CertificationFormModal({
  cert,
  onClose,
  onSaved,
  saving,
  setSaving,
}: {
  cert: DbCertification | null;
  onClose: () => void;
  onSaved: () => void;
  saving: boolean;
  setSaving: (v: boolean) => void;
}) {
  const [title, setTitle] = useState(cert?.title ?? "");
  const [issuer, setIssuer] = useState(cert?.issuer ?? "");
  const [url, setUrl] = useState(cert?.url ?? "");
  const [image_url, setImageUrl] = useState(cert?.image_url ?? "");
  const [is_active, setIsActive] = useState(cert?.is_active ?? true);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || saving) return;
    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        issuer: issuer.trim() || null,
        url: url.trim() || null,
        image_url: image_url.trim() || null,
        is_active,
        display_order: cert?.display_order ?? 0,
      };
      if (cert) {
        await supabase.from("certifications").update(payload).eq("id", cert.id);
      } else {
        await supabase.from("certifications").insert(payload);
      }
      onSaved();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl border border-fb-border bg-fb-card p-6 shadow-modal"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-syne text-lg font-bold text-fb-text">
            {cert ? "Modifier la certification" : "Nouvelle certification"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-fb-text-secondary hover:bg-fb-gray"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Titre *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="ex. Meta Front-End Developer"
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Organisme / Émetteur
            </label>
            <input
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="ex. Coursera, Meta"
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Lien (URL)
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              URL de l’image (badge)
            </label>
            <input
              type="url"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={is_active}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span className="text-sm text-fb-text">Visible sur le site</span>
          </label>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-fb-border py-2 text-sm font-medium text-fb-text hover:bg-fb-gray"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-fb-blue py-2 text-sm font-medium text-white hover:bg-fb-blue-dark disabled:opacity-70"
            >
              {saving ? (
                <Loader2 className="mx-auto h-5 w-5 animate-spin" />
              ) : (
                "Enregistrer"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
