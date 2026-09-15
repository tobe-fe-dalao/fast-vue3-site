# Getting started

## Requirements

- Docker and Docker Compose
- JDK 21 only when running Java outside Docker

## Start the API

### Docker or OrbStack, without a local JDK

Docker Desktop and OrbStack expose the same Docker Compose CLI:

```bash
cp .env.example .env
docker compose --profile app up -d --build
docker compose ps
docker compose logs -f app
```

This starts PostgreSQL, Redis, and the Java application in containers.

### Local Java development

```bash
cp .env.example .env
docker compose up -d
./mvnw spring-boot:run
```

The API listens on `http://localhost:8080`. Check `GET /actuator/health`, open `/swagger-ui.html`, or fetch `/v3/api-docs`. The development administrator is `admin / admin123`; replace `ADMIN_PASSWORD` and `JWT_SECRET` outside local development.

## Connect the frontend

From the `fast-vue3` repository:

```bash
pnpm dev:server
# or start one portal directly
VITE_DEV_BACKEND=server pnpm dev:site-antd
```

The browser always calls `/api/v1`; the shared Vite proxy selects the configured backend. `pnpm dev:server` starts only the frontend. From `fast-vue3`, `pnpm dev:server:api` starts the Java stack separately through the sibling repository's Docker Compose file.

## Documentation

The maintained server documentation is part of [fast-vue3-site](https://tobe-fe-dalao.github.io/fast-vue3-site/en/server/). The server repository intentionally contains no Node.js or VitePress toolchain.
