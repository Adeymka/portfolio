# Checklist déploiement — Portfolio Pro

## 1. Pousser le code

- [x] Vérifier que `.env.local` n’est pas suivi par Git (règle dans `.gitignore`)
- [ ] `git add .` puis `git commit -m "Portfolio prêt pour déploiement"`
- [ ] `git push origin main`

---

## 2. Créer le projet sur Vercel

1. Va sur [vercel.com](https://vercel.com) et connecte-toi.
2. **Add New…** → **Project**.
3. **Import** le dépôt Git (GitHub / GitLab / Bitbucket).
4. **Configure** :
   - Framework : Next.js (détecté)
   - Build Command : `npm run build`
   - Root Directory : (vide si le code est à la racine)
5. Clique sur **Deploy** (le premier build peut échoucher sans les variables d’env ; c’est normal).

---

## 3. Variables d’environnement (Vercel)

Dans le projet Vercel : **Settings** → **Environment Variables**.

| Variable | Où la trouver | Environnement |
|----------|----------------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → ton projet → **Settings** → **API** → Project URL | Production, Preview |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → **Settings** → **API** → anon public | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | URL de ton site (ex. `https://ton-projet.vercel.app` ou ton domaine) | Production |

Après avoir ajouté les variables : **Deployments** → **…** sur le dernier déploiement → **Redeploy**.

---

## 4. Base Supabase

### 4.1 Lier et migrer (en local)

Dans le terminal, à la racine du projet :

```bash
npm run db:link
```
→ Saisir le **Database password** (Supabase → **Settings** → **Database** → Database password).

```bash
npm run db:migrate
```
→ Les tables sont créées ou mises à jour.

### 4.2 Créer l’utilisateur admin

1. Supabase Dashboard → **Authentication** → **Users**.
2. **Add user** → **Create new user**.
3. Email + mot de passe (sécurisé).
4. Créer l’utilisateur (cocher **Auto Confirm User** pour se connecter tout de suite).

Tu pourras te connecter à `https://ton-site.vercel.app/admin` avec cet email et ce mot de passe.

---

## 5. Après déploiement

- [ ] Vérifier **`lib/site-content.ts`** : email, téléphone, `profileImageUrl`, `linkedInUrl`, `githubUrl`, `website`, `location`.
- [ ] Aller sur **`https://ton-site.vercel.app/admin`** (ou ton URL), se connecter.
- [ ] Remplir **Projets**, **Compétences**, **Certifications** (et consulter **Messages** si le formulaire Contact est utilisé).

---

*Référence : README.md section « Déploiement (Vercel) ».*
