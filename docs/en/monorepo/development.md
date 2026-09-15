# Main development and scaffolding

Install once with `pnpm install`. `pnpm dev` defaults to `pnpm dev:mock`: select one frontend and run it with Nitro Mock. `pnpm dev:server` selects a frontend that proxies to the separately running Spring Boot API. For one application, use `pnpm dev:<app-name>` in Mock mode or prefix it with `VITE_DEV_BACKEND=server` in server mode.

Create an application with:

```bash
pnpm create-app
pnpm -F @fast-vue3/vsh run stub
```

The scaffolder creates `apps/<name>` and adds only its explicit root dev/build commands. The stub rebuild matters because the executable loads `scripts/vsh/dist/index.mjs`.

Before delivery run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. The root typecheck includes the Vite config and `vsh` TypeScript projects. Turbo caches package tasks but does not replace API integration tests.
