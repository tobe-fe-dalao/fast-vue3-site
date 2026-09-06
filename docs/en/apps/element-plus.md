# Element Plus

The `Element Plus` family contains `apps/web-ele` for administration and `apps/site-ele` for the public portal. Both reuse workspace API, request, store, preference, and style packages; only Element Plus locale, theme, and components stay application-specific.

```bash
pnpm dev:web-ele
pnpm dev:site-ele
pnpm build:web-ele
pnpm build:site-ele
```

Set `VITE_DEV_BACKEND=server` to use Spring Boot. Site content reads remain public, while comments and checkout use the shared authenticated client. Keep business behavior aligned with the other six UI variants when changing this adapter.

