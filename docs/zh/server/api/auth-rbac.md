# 认证与 RBAC

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/v1/auth/login` | 登录并返回 Access/Refresh Token |
| POST | `/api/v1/auth/register` | 注册普通用户，无需 Bearer Token |
| POST | `/api/v1/auth/refresh` | 轮换令牌 |
| POST | `/api/v1/auth/logout` | 撤销 Refresh Token |
| GET | `/api/v1/auth/me` | 当前用户、角色与权限 |
| GET/POST | `/api/v1/users` | 用户分页/创建 |
| GET/PUT/DELETE | `/api/v1/users/{id}` | 用户详情/更新/删除 |
| GET/POST | `/api/v1/roles` | 角色分页/创建 |
| GET/PUT/DELETE | `/api/v1/roles/{id}` | 角色详情/更新/删除 |
| GET | `/api/v1/permissions` | 权限列表 |
| GET | `/api/v1/menus` | 当前用户菜单树 |
| GET | `/api/v1/menus/tree` | 管理端完整菜单树 |

Access Token 放在 `Authorization: Bearer <token>`。Refresh Token 只用于刷新与登出，不应作为普通资源凭证。

JWT 过滤器只接受 `type=access`，Refresh Token 不能作为资源凭证。Spring Security 使用第一个匹配规则，因此公开白名单保持在 `anyRequest().authenticated()` 之前；401 与 403 都返回统一 `ApiResponse`。

`analytics:view` 与 `data:view` 分别保护经营分析和数据中心。`GET /api/v1/menus` 只要求登录，因为它返回当前用户自己的导航；`/menus/tree` 与菜单 CRUD 仍使用 `menu:*` 权限。
