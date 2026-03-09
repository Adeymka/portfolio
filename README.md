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
| `NEXT_PUBLIC_SUPABASE_URL` | Oui | URL du projet Supabase (Dashboard → Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Oui | Clé anonyme Supabase (Dashboard → Settings → API) |
| `NEXT_PUBLIC_SITE_URL` | En prod | URL publique du site (ex. `https://ton-site.vercel.app`) pour sitemap, robots, SEO |
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

## Déploiement (Vercel)

### 1. Pousser le code

- Créer un dépôt sur GitHub (ou GitLab / Bitbucket).
- À la racine : `git init`, `git add .`, `git commit -m "Portfolio"`, puis `git remote add origin <url>` et `git push -u origin main`.
- Vérifier que `.env.local` n’est **pas** commité (voir `.gitignore`).

### 2. Créer le projet sur Vercel

1. [vercel.com](https://vercel.com) → **Add New…** → **Project** → importer le dépôt.
2. **Framework** : Next.js (détecté). **Build** : `npm run build`. Lancer le déploiement.

### 3. Variables d’environnement (Vercel)

Dans le projet Vercel → **Settings** → **Environment Variables**, ajouter :

| Variable | Exemple | Environnement |
|----------|--------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Production, Preview |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` (clé anon) | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://ton-site.vercel.app` (ou ton domaine) | Production |

Puis **Redeploy** le projet pour prendre en compte les variables.

### 4. Base Supabase (si pas déjà fait)

- **Lier** : `npm run db:link` (mot de passe DB dans Supabase → Settings → Database).
- **Migrer** : `npm run db:migrate`.
- **Admin** : Supabase → **Authentication** → **Users** → **Add user** (email + mot de passe pour se connecter à `/admin`).

### 5. Après déploiement

- Vérifier `lib/site-content.ts` (email, téléphone, photo, liens).
- Se connecter à `https://ton-site.vercel.app/admin` et remplir projets, compétences, certifications.

---

© Donald ADJINDA — Portfolio Full Stack
