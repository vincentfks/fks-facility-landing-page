# 🚀 Configuration Stripe CLI pour le développement local

Ce guide vous explique comment utiliser Stripe CLI pour tester les webhooks localement sans ngrok.

## ✅ Vérification de l'installation

Stripe CLI est déjà installé sur votre système :
```bash
stripe --version
# Version actuelle : 1.32.0
```

## 🔐 Première utilisation : Connexion à Stripe

1. **Connectez-vous à votre compte Stripe** :
   ```bash
   stripe login
   ```
   Cela ouvrira votre navigateur pour vous authentifier.

2. **Vérifiez votre connexion** :
   ```bash
   stripe config --list
   ```

## 🎯 Utilisation avec ce projet

### Option 1 : Utiliser les scripts npm (Recommandé)

#### Terminal 1 : Démarrer le serveur Vercel
```bash
cd app
npm run vercel:dev
```

#### Terminal 2 : Écouter les webhooks Stripe
```bash
cd app
npm run stripe:listen
```

Cette commande va :
- Écouter tous les événements Stripe
- Les forwarder automatiquement vers `localhost:3000/api/webhooks/stripe`
- Afficher un **webhook signing secret** (commence par `whsec_...`)

### Option 2 : Commande directe

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 🔑 Configuration du Webhook Secret

Quand vous lancez `stripe listen`, vous verrez quelque chose comme :

```
> Ready! Your webhook signing secret is whsec_1234567890abcdef... (^C to quit)
```

**Important** : Copiez ce secret et ajoutez-le dans votre fichier `.env.local` :

```bash
# Créez ou éditez app/.env.local
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef...
```

> ⚠️ **Note** : Ce secret change à chaque fois que vous relancez `stripe listen`. Vous devez le mettre à jour dans `.env.local` à chaque fois.

## 🧪 Tester les webhooks

### Méthode 1 : Déclencher des événements de test

Une fois `stripe listen` actif, dans un autre terminal :

```bash
# Tester un checkout complété
npm run stripe:trigger:checkout

# Tester un paiement réussi
npm run stripe:trigger:payment

# Tester une souscription créée
npm run stripe:trigger:subscription
```

### Méthode 2 : Utiliser le Dashboard Stripe

1. Allez sur [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks)
2. Cliquez sur votre webhook local (il apparaît automatiquement)
3. Cliquez sur **Send test webhook**
4. Sélectionnez un événement et envoyez-le

### Méthode 3 : Faire un vrai paiement de test

1. Allez sur votre site local : `http://localhost:3000`
2. Utilisez la carte de test : `4242 4242 4242 4242`
3. Complétez un paiement
4. Les événements seront automatiquement forwardés vers votre serveur local

## 📋 Événements disponibles

Les scripts npm incluent ces événements de test :
- `checkout.session.completed` - Checkout complété
- `payment_intent.succeeded` - Paiement réussi
- `customer.subscription.created` - Souscription créée

Pour d'autres événements, utilisez :
```bash
stripe trigger <event_name>
```

Exemples :
```bash
stripe trigger payment_intent.payment_failed
stripe trigger invoice.payment_succeeded
stripe trigger customer.subscription.deleted
```

## 🔍 Voir les logs en temps réel

Quand `stripe listen` est actif, vous verrez tous les événements en temps réel :

```
2024-01-15 10:30:45  --> checkout.session.completed [evt_1234...]
2024-01-15 10:30:45  <-- [200] POST http://localhost:3000/api/webhooks/stripe [evt_1234...]
```

- `-->` = Événement reçu de Stripe
- `<--` = Réponse de votre serveur local
- `[200]` = Code de réponse HTTP (200 = succès)

## 🛠️ Commandes utiles

### Voir tous les événements disponibles
```bash
stripe trigger --help
```

### Écouter un événement spécifique
```bash
stripe listen --events checkout.session.completed,payment_intent.succeeded
```

### Voir les événements récents
```bash
stripe events list
```

### Voir les détails d'un événement
```bash
stripe events retrieve evt_1234567890
```

## 🚨 Dépannage

### Le webhook secret ne fonctionne pas

**Problème** : Erreur "Webhook signature verification failed"

**Solution** :
1. Vérifiez que vous avez copié le bon secret depuis `stripe listen`
2. Vérifiez qu'il est bien dans `.env.local` (pas `.env`)
3. Redémarrez `vercel dev` après avoir modifié `.env.local`

### Les événements n'arrivent pas

**Vérifications** :
1. ✅ `stripe listen` est toujours actif
2. ✅ `vercel dev` est toujours en cours d'exécution
3. ✅ Le port 3000 est bien utilisé
4. ✅ Vous êtes connecté à Stripe (`stripe login`)

### Le serveur ne répond pas

**Vérifications** :
1. Vérifiez que `vercel dev` fonctionne : `http://localhost:3000`
2. Testez l'endpoint manuellement : `curl http://localhost:3000/api/webhooks/stripe`
3. Vérifiez les logs dans le terminal où `vercel dev` tourne

## 📝 Workflow de développement recommandé

1. **Terminal 1** : `npm run vercel:dev`
2. **Terminal 2** : `npm run stripe:listen` (copiez le secret affiché)
3. **Terminal 3** (optionnel) : `npm run stripe:trigger:checkout` pour tester
4. Ouvrez votre site : `http://localhost:3000`
5. Testez un paiement avec la carte de test : `4242 4242 4242 4242`

## ✅ Avantages de Stripe CLI vs ngrok

- ✅ **Solution officielle** Stripe
- ✅ **Pas besoin de configurer** le webhook dans le Dashboard
- ✅ **Reçoit automatiquement** tous les événements
- ✅ **Déclenchement facile** d'événements de test
- ✅ **Logs en temps réel** des événements
- ✅ **Gratuit** et sans limite

---

**Besoin d'aide ?** Consultez la [documentation officielle Stripe CLI](https://stripe.com/docs/stripe-cli)

