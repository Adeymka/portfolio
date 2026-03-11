"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function SettingsContent({
  initialYearsExperience,
}: {
  initialYearsExperience: number;
}) {
  const [yearsExperience, setYearsExperience] = useState(initialYearsExperience);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<"saved" | "error" | null>(null);
  const supabase = createClient();

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const { error } = await supabase.from("site_stats").upsert(
      [{ key: "years_experience", value: Math.max(0, yearsExperience) }],
      { onConflict: "key" }
    );
    setMessage(error ? "error" : "saved");
    setSaving(false);
  };

  return (
    <div className="max-w-md space-y-4">
      <div className="rounded-lg border border-fb-border bg-fb-card p-6 shadow-card">
        <h2 className="font-syne text-lg font-bold text-fb-text mb-4">
          Statistiques profil
        </h2>
        <p className="text-sm text-fb-text-secondary mb-4">
          Ces valeurs sont affichées sur la page d’accueil (bloc profil). Le nombre de projets est calculé automatiquement à partir des projets publiés.
        </p>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-fb-text">Années d’expérience</span>
            <input
              type="number"
              min={0}
              value={yearsExperience}
              onChange={(e) => setYearsExperience(parseInt(e.target.value, 10) || 0)}
              className="mt-1 w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </label>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-fb-blue px-4 py-2 font-medium text-white hover:bg-fb-blue-dark disabled:opacity-70"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            Enregistrer
          </button>
          {message === "saved" && (
            <span className="text-sm text-fb-green">Enregistré.</span>
          )}
          {message === "error" && (
            <span className="text-sm text-red-500">Erreur lors de l’enregistrement.</span>
          )}
        </div>
      </div>
    </div>
  );
}
