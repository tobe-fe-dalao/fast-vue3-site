# Arco Design

The `Arco Design` family contains `apps/web-arco` for administration and `apps/site-arco` for the public portal. Both reuse workspace API, request, store, preference, and style packages; only Arco global configuration and components stay application-specific.

```bash
pnpm dev:web-arco
pnpm dev:site-arco
pnpm build:web-arco
pnpm build:site-arco
```

Set `VITE_DEV_BACKEND=server` to use Spring Boot. Site content reads remain public, while comments and checkout use the shared authenticated client. Keep business behavior aligned with the other six UI variants when changing this adapter.

