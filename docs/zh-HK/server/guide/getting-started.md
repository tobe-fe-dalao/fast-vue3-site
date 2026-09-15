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

從 `fast-vue3` 前端項目執行 `pnpm dev:server` 互動選擇應用，或用 `VITE_DEV_BACKEND=server pnpm dev:site-antd` 指定應用。`pnpm dev:server` 只啟動前端；`pnpm dev:server:api` 可在前端項目中透過同級 Java 項目的 Docker Compose 檔案單獨啟動 API。
