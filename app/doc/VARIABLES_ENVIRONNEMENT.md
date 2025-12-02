# 📋 Variables d'environnement Vercel - Liste Complète et Vérifiée

Liste complète de **toutes** les variables d'environnement nécessaires, vérifiées dans le code.

## ✅ Variables FRONTEND (préfixe `VITE_`)

Ces variables sont utilisées côté client (frontend React).

| Variable | Utilisée dans | Description |
|----------|---------------|-------------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | - | Clé publique Stripe (pour Stripe.js côté client si nécessaire) |
| `VITE_STRIPE_PRICE_ID_STARTER` | `PricingSection.tsx` | Price ID Stripe pour le plan STARTER |
| `VITE_STRIPE_PRICE_ID_CROISSANCE` | `PricingSection.tsx` | Price ID Stripe pour le plan CROISSANCE |
| `VITE_STRIPE_PRICE_ID_ENTREPRISE` | `PricingSection.tsx` | Price ID Stripe pour le plan ENTREPRISE |
| `VITE_RESEND_API_KEY` | `src/lib/api.ts` | Clé API Resend pour les formulaires de contact (côté client) |
| `VITE_API_URL` | `src/lib/api.ts` | URL de l'API backend (optionnel, défaut: `/api`) |

### 💡 Valeurs recommandées

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
VITE_STRIPE_PRICE_ID_STARTER=price_xxxxxxxxxxxxx
VITE_STRIPE_PRICE_ID_CROISSANCE=price_xxxxxxxxxxxxx
VITE_STRIPE_PRICE_ID_ENTREPRISE=price_xxxxxxxxxxxxx
VITE_RESEND_API_KEY=re_xxxxxxxxxxxxx
VITE_API_URL=/api
```

## ✅ Variables BACKEND (sans préfixe)

Ces variables sont utilisées dans les fonctions serverless Vercel (`api/`).

| Variable | Utilisée dans | Description |
|----------|---------------|-------------|
| `STRIPE_SECRET_KEY` | `api/checkout/create-session.ts`<br>`api/webhooks/stripe.ts` | Clé secrète Stripe (NE JAMAIS exposer côté client) |
| `STRIPE_WEBHOOK_SECRET` | `api/webhooks/stripe.ts` | Secret de signature des webhooks Stripe |
| `RESEND_API_KEY` | `api/webhooks/stripe.ts` | Clé API Resend pour envoyer les emails automatiques |
| `RESEND_FROM_EMAIL` | `api/webhooks/stripe.ts` | Email d'expéditeur pour les emails automatiques |
| `ADMIN_EMAIL` | `api/webhooks/stripe.ts` | Email pour recevoir les notifications internes |
| `FRONTEND_URL` | `api/checkout/create-session.ts`<br>`lib/email-templates/*.ts` | URL du frontend (pour redirections et liens dans emails) |

### 💡 Valeurs recommandées

```env
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=FKS Facility <noreply@fks-facility.com>
ADMIN_EMAIL=franck.k@fks-facility.com
FRONTEND_URL=https://fks-facility.com
```

## 📝 Configuration dans Vercel Dashboard

### Étapes

1. Allez dans **Vercel Dashboard** > Votre projet > **Settings** > **Environment Variables**

2. Pour chaque variable, sélectionnez les environnements :
   - ✅ **Production**
   - ✅ **Preview** (recommandé)
   - ✅ **Development** (recommandé pour les tests locaux)

3. **Important** : Après avoir ajouté/modifié les variables, **redéployez** votre application !

## ✅ Checklist complète

### Variables Frontend (`VITE_`)
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` (optionnel si pas utilisé côté client)
- [ ] `VITE_STRIPE_PRICE_ID_STARTER`
- [ ] `VITE_STRIPE_PRICE_ID_CROISSANCE`
- [ ] `VITE_STRIPE_PRICE_ID_ENTREPRISE`
- [ ] `VITE_RESEND_API_KEY` (pour les formulaires de contact)
- [ ] `VITE_API_URL` (optionnel, défaut: `/api`)

### Variables Backend (fonctions serverless)
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET`
- [ ] `RESEND_API_KEY`
- [ ] `RESEND_FROM_EMAIL`
- [ ] `ADMIN_EMAIL`
- [ ] `FRONTEND_URL`

## 🔍 Où trouver les valeurs

### Stripe
- **Publishable Key** : Dashboard Stripe > Developers > API keys > Publishable key
- **Secret Key** : Dashboard Stripe > Developers > API keys > Secret key (Reveal)
- **Price IDs** : Dashboard Stripe > Products > [Votre produit] > Copy Price ID
- **Webhook Secret** : Dashboard Stripe > Developers > Webhooks > [Votre webhook] > Signing secret (Reveal)

### Resend
- **API Key** : Resend Dashboard > API Keys > Create API Key

### Domaine
- **FRONTEND_URL** : `https://fks-facility.com` (votre domaine de production)
- **RESEND_FROM_EMAIL** : Doit utiliser un domaine vérifié dans Resend

## ⚠️ Notes importantes

1. **Ne commitez JAMAIS** ces variables dans Git
2. **Sécurité** : Les clés secrètes (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`) ne doivent JAMAIS être exposées côté client
3. **Vercel** : Utilisez automatiquement `VERCEL_URL` si `FRONTEND_URL` n'est pas défini (mais il est préférable de le définir explicitement)
4. **Resend** : Le domaine dans `RESEND_FROM_EMAIL` doit être vérifié dans Resend Dashboard
5. **Redéploiement** : Après modification des variables, redéployez l'application

## 🧪 Test

Pour vérifier que tout fonctionne :

1. ✅ Les boutons "Choisir ce plan" fonctionnent (redirection vers Stripe Checkout)
2. ✅ Les formulaires de contact envoient des emails
3. ✅ Les webhooks Stripe reçoivent les événements
4. ✅ Les emails automatiques sont envoyés après les événements Stripe

---

**Toutes ces variables sont vérifiées dans le code et nécessaires au bon fonctionnement de l'application.**

