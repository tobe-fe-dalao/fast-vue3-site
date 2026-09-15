# 測試及品質門檻

```bash
pnpm lint
pnpm typecheck
pnpm -F @fast-vue3/api test
pnpm -F @fast-vue3/backend-mock test
pnpm build
```

API 測試驗證方法及路徑；Nitro 測試實際啟動 HTTP 服務，驗證匿名讀取、401、登入、評論及付款訂單。

`pnpm typecheck` 亦會檢查 `internal/vite-config` 及 `scripts/vsh`，避免 Mock 連接埠選擇及腳手架的型別錯誤被應用檢查漏掉。
