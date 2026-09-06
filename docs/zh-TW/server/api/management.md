# 管理端資料 API

Dashboard、Log、設定、部門、字典、通知與監控目前使用可替換的確定性示範資料並要求登入。分析與資料中心可能承載真實經營資料，因此另外要求 `analytics:view` 與 `data:view`。

資源 CRUD 使用對應的 `user:*`、`role:*`、`menu:*` 與 `content:*` 權限。401 與 403 都回傳統一 `ApiResponse`。
