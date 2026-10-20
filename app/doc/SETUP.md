# Guide de Configuration - FKS Facility Landing Page

## Configuration initiale

### 1. Installation des dépendances

```bash
cd app
npm install
```

### 2. Configuration des variables d'environnement

Créez un fichier `.env.local` dans le dossier `app/` avec les variables nécessaires.

**⚠️ Important :** Les variables d'environnement sont sensibles et ne doivent jamais être commitées dans Git. Le fichier `.env.local` est déjà dans `.gitignore`.

Pour la configuration complète, consultez la documentation interne du projet.

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

- Les clés API et variables d'environnement sensibles ne doivent **jamais** être commitées dans Git
- Les fichiers `.env*` sont déjà dans `.gitignore`
- Pour la production, configurez les variables d'environnement sur votre plateforme de déploiement (Vercel, Netlify, etc.)
- Consultez la documentation interne pour la liste complète des variables requises

