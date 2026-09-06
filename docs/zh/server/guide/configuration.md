# 配置与部署

| 环境变量 | 用途 | 开发默认值 |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL JDBC 地址 | `jdbc:postgresql://localhost:5432/fastvue3` |
| `DATABASE_USERNAME` | 数据库用户 | `fastvue3` |
| `DATABASE_PASSWORD` | 数据库密码 | `fastvue3` |
| `REDIS_HOST` / `REDIS_PORT` | Refresh Token 存储 | `localhost` / `6379` |
| `JWT_SECRET` | JWT HMAC 密钥 | 仅供本地开发的默认值 |
| `ADMIN_PASSWORD` | 初始管理员密码 | dev 环境为 `admin123` |
| `CORS_ALLOWED_ORIGIN_PATTERNS` | 允许的前端来源 | `http://localhost:*` |

完整容器启动：

```bash
docker compose --profile app up -d --build
docker compose --profile app logs -f app
```

数据库结构由 `src/main/resources/db/migration` 下的 Flyway 脚本管理。已经发布的迁移只追加、不修改，避免不同环境校验和不一致。

生产检查清单：

- 替换 JWT 密钥与管理员密码；
- 收紧 CORS 来源；
- 使用外部 PostgreSQL、Redis 与密钥管理服务；
- 只暴露业务端口和必要的 Actuator 端点；
- 在发布流程执行 `./mvnw clean verify`。

后端文档统一维护在 `fast-vue3-site` 仓库。推送到该仓库 `main` 分支的文档变更由 `.github/workflows/deploy.yml` 使用 Node 22、pnpm 和 GitHub Pages Actions 自动构建发布。
