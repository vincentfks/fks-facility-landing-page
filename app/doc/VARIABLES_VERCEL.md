# 📋 Variables d'Environnement Vercel - Liste Finale

**Liste complète et vérifiée** des variables à créer dans Vercel Dashboard pour faire fonctionner Stripe, les webhooks, les formulaires Resend et le domaine fks-facility.com

---

## 🎯 Variables FRONTEND (préfixe `VITE_`)

Ces variables sont utilisées côté client (React). Sélectionnez **Production, Preview, Development** dans Vercel.

| Variable | Où l'utiliser | Valeur Exemple |
|----------|---------------|----------------|
| `VITE_STRIPE_PRICE_ID_STARTER` | Stripe Checkout - Plan STARTER | `price_xxxxxxxxxxxxx` |
| `VITE_STRIPE_PRICE_ID_CROISSANCE` | Stripe Checkout - Plan CROISSANCE | `price_xxxxxxxxxxxxx` |
| `VITE_STRIPE_PRICE_ID_ENTREPRISE` | Stripe Checkout - Plan ENTREPRISE | `price_xxxxxxxxxxxxx` |
| `VITE_RESEND_API_KEY` | Formulaires de contact | `re_xxxxxxxxxxxxx` |
| `VITE_API_URL` | URL de l'API (optionnel) | `/api` |

### ✅ Vérifié dans le code :
- ✅ `VITE_STRIPE_PRICE_ID_*` → `src/components/pricing/PricingSection.tsx`
- ✅ `VITE_RESEND_API_KEY` → `src/lib/api.ts`
- ✅ `VITE_API_URL` → `src/lib/api.ts`

---

## 🔐 Variables BACKEND (fonctions serverless - SANS préfixe)

Ces variables sont utilisées dans les fonctions serverless Vercel (`/api/*`). Sélectionnez **Production, Preview, Development** dans Vercel.

| Variable | Où l'utiliser | Valeur Exemple |
|----------|---------------|----------------|
| `STRIPE_SECRET_KEY` | Stripe API (Checkout + Webhooks) | `sk_live_xxxxxxxxxxxxx` |
| `STRIPE_WEBHOOK_SECRET` | Validation des webhooks Stripe | `whsec_xxxxxxxxxxxxx` |
| `RESEND_API_KEY` | Emails automatiques (webhooks) | `re_xxxxxxxxxxxxx` |
| `RESEND_FROM_EMAIL` | Email d'expéditeur | `FKS Facility <noreply@fks-facility.com>` |
| `ADMIN_EMAIL` | Notifications internes | `vincent@fks-facility.com` |
| `FRONTEND_URL` | Redirections et liens emails | `https://fks-facility.com` |

### ✅ Vérifié dans le code :
- ✅ `STRIPE_SECRET_KEY` → `api/checkout/create-session.ts`, `api/webhooks/stripe.ts`
- ✅ `STRIPE_WEBHOOK_SECRET` → `api/webhooks/stripe.ts`
- ✅ `RESEND_API_KEY` → `api/webhooks/stripe.ts`
- ✅ `RESEND_FROM_EMAIL` → `api/webhooks/stripe.ts`
- ✅ `ADMIN_EMAIL` → `api/webhooks/stripe.ts`
- ✅ `FRONTEND_URL` → `api/checkout/create-session.ts`, tous les templates d'email

---

## 📝 Instructions dans Vercel

### 1. Accéder aux variables d'environnement

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. **Settings** > **Environment Variables**

### 2. Ajouter chaque variable

Pour chaque variable ci-dessus :

1. Cliquez sur **Add New**
2. **Key** : Le nom de la variable (ex: `STRIPE_SECRET_KEY`)
3. **Value** : La valeur (ex: `sk_live_...`)
4. **Environments** : Sélectionnez ✅ Production, ✅ Preview, ✅ Development
5. Cliquez sur **Save**

### 3. Redéployer

Après avoir ajouté/modifié les variables, **redéployez** votre application :
- Via l'interface : Cliquez sur **Deployments** > **Redeploy**
- Via CLI : `vercel --prod`

---

## ✅ Checklist Complète

### Frontend (VITE_)
- [ ] `VITE_STRIPE_PRICE_ID_STARTER`
- [ ] `VITE_STRIPE_PRICE_ID_CROISSANCE`
- [ ] `VITE_STRIPE_PRICE_ID_ENTREPRISE`
- [ ] `VITE_RESEND_API_KEY`
- [ ] `VITE_API_URL` (optionnel : `/api`)

### Backend (fonctions serverless)
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET`
- [ ] `RESEND_API_KEY`
- [ ] `RESEND_FROM_EMAIL`
- [ ] `ADMIN_EMAIL`
- [ ] `FRONTEND_URL`

---

## 🔍 Où trouver les valeurs

### Stripe Dashboard
- **Price IDs** : Products > [Votre produit] > Copy Price ID (`price_...`)
- **Secret Key** : Developers > API keys > Secret key > Reveal (`sk_live_...`)
- **Webhook Secret** : Developers > Webhooks > [Votre webhook] > Signing secret > Reveal (`whsec_...`)

### Resend Dashboard
- **API Key** : [resend.com](https://resend.com) > API Keys > Create API Key (`re_...`)
- **From Email** : Doit utiliser un domaine vérifié dans Resend (ex: `noreply@fks-facility.com`)

### Domaine
- **FRONTEND_URL** : `https://fks-facility.com`
- **ADMIN_EMAIL** : `vincent@fks-facility.com` (ou l'email de votre choix)

---

## ⚠️ Important

1. **Ne partagez JAMAIS** les clés secrètes (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`)
2. **Redéployez** après chaque modification de variables
3. Le domaine dans `RESEND_FROM_EMAIL` doit être **vérifié** dans Resend
4. Les variables `VITE_*` sont **visibles côté client** (ne mettez pas de secrets)

---

**Total : 11 variables** (5 frontend + 6 backend)

