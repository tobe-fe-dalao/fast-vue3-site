# Real backend integration

`fast-vue3-server` is the separate Spring Boot 3 reference API for the main workspace. From the `fast-vue3` repository, Docker Desktop or OrbStack can start its PostgreSQL, Redis, and Java containers without a local JDK:

```bash
pnpm dev:server:api
```

For local JDK 21 development, run `docker compose up -d` for PostgreSQL and Redis and then `./mvnw spring-boot:run`, both from the sibling `fast-vue3-server` directory.

After `GET http://localhost:8080/actuator/health` reports `UP`, run from `fast-vue3`:

```bash
pnpm dev:server
```

To start only one frontend:

```bash
VITE_DEV_BACKEND=server pnpm dev:web-antd
VITE_DEV_BACKEND=server pnpm dev:site-antd
```

`pnpm dev:server` starts only the selected frontend; it does not start Java or Nitro Mock. Override the Java URL with `VITE_FAST_VUE3_SERVER_URL` when needed. Both modes call `/api/v1`; Vite proxies to Nitro on port 5320 in Mock mode or Spring Boot on port 8080 in server mode. Public site content and comment reads need no token. Admin APIs, comment creation, and checkout require `Authorization: Bearer <accessToken>`.

## Enterprise screens

Start `web-antd` in server mode to use its project/task, approval, organization, tenant, audit, file, and notification screens. Sign in with the server's development account (`admin / admin123`), rather than the Nitro mock account. The shared client is `packages/effects/api/src/modules/enterprise.ts`; routes and permission requirements are listed in [enterprise domains](/en/server/api/enterprise).

Use the server when checking tenant isolation, project membership, task state changes, approval steps, file access, and persistence. The Nitro fixture only models API shapes. If a protected request returns 401, check the access token and selected backend; for 403, check the signed user's permissions. The browser's `/api/v1` URL alone does not identify the upstream service, so confirm the Vite proxy setting and the server health endpoint.

Across the seven `site-*` apps, public home, features, product, about, docs, FAQ, blog, pricing, and contact views use the shared portal client. `web-app` uses the public home, features, about, blog list, and contact methods. The other six `web-*` apps use API data for dashboard, analytics, user, and role views; the enterprise screens above remain specific to `web-antd`.
