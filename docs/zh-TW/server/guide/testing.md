# 測試

```bash
./mvnw test
./mvnw clean verify
```

Service 測試驗證業務規則，MockMvc 驗證 JSON、參數、公開白名單、權限碼與統一 401/403，Testcontainers 在 Docker 可用時驗證 PostgreSQL、Redis、Flyway 與持久化。

`SiteInteractionControllerWebTest` 驗證評論公開讀取及評論/付款寫入需登入；`AnalyticsControllerPermissionTest` 驗證 `analytics:view` 與 `data:view`。
