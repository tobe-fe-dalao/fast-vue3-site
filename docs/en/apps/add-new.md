# Add New UI Library

This guide explains how to quickly integrate a new Vue3 UI framework into the Fast Vue3 Monorepo.

## Steps Overview

1. Add the UI library version to the `pnpm-workspace.yaml` catalog
2. Create a new app directory under `apps/`
3. Configure `package.json`, `vite.config.ts`, etc.
4. Implement layout, login, and dashboard pages
5. Add mock data

## Detailed Steps

### 1. Add to Catalog

```yaml
# pnpm-workspace.yaml
catalog:
  my-ui-lib: ^1.0.0
```

### 2. Create App Directory

```bash
mkdir -p apps/web-myui/src/{api/user,plugins,router,views/{login,dashboard}}
mkdir -p apps/web-myui/{mock,types}
```

### 3. Configure vite.config.ts

```ts
import { defineConfig } from '@fast-vue3/vite-config';
import { MyUiResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(async () => ({
  application: {
    uiResolvers: [MyUiResolver()],
  },
  vite: {
    server: { port: 3006 },
  },
}));
```

### 4. Add Root Scripts

```json
{
  "scripts": {
    "dev:myui": "turbo dev --filter=@fast-vue3/web-myui",
    "build:myui": "pnpm run build --filter=@fast-vue3/web-myui"
  }
}
```

### 5. Install

```bash
pnpm install
pnpm dev:myui
```

## Reference Implementations

All 5 existing apps are good references:

- `apps/web-antd/` — Most complete reference (plugins, full dashboard)
- `apps/web-ele/` — Element Plus implementation
- `apps/web-naive/` — Naive UI (Provider pattern)
- `apps/web-arco/` — Arco Design
- `apps/web-tdesign/` — TDesign

Copy any of these as a starting point and modify accordingly.
