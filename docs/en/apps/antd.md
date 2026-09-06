# Ant Design Vue

The `Ant Design Vue` family contains `apps/web-antd` for administration and `apps/site-antd` for the public portal. Both reuse workspace API, request, store, preference, and style packages; only Ant Design Vue providers and components stay application-specific.

```bash
pnpm dev:web-antd
pnpm dev:site-antd
pnpm build:web-antd
pnpm build:site-antd
```

Set `VITE_DEV_BACKEND=server` to use Spring Boot. Site content reads remain public, while comments and checkout use the shared authenticated client. Keep business behavior aligned with the other six UI variants when changing this adapter.

