# API contract

Business endpoints use the `/api/v1` prefix and return one envelope:

```json
{"code":0,"message":"success","data":{}}
```

`code === 0` means success. Paginated data always contains `items`, `page`, `pageSize`, and `total`. Time values use ISO-8601 or `yyyy-MM-dd HH:mm:ss`; stable status values use lowercase enums.

The frontend contract source is `packages/effects/api/src/types.ts`. When a Java VO changes, update that type, the Nitro mock response, and both test suites together.

## Authentication boundary

Health, OpenAPI, login, registration, token refresh, and `/api/v1/public/**` are anonymous. All other API routes require an access token by default. Write operations may additionally use `@PreAuthorize` permissions.
