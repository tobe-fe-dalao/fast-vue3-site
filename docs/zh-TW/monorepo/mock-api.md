# Mock API 與請求

`pnpm dev:mock` 為所選前端啟動 Nitro Mock；`pnpm dev:mock:api` 只啟動 5320 連接埠的 Mock API，`pnpm dev:backend-mock` 是別名。開發帳號是 `admin / 123456`。Mock 在本機產生回應，不會呼叫 `fast-vue3-server`。

`@fast-vue3/request` 附加 Token 並展開 `{ code, message, data }`；`@fast-vue3/api` 提供業務方法。公開讀取不需 Token，後台、評論送出與支付訂單需要登入。

企業路由由 `apps/backend-mock/api/v1/[...].ts` 呼叫記憶體 `createStaticEnterpriseApi`。Nitro 要求 Mock Access Token，並將大部分企業路徑限於 `admin` 模擬帳號；它不實作 Java 的完整權限、租戶隔離、交易或持久化。瀏覽器靜態預覽使用相同資料。業務規則請以[真實後端](/zh-TW/monorepo/backend-integration)驗證。

七個 `site-*` 的公開內容頁面使用共用入口網站 API；`web-app` 接入首頁、功能、關於、部落格列表與聯絡接口。其他六個 `web-*` 後台的儀表板、分析、使用者與角色頁面也使用 API 資料。Mock 不會把這些請求轉送至 Java。
