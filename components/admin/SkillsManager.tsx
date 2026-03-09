"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const CATEGORIES = ["Frontend", "Backend", "Tools", "Design"] as const;

export interface DbSkill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: string | null;
  display_order: number;
  is_active: boolean;
}

export default function SkillsManager({
  initialSkills,
}: {
  initialSkills: DbSkill[];
}) {
  const [skills, setSkills] = useState<DbSkill[]>(initialSkills);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<DbSkill | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const byCategory = CATEGORIES.map((cat) => ({
    category: cat,
    items: skills.filter((s) => s.category === cat),
  }));

  const refresh = async () => {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("category")
      .order("display_order", { ascending: true });
    if (data) setSkills(data);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await supabase.from("skills").delete().eq("id", id);
      setSkills((prev) => prev.filter((s) => s.id !== id));
      setDeleteConfirm(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleActive = async (id: string, is_active: boolean) => {
    try {
      await supabase.from("skills").update({ is_active }).eq("id", id);
      setSkills((prev) =>
        prev.map((s) => (s.id === id ? { ...s, is_active } : s))
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      {byCategory.map(({ category, items }) => (
        <section
          key={category}
          className="rounded-lg border border-fb-border bg-fb-card p-5 shadow-card"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-syne text-lg font-bold text-fb-text">
              {category}
            </h2>
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setShowForm(true);
                (window as unknown as { __skillCategory?: string }).__skillCategory = category;
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-fb-border px-3 py-1.5 text-sm font-medium text-fb-text hover:bg-fb-gray"
            >
              <Plus className="h-4 w-4" /> Ajouter
            </button>
          </div>
          <ul className="space-y-3">
            {items.length === 0 ? (
              <li className="text-sm text-fb-text-secondary">
                Aucune compétence.
              </li>
            ) : (
              items.map((skill) => (
                <li
                  key={skill.id}
                  className="flex items-center gap-4 rounded-lg border border-fb-border bg-fb-gray/30 p-3"
                >
                  <span className="text-xl" aria-hidden>
                    {skill.icon || "⚡"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-fb-text">{skill.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-2 flex-1 max-w-[120px] overflow-hidden rounded-full bg-fb-gray">
                        <div
                          className="h-full rounded-full bg-fb-blue transition-all"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-xs text-fb-text-secondary">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleToggleActive(skill.id, !skill.is_active)
                    }
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                      skill.is_active ? "bg-fb-blue" : "bg-fb-gray"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                        skill.is_active ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(skill);
                      setShowForm(true);
                    }}
                    className="rounded p-1.5 text-fb-text-secondary hover:bg-fb-gray hover:text-fb-text"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm(skill.id)}
                    className="rounded p-1.5 text-fb-text-secondary hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </section>
      ))}

      <AnimatePresence>
        {showForm && (
          <SkillFormModal
            skill={editing}
            defaultCategory={
              (typeof window !== "undefined" &&
                (window as unknown as { __skillCategory?: string }).__skillCategory) ??
              "Frontend"
            }
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
            title="Supprimer cette compétence ?"
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

function SkillFormModal({
  skill,
  defaultCategory,
  onClose,
  onSaved,
  saving,
  setSaving,
}: {
  skill: DbSkill | null;
  defaultCategory: string;
  onClose: () => void;
  onSaved: () => void;
  saving: boolean;
  setSaving: (v: boolean) => void;
}) {
  const [icon, setIcon] = useState(skill?.icon ?? "⚡");
  const [name, setName] = useState(skill?.name ?? "");
  const [category, setCategory] = useState(skill?.category ?? defaultCategory);
  const [level, setLevel] = useState(skill?.level ?? 80);
  const [is_active, setIsActive] = useState(skill?.is_active ?? true);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || saving) return;
    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        category,
        level,
        icon: icon || null,
        is_active,
        display_order: skill?.display_order ?? 0,
      };
      if (skill) {
        await supabase.from("skills").update(payload).eq("id", skill.id);
      } else {
        await supabase.from("skills").insert(payload);
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
            {skill ? "Modifier la compétence" : "Nouvelle compétence"}
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
              Icône (emoji)
            </label>
            <input
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="⚡"
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Nom *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Catégorie
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Niveau: {level}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="w-full accent-fb-blue"
            />
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={is_active}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span className="text-sm text-fb-text">Active</span>
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
