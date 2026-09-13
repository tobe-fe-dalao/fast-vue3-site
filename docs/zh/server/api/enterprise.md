# 企业业务域

Java 服务按 `module/<业务域>/{api,service,persistence}` 纵向组织。Flyway `V9__enterprise_domains.sql` 增加企业域表和权限；PostgreSQL 保存业务状态，Redis 处理短期协调。响应遵循[统一契约](/zh/server/api/contracts)，前端客户端位于 `packages/effects/api/src/modules/enterprise.ts`。

## 租户、组织与部门

| 接口 | 用途 | 权限 |
| --- | --- | --- |
| `GET /api/v1/tenants` | 租户列表 | `admin` 角色及 `tenant:list` |
| `POST /api/v1/tenants` | 创建租户及管理员 | `admin` 角色及 `tenant:list` |
| `PUT /api/v1/tenants/{id}` | 修改名称、状态、套餐、到期时间 | `admin` 角色及 `tenant:list` |
| `GET /api/v1/organizations/current` | 当前组织 | `department:list` |
| `PUT /api/v1/organizations/{id}` | 修改组织 | `department:manage` |
| `GET /api/v1/departments` | 部门树 | `department:list` |
| `GET /api/v1/departments/{id}/members` | 部门成员 | `department:list` |
| `POST /api/v1/departments`、`PUT /api/v1/departments/{id}` | 创建、修改部门 | `department:manage` |
| `PUT`、`DELETE /api/v1/departments/{id}/members/{userId}` | 加入、移除成员 | `department:manage` |
| `DELETE /api/v1/departments/{id}` | 删除符合条件的部门 | `department:manage` |

已登录请求从签名 Access Token 获取 `tenantId`。MyBatis 对受保护表添加租户条件，服务层再检查业务访问。只有初始化的系统超级管理员有显式跨租户路径，普通租户管理员不能绕过。匿名 `/api/v1/public/**` 可用 `X-Tenant-Code` 选择有效租户；省略时使用 `default`。不存在、禁用或过期的租户会返回错误。

Java 登录和注册请求可传 `tenantCode`，不传时使用 `default`。当前前端 `LoginParams` 与登录表单尚未暴露此字段，因此现有页面只能登录默认租户。现在测试其他租户需直接调用 Java 认证接口并传入 `tenantCode`；前端切换租户还需要同步修改类型与界面。

## 项目与任务

| 接口 | 用途 | 权限 |
| --- | --- | --- |
| `GET /api/v1/projects`、`GET /api/v1/projects/{id}` | 可访问项目列表、详情 | `project:list` |
| `GET /api/v1/projects/{id}/activities` | 项目动态 | `project:list` |
| `POST /api/v1/projects` | 创建项目，必须带 `Idempotency-Key` | `project:create` |
| `PUT /api/v1/projects/{id}` | 修改项目，请求体带 `version` | `project:update` |
| `PUT /api/v1/projects/{id}/archive?version=N` | 归档项目 | `project:update` |
| `PUT`、`DELETE /api/v1/projects/{id}/members/{userId}` | 加入、移除成员 | `project:update` |
| `GET`、`POST /api/v1/projects/{id}/tasks` | 任务列表、新建任务 | `project:list` / `task:create` |
| `GET`、`PUT /api/v1/tasks/{id}` | 任务详情、修改；修改需 `version` | `project:list` / `task:update` |
| `GET`、`POST /api/v1/tasks/{id}/comments` | 评论列表、新增评论 | `project:list` |
| `GET /api/v1/tasks/{id}/activities` | 字段和状态变更记录 | `project:list` |

项目创建者自动成为负责人和成员；普通用户只能访问自己参与的项目。任务负责人必须是项目成员。归档项目不能新增任务或变更成员；仍有未完成任务的成员不能移出。项目、任务写入和动态记录在同一事务内。

任务状态为 `TODO → IN_PROGRESS → BLOCKED → IN_PROGRESS`，也允许 `IN_PROGRESS → DONE`；`TODO`、`IN_PROGRESS`、`BLOCKED` 可转为 `CANCELLED`。`DONE` 与 `CANCELLED` 为终态。优先级为 `LOW`、`MEDIUM`、`HIGH`、`URGENT`。过期 `version` 和非法状态转换返回 HTTP 409。

## 审批、通知、审计与文件

| 接口 | 用途 | 权限 |
| --- | --- | --- |
| `GET`、`POST /api/v1/approvals` | 可见审批、新建草稿 | 已登录 / `approval:create` |
| `POST /api/v1/approvals/{id}/submit` | 提交，需 `Idempotency-Key` | `approval:create` |
| `POST /api/v1/approvals/{id}/approve`、`/reject` | 处理当前步骤 | `approval:action` |
| `POST /api/v1/approvals/{id}/cancel` | 申请人取消草稿或待审批单 | `approval:create` |
| `GET /api/v1/notifications`、`/unread-count` | 个人通知及未读数 | 已登录 |
| `PUT /api/v1/notifications/{id}/read`、`/read-all` | 标记已读 | 已登录 |
| `GET /api/v1/audit/operations` | 请求操作元数据 | `audit:view` |
| `POST /api/v1/files` | 上传 multipart 字段 `file` | `file:upload` |
| `GET /api/v1/files/{tenantId}/{filename}` | 下载有权访问的文件 | 已登录 |
| `DELETE /api/v1/files/{tenantId}/{filename}` | 删除文件 | `file:upload` |

参考审批流为 `DRAFT → PENDING → APPROVED` 或 `REJECTED`；申请人可取消草稿或待审批单。提交前必须选择已有负责人的部门，先由部门负责人审批，再由管理员处理。通知在业务事务提交后生成。操作审计只记录请求元数据，与项目/任务动态分开，不保存请求体。当前文件实现使用按租户隔离的本地目录。

项目创建及审批提交的 `Idempotency-Key` 在 Redis 占用 24 小时。重复使用返回 HTTP 409，**不会**重放首次响应。不同命令应使用新键；如果网络故障时不确定写入是否完成，先读取资源再决定是否重试。

## 前端与 Mock 的边界

目前 `web-antd` 提供项目任务、审批、组织、租户、审计、文件和通知页面；其他 UI 应用共享 API 包，但不会自动拥有这些页面。Nitro 和浏览器内静态预览使用内存版 `createStaticEnterpriseApi`，用于验证路由与数据形状，不等同于 PostgreSQL 事务、Redis 协调、持久化文件或完整 Java 权限规则。验证业务行为请使用[真实后端联调](/zh/monorepo/backend-integration)。
