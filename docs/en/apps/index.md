# Apps Overview

Fast Vue3 contains 5 independent UI ecosystem apps. Each app:

- Has its own routing system
- Has its own layout and theme
- Shares all `packages/*` infrastructure
- Runs on a dedicated port

## App List

| App         | UI Framework         | Port | Command            |
| ----------- | -------------------- | ---- | ------------------ |
| web-antd    | Ant Design Vue 4.x   | 3001 | `pnpm dev:antd`    |
| web-ele     | Element Plus 2.x     | 3002 | `pnpm dev:ele`     |
| web-naive   | Naive UI 2.x         | 3003 | `pnpm dev:naive`   |
| web-arco    | Arco Design Vue 2.x  | 3004 | `pnpm dev:arco`    |
| web-tdesign | TDesign Vue Next 1.x | 3005 | `pnpm dev:tdesign` |

## Common Features

All apps implement the following:

### Authentication Flow

1. Unauthenticated user → auto-redirect to `/login`
2. Login success → fetch user profile → enter main layout
3. Logout → clear token → redirect to `/login`

Authentication logic is provided by `@fast-vue3/access`'s `setupAccessGuard`.

### Main Layout

All apps' `src/views/index.vue` includes:

- Collapsible sidebar navigation
- Top header (user info + logout)
- Content area (`<RouterView />`)

### File-based Routing

Using `unplugin-vue-router`, `.vue` files under `src/views/` are automatically mapped to routes.

### Mock API

Each app's `mock/` directory provides:

```
POST /api/user/login    → { token: 'mock-token-xxx' }
GET  /api/user/profile  → { userName, avatar, role }
POST /api/user/logout   → {}
```

## UI Isolation

UI components from different frameworks do not interfere with each other. Auto-imports are scoped to each app via the resolver in `vite.config.ts`.

## Adding a New UI Ecosystem

See [Add New UI Library](./add-new).
