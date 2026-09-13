# Mock API and requests

`pnpm dev:mock` starts the Nitro service in `apps/backend-mock` and the selected frontends. `pnpm dev:backend-mock` starts only the API. Development accounts are `admin / 123456` and `user / 123456`.

Pages call the domain client from `@fast-vue3/api`. `@fast-vue3/request` attaches the stored token, unwraps `{ code, message, data }`, and throws backend messages for failed business responses.

The mock uses the same basic anonymous/authenticated boundary as the real server:

- anonymous: `GET /api/v1/public/**` and `POST /api/v1/public/contact`;
- authenticated: admin APIs, `POST /api/v1/blog/{id}/comments`, and `POST /api/v1/payments/checkout`.

The mock integration test launches a real Nitro listener and verifies anonymous reads, 401 responses, login, comment creation, and checkout.

The enterprise routes in `apps/backend-mock/api/v1/[...].ts` call an in-memory `createStaticEnterpriseApi` fixture. Nitro requires a mock access token for these routes and restricts most enterprise paths to its `admin` fixture, but it does not implement Java's full permissions, tenant isolation, transactions, or durable storage. The in-browser static preview uses the same fixture. For behavioral checks, switch to [the Spring service](/en/monorepo/backend-integration).
