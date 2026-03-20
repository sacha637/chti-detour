# Ch'ti Détour – Site vitrine

Site vitrine professionnel pour **Ch'ti Détour** (Valenciennes) : menu, contact, horaires, annonces, admin complet. Prêt à déployer sur Vercel.

## Arborescence

```
chti-detour/
├── app/
│   ├── (public)/                 # Pages publiques (layout avec Header + Footer + JSON-LD)
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Accueil
│   │   ├── menu/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── a-propos/page.tsx
│   │   ├── mentions-legales/page.tsx
│   │   ├── confidentialite/page.tsx
│   │   └── allergenes/page.tsx
│   ├── admin/
│   │   ├── layout.tsx            # Layout minimal (pas de guard ici)
│   │   ├── login/page.tsx        # Connexion Firebase email/password
│   │   └── (auth)/               # Routes protégées
│   │       ├── layout.tsx        # Guard + header admin
│   │       ├── page.tsx          # Dashboard
│   │       ├── settings/page.tsx
│   │       ├── hours/page.tsx
│   │       ├── menu/page.tsx
│   │       └── announcements/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/                   # Header, Footer, PublicLayout, JsonLdRestaurant
│   ├── home/                     # Hero, OpenClosedWidget, HoursSection, FeaturedProducts, AnnouncementsSection, MapEmbed
│   ├── admin/                    # ImageUpload, AdminGuard, AdminLogout
│   └── providers/                # FirebaseProvider
├── lib/
│   ├── firebase/                 # config, settings, hours, menu, announcements, admins, storage
│   └── defaults.ts
│   └── openClosed.ts
├── types/index.ts
├── firestore.rules
├── storage.rules
├── .env.local.example
└── package.json
```

## Stack

- **Next.js** (App Router) + TypeScript
- **TailwindCSS** + **Framer Motion**
- **Firebase** : Firestore, Storage, Auth
- **SEO** : JSON-LD Restaurant

## Prérequis

- Node.js 18+
- Compte Firebase (Firestore, Storage, Authentication)
- Compte Vercel

## Installation locale

```bash
npm install
cp .env.local.example .env.local
```

Renseigner dans `.env.local` les variables Firebase :

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Lancer le projet :

```bash
npm run dev
```

- Site : http://localhost:3000  
- Admin : http://localhost:3000/admin/login → connexion Firebase email/mot de passe

## Firebase

### Firestore

Créer les collections (elles se créent à la volée à la première écriture) :

- `settings` (doc `main`) : nom, téléphone, email, adresse, URLs carte / Facebook, hero…
- `hours` (doc `main`) : horaires par jour, timezone Europe/Paris
- `menuCategories` : catégories du menu
- `menuItems` : plats (categoryId, nom, prix, imageUrl, isHighlight…)
- `announcements` : annonces (titre, contenu, active, order)
- `admins` : un document par UID d’admin (champ quelconque, ex. `email`) pour autoriser l’accès admin en production

Déployer les règles Firestore :

```bash
firebase deploy --only firestore:rules
```

Fichier des règles : `firestore.rules` (à copier dans la console Firebase ou via CLI).

### Storage

- Préfixes utilisés : `hero/`, `menu/`
- Règles : lecture publique, écriture réservée aux utilisateurs authentifiés et type `image/*`

Déployer les règles Storage :

```bash
firebase deploy --only storage
```

Fichier : `storage.rules`.

### Auth (production)

1. Activer **Authentication** (Email/Password ou autre).
2. Créer un utilisateur admin.
3. Dans Firestore, créer le document `admins/{uid}` (uid = UID Firebase de cet utilisateur) avec un champ quelconque (ex. `email: "admin@example.com"`).

En production, seuls les utilisateurs dont l’UID est présent dans `admins` peuvent accéder à l’admin.

## Déploiement Vercel

1. **Importer le projet**  
   Sur [vercel.com](https://vercel.com), New Project → Import Git (GitHub/GitLab/Bitbucket) ou `vercel` en CLI.

2. **Variables d’environnement**  
   Dans **Settings → Environment Variables**, ajouter toutes les variables `NEXT_PUBLIC_FIREBASE_*` (et optionnellement `NEXT_PUBLIC_SITE_URL` = l’URL du site, ex. `https://chtidetour.fr`).

3. **Build**  
   - Build Command : `npm run build` (ou laisser par défaut)  
   - Output : framework Next.js détecté automatiquement.

4. **Déployer**  
   Chaque push sur la branche connectée déclenche un déploiement. Ou déploiement manuel :

   ```bash
   npx vercel
   ```

5. **Domaine**  
   Dans Vercel, ajouter un domaine personnalisé (ex. `www.chtidetour.fr`) et suivre les instructions DNS.

## Structure des pages

| Route | Description |
|-------|-------------|
| `/` | Accueil (hero, ouvert/fermé, produits en avant, horaires, annonces, carte) |
| `/menu` | Menu (catégories, recherche, badge « du moment ») |
| `/contact` | Téléphone, email, adresse, horaires, boutons Appeler / Itinéraire / Facebook |
| `/a-propos` | Texte + CTA |
| `/mentions-legales` | Mentions légales |
| `/confidentialite` | Politique de confidentialité |
| `/allergenes` | Infos allergènes |
| `/admin/login` | Connexion admin Firebase (email/mot de passe) |
| `/admin` | Tableau de bord admin |
| `/admin/settings` | Paramètres (contact, carte, hero, image) |
| `/admin/hours` | Horaires |
| `/admin/menu` | Catégories et plats (upload images) |
| `/admin/announcements` | Annonces |

## Boutons fonctionnels

- **Appeler** → `tel:${settings.phoneE164}`
- **Email** → `mailto:${settings.email}`
- **Itinéraire** → `settings.mapDirectionsUrl`
- **Facebook** → `settings.facebookUrl`
- **Voir le menu** → `/menu`
- **Admin Enregistrer** → écriture Firestore + toast
- **Upload images** → Firebase Storage, puis sauvegarde `imageUrl` / `storagePath`

## Licence

Projet privé – Tous droits réservés.
