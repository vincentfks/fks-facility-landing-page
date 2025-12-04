# Scripts

## inject-password-hash.js

Ce script injecte le hash SHA-256 du mot de passe dans la page `fournisseurs.html` au build time.

### Configuration

1. Créez un fichier `.env` à la racine du dossier `app/` (si ce n'est pas déjà fait)

2. Ajoutez la variable d'environnement suivante :
```env
VITE_SUPPLIERS_PASSWORD=votre_mot_de_passe_ici
```

**⚠️ Important :** Ne commitez jamais le fichier `.env` contenant le mot de passe en clair. Le fichier `.env` doit être dans `.gitignore`.

### Fonctionnement

- Le script lit le mot de passe depuis `VITE_SUPPLIERS_PASSWORD`
- Il génère un hash SHA-256 du mot de passe
- Il remplace le placeholder `__PASSWORD_HASH_PLACEHOLDER__` dans `fournisseurs.html`
- Le hash est stocké dans le code, jamais le mot de passe en clair

### Utilisation

Le script est automatiquement exécuté lors de :
- `npm run dev` - En développement
- `npm run build` - Pour la production

### Sécurité

- Le mot de passe n'apparaît jamais dans le code source final
- Seul le hash SHA-256 est présent dans le HTML
- Même si quelqu'un obtient le hash, il ne peut pas retrouver le mot de passe (SHA-256 est unidirectionnel)
- La session est stockée dans localStorage avec expiration après 24h

### Générer un hash manuellement

Si vous souhaitez générer un hash pour tester :

```bash
node -e "const crypto = require('crypto'); console.log(crypto.createHash('sha256').update('votre_mot_de_passe').digest('hex'));"
```

