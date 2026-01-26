# 🤖 Configuration Claude pour Développement React/Node.js

Ce repository contient des fichiers de configuration pour garantir que Claude développe selon des standards stricts et cohérents.

## 📁 Fichiers Fournis

### 1. `.claude-project-config.md` - Configuration Complète (35+ pages)
Le guide de référence exhaustif avec :
- Architecture détaillée frontend/backend
- Exemples de code complets
- Bonnes pratiques TypeScript/React/Node.js
- Patterns de sécurité multi-tenant
- Tests, performance, déploiement

**Utilisation :** Documentation de référence complète. À compléter avec tes informations spécifiques.

### 2. `.claudeconfig` - Aide-Mémoire Concis (5 pages)
Version condensée avec les règles essentielles :
- Stack technique
- Règles absolues non-négociables
- Structures de code standards
- Checklist de sécurité
- Interdictions strictes

**Utilisation :** Référence rapide pendant le développement.

## 🚀 Mise en Place

### Étape 1 : Personnaliser les Configurations

Les fichiers contiennent des placeholders `[COMPLETER: ...]` à remplir :

```markdown
**Base de données :** [COMPLETER: PostgreSQL/MySQL via Supabase]
**Authentification :** [COMPLETER: Supabase Auth/Auth0/JWT custom]
**State Management :** [COMPLETER: Zustand/Redux/TanStack Query]
```

#### Sections Critiques à Compléter :

1. **Informations Projet** (`.claude-project-config.md` - début)
   - Nom du projet
   - Description
   - Public cible

2. **Stack Technique** (les deux fichiers)
   - Base de données exacte
   - Solution d'authentification
   - Gestion d'état choisie

3. **Variables d'Environnement** (`.claude-project-config.md` - section Déploiement)
   - Liste complète des env vars
   - Valeurs d'exemple (sans secrets!)

4. **Contacts & Ressources** (`.claude-project-config.md` - fin)
   - URLs des repos, docs, monitoring

### Étape 2 : Placer les Fichiers

```bash
# À la racine de ton projet
votre-projet/
├── .claudeconfig              # Référence rapide
├── docs/
│   └── .claude-project-config.md  # Config complète
├── src/
├── package.json
└── README.md
```

### Étape 3 : Référencer dans Claude

#### Option A : Claude.ai (Chat Web)

Lorsque tu démarres une conversation avec Claude :

```
Je travaille sur un projet React/Node.js. Lis d'abord le fichier 
.claudeconfig à la racine pour comprendre mes standards de développement. 
Respecte TOUJOURS ces règles.

[Puis uploade le fichier .claudeconfig]
```

#### Option B : Cline VS Code (Recommandé)

1. Installe l'extension [Cline](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)
2. Place `.claudeconfig` à la racine du projet
3. Cline le détectera automatiquement

#### Option C : Claude Projects (Claude.ai)

1. Crée un nouveau Project dans Claude.ai
2. Upload `.claudeconfig` dans la section "Project Knowledge"
3. Claude aura toujours accès aux règles

## 💡 Utilisation Pendant le Développement

### Commandes Utiles à Utiliser avec Claude

```
# Développement d'une feature
"Crée une nouvelle feature 'user-management' selon les standards 
du .claudeconfig. Inclus composants, services, et types."

# Revue de code
"Vérifie ce code par rapport aux standards du .claudeconfig. 
Identifie les violations et propose des corrections."

# Refactoring
"Refactor ce composant pour respecter la structure standard 
définie dans .claudeconfig section React."

# Debugging
"Ce code a un bug. Analyse selon les patterns de gestion d'erreurs 
du .claudeconfig et propose un fix."
```

### Template de Prompt Optimal

```
CONTEXTE: Je développe [description courte de la tâche]

STANDARDS: Respecte strictement le .claudeconfig :
- TypeScript strict (pas de any)
- Architecture en couches (routes→controllers→services)
- Isolation multi-tenant (organizationId obligatoire)
- Structure React standard (state→hooks→handlers→render)

DEMANDE: [ta demande spécifique]

LIVRABLE: Code complet, typé, testé, avec gestion d'erreurs.
```

## 🎯 Exemples de Prompts Efficaces

### 1. Créer un CRUD Complet

```
Crée un CRUD complet pour l'entité "Product" selon .claudeconfig :

Frontend (React):
- Composants : ProductList, ProductCard, ProductForm
- Hooks : useProducts, useCreateProduct, useUpdateProduct
- Types : Product, CreateProductInput, UpdateProductInput

Backend (Node.js):
- Routes : GET/POST/PUT/DELETE /api/products
- Controller : productController
- Service : productService avec logique métier
- Validator : Zod schemas

Requirements:
✅ Multi-tenant (organizationId partout)
✅ TypeScript strict
✅ Gestion d'erreurs ApiError
✅ Pagination sur la liste
✅ React Query pour cache
```

### 2. Refactor Code Existant

```
J'ai ce code qui ne respecte pas nos standards. Refactor selon .claudeconfig :

[colle ton code]

Focus sur :
1. Séparer logique métier et présentation
2. Ajouter typage strict
3. Implémenter gestion d'erreurs
4. Assurer isolation multi-tenant
5. Suivre structure de composant standard
```

### 3. Debug avec Standards

