# 配置与部署

| 环境变量 | 用途 | 开发默认值 |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL JDBC 地址 | `jdbc:postgresql://localhost:5432/fastvue3` |
| `DATABASE_USERNAME` | 数据库用户 | `fastvue3` |
| `DATABASE_PASSWORD` | 数据库密码 | `fastvue3` |
| `REDIS_HOST` / `REDIS_PORT` | Refresh Token、权限缓存、限流与幂等声明 | `localhost` / `6379` |
| `JWT_SECRET` | JWT HMAC 密钥 | 仅供本地开发的默认值 |
| `ADMIN_PASSWORD` | 初始管理员密码 | dev 环境为 `admin123` |
| `CORS_ALLOWED_ORIGIN_PATTERNS` | 允许的前端来源 | `http://localhost:*` |
| `FILE_STORAGE_ROOT` | 本地上传目录 | 系统临时目录下的 `fast-vue3-server/uploads` |
| `FILE_PUBLIC_BASE_URL` | 文件 URL 前缀 | `/api/v1/files` |
| `FILE_MAX_SIZE_BYTES` | 文件大小上限 | `10485760`（10 MiB） |

完整容器启动：

```bash
docker compose --profile app up -d --build
docker compose --profile app logs -f app
```

数据库结构由 `src/main/resources/db/migration` 下的 Flyway 脚本管理。已经发布的迁移只追加、不修改，避免不同环境校验和不一致。

当前文件适配器校验扩展名和 MIME，并检查受支持二进制格式的文件签名，只允许 PNG、JPEG、WebP、PDF 和纯文本，并写入按租户区分的本地目录。容器运行时应将 `FILE_STORAGE_ROOT` 指向持久卷；系统临时目录默认值只适合开发。Spring multipart 同样限制为 10 MB。`GET /actuator/health` 可匿名访问，`/actuator/metrics` 与 `/actuator/prometheus` 需要登录；响应包含便于关联日志的 `X-Request-Id`。

生产检查清单：

- 替换 JWT 密钥与管理员密码；
- 收紧 CORS 来源；
- 使用外部 PostgreSQL、Redis 与密钥管理服务；
- 只暴露业务端口和必要的 Actuator 端点；
- 在发布流程执行 `./mvnw clean verify`。

后端文档统一维护在 `fast-vue3-site` 仓库。推送到该仓库 `main` 分支的文档变更由 `.github/workflows/deploy.yml` 使用 Node 22、pnpm 和 GitHub Pages Actions 自动构建发布。
