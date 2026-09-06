# 內容、網站、評論及付款

匿名端點包含首頁、產品、功能、價格、部落格、文章、評論列表、FAQ、文件、關於及聯絡表單。

需要登入的站點操作只有：

- `POST /api/v1/blog/{id}/comments`
- `POST /api/v1/payments/checkout`

公開讀取不呼叫 `SecurityUtils.currentUser()`；需要稽核欄位時使用 nullable 用戶 API。評論及付款訂單由 Flyway `V7__site_interactions.sql` 建立的資料表持久化。付款回傳 `pending` 訂單及示範 URL，不會真的扣款。
