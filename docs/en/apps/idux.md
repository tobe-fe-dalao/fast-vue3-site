# iDux

The `iDux` family contains `apps/web-idux` for administration and `apps/site-idux` for the public portal. Both reuse workspace API, request, store, preference, and style packages; only iDux providers and components stay application-specific.

```bash
pnpm dev:web-idux
pnpm dev:site-idux
pnpm build:web-idux
pnpm build:site-idux
```

Set `VITE_DEV_BACKEND=server` to use Spring Boot. Site content reads remain public, while comments and checkout use the shared authenticated client. Keep business behavior aligned with the other six UI variants when changing this adapter.

