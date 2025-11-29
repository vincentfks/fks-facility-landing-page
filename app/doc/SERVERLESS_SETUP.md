# Configuration Stripe avec Fonctions Serverless (Vercel)

Cette intégration utilise des **fonctions serverless** (Vercel Functions) au lieu d'un serveur backend dédié. C'est parfait pour un site statique !

## 📋 Structure

```
app/
├── api/                          # Fonctions serverless Vercel
│   ├── checkout/
│   │   └── create-session.ts    # Créer session Stripe Checkout
│   └── webhooks/
│       └── stripe.ts            # Webhook Stripe
├── lib/
│   └── email-templates/         # Templates d'email TypeScript
└── src/                         # Frontend React
```

## 🔧 Configuration

### 1. Variables d'environnement Vercel

Dans votre projet Vercel, allez dans **Settings > Environment Variables** et ajoutez :

#### Variables Frontend (avec préfixe `VITE_`)
```
VITE_FRONTEND_URL=https://fks-facility.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_STRIPE_PRICE_ID_STARTER=price_...
VITE_STRIPE_PRICE_ID_CROISSANCE=price_...
VITE_STRIPE_PRICE_ID_ENTREPRISE=price_...
```

#### Variables Backend (sans préfixe, pour les fonctions serverless)
```
FRONTEND_URL=https://fks-facility.com
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=FKS Facility <noreply@fks-facility.com>
ADMIN_EMAIL=franck.k@fks-facility.com
```

### 2. Configuration Stripe Dashboard

1. **Créer les produits et prix** (3 produits)
2. **Créer un webhook endpoint**
   - URL: `https://fks-facility.com/api/webhooks/stripe`
   - Événements à sélectionner :
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
     - `customer.subscription.created`
     - `customer.subscription.deleted`
     - `customer.subscription.updated`
3. **Copier le webhook secret** dans les variables d'environnement Vercel

### 3. Configuration Resend

1. Créer une clé API dans Resend
2. Ajouter et vérifier votre domaine (`fks-facility.com`)
3. Configurer les enregistrements DNS
4. Ajouter la clé dans les variables d'environnement Vercel

## 🚀 Déploiement

### Avec Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
cd app
vercel

# Pour la production
vercel --prod
```

### Avec l'interface Vercel

1. Connectez votre repository GitHub/GitLab
2. Vercel détectera automatiquement le projet
3. Configurez les variables d'environnement
4. Déployez !

## 🧪 Test local avec Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Démarrer en mode dev (simule les fonctions serverless)
cd app
vercel dev

# Le frontend sera sur http://localhost:3000
# Les fonctions API seront sur http://localhost:3000/api
```

## ✅ Avantages des fonctions serverless

- ✅ Pas besoin de serveur dédié
- ✅ Auto-scaling automatique
- ✅ Payez uniquement ce que vous utilisez
- ✅ Déploiement simple avec Vercel
- ✅ HTTPS et CDN inclus
- ✅ Monitoring intégré

## 📝 URLs des endpoints

Une fois déployé sur Vercel :

- **Créer session Checkout**: `POST https://fks-facility.com/api/checkout/create-session`
- **Webhook Stripe**: `POST https://fks-facility.com/api/webhooks/stripe`

Les fonctions serverless sont automatiquement exposées sous `/api/*`.

## 🔍 Dépannage

### Les fonctions ne se déploient pas

- Vérifiez que `@vercel/node` est installé
- Vérifiez le fichier `vercel.json`
- Vérifiez les logs dans Vercel Dashboard

### Les webhooks ne fonctionnent pas

- Vérifiez l'URL du webhook dans Stripe Dashboard
- Vérifiez le webhook secret dans Vercel
- Vérifiez les logs de la fonction dans Vercel Dashboard > Functions

### Erreur "Module not found"

- Vérifiez que toutes les dépendances sont dans `package.json`
- Vérifiez que les imports sont corrects dans les fonctions

## 📚 Ressources

- [Documentation Vercel Functions](https://vercel.com/docs/functions)
- [Documentation Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Documentation Resend](https://resend.com/docs)

