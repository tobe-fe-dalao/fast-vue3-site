# 管理端数据接口

以下接口为 web 应用提供可替换的演示数据，均需要登录：

- `GET /api/v1/dashboard/stats`
- `GET /api/v1/analytics/overview`
- `GET /api/v1/data/overview`
- `GET /api/v1/log/login`
- `GET /api/v1/log/operation`
- `GET /api/v1/log/error`
- `GET /api/v1/config/list`
- `GET /api/v1/dept/list`
- `GET /api/v1/dict/list`
- `GET /api/v1/notice/list`
- `GET /api/v1/monitor/online`
- `GET /api/v1/monitor/server`

当前演示聚合接口使用确定性的内存数据，让所有 UI 变体都能联调。迁移到数据库或监控平台时应保持响应类型不变，这样前端页面无需修改。

`GET /api/v1/analytics/overview` 需要 `analytics:view`，`GET /api/v1/data/overview` 需要 `data:view`。迁移 `V8__analytics_permissions.sql` 会把两项权限授予管理员角色。
