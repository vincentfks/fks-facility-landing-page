# ⚡ Quick Start : Configuration Webhook Stripe

Guide rapide pour configurer le webhook Stripe en 5 minutes.

## 🚀 Étapes rapides

### 1️⃣ Accéder à Stripe Dashboard

1. Connectez-vous à [dashboard.stripe.com](https://dashboard.stripe.com)
2. Menu gauche : **Developers** > **Webhooks**
3. Cliquez sur **Add endpoint**

### 2️⃣ Configurer l'URL

**Production** (site déployé) :
```
https://fks-facility.com/api/webhooks/stripe
```

**Test local** (3 options) :

**Option 1 : Stripe CLI (Recommandé)** :
```bash
# Terminal 1 : Démarrer le serveur
cd app
vercel dev

# Terminal 2 : Écouter les webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copiez le webhook secret affiché (whsec_...)
# Ajoutez-le dans .env.local : STRIPE_WEBHOOK_SECRET=whsec_...
```

**Option 2 : ngrok** :
```bash
# Terminal 1 : Démarrer le serveur
cd app
vercel dev

# Terminal 2 : Exposer avec ngrok
ngrok http 3000

# Utilisez l'URL HTTPS de ngrok dans Stripe Dashboard :
https://abc123.ngrok.io/api/webhooks/stripe
```

**Option 3 : Cloudflare Tunnel** :
```bash
# Terminal 1 : Démarrer le serveur
cd app
vercel dev

# Terminal 2 : Créer un tunnel
cloudflared tunnel --url http://localhost:3000
```

### 3️⃣ Sélectionner les événements

Cochez ces 8 événements :
- ✅ checkout.session.completed
- ✅ payment_intent.succeeded
- ✅ payment_intent.payment_failed
- ✅ invoice.payment_succeeded
- ✅ invoice.payment_failed
- ✅ customer.subscription.created
- ✅ customer.subscription.deleted
- ✅ customer.subscription.updated

### 4️⃣ Récupérer le secret

1. Cliquez sur **Add endpoint**
2. Sur la page du webhook, cherchez **Signing secret**
3. Cliquez sur **Reveal** (Révéler)
4. **Copiez le secret** (commence par `whsec_...`)

### 5️⃣ Ajouter dans Vercel

1. Vercel Dashboard > Votre projet > **Settings** > **Environment Variables**
2. Ajoutez :
   - **Key** : `STRIPE_WEBHOOK_SECRET`
   - **Value** : `whsec_...` (le secret copié)
   - **Environments** : ✅ Production, ✅ Preview, ✅ Development
3. **Save** puis **Redeploy**

### 6️⃣ Tester

1. Stripe Dashboard > Webhooks > [Votre webhook] > **Send test webhook**
2. Sélectionnez `checkout.session.completed`
3. Cliquez sur **Send test webhook**
4. Vérifiez les logs dans Vercel Dashboard

## ✅ C'est fait !

Votre webhook est maintenant configuré. Les événements Stripe déclencheront automatiquement l'envoi d'emails.

---

**Besoin de plus de détails ?** Consultez `GUIDE_WEBHOOK_STRIPE.md`

