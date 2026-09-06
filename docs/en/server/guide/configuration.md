# Configuration and deployment

| Variable | Purpose | Development default |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL JDBC URL | `jdbc:postgresql://localhost:5432/fastvue3` |
| `DATABASE_USERNAME` / `DATABASE_PASSWORD` | Database credentials | `fastvue3` / `fastvue3` |
| `REDIS_HOST` / `REDIS_PORT` | Refresh-token storage | `localhost` / `6379` |
| `JWT_SECRET` | JWT HMAC secret | Local-only value |
| `ADMIN_PASSWORD` | Initial administrator password | `admin123` |
| `CORS_ALLOWED_ORIGIN_PATTERNS` | Allowed frontend origins | `http://localhost:*` |

Flyway scripts in `src/main/resources/db/migration` own the schema. Append migrations; do not edit an applied migration.

For production, rotate secrets, restrict CORS, use managed PostgreSQL and Redis, expose only required endpoints, and run `./mvnw clean verify` before release. Payment checkout is a demonstrator: replace the generated checkout URL with a provider adapter, signed callback verification, and idempotent state transitions before accepting real money.

Server documentation is maintained in the `fast-vue3-site` repository. Changes pushed to its `main` branch are built and published to GitHub Pages by `.github/workflows/deploy.yml` using Node 22, pnpm, the VitePress dead-link check, and GitHub Pages deployment actions.
