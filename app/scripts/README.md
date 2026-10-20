# Scripts

## inject-password-hash.js

Ce script génère le hash SHA-256 du mot de passe et l'injecte dans la variable d'environnement `VITE_SUPPLIERS_PASSWORD_HASH` pour protéger la page `/fournisseurs`.

### Configuration

1. Créez un fichier `.env` à la racine du dossier `app/` (si ce n'est pas déjà fait)

2. Ajoutez la variable d'environnement nécessaire pour le mot de passe :
   ```
   VITE_SUPPLIERS_PASSWORD=votre_mot_de_passe
   ```

**⚠️ Important :** Ne commitez jamais le fichier `.env` contenant le mot de passe en clair. Les fichiers `.env*` sont déjà dans `.gitignore`.

### Fonctionnement

- Le script lit le mot de passe depuis la variable d'environnement `VITE_SUPPLIERS_PASSWORD`
- Il génère un hash SHA-256 du mot de passe
- Il écrit le hash dans le fichier `.env.local` sous la forme `VITE_SUPPLIERS_PASSWORD_HASH=hash`
- Vite charge automatiquement cette variable d'environnement dans l'application React
- Le hash est utilisé par le composant React pour vérifier le mot de passe

### Utilisation

Le script est automatiquement exécuté lors de :
- `npm run dev` - En développement
- `npm run build` - Pour la production

**Note :** Le script échouera si `VITE_SUPPLIERS_PASSWORD` n'est pas défini, garantissant que la protection est toujours active.

### Sécurité

- Le mot de passe n'apparaît jamais dans le code source final
- Seul le hash SHA-256 est présent dans `.env.local` (qui n'est pas commité)
- Même si quelqu'un obtient le hash, il ne peut pas retrouver le mot de passe (SHA-256 est unidirectionnel)
- La session est stockée dans localStorage avec expiration après 24h
- Le hash est vérifié côté client via le hook `usePasswordProtection`

### Générer un hash manuellement

Si vous souhaitez générer un hash pour tester :

```bash
node -e "const crypto = require('crypto'); console.log(crypto.createHash('sha256').update('votre_mot_de_passe').digest('hex'));"
```

