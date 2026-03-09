"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const CATEGORIES = [
  "Web App",
  "Mobile",
  "SaaS",
  "E-commerce",
  "Design",
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  "Web App": "bg-blue-100 text-blue-700",
  Mobile: "bg-amber-100 text-amber-700",
  SaaS: "bg-purple-100 text-purple-700",
  "E-commerce": "bg-green-100 text-green-700",
  Design: "bg-pink-100 text-pink-700",
};

export interface DbProject {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  specs: string | null;
  category: string | null;
  stack: string[];
  image_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProjectsManager({
  initialProjects,
}: {
  initialProjects: DbProject[];
}) {
  const [projects, setProjects] = useState<DbProject[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<DbProject | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const filtered = projects.filter(
    (p) =>
      !search.trim() ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
      (p.stack && p.stack.some((t) => t.toLowerCase().includes(search.toLowerCase())))
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleToggle = async (
    id: string,
    field: "featured" | "published",
    value: boolean
  ) => {
    try {
      await supabase.from("projects").update({ [field]: value }).eq("id", id);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from("projects").delete().eq("id", id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="hire-me-btn inline-flex items-center gap-2 rounded-lg bg-fb-blue px-4 py-2.5 font-medium text-white shadow-card transition-all duration-200 hover:bg-fb-blue-dark hover:shadow-hover"
        >
          <span className="hire-me-shimmer" aria-hidden />
          <Plus className="h-5 w-5" aria-hidden />
          <span className="relative z-10">Nouveau projet</span>
        </button>
        <input
          type="search"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-sm text-fb-text placeholder:text-fb-text-secondary focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
        />
      </div>

      {loading ? (
        <div className="rounded-lg border border-fb-border bg-fb-card p-8 text-center text-fb-text-secondary">
          Chargement...
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-fb-border bg-fb-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-fb-border bg-fb-gray/50">
                  <th className="p-3 font-medium text-fb-text">Image</th>
                  <th className="p-3 font-medium text-fb-text">Titre</th>
                  <th className="p-3 font-medium text-fb-text">Catégorie</th>
                  <th className="p-3 font-medium text-fb-text">Stack</th>
                  <th className="p-3 font-medium text-fb-text">Featured</th>
                  <th className="p-3 font-medium text-fb-text">Publié</th>
                  <th className="p-3 font-medium text-fb-text">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-fb-border last:border-0"
                  >
                    <td className="p-3">
                      {project.image_url ? (
                        <Image
                          src={project.image_url}
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded bg-fb-gray"
                          style={{
                            backgroundColor: "var(--fb-blue)",
                            opacity: 0.2,
                          }}
                        >
                          <ImageIcon className="h-5 w-5 text-fb-blue" />
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <p className="font-medium text-fb-text">{project.title}</p>
                      <p className="text-xs text-fb-text-secondary">
                        {project.slug}
                      </p>
                    </td>
                    <td className="p-3">
                      {project.category && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            CATEGORY_COLORS[project.category] ??
                            "bg-fb-gray text-fb-text"
                          }`}
                        >
                          {project.category}
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="text-fb-text-secondary">
                        {(project.stack || []).slice(0, 3).join(", ")}
                        {(project.stack?.length ?? 0) > 3 &&
                          ` +${(project.stack?.length ?? 0) - 3}`}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleToggle(project.id, "featured", !project.featured)
                        }
                        className={`relative h-6 w-11 rounded-full transition-colors ${
                          project.featured ? "bg-fb-blue" : "bg-fb-gray"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                            project.featured ? "left-6" : "left-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleToggle(project.id, "published", !project.published)
                        }
                        className={`relative h-6 w-11 rounded-full transition-colors ${
                          project.published ? "bg-fb-blue" : "bg-fb-gray"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                            project.published ? "left-6" : "left-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditing(project);
                            setShowForm(true);
                          }}
                          className="rounded p-1.5 text-fb-text-secondary hover:bg-fb-gray hover:text-fb-text"
                          aria-label="Modifier"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirm(project.id)}
                          className="rounded p-1.5 text-fb-text-secondary hover:bg-red-50 hover:text-red-600"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="p-6 text-center text-fb-text-secondary">
              Aucun projet trouvé.
            </p>
          )}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <ProjectFormPanel
            project={editing}
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
            title="Supprimer ce projet ?"
            message="Êtes-vous sûr de vouloir supprimer ce projet ?"
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
            className="flex-1 rounded-lg border border-fb-border bg-fb-card py-2 text-sm font-medium text-fb-text hover:bg-fb-gray"
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

function ProjectFormPanel({
  project,
  onClose,
  onSaved,
  saving,
  setSaving,
}: {
  project: DbProject | null;
  onClose: () => void;
  onSaved: () => void;
  saving: boolean;
  setSaving: (v: boolean) => void;
}) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [longDescription, setLongDescription] = useState(
    project?.long_description ?? ""
  );
  const [specs, setSpecs] = useState(project?.specs ?? "");
  const [category, setCategory] = useState(project?.category ?? "");
  const [stack, setStack] = useState<string[]>(project?.stack ?? []);
  const [stackInput, setStackInput] = useState("");
  const [imageUrl, setImageUrl] = useState(project?.image_url ?? "");
  const [demoUrl, setDemoUrl] = useState(project?.demo_url ?? "");
  const [githubUrl, setGithubUrl] = useState(project?.github_url ?? "");
  const [displayOrder, setDisplayOrder] = useState(project?.display_order ?? 0);
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [published, setPublished] = useState(project?.published ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const supabase = createClient();

  useEffect(() => {
    if (!project && title) setSlug(slugify(title));
  }, [title, project]);

  const addStack = () => {
    const t = stackInput.trim();
    if (t && !stack.includes(t)) {
      setStack([...stack, t]);
      setStackInput("");
    }
  };

  const removeStack = (s: string) => {
    setStack(stack.filter((x) => x !== s));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Titre requis";
    const effectiveSlug = slug.trim() || slugify(title.trim());
    if (!effectiveSlug) e.slug = "Slug requis";
    if (!description.trim()) e.description = "Description requise";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || saving) return;
    setSaving(true);
    const finalSlug = slug.trim() || slugify(title.trim());
    try {
      const payload = {
        title: title.trim(),
        slug: finalSlug,
        description: description.trim(),
        long_description: longDescription.trim() || null,
        specs: specs.trim() || null,
        category: category || null,
        stack,
        image_url: imageUrl.trim() || null,
        demo_url: demoUrl.trim() || null,
        github_url: githubUrl.trim() || null,
        display_order: displayOrder,
        featured,
        published,
        updated_at: new Date().toISOString(),
      };
      if (project) {
        await supabase.from("projects").update(payload).eq("id", project.id);
      } else {
        await supabase.from("projects").insert(payload);
      }
      onSaved();
    } catch (err) {
      setErrors({ submit: "Erreur lors de l'enregistrement." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end bg-black/30"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: 480 }}
        animate={{ x: 0 }}
        exit={{ x: 480 }}
        transition={{ type: "tween", duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] overflow-y-auto bg-fb-card shadow-modal"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-fb-border bg-fb-card p-4">
          <h2 className="font-syne text-lg font-bold text-fb-text">
            {project ? "Modifier le projet" : "Nouveau projet"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-fb-text-secondary hover:bg-fb-gray hover:text-fb-text"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Titre *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Slug *
            </label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 font-jetbrains-mono text-sm text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
            {errors.slug && (
              <p className="mt-1 text-xs text-red-600">{errors.slug}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">{errors.description}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Cahier des charges
            </label>
            <textarea
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              rows={5}
              placeholder="Spécifications, objectifs, périmètre..."
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Longue description
            </label>
            <textarea
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              rows={6}
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
              <option value="">—</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Stack
            </label>
            <div className="flex gap-2">
              <input
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addStack())}
                placeholder="Tech + Entrée"
                className="flex-1 rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-sm text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
              />
              <button
                type="button"
                onClick={addStack}
                className="rounded-lg border border-fb-border px-3 py-2 text-sm font-medium text-fb-text hover:bg-fb-gray"
              >
                Ajouter
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {stack.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-full bg-fb-gray px-2 py-0.5 font-jetbrains-mono text-xs text-fb-text"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeStack(s)}
                    className="rounded hover:bg-fb-border"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Preview"
                width={80}
                height={80}
                className="mt-2 h-20 w-20 rounded object-cover"
                unoptimized
              />
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Demo URL
            </label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              GitHub URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-fb-text">
              Ordre d&apos;affichage
            </label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <span className="text-sm text-fb-text">Featured</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <span className="text-sm text-fb-text">Publié</span>
            </label>
          </div>
          {errors.submit && (
            <p className="text-sm text-red-600">{errors.submit}</p>
          )}
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
              className="flex-1 rounded-lg bg-fb-blue py-2 text-sm font-medium text-white shadow-card hover:bg-fb-blue-dark disabled:opacity-70"
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
