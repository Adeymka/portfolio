# Portfolio Pro — Donald ADJINDA

Portfolio type dashboard (style Facebook/Meta), responsive desktop et mobile, avec back-office admin et génération de lettres de motivation par IA.

## Stack

- **Next.js 14** (App Router), **React 18**, **TypeScript**
- **Supabase** (auth, base de données : projets, compétences, messages)
- **Tailwind CSS**, **Framer Motion**
- **Anthropic (Claude)** pour la génération de lettres (optionnel)

## Prérequis

- Node.js 18+
- Compte Supabase
- (Optionnel) Clé API Anthropic pour les lettres IA

## Installation

```bash
git clone <repo>
cd "portfolio pro"
npm install
```

## Variables d’environnement

Créer un fichier `.env.local` à la racine (voir `.env.example`) :

| Variable | Obligatoire | Description |
|----------|--------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Oui | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Oui | Clé anonyme Supabase |
| `ANTHROPIC_API_KEY` | Non | Génération de lettres de motivation (admin) |
| `RESEND_API_KEY` | Non | Envoi d’emails (notifications) |
| `ADMIN_EMAIL` | Non | Email admin pour notifications |

Sans `NEXT_PUBLIC_SUPABASE_*`, les routes `/admin` redirigent vers la page de login sans appeler Supabase.

## Scripts

- `npm run dev` — Développement (Next.js + Turbo)
- `npm run build` — Build de production
- `npm run start` — Démarrer le serveur de production
- `npm run lint` — Linter ESLint
- `npm run db:link` — Lier le projet Supabase
- `npm run db:migrate` — Pousser les migrations Supabase

## Structure utile

- `app/` — Pages et routes (page d’accueil, projets, à propos, contact, admin)
- `app/api/` — API Routes (ex. `generate-letter`)
- `components/` — Composants React (layout, sections, admin, mobile)
- `lib/` — Supabase (client / server), données, **`site-content.ts`** (liens site, email, LinkedIn, GitHub, CV), études de cas
- `middleware.ts` — Auth Supabase et protection des routes admin

## Admin

- **URL** : `/admin` (login) puis `/admin` (dashboard).
- **Fonctionnalités** : tableau de bord, gestion des projets, compétences, messages, générateur de documents (lettres IA si `ANTHROPIC_API_KEY` est défini).

## SEO et erreurs

- **Sitemap** : `/sitemap.xml` (pages statiques + projets publiés depuis Supabase).
- **Robots** : `/robots.txt` (interdit `/admin` et `/api/`, pointe vers le sitemap).
- **Pages d’erreur** : `404` (not-found) et erreur globale (error.tsx) avec lien retour accueil / réessayer.

## Personnalisation des liens

Modifier `lib/site-content.ts` pour mettre à jour :

- **website**, **email**, **linkedInUrl**, **githubUrl** — utilisés dans les sidebars, contact et JSON-LD (SEO).
- **cvUrl** — URL publique du CV (PDF). Si renseigné, le lien « Télécharger le CV » apparaît sur la page Contact.

---

## Déploiement

Adapté à **Vercel** (ou tout hébergeur Node) :

1. Configurer les variables d’environnement (voir tableau ci-dessus).
2. Optionnel : `NEXT_PUBLIC_SITE_URL` (URL publique du site) pour sitemap et robots.
3. Build : `npm run build` puis `npm run start` (ou déploiement automatique Vercel).

---

© Donald ADJINDA — Portfolio Full Stack
