# Main 開發與腳手架

`pnpm dev` 提供互動選擇，`pnpm dev:<app>` 啟動單一應用。建立應用使用 `pnpm create-app`，工程工具變更後使用 `pnpm -F @fast-vue3/vsh run stub`。

`pnpm dev` 預設為 `pnpm dev:mock`：選擇前端並啟動 Nitro Mock。`pnpm dev:server` 選擇前端並連接獨立執行的 Java 服務；指定應用可用 `VITE_DEV_BACKEND=server pnpm dev:web-antd`。獨立 API 指令分別是 `pnpm dev:mock:api` 與 `pnpm dev:server:api`。

交付前執行 lint、typecheck、test 與完整 build。根 `pnpm typecheck` 也涵蓋 Vite 設定與 `vsh` TypeScript 原始碼。
