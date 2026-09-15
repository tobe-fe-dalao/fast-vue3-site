# Choose a branch

Fast-Vue3 maintains two parallel branches. `polyrepo` is a single Vue application with build-time UI selection. `main` is a pnpm/Turbo workspace with independent admin and portal applications.

Use Node 22.18+ for a common development environment. Each branch declares its own pnpm version. Install from that branch’s lockfile after switching branches.

| Branch | Start command | UI selection | Mock login |
| --- | --- | --- | --- |
| polyrepo | `pnpm dev` | `VITE_UI_FRAMEWORK` | test / test |
| main | `pnpm dev:web-antd` | select an apps/* package | admin / 123456 |

Polyrepo runs on 127.0.0.1:5173 by default and includes DevUI. Main includes PrimeVue, seven admin apps, seven portal apps, web-app and backend-mock. In main, `pnpm dev` selects a frontend with Nitro Mock; `pnpm dev:server` selects one that connects to the independently started Java API. Polyrepo is not an archived branch. Production builds require a real backend.

```sh
pnpm install --frozen-lockfile
pnpm dev
```
