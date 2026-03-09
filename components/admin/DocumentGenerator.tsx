"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Palette,
  Mail,
  DollarSign,
  FileCheck,
  Briefcase,
  Loader2,
  Sparkles,
} from "lucide-react";

const DOC_TYPES = [
  {
    id: "cv-classic",
    title: "CV Classique",
    description: "Format ATS-friendly, sobre et professionnel",
    icon: FileText,
  },
  {
    id: "cv-creative",
    title: "CV Créatif",
    description: "Design moderne avec sidebar colorée",
    icon: Palette,
  },
  {
    id: "letter",
    title: "Lettre de Motivation",
    description: "Générée par IA selon le poste visé",
    icon: Mail,
  },
  {
    id: "quote",
    title: "Devis Client",
    description: "Devis professionnel personnalisé",
    icon: DollarSign,
  },
  {
    id: "contract",
    title: "Contrat Freelance",
    description: "Contrat type pour missions freelance",
    icon: FileCheck,
  },
  {
    id: "onepager",
    title: "One-Pager LinkedIn",
    description: "Résumé exportable pour LinkedIn",
    icon: Briefcase,
  },
] as const;

type DocTypeId = (typeof DOC_TYPES)[number]["id"];

interface DocumentGeneratorProps {
  projects: { id: string; title: string }[];
  skills: { id: string; name: string; category: string }[];
}

export default function DocumentGenerator({
  projects,
  skills,
}: DocumentGeneratorProps) {
  const [active, setActive] = useState<DocTypeId>("letter");
  const [letterResult, setLetterResult] = useState<string>("");
  const [letterLoading, setLetterLoading] = useState(false);
  const [letterForm, setLetterForm] = useState({
    company: "",
    position: "",
    recruiter: "",
    highlights: "",
    tone: "Formel",
    lang: "Français",
  });

  const handleGenerateLetter = async () => {
    if (!letterForm.company.trim() || !letterForm.position.trim()) return;
    setLetterLoading(true);
    setLetterResult("");
    try {
      const res = await fetch("/api/generate-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(letterForm),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.letter) setLetterResult(data.letter);
      else setLetterResult(data.error || "Erreur lors de la génération.");
    } catch {
      setLetterResult("Erreur réseau.");
    } finally {
      setLetterLoading(false);
    }
  };

  return (
    <div className="flex gap-6">
      <div className="w-[320px] shrink-0 space-y-2">
        {DOC_TYPES.map((doc) => {
          const isActiveDoc = active === doc.id;
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => setActive(doc.id)}
              className={`w-full rounded-lg border p-4 text-left transition-all ${
                isActiveDoc
                  ? "border-2 border-fb-blue bg-fb-blue/5"
                  : "border-fb-border bg-fb-card hover:border-fb-border hover:shadow-card"
              }`}
            >
              <span className="text-2xl" aria-hidden>
                {doc.id === "cv-classic" && "📄"}
                {doc.id === "cv-creative" && "🎨"}
                {doc.id === "letter" && "✉️"}
                {doc.id === "quote" && "💰"}
                {doc.id === "contract" && "📋"}
                {doc.id === "onepager" && "💼"}
              </span>
              <h3 className="mt-2 font-syne font-bold text-fb-text">
                {doc.title}
              </h3>
              <p className="mt-1 text-xs text-fb-text-secondary">
                {doc.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="min-w-0 flex-1 rounded-lg border border-fb-border bg-fb-card p-6 shadow-card">
        {active === "letter" && (
          <div className="space-y-4">
            <h2 className="font-syne text-xl font-bold text-fb-text">
              Lettre de Motivation (IA)
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-fb-text">
                  Nom de l&apos;entreprise *
                </label>
                <input
                  value={letterForm.company}
                  onChange={(e) =>
                    setLetterForm((f) => ({ ...f, company: e.target.value }))
                  }
                  className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-fb-text">
                  Poste visé *
                </label>
                <input
                  value={letterForm.position}
                  onChange={(e) =>
                    setLetterForm((f) => ({ ...f, position: e.target.value }))
                  }
                  className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-fb-text">
                Nom du recruteur (optionnel)
              </label>
              <input
                value={letterForm.recruiter}
                onChange={(e) =>
                  setLetterForm((f) => ({ ...f, recruiter: e.target.value }))
                }
                className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-fb-text">
                Points forts à mettre en avant
              </label>
              <textarea
                value={letterForm.highlights}
                onChange={(e) =>
                  setLetterForm((f) => ({ ...f, highlights: e.target.value }))
                }
                rows={3}
                placeholder="Ex: Expérience Next.js, travail en équipe..."
                className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text placeholder:text-fb-text-secondary focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-fb-text">
                  Ton
                </label>
                <select
                  value={letterForm.tone}
                  onChange={(e) =>
                    setLetterForm((f) => ({ ...f, tone: e.target.value }))
                  }
                  className="rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
                >
                  <option value="Formel">Formel</option>
                  <option value="Semi-formel">Semi-formel</option>
                  <option value="Dynamique">Dynamique</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-fb-text">
                  Langue
                </label>
                <select
                  value={letterForm.lang}
                  onChange={(e) =>
                    setLetterForm((f) => ({ ...f, lang: e.target.value }))
                  }
                  className="rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
                >
                  <option value="Français">Français</option>
                  <option value="Anglais">Anglais</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={handleGenerateLetter}
              disabled={letterLoading}
              className="hire-me-btn inline-flex items-center gap-2 rounded-lg bg-fb-blue px-6 py-3 font-medium text-white shadow-card transition-all hover:bg-fb-blue-dark hover:shadow-hover disabled:opacity-70"
            >
              <span className="hire-me-shimmer" aria-hidden />
              {letterLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="h-5 w-5" />
              )}
              <span className="relative z-10">
                {letterLoading ? "Génération..." : "Générer avec IA"}
              </span>
            </button>
            {letterResult && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <label className="mb-1 block text-sm font-medium text-fb-text">
                  Résultat (éditable)
                </label>
                <textarea
                  value={letterResult}
                  onChange={(e) => setLetterResult(e.target.value)}
                  rows={14}
                  className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-3 font-dm-sans text-sm text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
                />
                <p className="mt-2 text-xs text-fb-text-secondary">
                  Téléchargement PDF/DOCX à venir. Copiez le texte pour l’instant.
                </p>
              </motion.div>
            )}
          </div>
        )}

        {active !== "letter" && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-fb-text-secondary">
              Formulaire et génération PDF pour &quot;{DOC_TYPES.find((d) => d.id === active)?.title}&quot; à venir.
            </p>
            <p className="mt-2 text-sm text-fb-text-secondary">
              Utilisez la Lettre de Motivation pour l’instant.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
