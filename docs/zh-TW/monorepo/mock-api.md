# Mock API 與請求

`pnpm dev:mock` 啟動 Nitro 與前端，`pnpm dev:backend-mock` 只啟動 API。開發帳號是 `admin / 123456`。

`@fast-vue3/request` 附加 Token 並展開 `{ code, message, data }`；`@fast-vue3/api` 提供業務方法。公開讀取不需 Token，後台、評論送出與支付訂單需要登入。

