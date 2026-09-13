# Configuration and deployment

| Variable | Purpose | Development default |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL JDBC URL | `jdbc:postgresql://localhost:5432/fastvue3` |
| `DATABASE_USERNAME` / `DATABASE_PASSWORD` | Database credentials | `fastvue3` / `fastvue3` |
| `REDIS_HOST` / `REDIS_PORT` | Refresh tokens, permission cache, rate limits, and idempotency claims | `localhost` / `6379` |
| `JWT_SECRET` | JWT HMAC secret | Local-only value |
| `ADMIN_PASSWORD` | Initial administrator password | `admin123` |
| `CORS_ALLOWED_ORIGIN_PATTERNS` | Allowed frontend origins | `http://localhost:*` |
| `FILE_STORAGE_ROOT` | Local upload directory | System temp directory under `fast-vue3-server/uploads` |
| `FILE_PUBLIC_BASE_URL` | File URL prefix | `/api/v1/files` |
| `FILE_MAX_SIZE_BYTES` | File-size limit | `10485760` (10 MiB) |

Flyway scripts in `src/main/resources/db/migration` own the schema. Append migrations; do not edit an applied migration.

The current upload adapter accepts PNG, JPEG, WebP, PDF, and plain text after extension and MIME checks, with signature checks for supported binary formats. It writes under tenant-specific local directories. Set `FILE_STORAGE_ROOT` to a persistent volume when running the container; the system temp default is for development. The application caps multipart uploads at 10 MB as well. `GET /actuator/health` is public; `/actuator/metrics` and `/actuator/prometheus` require authentication. Responses include `X-Request-Id` for log correlation.

For production, rotate secrets, restrict CORS, use managed PostgreSQL and Redis, expose only required endpoints, and run `./mvnw clean verify` before release. Payment checkout is a demonstrator: replace the generated checkout URL with a provider adapter, signed callback verification, and idempotent state transitions before accepting real money.

Server documentation is maintained in the `fast-vue3-site` repository. Changes pushed to its `main` branch are built and published to GitHub Pages by `.github/workflows/deploy.yml` using Node 22, pnpm, the VitePress dead-link check, and GitHub Pages deployment actions.
