# Guide de Configuration - FKS Facility Landing Page

## Configuration initiale

### 1. Installation des dépendances

```bash
cd app
npm install
```

### 2. Configuration des variables d'environnement

Créez un fichier `.env` dans le dossier `app/` avec le contenu suivant :

```env
# Resend API Configuration
VITE_RESEND_API_KEY=your_resend_api_key_here

# Stripe Configuration (optionnel pour l'instant)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here

# Frontend URL (pour les redirections)
VITE_FRONTEND_URL=http://localhost:3000
```

### 3. Configuration Resend

1. Créez un compte sur [Resend](https://resend.com)
2. Obtenez votre clé API dans le dashboard
3. Ajoutez-la dans votre fichier `.env` comme `VITE_RESEND_API_KEY`
4. **Important** : Pour la production, vous devez :
   - Vérifier un domaine dans Resend
   - Mettre à jour l'adresse `from` dans `app/src/lib/api.ts` :
     ```typescript
     from: 'FKS Facility <noreply@votre-domaine.com>',
     ```

### 4. Configuration Stripe (optionnel)

Pour activer les paiements Stripe :

1. Créez un compte sur [Stripe](https://stripe.com)
2. Obtenez votre clé publique (publishable key)
3. Ajoutez-la dans votre fichier `.env` comme `VITE_STRIPE_PUBLISHABLE_KEY`
4. **Note** : Pour la production, vous devrez créer un endpoint serveur pour utiliser la clé secrète Stripe de manière sécurisée.

## Démarrage du projet

### Mode développement

```bash
cd app
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Build production

```bash
cd app
npm run build
```

Les fichiers optimisés seront générés dans `app/dist/`

## Structure du projet

```
app/
├── src/
│   ├── components/     # Composants React réutilisables
│   ├── pages/          # Pages de l'application
│   ├── lib/            # Utilitaires (API, sécurité, utils)
│   ├── hooks/          # Custom React hooks
│   ├── styles/         # Styles globaux
│   └── types/          # Types TypeScript
├── public/             # Assets statiques
└── package.json
```

## Sécurité

Le projet inclut des mesures de sécurité de base :

- **Validation des données** : Utilisation de Zod pour valider tous les inputs
- **Sanitization** : Nettoyage des inputs pour prévenir les attaques XSS
- **Rate limiting** : Limitation du nombre de requêtes côté client
- **Headers de sécurité** : Meta tags de sécurité dans le HTML

## Notes importantes

- Les clés API doivent **jamais** être commitées dans Git
- Le fichier `.env` est déjà dans `.gitignore`
- Pour la production, configurez les variables d'environnement sur votre plateforme de déploiement (Vercel, Netlify, etc.)

