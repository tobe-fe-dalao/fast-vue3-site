# PrimeVue

The `PrimeVue` family contains `apps/web-primevue` for administration and `apps/site-primevue` for the public portal. Both reuse workspace API, request, store, preference, and style packages; only PrimeVue theme presets and components stay application-specific.

```bash
pnpm dev:web-primevue
pnpm dev:site-primevue
pnpm build:web-primevue
pnpm build:site-primevue
```

Set `VITE_DEV_BACKEND=server` to use Spring Boot. Site content reads remain public, while comments and checkout use the shared authenticated client. Keep business behavior aligned with the other six UI variants when changing this adapter.

