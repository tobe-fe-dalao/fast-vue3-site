# Main Monorepo 架構

應用透過 `workspace:*` 使用本機套件，版本由 pnpm catalog 集中管理，Turbo 依套件圖排序建置。UI 專屬代碼留在對應應用，跨應用契約放在 `@fast-vue3/api`。

Vite 共用設定依 `VITE_DEV_BACKEND` 啟用 Nitro 或 Spring Boot Proxy。

