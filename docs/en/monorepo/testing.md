# Testing and quality gates

```bash
pnpm lint
pnpm typecheck
pnpm -F @fast-vue3/api test
pnpm -F @fast-vue3/backend-mock test
pnpm build
```

The API package test verifies shared client paths, methods, query parameters, and bodies. The backend-mock test exercises a running Nitro server over HTTP. The Spring project separately runs JUnit, MockMvc, Flyway, and Testcontainers checks.

For portal changes, cover both halves of the boundary: public content must succeed without local storage or a token, while comment submission and checkout must return 401 anonymously and succeed after login.
