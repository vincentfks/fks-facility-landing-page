# 🎯 Templates de Prompts - Ready to Use

Collection de prompts optimisés pour utiliser Claude avec le .claudeconfig

## 📋 Table des Matières

1. [Prompt Initial de Setup](#prompt-initial-de-setup)
2. [Créer une Feature Complète](#créer-une-feature-complète)
3. [CRUD Complet](#crud-complet)
4. [Refactoring Code](#refactoring-code)
5. [Review de Code](#review-de-code)
6. [Debug & Fix](#debug--fix)
7. [Tests](#tests)
8. [Documentation](#documentation)
9. [Migration](#migration)
10. [Optimisation Performance](#optimisation-performance)

---

## Prompt Initial de Setup

**Quand l'utiliser :** Première conversation ou nouveau contexte de dev

```
🤖 CLAUDE SETUP - LIS D'ABORD CECI

Je travaille sur un projet React/Node.js/TypeScript SaaS multi-tenant.

CONFIGURATION:
- Lis le fichier .claudeconfig à la racine du projet
- Respecte TOUJOURS ces standards sans exception
- Si tu dévies, explique pourquoi et propose une alternative conforme

RÈGLES CRITIQUES:
✅ TypeScript strict (jamais de any)
✅ Architecture en couches (routes→controllers→services→models)
✅ Multi-tenant (organizationId obligatoire dans TOUTES les requêtes DB)
✅ Gestion d'erreurs avec classe ApiError
✅ Named exports pour composants React
✅ Structure de composant standard (state→hooks→handlers→render)

PROJET:
- Frontend: React 18+ TypeScript, [TanStack Query/Zustand]
- Backend: Node.js Express TypeScript
- Database: [Supabase/Prisma + PostgreSQL]
- Auth: [Supabase Auth/JWT]

Confirme que tu as bien compris les standards avant qu'on commence.
```

---

## Créer une Feature Complète

### Template Générique

```
🎯 NOUVELLE FEATURE: [Nom de la feature]

DESCRIPTION:
[Décris ce que fait la feature en 2-3 phrases]

ARCHITECTURE:
Respecte strictement .claudeconfig avec:

Frontend (React):
- Dossier: src/features/[feature-name]/
- Composants: [liste les composants principaux]
- Hooks: [hooks custom nécessaires]
- Types: [types TypeScript]
- Services: [API calls]

Backend (Node.js):
- Routes: [liste les endpoints]
- Controller: [feature]Controller
- Service: [feature]Service (logique métier)
- Validators: Zod schemas pour validation
- Types: Types partagés avec frontend

REQUIREMENTS:
✅ Multi-tenant: organizationId partout
✅ TypeScript strict: interfaces pour tout
✅ Error handling: try/catch avec ApiError
✅ Validation: Zod schemas sur inputs
✅ Tests: Au moins cas nominal + 2 edge cases
✅ Performance: Pagination, mémoïsation si needed

USER STORIES:
1. [En tant que X, je veux Y pour Z]
2. [...]

Génère le code complet, feature par feature, en demandant validation entre chaque.
```

### Exemple Concret : Gestion de Produits

```
🎯 NOUVELLE FEATURE: Gestion des Produits

DESCRIPTION:
Permettre aux utilisateurs de créer, lister, modifier et supprimer des produits 
dans leur organisation. Chaque produit a un nom, description, prix, et statut.

ARCHITECTURE:

Frontend (React):
- Dossier: src/features/products/
- Composants:
  * ProductList.tsx (liste paginée)
  * ProductCard.tsx (carte produit)
  * ProductForm.tsx (création/édition)
  * ProductFilters.tsx (filtres)
- Hooks:
  * useProducts.ts (liste avec React Query)
  * useProduct.ts (détail)
  * useCreateProduct.ts (mutation)
  * useUpdateProduct.ts (mutation)
  * useDeleteProduct.ts (mutation)
- Types: src/features/products/types/product.types.ts
- Services: src/features/products/services/product.service.ts

Backend (Node.js):
- Routes: src/routes/products.routes.ts
  * GET /api/products (liste paginée + filtres)
  * GET /api/products/:id (détail)
  * POST /api/products (création)
  * PUT /api/products/:id (mise à jour)
  * DELETE /api/products/:id (suppression)
- Controller: src/controllers/product.controller.ts
- Service: src/services/product.service.ts
- Validators: src/validators/product.validator.ts (Zod)
- Model: via Prisma

REQUIREMENTS:
✅ Multi-tenant: organizationId dans WHERE sur toutes les queries
✅ Validation: Prix >= 0, nom 2-100 chars, status enum
✅ Permissions: Seuls admin/owner peuvent créer/modifier/supprimer
✅ Pagination: 20 items par page par défaut
✅ Filtres: Par statut, recherche nom/description
✅ Soft delete: deletedAt au lieu de vraie suppression
✅ React Query: Cache 5min, invalidation après mutations

USER STORIES:
1. En tant qu'admin, je veux créer un produit avec nom/prix pour l'ajouter au catalogue
2. En tant qu'utilisateur, je veux voir la liste des produits de mon organisation
3. En tant qu'admin, je veux filtrer les produits par statut
4. En tant qu'admin, je veux modifier un produit existant
5. En tant qu'admin, je veux désactiver (soft delete) un produit

PRISMA MODEL:
model Product {
  id             String    @id @default(cuid())
  name           String
  description    String?
  price          Float
  status         ProductStatus @default(ACTIVE)
  organizationId String
  createdBy      String
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  deletedAt      DateTime?
  
  organization   Organization @relation(fields: [organizationId], references: [id])
  creator        User         @relation(fields: [createdBy], references: [id])
  
  @@index([organizationId, status, deletedAt])
  @@map("products")
}

enum ProductStatus {
  ACTIVE
  INACTIVE
  DRAFT
}

Commence par le backend (model, service, controller, routes), 
puis frontend (types, services, hooks, composants).
Demande validation après chaque couche.
```

---

## CRUD Complet

```
🔧 CRUD COMPLET: [Entité]

Génère un CRUD complet suivant .claudeconfig pour l'entité: [Nom]

DONNÉES:
[Décris les champs de l'entité]
Exemple:
- id (UUID)
- name (string, 2-100 chars)
- email (email, unique dans organization)
- role (enum: admin, user)
- organizationId (UUID, foreign key)
- createdAt, updatedAt

STACK:
- Backend: Express + Prisma + Zod
- Frontend: React + TanStack Query + Zod

BACKEND (Génère en premier):
1. Prisma Model avec indexes
2. Types TypeScript
3. Zod validators (create, update schemas)
4. Service avec logique métier
5. Controller avec gestion erreurs
6. Routes avec middleware auth

FRONTEND (Génère ensuite):
1. Types (partagés avec backend)
2. API Service (axios/fetch calls)
3. React Query hooks (useList, useDetail, useCreate, useUpdate, useDelete)
4. Composants:
   - [Entity]List (liste paginée)
   - [Entity]Card (carte détail)
   - [Entity]Form (création/édition)
   - [Entity]DeleteDialog (confirmation suppression)

FEATURES:
✅ Pagination: 20 items/page
✅ Search: Par nom/email
✅ Filters: Par role/status
✅ Sort: Par createdAt desc
✅ Permissions: Vérifier role user
✅ Optimistic updates: UI réactive
✅ Error handling: Toast notifications

Génère le code fichier par fichier avec explications.
```

---

## Refactoring Code

```
♻️ REFACTOR CODE - STANDARDS .claudeconfig

J'ai du code qui ne respecte pas nos standards. Refactor selon .claudeconfig.

CODE ACTUEL:
```[langage]
[colle ton code ici]
```

PROBLÈMES IDENTIFIÉS:
[Liste ce que tu sais qui ne va pas, ou laisse Claude identifier]

OBJECTIFS REFACTOR:
1. ✅ TypeScript strict (supprimer any, ajouter types)
2. ✅ Séparer logique métier et présentation
3. ✅ Suivre structure standard (state→hooks→handlers→render pour React)
4. ✅ Architecture en couches (routes→controllers→services pour backend)
5. ✅ Multi-tenant: Ajouter organizationId si manquant
6. ✅ Error handling: Utiliser ApiError
7. ✅ Performance: Ajouter mémoïsation si needed
8. ✅ Nommage: Conventions .claudeconfig

LIVRABLE:
- Code refactoré complet
- Commentaires sur changements majeurs
- Migration guide si breaking changes

Procède par étapes, explique chaque changement.
```

### Exemple Spécifique

```
♻️ REFACTOR COMPOSANT REACT

Ce composant mélange logique métier et UI. Refactor selon .claudeconfig.

CODE ACTUEL:
```tsx
export default function UserList() {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {users.map((user: any) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

PROBLÈMES:
- Default export au lieu de named
- Type any
- Logique de fetch dans composant
- Pas de gestion d'erreur
- Pas de pagination
- Structure non standard

OBJECTIFS:
1. Named export + interface props
2. Types stricts
3. Hook custom useUsers avec React Query
4. Extraire UserCard en composant
5. Gestion erreur + loading + empty states
6. Structure standard .claudeconfig

Génère le code refactoré avec tous les fichiers nécessaires.
```

---

## Review de Code

```
🔍 CODE REVIEW - CHECKLIST .claudeconfig

Review ce code par rapport aux standards .claudeconfig.

CODE:
```[langage]
[code à review]
```

REVIEW CHECKLIST:

1. TypeScript ✅/❌
   - Pas de any
   - Types/Interfaces définis
   - Type inference approprié

2. Architecture ✅/❌
   - Séparation des responsabilités
   - Structure fichiers respectée
   - Imports organisés

3. Multi-tenant ✅/❌
   - organizationId présent
   - Isolation données

4. Sécurité ✅/❌
   - Validation inputs
   - Auth middleware
   - Pas de secrets exposés

5. Performance ✅/❌
   - Mémoïsation si needed
   - Pagination
   - Indexes DB

6. Tests ✅/❌
   - Cas nominaux couverts
   - Edge cases

7. Style ✅/❌
   - Nommage conventions
   - Formatting consistent

LIVRABLE:
- Note globale /10
- Liste violations avec gravité (🔴 critique, 🟡 important, 🟢 suggestion)
- Code corrigé pour violations critiques
- Recommandations

Sois strict, ce code ira en production.
```

---

## Debug & Fix

```
🐛 DEBUG + FIX - STANDARDS .claudeconfig

BUG DESCRIPTION:
[Décris le bug, comportement attendu vs actuel]

CODE PROBLÉMATIQUE:
```[langage]
[code avec le bug]
```

CONTEXTE:
- Environnement: [dev/staging/prod]
- Erreur console: [si applicable]
- Stack trace: [si disponible]

DEBUG PROCESS:
1. Analyse selon standards .claudeconfig
2. Identifie la cause racine
3. Vérifie:
   - Types TypeScript
   - Structure composant/service
   - Gestion d'erreurs
   - Multi-tenant (organizationId)
   - Hooks dependencies (React)
   - Async/await handling
4. Propose fix conforme aux standards

LIVRABLE:
- Cause racine expliquée
- Code fixé
- Tests pour éviter régression
- Prévention: comment éviter ce type de bug

Analyse étape par étape.
```

---

## Tests

```
🧪 GÉNÉRATION TESTS - STANDARDS .claudeconfig

Génère les tests pour ce code selon standards .claudeconfig.

CODE À TESTER:
```[langage]
[ton code]
```

FRAMEWORK:
- Frontend: Vitest + React Testing Library
- Backend: Vitest / Jest

COUVERTURE ATTENDUE:
✅ Cas nominal (happy path)
✅ Edge cases (limites, valeurs nulles)
✅ Error cases (erreurs attendues)
✅ Permissions (unauthorized, forbidden)
✅ Multi-tenant (isolation données)

STRUCTURE TESTS:
```typescript
describe('[Feature/Component]', () => {
  describe('[Méthode/Action]', () => {
    it('should [comportement attendu]', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

MOCKING:
- Backend: Mock Prisma
- Frontend: Mock API calls (MSW)
- Auth: Mock user context

Génère les tests complets avec setup/teardown si needed.
```

---

## Documentation

```
📚 GÉNÉRATION DOCUMENTATION

Documente ce code selon standards .claudeconfig.

CODE:
```[langage]
[code à documenter]
```

DOCUMENTATION ATTENDUE:

1. JSDoc pour fonctions publiques:
```typescript
/**
 * [Description courte]
 * 
 * [Description détaillée si complexe]
 * 
 * @param {Type} paramName - Description
 * @returns {Type} Description
 * @throws {ErrorType} Quand...
 * @example
 * const result = functionName(param);
 */
```

2. README.md pour feature:
- Overview
- Installation/Setup
- Usage examples
- API endpoints (si backend)
- Components (si frontend)
- Types/Interfaces
- Testing

3. Commentaires inline:
- Logique complexe
- Workarounds
- TODOs si applicable

Génère la documentation complète.
```

---

## Migration

```
🔄 MIGRATION GUIDE

Je migre de [stack A] vers [stack B] selon .claudeconfig.

MIGRATION:
From: [ex: JavaScript → TypeScript]
To: [ex: TypeScript strict]

OU

From: [ex: Context API → Zustand]
To: [ex: Zustand + React Query]

CODE EXISTANT:
```[langage]
[code à migrer]
```

OBJECTIFS:
1. Migrer progressivement (pas big bang)
2. Garder l'app fonctionnelle à chaque étape
3. Respecter standards .claudeconfig
4. Tests après chaque étape

LIVRABLE:
- Plan de migration (étapes)
- Code migré
- Guide de migration pour équipe
- Checklist validation
- Rollback strategy

Propose le plan d'abord, exécute après validation.
```

---

## Optimisation Performance

```
⚡ OPTIMISATION PERFORMANCE

Code à optimiser selon standards .claudeconfig:

```[langage]
[code actuel]
```

PROBLÈME:
[ex: Component re-rend trop souvent, API call lente, etc.]

MÉTRIQUES ACTUELLES:
[Si disponibles: temps chargement, render count, etc.]

ANALYSE:
1. Identifie les bottlenecks
2. Vérifie conformité .claudeconfig section Performance:
   - React: useMemo, useCallback, lazy loading
   - Backend: Indexes DB, pagination, caching
3. Propose optimisations

OPTIMISATIONS ATTENDUES:
✅ React: Mémoïsation appropriée
✅ Backend: Queries optimisées (N+1 problem)
✅ DB: Indexes sur colonnes filtrées
✅ Cache: React Query staleTime, Redis si needed
✅ Bundle: Code splitting, lazy loading

LIVRABLE:
- Code optimisé
- Comparaison avant/après
- Benchmarks si possible

Optimise sans sacrifier la lisibilité.
```

---

## 💡 Tips d'Utilisation

### 1. Adapter les Templates

Ces templates sont des points de départ. Adapte-les :
```
[Template ci-dessus]

SPÉCIFICITÉS MON PROJET:
- [Ajoute tes contraintes spécifiques]
- [Patterns particuliers]
- [Dépendances custom]
```

### 2. Combiner les Templates

Pour des tâches complexes, combine :
```
Utilise le template "Feature Complète" pour créer [X],
puis le template "Tests" pour couvrir les cas critiques,
et enfin "Documentation" pour le README.
```

### 3. Itérer

Pour gros projets :
```
[Template]

⚠️ Procède par petites étapes:
1. [Première partie]
2. Attends ma validation
3. [Deuxième partie]
4. etc.

Demande confirmation avant de passer à l'étape suivante.
```

### 4. Référence Rapide

Garde ces shortcuts sous la main :
```
📌 Rappel standards: "Vérifie que ce code respecte .claudeconfig section [X]"
📌 Fix violation: "Ce code viole .claudeconfig ligne [Y]. Corrige."
📌 Structure: "Utilise la structure standard .claudeconfig pour [composant/service]"
```

---

## 🎯 Template Ultime (Copie-Colle)

Pour démarrer rapidement n'importe quelle tâche :

```
🤖 TASK: [Description courte]

STANDARDS: .claudeconfig (.claudeconfig doit être présent dans le projet)

STACK: React TypeScript + Node Express + [ta DB]

REQUIREMENTS:
✅ TypeScript strict (pas de any)
✅ Architecture .claudeconfig (routes→controllers→services OU features/[x])
✅ Multi-tenant (organizationId obligatoire)
✅ Error handling (classe ApiError)
✅ Tests (cas nominal + edge cases)
✅ Performance (mémoïsation, pagination)

TASK DÉTAILS:
[Décris en détail ce que tu veux]

Génère le code complet, fichier par fichier.
Demande validation si ambiguïté.
```

---

**🚀 Pro Tip:** Sauvegarde tes templates personnalisés qui fonctionnent bien pour ton projet. Tu gagneras un temps fou !
