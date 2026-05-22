# Development Workflow

## Daily Development

### Start a Single App

```bash
pnpm dev:antd   # Ant Design Vue
pnpm dev:ele    # Element Plus
pnpm dev:naive  # Naive UI
pnpm dev:arco   # Arco Design
pnpm dev:tdesign # TDesign
```

Turbo's `dev` task ensures `@fast-vue3/vite-config` is built first, then starts the Vite dev server.

### Modifying Shared Packages

Packages in `packages/*` expose TypeScript source directly, compiled by each app's Vite instance at runtime. Changes take effect immediately via HMR — no rebuild needed.

The only exception is `internal/vite-config`: after modification, rebuild is required:

```bash
pnpm -F @fast-vue3/vite-config build
# Or restart pnpm dev:xxx (turbo auto-builds dependencies first)
```

## Commit Convention

Uses Conventional Commits with the `czg` interactive wizard:

```bash
pnpm commit
```

Commit types:

| Type       | Description                       |
| ---------- | --------------------------------- |
| `feat`     | New feature                       |
| `fix`      | Bug fix                           |
| `refactor` | Code refactoring                  |
| `perf`     | Performance improvement           |
| `style`    | Code formatting (no logic change) |
| `test`     | Tests                             |
| `docs`     | Documentation                     |
| `chore`    | Build/toolchain changes           |
| `ci`       | CI config changes                 |

## Adding API Endpoints

1. Create or modify files under `apps/{app}/src/api/`
2. Call `http.get/post/put/del` methods (from `@fast-vue3/request`)
3. Use TypeScript generics to declare return types

Example:

```ts
import { http } from "../http";

export const demoApi = {
  getList: (params: { page: number; size: number }) =>
    http.get<{ list: Demo[]; total: number }>({ url: "/demo/list", params }),

  create: (data: CreateDemoDto) => http.post<Demo>({ url: "/demo", data }),
};
```

## Adding New Pages

Create `.vue` files under `apps/{app}/src/views/` — routes are automatically registered by `unplugin-vue-router`:

```
src/views/
├── index.vue           → /
├── login/
│   └── index.vue       → /login
├── dashboard/
│   └── index.vue       → /dashboard
└── settings/
    └── index.vue       → /settings  ← new page
```

Then add the corresponding menu item in the layout.

## Mock Data

Define mock data in each app's `mock/` directory (via `vite-plugin-mock`):

```ts
// mock/demo.ts
export default [
  {
    url: '/api/demo/list',
    method: 'get',
    response: () => ({
      code: 0,
      result: { list: [...], total: 10 },
      message: 'success',
    }),
  },
];
```

Mocks are enabled via `VITE_USE_MOCK=true` in `.env.development`.

## Code Quality

| Tool       | Config Package                 | When                     |
| ---------- | ------------------------------ | ------------------------ |
| ESLint     | `@fast-vue3/eslint-config`     | pre-commit (lint-staged) |
| Prettier   | `@fast-vue3/prettier-config`   | pre-commit (lint-staged) |
| Stylelint  | `@fast-vue3/stylelint-config`  | pre-commit (lint-staged) |
| commitlint | `@fast-vue3/commitlint-config` | commit-msg hook          |

All rule packages are maintained in `internal/lint-configs/`.
