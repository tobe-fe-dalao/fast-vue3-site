# Element Plus

此 UI 系列包含後台 `apps/web-ele` 及入口網站 `apps/site-ele`。兩者重用 API、Request、Store、偏好及共用樣式，只保留 Element Plus 專屬 Provider 及組件。

```bash
pnpm dev:web-ele
pnpm dev:site-ele
pnpm build:web-ele
pnpm build:site-ele
```

使用 `VITE_DEV_BACKEND=server` 連接 Spring Boot。變更時需及另外六套 UI 維持相同業務功能。

