import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-fb-gray px-4">
      <div className="bg-fb-card border border-fb-border rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <p className="text-6xl font-bold font-syne text-fb-blue mb-2">404</p>
        <h1 className="text-xl font-semibold text-fb-text mb-2">
          Page introuvable
        </h1>
        <p className="text-fb-text-secondary mb-6">
          Cette page n’existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-fb-blue text-white font-medium hover:opacity-90 transition-opacity"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
