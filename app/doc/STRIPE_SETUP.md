# Configuration Stripe - Guide Complet

Ce guide vous explique comment configurer Stripe pour la section tarification de FKS Facility.

## 📋 Prérequis

1. Un compte Stripe (test ou production)
2. Un compte Resend pour l'envoi d'emails
3. Node.js 18+ installé
4. ngrok (pour le développement local)

## 🔧 Configuration Stripe Dashboard

### 1. Créer les produits et prix

1. Connectez-vous à votre [Stripe Dashboard](https://dashboard.stripe.com)
2. Allez dans **Products** > **Add product**
3. Créez 3 produits correspondant à vos plans tarifaires :

#### Plan STARTER (79€ HT/an)
- **Nom**: STARTER - Moins de 10 collaborateurs
- **Description**: Parfait pour les petites entreprises
- **Prix**: 79€ HT (95€ TTC) / an
- **Type**: Recurring (Annuel)
- **Copiez le Price ID** (commence par `price_`)

#### Plan CROISSANCE (129€ HT/an)
- **Nom**: CROISSANCE - 10 à 20 collaborateurs
- **Description**: Pour les moyennes entreprises
- **Prix**: 129€ HT (154.80€ TTC) / an
- **Type**: Recurring (Annuel)
- **Copiez le Price ID**

#### Plan ENTREPRISE (199€ HT/an)
- **Nom**: ENTREPRISE - 20 à 50 collaborateurs
- **Description**: Pour les grandes ambitions
- **Prix**: 199€ HT (238.80€ TTC) / an
- **Type**: Recurring (Annuel)
- **Copiez le Price ID**

### 2. Configuration des webhooks

#### Pour le TEST (développement local)

1. Installez ngrok : `npm install -g ngrok`
2. Démarrez le serveur backend : `cd app/server && npm run dev`
3. Dans un autre terminal, démarrez ngrok : `ngrok http 3001`
4. Copiez l'URL HTTPS fournie par ngrok (ex: `https://abc123.ngrok.io`)
5. Dans Stripe Dashboard > **Developers** > **Webhooks**
6. Cliquez sur **Add endpoint**
7. **Endpoint URL**: `https://votre-url-ngrok.io/api/webhooks/stripe`
8. **Description**: Webhook FKS Facility - Test
9. Sélectionnez ces événements :
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
10. Cliquez sur **Add endpoint**
11. **Important**: Copiez le **Signing secret** (commence par `whsec_`)

#### Pour la PRODUCTION

1. Dans Stripe Dashboard > **Developers** > **Webhooks**
2. Cliquez sur **Add endpoint**
3. **Endpoint URL**: `https://api.fks-facility.com/api/webhooks/stripe` (remplacez par votre domaine)
4. **Description**: Webhook FKS Facility - Production
5. Sélectionnez les mêmes événements que pour le test
6. Cliquez sur **Add endpoint**
7. **Important**: Copiez le **Signing secret** (commence par `whsec_`)

### 3. Récupérer les clés API

#### Pour le TEST

1. Dans Stripe Dashboard, assurez-vous que le mode **Test** est activé (toggle en haut)
2. Allez dans **Developers** > **API keys**
3. Copiez :
   - **Publishable key** (commence par `pk_test_`)
   - **Secret key** (commence par `sk_test_`) - Cliquez sur "Reveal test key"

#### Pour la PRODUCTION

1. Dans Stripe Dashboard, activez le mode **Live** (toggle en haut)
2. Allez dans **Developers** > **API keys**
3. Copiez :
   - **Publishable key** (commence par `pk_live_`)
   - **Secret key** (commence par `sk_live_`) - Cliquez sur "Reveal live key"

## 📧 Configuration Resend

1. Créez un compte sur [Resend](https://resend.com)
2. Allez dans **API Keys** > **Create API Key**
3. Donnez un nom à votre clé (ex: "FKS Facility Production")
4. Copiez la clé API (commence par `re_`)
5. Dans **Domains**, ajoutez et vérifiez votre domaine (ex: `fks-facility.com`)
6. Configurez les enregistrements DNS selon les instructions

## 🔐 Configuration des variables d'environnement

### 1. Frontend (.env dans `/app`)

```env
# URL du frontend
VITE_FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:3001

# Clé publique Stripe TEST
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique

# Price IDs Stripe TEST
VITE_STRIPE_PRICE_ID_STARTER=price_test_xxxxxxxxxxxxx
VITE_STRIPE_PRICE_ID_CROISSANCE=price_test_xxxxxxxxxxxxx
VITE_STRIPE_PRICE_ID_ENTREPRISE=price_test_xxxxxxxxxxxxx
```

### 2. Backend (.env dans `/app/server`)

```env
# Port du serveur
PORT=3001

# URL du frontend
FRONTEND_URL=http://localhost:5173

# Clé secrète Stripe TEST
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete

# Webhook secret TEST (depuis ngrok)
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret

# Resend
RESEND_API_KEY=re_votre_cle_resend
RESEND_FROM_EMAIL=FKS Facility <noreply@fks-facility.com>
ADMIN_EMAIL=franck.k@fks-facility.com
```

## 🚀 Démarrage

### 1. Installer les dépendances

```bash
# Frontend
cd app
npm install

# Backend
cd app/server
npm install
```

### 2. Configurer les variables d'environnement

```bash
# Frontend
cd app
cp .env.example .env
# Éditez .env avec vos valeurs

# Backend
cd app/server
cp ../.env.example .env
# Éditez .env avec vos valeurs
```

### 3. Démarrer les serveurs

```bash
# Terminal 1 - Frontend
cd app
npm run dev

# Terminal 2 - Backend
cd app/server
npm run dev

# Terminal 3 - Ngrok (pour le test local)
ngrok http 3001
```

## ✅ Test de l'intégration

1. Ouvrez http://localhost:5173 dans votre navigateur
2. Allez sur la page tarification
3. Cliquez sur "Choisir ce plan" pour un plan
4. Vous devriez être redirigé vers Stripe Checkout
5. Utilisez une carte de test Stripe :
   - **Numéro**: 4242 4242 4242 4242
   - **Date d'expiration**: n'importe quelle date future
   - **CVC**: n'importe quel 3 chiffres
   - **Code postal**: n'importe quel code postal
6. Complétez le paiement
7. Vérifiez :
   - Redirection vers la page de succès
   - Réception de l'email de confirmation
   - Webhook reçu dans Stripe Dashboard > Webhooks > [Votre endpoint] > Events

## 📝 Checklist Production

- [ ] Mode Live activé dans Stripe Dashboard
- [ ] Clés API Live configurées
- [ ] Webhook production configuré avec votre domaine
- [ ] Webhook secret production copié
- [ ] Domaine vérifié dans Resend
- [ ] Email d'expéditeur configuré avec domaine vérifié
- [ ] Variables d'environnement production configurées
- [ ] HTTPS activé sur votre serveur
- [ ] Tests effectués avec carte de test
- [ ] Monitoring des webhooks configuré

## 🔍 Dépannage

### Les webhooks ne sont pas reçus

1. Vérifiez que ngrok est actif (pour le test)
2. Vérifiez l'URL du webhook dans Stripe Dashboard
3. Vérifiez les logs du serveur backend
4. Vérifiez le webhook secret dans `.env`

### Les emails ne sont pas envoyés

1. Vérifiez la clé API Resend
2. Vérifiez que le domaine est vérifié dans Resend
3. Vérifiez les logs du serveur backend
4. Vérifiez que `RESEND_FROM_EMAIL` utilise un domaine vérifié

### Erreur "Invalid API Key"

1. Vérifiez que vous utilisez les bonnes clés (TEST vs LIVE)
2. Vérifiez que les clés sont bien copiées (sans espaces)
3. Vérifiez le mode activé dans Stripe Dashboard

## 📚 Ressources

- [Documentation Stripe](https://stripe.com/docs)
- [Documentation Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Documentation Resend](https://resend.com/docs)
- [Cartes de test Stripe](https://stripe.com/docs/testing)

