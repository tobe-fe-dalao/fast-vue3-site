# Packages Overview

The `packages/` directory contains all infrastructure packages shared across UI apps.

## Dependency Graph

```
@fast-vue3/shared          ← lowest level, no workspace dependencies
       │
       ├──▶ @fast-vue3/utils
       │           │
       │           └──▶ @fast-vue3/stores
       │                         │
       │                         └──▶ @fast-vue3/access
       │
       ├──▶ @fast-vue3/locales
       │
       └──▶ @fast-vue3/request
```

## Package List

| Package              | Path                       | Responsibility         |
| -------------------- | -------------------------- | ---------------------- |
| `@fast-vue3/shared`  | `packages/@core/shared`    | Core types & constants |
| `@fast-vue3/utils`   | `packages/utils`           | Pure utility functions |
| `@fast-vue3/stores`  | `packages/stores`          | Pinia stores           |
| `@fast-vue3/locales` | `packages/locales`         | i18n resources         |
| `@fast-vue3/request` | `packages/effects/request` | HTTP client            |
| `@fast-vue3/access`  | `packages/effects/access`  | Route access guard     |

## Design Principles

### Direct TypeScript Exports

All `packages/*` use direct TypeScript source exports:

```json
{
  "exports": { ".": { "types": "./src/index.ts", "default": "./src/index.ts" } }
}
```

This enables instant HMR when modifying package code during development.

### Clear Boundaries

- Each package exposes only necessary public APIs
- Implementation details are internal
- No circular dependencies

## Usage in Apps

```ts
import { TOKEN_KEY } from "@fast-vue3/shared";
import { getToken, formatDate } from "@fast-vue3/utils";
import { useUserStore } from "@fast-vue3/stores";
import { zhCN } from "@fast-vue3/locales";
import { createHttpClient, createRequest } from "@fast-vue3/request";
import { setupAccessGuard } from "@fast-vue3/access";
```
