# 真实后端联调

`fast-vue3-server` 是与 Main 分开运行的 Spring Boot 3 参考后端，默认端口为 8080。Docker Desktop 与 OrbStack 都能在不安装本机 JDK 的情况下启动完整服务。从前端仓库执行：

## 启动后端

```bash
pnpm dev:server:api
```

如果本机已有 JDK 21，也可以在同级 `fast-vue3-server` 目录用 `docker compose up -d` 启动 PostgreSQL 与 Redis，再运行 `./mvnw spring-boot:run`。

开发账号为 `admin / admin123`。确认 `http://localhost:8080/actuator/health` 返回 `UP` 后，在前端仓库执行：

```bash
pnpm dev:server
```

如果只启动指定应用：

```bash
VITE_DEV_BACKEND=server pnpm dev:web-antd
VITE_DEV_BACKEND=server pnpm dev:site-antd
```

## 数据源切换

| 模式 | 命令 | 数据源 |
| --- | --- | --- |
| Mock | `pnpm dev:mock` | Nitro，默认 `localhost:5320` |
| Server | `pnpm dev:server` | Spring Boot，默认 `localhost:8080` |

两种模式都从浏览器访问 `/api/v1`，由 Vite 代理到目标服务。页面代码和 `@fast-vue3/api` 无需修改。

`pnpm dev:server` 只启动所选前端，不会启动 Java 或 Nitro Mock；需要其他 Java 地址时设置 `VITE_FAST_VUE3_SERVER_URL`。Mock 服务只返回本地模拟数据，不会转发到 Java。

## 站点鉴权边界

- 首页、产品、价格、博客、评论列表、FAQ、文档和关于页均可匿名读取；
- 联系表单允许匿名提交；
- 发表评论和创建支付订单需要登录并携带 Bearer Token；
- 价格页与博客页不强制登录，只在用户发起上述交互时跳转登录，成功后返回原页面。

## 排查顺序

1. 用浏览器网络面板确认请求路径以 `/api/v1` 开头；
2. 检查响应是否为 `{ code, message, data }`；
3. 登录后确认请求头包含 `Authorization: Bearer ...`；
4. 401 检查 Token，403 检查角色权限；
5. 对比分页字段是否为 `items / page / pageSize / total`。

## 企业业务页面

以 Server 模式启动 `web-antd`，可使用项目任务、审批、组织、租户、审计、文件和通知页面。请用 Java 服务的开发账号 `admin / admin123` 登录，不要使用 Nitro Mock 的 `admin / 123456`。共享客户端在 `packages/effects/api/src/modules/enterprise.ts`；完整路径与权限见[企业业务域](/zh/server/api/enterprise)。

租户隔离、项目成员、任务状态、审批步骤、文件访问和持久化行为应连接 Java 服务验证；Nitro 内存数据仅用于接口形状联调。浏览器看到 `/api/v1` 还不能证明请求到达哪个服务，应同时核对 Vite 代理配置和 Java 健康端点。企业域列表如项目、审批直接返回数组，不需要套用第 5 步的分页字段。

七个 `site-*` 应用的首页、特性、产品、关于、文档、FAQ、博客、定价和联系页面使用共享门户客户端。`web-app` 使用首页、特性、关于、博客列表和联系接口。其他六个 `web-*` 后台的仪表盘、分析、用户和角色页面接入 API；上述企业业务页面仍属于 `web-antd`。
