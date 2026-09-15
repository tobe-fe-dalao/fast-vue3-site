# Applications

Fast-Vue3 maintains two parallel branches. `polyrepo` is a single Vue application with build-time UI selection. `main` is a pnpm/Turbo workspace with independent admin and portal applications.

| Application | Development command | Declared port |
| --- | --- | --- |
| `backend-mock` | `pnpm dev:mock:api` (`dev:backend-mock` alias) | 5320 |
| `site-antd` | `pnpm dev:site-antd` | — |
| `site-arco` | `pnpm dev:site-arco` | — |
| `site-ele` | `pnpm dev:site-ele` | — |
| `site-idux` | `pnpm dev:site-idux` | — |
| `site-naive` | `pnpm dev:site-naive` | — |
| `site-primevue` | `pnpm dev:site-primevue` | — |
| `site-tdesign` | `pnpm dev:site-tdesign` | — |
| `web-antd` | `pnpm dev:web-antd` | 3001 |
| `web-app` | `pnpm dev:web-app` | 3008 |
| `web-arco` | `pnpm dev:web-arco` | 3002 |
| `web-ele` | `pnpm dev:web-ele` | 3003 |
| `web-idux` | `pnpm dev:web-idux` | 3007 |
| `web-naive` | `pnpm dev:web-naive` | 3004 |
| `web-primevue` | `pnpm dev:web-primevue` | 3006 |
| `web-tdesign` | `pnpm dev:web-tdesign` | 3005 |

The seven `site-*` portals read public content through `@fast-vue3/api` and submit contact, comments, and checkout through the same client. `web-app` uses the public home, features, about, blog list, and contact methods. All seven `web-*` admins use API data for dashboard, analytics, user, and role views; `web-antd` additionally provides enterprise workflows. Start any single frontend in server mode with `VITE_DEV_BACKEND=server pnpm dev:<app-name>` after starting Java independently.

[Workflow](/en/monorepo/development)
