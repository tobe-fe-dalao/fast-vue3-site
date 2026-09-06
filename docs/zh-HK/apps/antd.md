# Ant Design Vue

此 UI 系列包含後台 `apps/web-antd` 及入口網站 `apps/site-antd`。兩者重用 API、Request、Store、偏好及共用樣式，只保留 Ant Design Vue 專屬 Provider 及組件。

```bash
pnpm dev:web-antd
pnpm dev:site-antd
pnpm build:web-antd
pnpm build:site-antd
```

使用 `VITE_DEV_BACKEND=server` 連接 Spring Boot。變更時需及另外六套 UI 維持相同業務功能。