```
Ce composant a un bug [décris le bug].

Debug en respectant .claudeconfig :
- Vérifie la structure du composant
- Contrôle le typage TypeScript
- Examine les hooks (order, dependencies)
- Valide la gestion d'erreurs
- Propose un fix conforme aux standards
```

## 📋 Checklist de Qualité

Avant de merger du code généré par Claude :

### Code Review Checklist

```bash
# 1. Linting et Types
npm run lint         # ✅ Pas d'erreurs
npm run type-check   # ✅ Pas d'erreurs TypeScript

# 2. Tests
npm run test         # ✅ Tests passent

# 3. Build
npm run build        # ✅ Build réussit
```

### Manuel Checklist

- [ ] **TypeScript :** Aucun `any`, tous les types définis
- [ ] **Structure :** Respecte l'architecture en couches
- [ ] **Multi-tenant :** `organizationId` présent partout
- [ ] **Sécurité :** Validation des inputs (Zod), auth middleware
- [ ] **Performance :** Mémoïsation appropriée, pagination
- [ ] **Erreurs :** Gestion avec `ApiError`, pas de try/catch vides
- [ ] **Tests :** Cas nominal + edge cases couverts
- [ ] **Documentation :** JSDoc sur fonctions publiques
- [ ] **Nommage :** Conventions respectées (PascalCase, camelCase)
- [ ] **Imports :** Ordre standard, alias `@/` utilisés

## 🔄 Maintenir les Configurations

### Quand Mettre à Jour

1. **Nouvelles dépendances majeures**
   ```markdown
   # Ajouter dans Stack Technique
   **Cache:** Redis pour sessions
   **Queue:** BullMQ pour jobs asynchrones
   ```

2. **Nouveaux patterns adoptés**
   ```markdown
   # Ajouter dans Standards React
   ### Server Components (Next.js)
   - Utiliser 'use client' explicitement
   - Async components pour data fetching
   ```

3. **Leçons apprises**
   ```markdown
   # Ajouter dans Interdictions
   ❌ Mutations React Query sans invalidation
   ✅ Toujours invalider les queries après mutation
   ```

## 🆘 Troubleshooting

### Claude ne respecte pas les standards

**Solution 1 :** Rappel explicite
```
STOP. Relis le .claudeconfig section [X]. 
Ton code viole la règle [Y]. Corrige-le.
```

**Solution 2 :** Référence spécifique
```
Ce code doit respecter .claudeconfig ligne 150-170 
(Structure Composant React). Refactor complètement.
```

**Solution 3 :** Template exact
```
Utilise EXACTEMENT ce template du .claudeconfig :
[copie le template depuis le fichier]
```

### Claude dévie après plusieurs échanges

**Solution :** Rappel périodique
```
Avant de continuer, vérifie que tout le code généré 
jusqu'ici respecte le .claudeconfig. Liste les violations.
```

### Standards incomplets

**Solution :** Itération
```
Le .claudeconfig ne couvre pas [cas X]. 
Propose un standard cohérent avec l'existant, 
je l'ajouterai au config.
```

## 📚 Ressources Additionnelles

### Documentation Externe

- **React :** https://react.dev/learn
- **TypeScript :** https://www.typescriptlang.org/docs/
- **Node.js Best Practices :** https://github.com/goldbergyoni/nodebestpractices
- **Prisma :** https://www.prisma.io/docs
- **TanStack Query :** https://tanstack.com/query/latest

### Patterns Avancés

Voir `.claude-project-config.md` sections :
- Multi-tenant Architecture (ligne ~450)
- Performance Optimization (ligne ~800)
- Testing Strategy (ligne ~650)
- Security Patterns (ligne ~500)

## 🤝 Contribution

Pour améliorer ces configurations :

1. **Identifie un gap :** Pattern manquant, règle ambiguë
2. **Propose un ajout :** Standard clair avec exemples
3. **Teste :** Vérifie que Claude comprend et applique
4. **Documente :** Ajoute dans la section appropriée

## 📝 Notes Importantes

### ⚠️ Limitations de Claude

Claude peut :
- ✅ Générer du code conforme aux standards
- ✅ Refactor du code existant
- ✅ Identifier les violations
- ✅ Proposer des architectures

Claude ne peut PAS :
- ❌ Exécuter de tests
- ❌ Debugger en temps réel
- ❌ Accéder à ta base de données
- ❌ Déployer l'application

Tu dois toujours **tester et valider** le code généré.

### 🔒 Sécurité

**Ne partage JAMAIS dans .claudeconfig :**
- ❌ Clés API ou secrets
- ❌ Credentials de base de données
- ❌ Tokens d'accès
- ❌ Informations personnelles sensibles

Utilise des placeholders :
```markdown
JWT_SECRET=[COMPLETER: 32+ caractères aléatoires]
DATABASE_URL=[COMPLETER: Connection string Supabase]
```

## 🎓 Prochaines Étapes

1. ✅ Personnalise `.claude-project-config.md` avec tes choix
2. ✅ Place `.claudeconfig` à la racine du projet
3. ✅ Teste avec un prompt simple (ex: créer un composant)
4. ✅ Affine les règles selon tes besoins
5. ✅ Documente tes patterns spécifiques

---

**Besoin d'aide ?** Demande à Claude :
```
J'ai des questions sur l'utilisation du .claudeconfig pour [cas X]. 
Peux-tu m'expliquer la meilleure approche ?
```
