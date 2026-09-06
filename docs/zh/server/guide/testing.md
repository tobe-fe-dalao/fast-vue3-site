# 测试策略

```bash
./mvnw test
./mvnw clean verify
```

测试分为三层：

1. Service 单元测试验证认证、角色和业务规则；
2. `@WebMvcTest` 验证 JSON 契约、参数校验、401/403 与公开接口白名单；
3. Testcontainers 集成测试使用真实 PostgreSQL 和 Redis 验证迁移与 CRUD。

新增接口至少应覆盖一个成功路径和一个错误/鉴权路径。分页接口还要断言 `items / page / pageSize / total`，避免前端在 Mock 与真实服务间切换时出现结构漂移。

门户公开接口测试位于 `module/portal/PortalControllerWebTest`，管理端聚合接口测试位于 `module/demo/DemoDataControllerWebTest`。
