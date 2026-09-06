# Main monorepo architecture

The main branch separates runnable applications from reusable platform code:

```text
apps/       admin, portal, and Nitro mock applications
packages/   API, request, stores, preferences, layout, access, styles, and types
internal/   Vite, TypeScript, lint, and Node tooling
scripts/    app launcher and scaffolding commands
```

Applications depend on packages through `workspace:*`; shared dependency versions use the pnpm catalog. Turbo orders builds through the package graph. UI-library code stays in its matching app, while cross-app contracts live in `@fast-vue3/api`.

Startup flows through the app Vite config into `@fast-vue3/vite-config`, which selects Nitro or the Spring proxy from `VITE_DEV_BACKEND`. Preferences set semantic CSS variables, and each UI adapter maps them to its provider.

