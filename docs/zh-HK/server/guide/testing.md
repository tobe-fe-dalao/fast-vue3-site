# 測試

```bash
./mvnw test
./mvnw clean verify
```

Service 測試驗證業務規則，MockMvc 驗證 JSON、參數、公開白名單、權限碼及統一 401/403，Testcontainers 在 Docker 可用時驗證 PostgreSQL、Redis、Flyway 及持久化。

`SiteInteractionControllerWebTest` 驗證評論公開讀取及評論/付款寫入需登入；`AnalyticsControllerPermissionTest` 驗證 `analytics:view` 及 `data:view`。

企業領域變更須在最後修改後執行 `./mvnw clean verify`。`TenantIsolationIntegrationTest` 檢查跨租戶讀取；`ProjectServiceTest`、`TaskStateTransitionTest`、`TaskOptimisticLockTest`、`ApprovalWorkflowTest`、`IdempotencyTest`、`SecurityAccessTest` 覆蓋個別業務及安全規則。文件建置只能驗證渲染及連結，不能代替 Java 或前端測試。
