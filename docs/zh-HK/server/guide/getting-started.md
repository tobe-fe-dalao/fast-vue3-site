# 快速開始

## 不安裝 Java

Docker Desktop 及 OrbStack 都可使用相同 Docker Compose 指令：

```bash
cp .env.example .env
docker compose --profile app up -d --build
docker compose ps
docker compose logs -f app
```

API 是 `http://localhost:8080`，健康檢查是 `/actuator/health`，Swagger 是 `/swagger-ui.html`。開發帳戶是 `admin / admin123`。

## 本機 Java 開發

需要 JDK 21：

```bash
docker compose up -d
./mvnw spring-boot:run
```

前端執行 `VITE_DEV_BACKEND=server pnpm dev:site-antd` 或對應 web/site 指令。
