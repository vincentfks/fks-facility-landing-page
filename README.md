# FKS Facility Landing Page

Landing page moderne et performante pour FKS Facility avec React + Vite.

## Structure du projet

```
fks-landing-page/
├── app/              # Application React + Vite
│   ├── src/
│   │   ├── components/  # Composants React
│   │   ├── pages/       # Pages de l'application
│   │   ├── lib/         # Utilitaires et API
│   │   ├── hooks/       # Custom React hooks
│   │   ├── styles/      # Styles globaux
│   │   └── types/       # Types TypeScript
│   ├── public/          # Assets statiques
│   └── package.json
└── README.md
```

## Prérequis

- Node.js 18+
- npm ou yarn

## Installation

```bash
cd app
npm install
```

## Configuration

1. Créez un fichier `.env` dans le dossier `app/` (copiez `.env.example`)
2. Configurez vos variables d'environnement :
   - `VITE_RESEND_API_KEY` : Clé API Resend pour l'envoi d'emails
   - `VITE_STRIPE_PUBLISHABLE_KEY` : Clé publique Stripe (pour les paiements)
   - `VITE_FRONTEND_URL` : URL du frontend (pour les redirections)

## Développement

```bash
cd app
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## Build production

```bash
cd app
npm run build
```

Les fichiers seront générés dans `app/dist/`

## Déploiement

Le frontend peut être déployé sur :
- Vercel
- Netlify
- Cloudflare Pages
- Tout hébergeur statique

## Technologies utilisées

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, React Router, React Hook Form, Zod
- **Email**: Resend API
- **Paiements**: Stripe (via Checkout)
- **Sécurité**: Validation Zod, Sanitization, Rate limiting client-side

## Sécurité

Le projet inclut des mesures de sécurité de base :
- Validation des données avec Zod
- Sanitization des inputs pour prévenir les attaques XSS
- Rate limiting côté client
- Validation des formats (email, téléphone)

## Notes importantes

- Les clés API sensibles (Resend, Stripe) doivent être configurées via les variables d'environnement
- Pour la production, assurez-vous de configurer un domaine vérifié dans Resend
- Les paiements Stripe nécessitent une implémentation serveur pour la sécurité (secret key)
