# Main development and scaffolding

Install once with `pnpm install`, then use `pnpm dev` for the interactive selector or `pnpm dev:<app-name>` for one application. Use `VITE_DEV_BACKEND=server` during Spring Boot integration.

Create an application with:

```bash
pnpm create-app
pnpm -F @fast-vue3/vsh run stub
```

The scaffolder creates `apps/<name>` and adds only its explicit root dev/build commands. The stub rebuild matters because the executable loads `scripts/vsh/dist/index.mjs`.

Before delivery run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. Turbo caches package tasks but does not replace API integration tests.

