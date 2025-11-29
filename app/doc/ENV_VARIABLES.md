# 🔐 Variables d'environnement

Ce document liste toutes les variables d'environnement nécessaires pour le projet.

## 📋 Créer votre fichier .env.local

Pour le développement local, créez un fichier `.env.local` dans le dossier `app/` avec ces variables :

```bash
# ============================================
# FRONTEND (préfixe VITE_ - exposées au client)
# ============================================

# Clé publique Stripe (commence par pk_test_ ou pk_live_)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Price IDs Stripe pour les 3 plans
VITE_STRIPE_PRICE_ID_STARTER=price_...
VITE_STRIPE_PRICE_ID_CROISSANCE=price_...
VITE_STRIPE_PRICE_ID_ENTREPRISE=price_...

# URL du frontend (pour les redirections)
VITE_FRONTEND_URL=http://localhost:3000

# ============================================
# BACKEND (fonctions serverless - non exposées)
# ============================================

# Clé secrète Stripe (commence par sk_test_ ou sk_live_)
STRIPE_SECRET_KEY=sk_test_...

# Webhook secret Stripe
# IMPORTANT pour le développement local avec Stripe CLI :
# 1. Lancez : npm run stripe:listen
# 2. Copiez le secret affiché (commence par whsec_...)
# 3. Ajoutez-le ici
STRIPE_WEBHOOK_SECRET=whsec_...

# Clé API Resend pour l'envoi d'emails
RESEND_API_KEY=re_...

# Email expéditeur (format : "Nom <email@domain.com>")
RESEND_FROM_EMAIL=FKS Facility <noreply@fks-facility.com>

# Email administrateur (reçoit les notifications)
ADMIN_EMAIL=franck.k@fks-facility.com

# URL du frontend (pour les liens dans les emails)
FRONTEND_URL=http://localhost:3000
```

## 🎯 Variables Frontend (VITE_*)

Ces variables sont exposées au client (dans le navigateur). Utilisez le préfixe `VITE_` pour que Vite les expose.

| Variable | Description | Exemple |
|----------|-------------|---------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe | `pk_test_51...` |
| `VITE_STRIPE_PRICE_ID_STARTER` | ID du prix pour le plan Starter | `price_123...` |
| `VITE_STRIPE_PRICE_ID_CROISSANCE` | ID du prix pour le plan Croissance | `price_456...` |
| `VITE_STRIPE_PRICE_ID_ENTREPRISE` | ID du prix pour le plan Entreprise | `price_789...` |
| `VITE_FRONTEND_URL` | URL du frontend | `http://localhost:3000` |

## 🔒 Variables Backend (Serverless)

Ces variables sont utilisées uniquement dans les fonctions serverless (API routes) et ne sont **pas** exposées au client.

| Variable | Description | Exemple |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Clé secrète Stripe | `sk_test_51...` |
| `STRIPE_WEBHOOK_SECRET` | Secret de signature des webhooks | `whsec_123...` |
| `RESEND_API_KEY` | Clé API Resend | `re_123...` |
| `RESEND_FROM_EMAIL` | Email expéditeur | `FKS Facility <noreply@fks-facility.com>` |
| `ADMIN_EMAIL` | Email administrateur | `franck.k@fks-facility.com` |
| `FRONTEND_URL` | URL du frontend (pour les emails) | `http://localhost:3000` |

## 🚀 Configuration pour le développement local

### 1. Créer le fichier .env.local

```bash
cd app
touch .env.local
```

### 2. Ajouter les variables

Copiez le template ci-dessus et remplissez avec vos valeurs de **TEST**.

### 3. Configurer STRIPE_WEBHOOK_SECRET avec Stripe CLI

**Option recommandée** : Utiliser Stripe CLI

1. Lancez Stripe CLI :
   ```bash
   npm run stripe:listen
   ```

2. Copiez le secret affiché (commence par `whsec_...`)

3. Ajoutez-le dans `.env.local` :
   ```
   STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef...
   ```

> ⚠️ **Important** : Ce secret change à chaque fois que vous relancez `stripe listen`. Vous devez le mettre à jour dans `.env.local` à chaque fois.

## 🌐 Configuration pour la production (Vercel)

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings** > **Environment Variables**
4. Ajoutez toutes les variables ci-dessus
5. Utilisez les clés **LIVE** (pas TEST) pour la production
6. Pour `STRIPE_WEBHOOK_SECRET`, utilisez le secret du Stripe Dashboard (pas de Stripe CLI)

## 📝 Notes importantes

### Mode TEST vs LIVE

- **Développement local** : Utilisez les clés `pk_test_...` et `sk_test_...`
- **Production** : Utilisez les clés `pk_live_...` et `sk_live_...`

### STRIPE_WEBHOOK_SECRET

- **Développement local** : Utilisez le secret de `stripe listen` (change à chaque fois)
- **Production** : Utilisez le secret du Stripe Dashboard (stable)

### Sécurité

- ⚠️ **Ne commitez JAMAIS** `.env.local` ou `.env` dans Git
- ✅ Ces fichiers sont déjà dans `.gitignore`
- ✅ Utilisez toujours des clés de TEST pour le développement local

## 🔍 Vérifier les variables

### En développement local

Les variables `VITE_*` sont accessibles dans le code frontend :
```typescript
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
```

Les variables backend sont accessibles dans les API routes :
```typescript
const secretKey = process.env.STRIPE_SECRET_KEY;
```

### Dans Vercel

Vérifiez que toutes les variables sont bien configurées dans Vercel Dashboard > Settings > Environment Variables.

## 📚 Documentation complète

- **`STRIPE_CLI_SETUP.md`** - Configuration Stripe CLI pour le développement local
- **`GUIDE_WEBHOOK_STRIPE.md`** - Configuration complète des webhooks
- **`README_STRIPE.md`** - Guide complet de l'intégration Stripe

