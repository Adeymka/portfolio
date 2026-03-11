# AGENTS.md

## Learned User Preferences

- Répondre toujours en français.

## Learned Workspace Facts

- Portfolio pour Donald ADJINDA, Développeur Web ; parcours EIG, stage RIXXID ; lieu Abomey-Calavi, Bénin.
- Contact et liens centralisés dans `lib/site-content.ts` : email, téléphone, WhatsApp, LinkedIn, GitHub, `profileImageUrl`, `logoUrl`.
- Téléphone : afficher le numéro avec deux options « Appel direct » (tel:) et « WhatsApp » (wa.me) sur la page Contact et en mobile.
- Stack : Next.js 14 App Router, Tailwind, Supabase, Framer Motion ; admin sous `/admin`, protégé par auth Supabase (middleware).
- Données : projets, skills, messages, certifications, `site_stats` en Supabase ; migrations avec `npm run db:migrate` (CLI en devDependency).
- Routes publiques (accueil, about, contact, projects) sous `app/(main)` avec ConditionalShell ; routes `/admin` sans ce shell.
- Bloc « Certification » dans RightSidebar : alimenté par la table `certifications` ; masquer le bloc si aucune certification active.
- Photo de profil : `public/image/image.jpeg` ; clic ouvre lightbox (ProfileHeader desktop, MobileProfileHeader mobile).
- Design : style dashboard type Facebook/Meta ; barres de défilement masquées avec la classe `scrollbar-hide` sur sidebars ; privilégier des icônes professionnelles (ex. Lucide React) plutôt que des emojis pour l’UI.
- Images externes : ajouter les hostnames dans `next.config.mjs` sous `images.remotePatterns` (ex. Supabase, Vercel, domaines de projets).
- Variables d’environnement : documenter et utiliser `.env.example` ; en prod définir au minimum `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`.
- Stats affichées (profil, contact, page Projets) : nombre de projets depuis la table `projects`, clients satisfaits et années d’expérience depuis `site_stats` (clés `happy_clients`, `years_experience`) ; récupération robuste dans `lib/supabase/queries.ts` (`getSiteStats`).
