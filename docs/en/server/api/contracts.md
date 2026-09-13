# API contract

Business endpoints use the `/api/v1` prefix and return one envelope:

```json
{"code":0,"message":"success","data":{}}
```

`code === 0` means success. Paginated responses contain `items`, `page`, `pageSize`, and `total`; list endpoints such as projects and approvals instead return arrays. Date-only fields use `yyyy-MM-dd`, and timestamps use ISO-8601 or the endpoint's documented format. Status casing depends on the resource: tenant, organization, and department use `active` / `disabled`, while project, task, and approval states are uppercase (for example `ACTIVE`, `IN_PROGRESS`, `PENDING`).

The frontend contract source is `packages/effects/api/src/types.ts`. When a Java VO changes, update that type, the Nitro mock response, and both test suites together.

## Authentication boundary

Health, OpenAPI, login, registration, token refresh, and `/api/v1/public/**` are anonymous. All other API routes require an access token by default. Write operations may additionally use `@PreAuthorize` permissions.

The Java service returns appropriate HTTP status codes and a nonzero `code` for errors, including 401, 403, 404, and 409. `@fast-vue3/request` unwraps successful `data` and turns HTTP or business errors into rejected promises. File downloads are binary responses rather than JSON envelopes. See [enterprise domains](/en/server/api/enterprise) for the new route and state contracts.
