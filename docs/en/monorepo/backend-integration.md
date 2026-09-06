# Real backend integration

`fast-vue3-server` is the Spring Boot 3 reference API for the main workspace. Docker Desktop and OrbStack can run the complete stack without a local JDK:

```bash
cd ../fast-vue3-server
docker compose --profile app up -d --build
docker compose ps
```

For local JDK 21 development, use `docker compose up -d` for PostgreSQL and Redis, then run `./mvnw spring-boot:run`.

After `GET http://localhost:8080/actuator/health` reports `UP`, run from `fast-vue3`:

```bash
VITE_FAST_VUE3_SERVER_URL=http://localhost:8080 pnpm dev:server
```

To start only one frontend:

```bash
VITE_DEV_BACKEND=server pnpm dev:web-antd
VITE_DEV_BACKEND=server pnpm dev:site-antd
```

Both modes call `/api/v1`; Vite proxies to Nitro on port 5320 in mock mode or Spring Boot on port 8080 in server mode. Public site content and comment reads need no token. Admin APIs, comment creation, and checkout require `Authorization: Bearer <accessToken>`.
