# 真实后端联调

`fast-vue3-server` 是与 Main 配套的 Spring Boot 3 参考后端，默认端口为 8080。Docker Desktop 与 OrbStack 都能在不安装本机 JDK 的情况下启动完整服务。

## 启动后端

```bash
cd ../fast-vue3-server
docker compose --profile app up -d --build
docker compose ps
```

如果本机已有 JDK 21，可用 `docker compose up -d` 只启动 PostgreSQL 与 Redis，再运行 `./mvnw spring-boot:run`。

开发账号为 `admin / admin123`。确认 `http://localhost:8080/actuator/health` 返回 `UP` 后，在前端仓库执行：

```bash
VITE_FAST_VUE3_SERVER_URL=http://localhost:8080 pnpm dev:server
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
