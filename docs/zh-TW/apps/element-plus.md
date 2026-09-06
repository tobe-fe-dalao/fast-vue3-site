# Element Plus

此 UI 系列包含後台 `apps/web-ele` 與入口網站 `apps/site-ele`。兩者重用 API、Request、Store、偏好與共用樣式，只保留 Element Plus 專屬 Provider 與元件。

```bash
pnpm dev:web-ele
pnpm dev:site-ele
pnpm build:web-ele
pnpm build:site-ele
```

使用 `VITE_DEV_BACKEND=server` 連接 Spring Boot。變更時需與另外六套 UI 維持相同業務功能。

