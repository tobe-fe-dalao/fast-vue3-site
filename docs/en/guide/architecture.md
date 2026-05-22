# Architecture Overview

Fast Vue3 is a **Vue3 Monorepo Engineering Platform**, not just another admin template. Its core positioning:

> A reusable Vue3 PC-side engineering foundation that integrates multiple mainstream admin UI ecosystems, serving as a long-term evolving frontend infrastructure platform.

## Engineering Layers

```
┌─────────────────────────────────────────────────────┐
│                     apps/                           │
│  web-antd  web-ele  web-naive  web-arco  web-tdesign│
│  (Independent apps — own routing, layout, theme)    │
└─────────────────┬───────────────────────────────────┘
                  │ depends on
┌─────────────────▼───────────────────────────────────┐
│                   packages/                         │
│  @core/shared  utils  stores  locales               │
│  effects/request  effects/access                    │
│  (Business foundation — shared by all apps)         │
└─────────────────┬───────────────────────────────────┘
                  │ tooling
┌─────────────────▼───────────────────────────────────┐
│                  internal/                          │
│  vite-config  tsconfig  lint-configs                │
│  (Engineering infrastructure — no business logic)   │
└─────────────────────────────────────────────────────┘
```

## Core Technical Decisions

### pnpm Workspace + Catalog

`pnpm-workspace.yaml` manages all dependency versions through the `catalog:` field:

```yaml
catalog:
  vue: ^3.5.17
  vite: ^7.3.3
  typescript: ^5.9.3
  # ... all UI library versions
```

All workspace packages reference `catalog:` in `package.json`, ensuring version consistency.

### Turbo Task Orchestration

`turbo.json` defines task dependencies:

```json
{
  "tasks": {
    "build": { "dependsOn": ["^build"] },
    "dev": { "dependsOn": ["^build"], "persistent": true, "cache": false }
  }
}
```

The `dependsOn: ["^build"]` in the `dev` task ensures that all dependency packages (especially `@fast-vue3/vite-config`) are pre-built before any app starts.

### vite-config Pre-compilation Strategy

`@fast-vue3/vite-config` is a special engineering package:

- Referenced in `apps/`' `vite.config.ts` files
- When Node.js executes `vite.config.ts`, it needs to load this package
- Therefore it **must be compiled to JS** — cannot export TypeScript source directly

Solution: Use `tsdown` (powered by Rolldown) to compile it to `dist/index.js`.

Other `packages/*` directly export TypeScript source (`"default": "./src/index.ts"`), processed by Vite during app builds.

### Port Allocation

| App         | UI Framework     | Port |
| ----------- | ---------------- | ---- |
| web-antd    | Ant Design Vue   | 3001 |
| web-ele     | Element Plus     | 3002 |
| web-naive   | Naive UI         | 3003 |
| web-arco    | Arco Design      | 3004 |
| web-tdesign | TDesign Vue Next | 3005 |

## App Internal Structure

Each `apps/*` app follows a consistent structure:

```
apps/web-{name}/
├── src/
│   ├── api/
│   │   ├── http.ts          # createHttpClient + createRequest instance
│   │   └── user/
│   │       └── index.ts     # User-related API
│   ├── plugins/
│   │   └── {name}.ts        # UI framework setup function
│   ├── router/
│   │   └── index.ts         # Router config + setupAccessGuard
│   ├── views/
│   │   ├── index.vue         # Main layout (sidebar + header)
│   │   ├── login/
│   │   │   └── index.vue    # Login page
│   │   └── dashboard/
│   │       └── index.vue    # Dashboard page
│   ├── App.vue
│   └── main.ts
├── mock/                     # Mock API data
├── types/
│   └── env.d.ts             # Environment variable type declarations
├── .env                     # Base env vars
├── .env.development         # Dev env vars
├── .env.production          # Prod env vars
├── tsconfig.json            # Extends @fast-vue3/tsconfig/web-app
└── vite.config.ts           # Uses @fast-vue3/vite-config defineConfig
```

## Shared Infrastructure

All apps share via `packages/*`:

- **@fast-vue3/shared** — Core types & constants
- **@fast-vue3/utils** — Auth utils, date formatting, helpers
- **@fast-vue3/stores** — Pinia stores (useUserStore/useAppStore) + persistedstate
- **@fast-vue3/locales** — zh-CN / en-US i18n resources
- **@fast-vue3/request** — Axios wrapper (createHttpClient/createRequest)
- **@fast-vue3/access** — Route access guard (setupAccessGuard) + v-access directive
