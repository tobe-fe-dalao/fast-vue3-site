# Mock API 與請求

`pnpm dev:mock` 啟動 Nitro 與前端，`pnpm dev:backend-mock` 只啟動 API。開發帳號是 `admin / 123456`。

`@fast-vue3/request` 附加 Token 並展開 `{ code, message, data }`；`@fast-vue3/api` 提供業務方法。公開讀取不需 Token，後台、評論送出與支付訂單需要登入。

企業路由由 `apps/backend-mock/api/v1/[...].ts` 呼叫記憶體 `createStaticEnterpriseApi`。Nitro 要求 Mock Access Token，並將大部分企業路徑限於 `admin` 模擬帳號；它不實作 Java 的完整權限、租戶隔離、交易或持久化。瀏覽器靜態預覽使用相同資料。業務規則請以[真實後端](/zh-TW/monorepo/backend-integration)驗證。
