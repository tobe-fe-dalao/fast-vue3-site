# Monorepo New Architecture

> This chapter describes the current architecture on the `main` branch — the long-term direction for Fast Vue3.

## Design Principles

1. **Low long-term maintenance cost** — Clear package boundaries, avoid over-abstraction
2. **Scalability** — Adding a new UI ecosystem = one new app
3. **Shared-first** — Infrastructure written once, reused everywhere
4. **Unified toolchain** — All apps share the same lint, tsconfig, vite-config

## Complete Directory Structure

```
fast-vue3/
├── apps/                             # UI ecosystem app layer
│   ├── web-antd/                     # Ant Design Vue (port 3001)
│   ├── web-ele/                      # Element Plus (port 3002)
│   ├── web-naive/                    # Naive UI (port 3003)
│   ├── web-arco/                     # Arco Design (port 3004)
│   └── web-tdesign/                  # TDesign Vue Next (port 3005)
│
├── packages/                         # Shared business packages
│   ├── @core/
│   │   └── shared/                   # Core types + constants
│   ├── utils/                        # Utility functions
│   ├── stores/                       # Pinia stores
│   ├── locales/                      # i18n resources
│   └── effects/
│       ├── request/                  # HTTP client
│       └── access/                   # Route access guard
│
├── internal/                         # Engineering infrastructure
│   ├── vite-config/                  # Vite config factory (requires pre-build)
│   ├── tsconfig/                     # Base TypeScript configs
│   └── lint-configs/
│       ├── eslint-config/
│       ├── prettier-config/
│       ├── stylelint-config/
│       └── commitlint-config/
│
├── scripts/clean.mjs
├── turbo.json
├── pnpm-workspace.yaml
├── eslint.config.mjs
├── unocss.config.ts
└── lefthook.yml
```

## Package Splitting Rationale

### `packages/@core/shared`

The lowest-level package — **depends on no other workspace packages**:

- Constants (TOKEN_KEY, LOCALE_KEY, etc.)
- Core TypeScript interfaces (IResponse, RoleType, ViteEnv)

### `packages/utils`

Pure utility functions, depends only on `@core/shared`:

- Auth: `getToken / setToken / clearToken`
- Date: `formatDate / formatDateTime`
- Helpers: `deepMerge / throttle / debounce`

### `packages/stores`

Pinia stores, depends on `@core/shared` and `utils`:

- `useUserStore` — token, userName, avatar, role (persisted)
- `useAppStore` — theme, locale, collapsed (persisted)

### `packages/effects/request`

HTTP client, depends on `@core/shared` and `utils`:

- `createHttpClient` — axios instance with interceptors
- `createRequest` — type-safe `{get, post, put, del}` wrapper

### `packages/effects/access`

Route guard, depends on `stores`:

- `setupAccessGuard` — global router guard
- `accessDirective` — `v-access` permission directive

### `internal/vite-config`

Engineering-only package, provides `defineConfig` factory. **Must be pre-compiled** because `vite.config.ts` runs in Node.js context (not Vite's bundler) and can't directly execute TypeScript.

## Key Technical Decisions

### Why do `packages/*` export TypeScript directly?

```json
{ "default": "./src/index.ts" }
```

Because they're only referenced from app source code processed by Vite, which can compile TypeScript natively. Direct TypeScript exports mean HMR works instantly when packages are modified.

### Why does `internal/vite-config` need pre-compilation?

```json
{ "import": "./dist/index.js" }
```

`vite.config.ts` runs in Node.js before Vite starts. Node.js ESM cannot execute `.ts` files, so the package must be compiled to `.js` first.

### Why share `unocss.config.ts` at root?

All apps use the same atomic CSS presets, shortcuts, and safelist. Centralizing this prevents style inconsistencies across UI ecosystems.
