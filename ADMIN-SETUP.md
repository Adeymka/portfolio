# Configuration de l’admin Supabase

À faire **une seule fois** dans le tableau de bord Supabase.

---

## 1. Migrations (tables) — en ligne de commande

Une seule fois : **lier** le projet Supabase (on te demandera le mot de passe de la base) :

```bash
npm run db:link
```

Entre le **database password** (Supabase Dashboard → Project Settings → Database → Database password).

Puis **appliquer les migrations** :

```bash
npm run db:migrate
```

Les tables `projects`, `skills` et `messages` sont créées avec les politiques RLS.

*(Alternative : exécuter manuellement le fichier `supabase-schema.sql` dans Supabase → SQL Editor.)*

---

## 2. Créer l’utilisateur admin

1. Dans le menu de gauche : **Authentication** → **Users**.
2. Clique sur **Add user** → **Create new user**.
3. Renseigne :
   - **Email** : l’email avec lequel tu veux te connecter à l’admin (ex. `ton@email.com`).
   - **Password** : un mot de passe sécurisé (minimum 6 caractères).
4. Décoche **Auto Confirm User** si tu veux confirmer manuellement, ou laisse coché pour pouvoir te connecter tout de suite.
5. Clique sur **Create user**.

Tu peux maintenant aller sur **https://ton-site.com/admin/login** (ou `http://localhost:3000/admin/login` en local), saisir cet email et ce mot de passe, puis accéder à l’admin.

---

## En cas de problème

- **« relation already exists »** : les tables existent déjà ; tu peux ignorer ou les supprimer avant de réexécuter le script.
- **Impossible de se connecter** : vérifie que l’utilisateur est bien créé dans Authentication → Users et que le mot de passe est correct.
- **Erreur après connexion** : vérifie que le script SQL a bien été exécuté (tables + RLS) et que `.env.local` contient `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
