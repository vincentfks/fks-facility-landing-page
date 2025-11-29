# 🚀 Intégration Stripe - Guide Rapide

## ✅ Solution : Fonctions Serverless Vercel

Cette intégration utilise des **fonctions serverless** (Vercel Functions) au lieu d'un serveur backend. Parfait pour un site statique !

## 📋 Résumé

- ✅ **2 fonctions serverless** dans `app/api/`
- ✅ **7 templates d'email** dans `app/lib/email-templates/`
- ✅ **Intégration frontend** dans `PricingSection`
- ✅ **8 événements Stripe** gérés automatiquement

## 🔧 Configuration rapide

### 1. Variables d'environnement dans Vercel

Allez dans **Vercel Dashboard > Settings > Environment Variables** :

**Frontend** (préfixe `VITE_`) :
- `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
- `VITE_STRIPE_PRICE_ID_STARTER` = `price_...`
- `VITE_STRIPE_PRICE_ID_CROISSANCE` = `price_...`
- `VITE_STRIPE_PRICE_ID_ENTREPRISE` = `price_...`
- `VITE_FRONTEND_URL` = `https://fks-facility.com`

**Backend** (fonctions serverless) :
- `STRIPE_SECRET_KEY` = `sk_live_...`
- `STRIPE_WEBHOOK_SECRET` = `whsec_...`
- `RESEND_API_KEY` = `re_...`
- `RESEND_FROM_EMAIL` = `FKS Facility <noreply@fks-facility.com>`
- `ADMIN_EMAIL` = `franck.k@fks-facility.com`
- `FRONTEND_URL` = `https://fks-facility.com`

### 2. Stripe Dashboard

1. Créez les 3 produits (STARTER, CROISSANCE, ENTREPRISE)
2. Récupérez les **Price IDs** (`price_...`)
3. **Créez le webhook** :
   - Allez dans **Developers** > **Webhooks**
   - Cliquez sur **Add endpoint**
   - URL : `https://fks-facility.com/api/webhooks/stripe`
   - Sélectionnez ces événements :
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
   - Cliquez sur **Add endpoint**
   - **Important** : Cliquez sur **Reveal** dans la section "Signing secret" et copiez le secret (`whsec_...`)
   
   📖 **Guide détaillé** : Voir `GUIDE_WEBHOOK_STRIPE.md` pour les instructions complètes

### 3. Resend Dashboard

1. Créez une clé API
2. Vérifiez votre domaine
3. Configurez les DNS

### 4. Déployez sur Vercel

```bash
npm i -g vercel
cd app
vercel --prod
```

Ou connectez votre repo GitHub à Vercel pour un déploiement automatique.

## 🧪 Test local

```bash
# Installer Vercel CLI
npm i -g vercel

# Démarrer en mode dev
cd app
vercel dev
```

Le frontend sera sur `http://localhost:3000` et les API sur `http://localhost:3000/api/...`

## 📚 Documentation complète

- **`GUIDE_WEBHOOK_STRIPE.md`** - 🎯 **Guide complet pour configurer le webhook Stripe**
- **`SERVERLESS_SETUP.md`** - Guide détaillé de configuration
- **`STRIPE_SETUP.md`** - Configuration Stripe complète
- **`STRIPE_INTEGRATION_SUMMARY.md`** - Résumé de l'intégration

## ✅ Checklist de déploiement

- [ ] Variables d'environnement configurées dans Vercel
- [ ] Produits créés dans Stripe Dashboard
- [ ] Price IDs copiés dans les variables d'environnement
- [ ] Webhook créé dans Stripe Dashboard
- [ ] Webhook secret copié dans Vercel
- [ ] Domaine vérifié dans Resend
- [ ] Clé API Resend dans Vercel
- [ ] Projet déployé sur Vercel
- [ ] Test avec une carte de test Stripe (4242 4242 4242 4242)

## 🎯 Fonctionnalités

✅ Boutons "Choisir ce plan" fonctionnels  
✅ Redirection vers Stripe Checkout  
✅ Page de succès après paiement  
✅ Emails automatiques selon les événements  
✅ Webhooks gérés automatiquement  
✅ Design FKS sur tous les emails  

---

**Questions ?** Consultez la documentation détaillée dans `SERVERLESS_SETUP.md`

