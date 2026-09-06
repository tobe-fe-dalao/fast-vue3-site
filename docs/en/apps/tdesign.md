# TDesign

The `TDesign` family contains `apps/web-tdesign` for administration and `apps/site-tdesign` for the public portal. Both reuse workspace API, request, store, preference, and style packages; only TDesign locale, theme, and components stay application-specific.

```bash
pnpm dev:web-tdesign
pnpm dev:site-tdesign
pnpm build:web-tdesign
pnpm build:site-tdesign
```

Set `VITE_DEV_BACKEND=server` to use Spring Boot. Site content reads remain public, while comments and checkout use the shared authenticated client. Keep business behavior aligned with the other six UI variants when changing this adapter.

