# Naive UI

The `Naive UI` family contains `apps/web-naive` for administration and `apps/site-naive` for the public portal. Both reuse workspace API, request, store, preference, and style packages; only Naive UI configuration providers stay application-specific.

```bash
pnpm dev:web-naive
pnpm dev:site-naive
pnpm build:web-naive
pnpm build:site-naive
```

Set `VITE_DEV_BACKEND=server` to use Spring Boot. Site content reads remain public, while comments and checkout use the shared authenticated client. Keep business behavior aligned with the other six UI variants when changing this adapter.

