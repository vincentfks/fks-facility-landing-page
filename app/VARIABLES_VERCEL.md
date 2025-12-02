# Variables d'environnement Vercel

## Réponse : Variable Vercel pour l'API ?

**NON**, pas de variable Vercel spécifique à configurer pour l'API.

- `VERCEL_URL` est automatiquement fourni par Vercel (utilisé comme fallback dans le code)
- Pas besoin de le configurer manuellement
- Le code utilise `FRONTEND_URL` en priorité, puis `VERCEL_URL` si non défini

## Variables à configurer

### FRONTEND (préfixe `VITE_`)
- `VITE_STRIPE_PRICE_ID_STARTER`
- `VITE_STRIPE_PRICE_ID_CROISSANCE`
- `VITE_STRIPE_PRICE_ID_ENTREPRISE`
- `VITE_RESEND_API_KEY`
- `VITE_API_URL` (optionnel: `/api`)

### BACKEND (fonctions serverless)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `ADMIN_EMAIL`
- `FRONTEND_URL` = `https://fks-facility.com`
