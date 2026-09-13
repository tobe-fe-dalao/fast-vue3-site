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

## Enterprise screens

Start `web-antd` in server mode to use its project/task, approval, organization, tenant, audit, file, and notification screens. Sign in with the server's development account (`admin / admin123`), rather than the Nitro mock account. The shared client is `packages/effects/api/src/modules/enterprise.ts`; routes and permission requirements are listed in [enterprise domains](/en/server/api/enterprise).

Use the server when checking tenant isolation, project membership, task state changes, approval steps, file access, and persistence. The Nitro fixture only models API shapes. If a protected request returns 401, check the access token and selected backend; for 403, check the signed user's permissions. The browser's `/api/v1` URL alone does not identify the upstream service, so confirm the Vite proxy setting and the server health endpoint.
