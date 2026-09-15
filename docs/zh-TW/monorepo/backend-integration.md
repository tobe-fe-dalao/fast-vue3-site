# 真實後端聯調

Java 服務與 Nitro Mock 獨立執行。從 `fast-vue3` 專案使用 Docker Desktop 或 OrbStack 啟動 Java 服務：

```bash
pnpm dev:server:api
```

再執行 `pnpm dev:server` 互動選擇前端，或使用 `VITE_DEV_BACKEND=server pnpm dev:site-antd` 指定應用。`dev:server` 只啟動前端，不啟動 Java 或 Nitro Mock。內容與評論列表可匿名讀取；後台、評論送出與 Checkout 需要 Bearer Token。Mock 模式使用本機資料，不會呼叫 Java。

## 企業業務畫面

以 `VITE_DEV_BACKEND=server pnpm dev:web-antd` 啟動管理端，用 Java 服務的開發帳號 `admin / admin123` 登入。`web-antd` 現有專案任務、審批、組織、租戶、稽核、檔案與通知畫面；共用客戶端位於 `packages/effects/api/src/modules/enterprise.ts`，路由及權限見[企業業務領域](/zh-TW/server/api/enterprise)。

租戶隔離、成員限制、任務狀態、審批流程及持久化檔案須連接 Java 服務驗證。瀏覽器顯示 `/api/v1` 不能單獨證明上游身分，請同時檢查 Vite Proxy 與 Java 健康端點。Nitro 記憶體資料只用於 API 形狀聯調。

七個 `site-*` 的首頁、功能、產品、關於、文件、FAQ、部落格、定價及聯絡頁面使用共用 API。`web-app` 接入首頁、功能、關於、部落格列表及聯絡接口；其他六個 `web-*` 後台接入儀表板、分析、使用者及角色接口。上述企業業務畫面仍屬於 `web-antd`。
