# 🔗 Guide : Configuration du Webhook Stripe

Ce guide vous explique comment configurer et récupérer le webhook secret Stripe pour votre intégration.

## 📋 Prérequis

- Un compte Stripe (test ou production)
- Votre site déployé sur Vercel (ou une URL accessible pour recevoir les webhooks)

## 🎯 Étapes de configuration

### Étape 1 : Accéder au Stripe Dashboard

1. Connectez-vous à votre [Stripe Dashboard](https://dashboard.stripe.com)
2. Assurez-vous d'être en mode **TEST** (toggle en haut à droite) pour les tests
3. Allez dans **Developers** (développeurs) dans le menu de gauche

### Étape 2 : Créer un endpoint webhook

1. Dans le menu **Developers**, cliquez sur **Webhooks**
2. Cliquez sur le bouton **Add endpoint** (Ajouter un point de terminaison)

### Étape 3 : Configurer l'URL du webhook

#### Pour la PRODUCTION (après déploiement sur Vercel)

Dans le champ **Endpoint URL**, entrez :
```
https://fks-facility.com/api/webhooks/stripe
```
*(Remplacez `fks-facility.com` par votre domaine réel)*

#### Pour le TEST LOCAL (développement)

Si vous testez en local, vous devez exposer votre serveur local. Voici plusieurs options :

##### 🎯 Option 1 : Stripe CLI (Recommandé - Solution officielle)

**Avantages** : Solution officielle Stripe, pas besoin de configurer le webhook dans le Dashboard, reçoit automatiquement tous les événements.

1. **Installer Stripe CLI** :
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Linux/Windows
   # Téléchargez depuis https://stripe.com/docs/stripe-cli
   ```

2. **Se connecter à votre compte Stripe** :
   ```bash
   stripe login
   ```
   Cela ouvrira votre navigateur pour vous authentifier.

3. **Démarrer votre serveur Vercel en local** :
   ```bash
   cd app
   vercel dev
   ```
   Le serveur démarre sur `http://localhost:3000`

4. **Dans un autre terminal, écouter les webhooks** :
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   
   Stripe CLI affichera un **webhook signing secret** (commence par `whsec_`). **Copiez-le** !

5. **Utiliser ce secret dans votre code local** :
   - Créez un fichier `.env.local` dans `app/` :
     ```
     STRIPE_WEBHOOK_SECRET=whsec_... (le secret affiché par Stripe CLI)
     ```
   - Ou exportez-le dans votre terminal :
     ```bash
     export STRIPE_WEBHOOK_SECRET=whsec_...
     ```

6. **Tester** : Les événements Stripe seront automatiquement forwardés vers votre serveur local !

> 💡 **Astuce** : Vous pouvez aussi déclencher des événements de test avec `stripe trigger checkout.session.completed`

##### Option 2 : ngrok (Alternative classique)

1. **Installer ngrok** :
   ```bash
   npm install -g ngrok
   # ou
   brew install ngrok
   ```

2. **Démarrer votre serveur Vercel en local** :
   ```bash
   cd app
   vercel dev
   ```
   Le serveur démarre sur `http://localhost:3000`

3. **Exposer avec ngrok** :
   ```bash
   ngrok http 3000
   ```

4. **Copier l'URL HTTPS** fournie par ngrok (ex: `https://abc123.ngrok.io`)

5. **Dans Stripe Dashboard**, entrez l'URL :
   ```
   https://abc123.ngrok.io/api/webhooks/stripe
   ```

##### Option 3 : Cloudflare Tunnel (Gratuit, sans limite)

1. **Installer cloudflared** :
   ```bash
   brew install cloudflare/cloudflare/cloudflared
   ```

2. **Démarrer votre serveur Vercel en local** :
   ```bash
   cd app
   vercel dev
   ```

3. **Créer un tunnel** :
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```

4. **Utiliser l'URL HTTPS** fournie dans Stripe Dashboard

##### Option 4 : localtunnel (Open source, gratuit)

1. **Installer localtunnel** :
   ```bash
   npm install -g localtunnel
   ```

2. **Démarrer votre serveur Vercel en local** :
   ```bash
   cd app
   vercel dev
   ```

3. **Créer un tunnel** :
   ```bash
   lt --port 3000
   ```

4. **Utiliser l'URL HTTPS** fournie dans Stripe Dashboard

### Étape 4 : Sélectionner les événements à écouter

Dans la section **Events to send** (Événements à envoyer), sélectionnez ces événements :

✅ **checkout.session.completed**  
✅ **payment_intent.succeeded**  
✅ **payment_intent.payment_failed**  
✅ **invoice.payment_succeeded**  
✅ **invoice.payment_failed**  
✅ **customer.subscription.created**  
✅ **customer.subscription.deleted**  
✅ **customer.subscription.updated**

> 💡 **Astuce** : Vous pouvez aussi sélectionner "Select all events" (Sélectionner tous les événements) puis désélectionner ceux que vous ne voulez pas.

### Étape 5 : Enregistrer le webhook

1. Cliquez sur **Add endpoint** (Ajouter le point de terminaison)
2. Le webhook est maintenant créé !

### Étape 6 : Récupérer le webhook secret

1. Sur la page du webhook que vous venez de créer, cliquez sur le webhook
2. Dans la section **Signing secret** (Secret de signature), vous verrez :
   - Un bouton **Reveal** (Révéler) ou **Click to reveal** (Cliquer pour révéler)
3. Cliquez dessus pour révéler le secret
4. **Copiez le secret** - il commence par `whsec_...`

> ⚠️ **Important** : Ce secret est comme un mot de passe. Ne le partagez jamais publiquement !

#### Exemple de webhook secret :
```
whsec_1234567890abcdef1234567890abcdef12345678
```

### Étape 7 : Ajouter le secret dans Vercel

1. Allez sur votre [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings** > **Environment Variables**
4. Ajoutez une nouvelle variable :
   - **Key** : `STRIPE_WEBHOOK_SECRET`
   - **Value** : `whsec_...` (le secret que vous venez de copier)
   - **Environments** : Sélectionnez Production, Preview, et Development
5. Cliquez sur **Save**
6. **Redeployez** votre application pour que la variable soit prise en compte

### Étape 8 : Vérifier que le webhook fonctionne

1. Dans Stripe Dashboard > Webhooks, cliquez sur votre webhook
2. Allez dans l'onglet **Recent events** (Événements récents)
3. Effectuez un test de paiement :
   - Utilisez la carte de test : `4242 4242 4242 4242`
   - Complétez un paiement sur votre site
4. Vous devriez voir l'événement apparaître dans la liste
5. Cliquez sur l'événement pour voir les détails :
   - ✅ Si vous voyez un code de réponse **200**, c'est que le webhook fonctionne !
   - ❌ Si vous voyez une erreur, consultez les logs dans Vercel Dashboard

## 🔍 Dépannage

### Le webhook ne reçoit pas les événements

**Vérifications** :
1. ✅ L'URL du webhook est correcte dans Stripe Dashboard
2. ✅ Votre site est bien déployé et accessible
3. ✅ Le webhook secret est bien configuré dans Vercel
4. ✅ Vous avez redéployé après avoir ajouté la variable d'environnement

**Test en local** :
- Si vous utilisez **Stripe CLI** : Vérifiez que `stripe listen` est toujours actif
- Si vous utilisez **ngrok** : Vérifiez que ngrok est toujours actif et que l'URL dans Stripe correspond
- Si vous utilisez un autre tunnel : Vérifiez qu'il est toujours actif
- Vérifiez que `vercel dev` est toujours en cours d'exécution

### Erreur "Webhook signature verification failed"

**Cause** : Le webhook secret ne correspond pas

**Solution** :
1. Vérifiez que le secret dans Vercel correspond exactement à celui dans Stripe
2. Vérifiez qu'il n'y a pas d'espaces avant/après le secret
3. Redéployez l'application après avoir corrigé

### Les événements n'apparaissent pas

**Solution** :
1. Dans Stripe Dashboard > Webhooks, cliquez sur votre webhook
2. Cliquez sur **Send test webhook** (Envoyer un webhook de test)
3. Sélectionnez un événement (ex: `checkout.session.completed`)
4. Cliquez sur **Send test webhook**
5. Vérifiez les logs dans Vercel Dashboard > Functions > Logs

## 📝 Résumé des URLs

### Mode PRODUCTION
- **URL webhook Stripe** : `https://fks-facility.com/api/webhooks/stripe`
- **À configurer dans** : Stripe Dashboard > Developers > Webhooks

### Mode TEST (local)
- **Avec Stripe CLI** : Pas besoin de configurer dans le Dashboard, utilisez `stripe listen`
- **Avec ngrok/tunnel** : `https://votre-url-tunnel.io/api/webhooks/stripe`
- **À configurer dans** : Stripe Dashboard > Developers > Webhooks (mode TEST) - uniquement si vous n'utilisez pas Stripe CLI

## ✅ Checklist

- [ ] Webhook créé dans Stripe Dashboard
- [ ] URL configurée (production ou tunnel pour les tests, ou Stripe CLI utilisé)
- [ ] 8 événements sélectionnés
- [ ] Webhook secret copié (commence par `whsec_`)
- [ ] Variable `STRIPE_WEBHOOK_SECRET` ajoutée dans Vercel
- [ ] Application redéployée sur Vercel
- [ ] Test effectué et événements reçus

## 🎯 Prochaines étapes

Une fois le webhook configuré :

1. **Testez avec une carte de test** :
   - Numéro : `4242 4242 4242 4242`
   - Date : Toute date future
   - CVC : `123`
   - Code postal : `75001`

2. **Vérifiez les emails** :
   - Email de confirmation reçu
   - Email admin reçu

3. **Vérifiez les logs** :
   - Vercel Dashboard > Functions > Logs
   - Stripe Dashboard > Webhooks > [Votre webhook] > Recent events

---

**Besoin d'aide ?** Consultez les logs dans Vercel Dashboard ou dans Stripe Dashboard pour voir les erreurs détaillées.

