# API 契約

所有業務端點使用 `/api/v1` 與統一回應：

```json
{"code":0,"message":"success","data":{}}
```

分頁固定包含 `items`、`page`、`pageSize`、`total`。健康檢查、OpenAPI、登入、註冊、更新 Token 與 `/api/v1/public/**` 可匿名使用，其餘預設需要 Access Token。

專案、審批等列表直接回傳陣列。日期欄位通常為 `yyyy-MM-dd`，時間戳使用 ISO-8601 或端點指定的格式。狀態大小寫依資源而定：租戶、組織與部門使用 `active / disabled`；專案、任務與審批使用 `ACTIVE`、`IN_PROGRESS`、`PENDING` 等大寫值。

Java 服務的錯誤使用對應 HTTP 狀態與非零 `code`；`@fast-vue3/request` 解開成功的 `data`，並將錯誤轉為 Promise rejection。檔案下載回傳二進位內容，並非 JSON 信封。詳見[企業業務領域](/zh-TW/server/api/enterprise)。
