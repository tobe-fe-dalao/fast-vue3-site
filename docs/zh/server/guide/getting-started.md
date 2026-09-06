# 快速开始

## 环境

- JDK 21
- Docker 与 Docker Compose

## 启动

没有本机 Java 环境时，Docker Desktop 与 OrbStack 都可以直接使用同一套 Compose 命令：

```bash
cp .env.example .env
docker compose --profile app up -d --build
docker compose ps
docker compose logs -f app
```

这会在容器中同时启动 PostgreSQL、Redis 与 Java 应用。

需要修改 Java 代码并热启动时，再使用本机 JDK 21：

```bash
cp .env.example .env
docker compose up -d
./mvnw spring-boot:run
```

服务默认监听 `http://localhost:8080`。以下地址可用于检查状态：

- 健康检查：`GET /actuator/health`
- Swagger UI：`/swagger-ui.html`
- OpenAPI：`/v3/api-docs`

开发环境默认管理员为 `admin / admin123`。生产环境必须通过 `ADMIN_PASSWORD` 和 `JWT_SECRET` 提供安全值。

## 对接前端

在 `fast-vue3` 仓库运行：

```bash
VITE_FAST_VUE3_SERVER_URL=http://localhost:8080 pnpm dev:server
```

前端始终请求 `/api/v1`，共享 Vite 配置负责代理；页面不需要知道当前使用 Nitro Mock 还是真实服务。

## 文档

后端文档统一维护在 [fast-vue3-site](https://tobe-fe-dalao.github.io/fast-vue3-site/zh/server/)；`fast-vue3-server` 仓库本身不再包含 Node.js 或 VitePress 工具链。
