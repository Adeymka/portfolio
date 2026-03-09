"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (err) {
        setError(err.message || "Identifiants incorrects.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-fb-gray flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-fb-border bg-fb-card p-8 shadow-card">
        <div className="flex items-center gap-2 mb-6">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fb-blue text-white font-syne font-bold text-lg"
            aria-hidden
          >
            A
          </span>
          <span className="font-syne text-xl font-bold text-fb-blue">Admin</span>
        </div>
        <h1 className="font-syne text-2xl font-bold text-fb-text">
          Espace Admin
        </h1>
        <p className="mt-1 text-sm text-fb-text-secondary">
          Connectez-vous pour gérer votre portfolio.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-email" className="sr-only">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2.5 text-fb-text placeholder:text-fb-text-secondary focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="sr-only">
              Mot de passe
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
              className="w-full rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2.5 text-fb-text placeholder:text-fb-text-secondary focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="hire-me-btn w-full rounded-lg bg-fb-blue px-4 py-3 font-medium text-white shadow-card transition-all duration-200 hover:bg-fb-blue-dark hover:shadow-hover disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="hire-me-shimmer" aria-hidden />
            <span className="relative z-10">
              {loading ? "Connexion..." : "Se connecter"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
