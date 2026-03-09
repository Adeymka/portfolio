"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-fb-gray px-4">
      <div className="bg-fb-card border border-fb-border rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-xl font-semibold text-fb-text mb-2">
          Une erreur s’est produite
        </h1>
        <p className="text-fb-text-secondary mb-6">
          Le chargement a échoué. Vous pouvez réessayer ou retourner à l’accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 rounded-lg bg-fb-blue text-white font-medium hover:opacity-90 transition-opacity"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-lg border border-fb-border text-fb-text font-medium hover:bg-fb-hover transition-colors"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
