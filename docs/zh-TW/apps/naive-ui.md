# Naive UI

此 UI 系列包含後台 `apps/web-naive` 與入口網站 `apps/site-naive`。兩者重用 API、Request、Store、偏好與共用樣式，只保留 Naive UI 專屬 Provider 與元件。

```bash
pnpm dev:web-naive
pnpm dev:site-naive
pnpm build:web-naive
pnpm build:site-naive
```

使用 `VITE_DEV_BACKEND=server` 連接 Spring Boot。變更時需與另外六套 UI 維持相同業務功能。

