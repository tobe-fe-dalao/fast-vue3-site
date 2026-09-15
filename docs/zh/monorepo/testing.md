# 测试与质量门禁

提交前执行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`typecheck` 会覆盖 7 个 web、7 个 site、`web-app`，以及 Vite 配置与 `vsh` 工具的 TypeScript 源码；`test` 会运行共享包单测，并构建、启动 Nitro 服务执行真实 HTTP 集成测试。

## 分层策略

- API 契约单测：断言业务方法映射到正确 URL、参数与 HTTP 方法；
- Nitro 集成测试：验证门户接口、联系表单和 CRUD 的真实响应；
- Java 单元测试：验证 Service 业务规则；
- MockMvc 测试：验证 JSON、分页、校验以及 401/403；
- Testcontainers：在 PostgreSQL 和 Redis 上验证迁移及持久化。

快速定位时可单独运行：

```bash
pnpm -F @fast-vue3/api test
pnpm -F @fast-vue3/backend-mock test
pnpm build:web-antd
pnpm build:site-antd
```

真实后端执行 `./mvnw test`；完整发布验证执行 `./mvnw clean verify`。
