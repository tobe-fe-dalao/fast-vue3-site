# API 契約

所有業務端點使用 `/api/v1` 及統一回應：

```json
{"code":0,"message":"success","data":{}}
```

分頁固定包含 `items`、`page`、`pageSize`、`total`。健康檢查、OpenAPI、登入、註冊、更新 Token 及 `/api/v1/public/**` 可匿名使用，其餘預設需要 Access Token。
